/**
 * @class draw2d.layout.connection.MuteableManhattanConnectionRouter
 *
 * JUST FOR RESEARCH AT THE MOMENT!!!!!!
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
import draw2d from '../../packages'


draw2d.layout.connection.MuteableManhattanConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
  NAME: "draw2d.layout.connection.MuteableManhattanConnectionRouter",

  UP: new draw2d.geo.Ray(0, -1),
  DOWN: new draw2d.geo.Ray(0, 1),
  LEFT: new draw2d.geo.Ray(-1, 0),
  RIGHT: new draw2d.geo.Ray(1, 0),

  /**
   * @constructs
   * Creates a new Router object.
   *
   */
  init: function () {
    this._super()

    this.rowsUsed = {}//new HashMap<Integer, Integer>();
    this.colsUsed = {}//new HashMap<Integer, Integer>();
    this.constraints = {}//new HashMap<Connection, Object>();
    this.reservedInfo = {}//new HashMap<Connection, ReservedInfo>();
  },


  /**
   * @inheritdoc
   */
  route: function (conn, routingHints) {
    this.rowsUsed = {}//new HashMap<Integer, Integer>();
    this.colsUsed = {}//new HashMap<Integer, Integer>();
    this.constraints = {}//new HashMap<Connection, Object>();
    this.reservedInfo = {}//new HashMap<Connection, ReservedInfo>();

    let canvas = conn.getCanvas()
    let i

    let startPoint = conn.getStartPoint()
    let endPoint = conn.getEndPoint()

    let start = new draw2d.geo.Ray(startPoint)
    let end = new draw2d.geo.Ray(endPoint)
    let average = new draw2d.geo.Ray((start.x + end.x) / 2, (start.y + end.y) / 2)

    let direction = new draw2d.geo.Ray(end.x - start.x, end.y - start.y)
    let startNormal = this.getStartDirection(conn)
    let endNormal = this.getEndDirection(conn)

    let positions = new draw2d.util.ArrayList()
    let horizontal = startNormal.isHorizontal()

    if (horizontal) {
      positions.add(start.y)
    }
    else {
      positions.add(start.x)
    }

    horizontal = !horizontal

    // dot product is zero if the vector orthogonal (90°)
    if (startNormal.dot(endNormal) === 0) {
      if ((startNormal.dot(direction) >= 0) && (endNormal.dot(direction) <= 0)) {
        // 0
      } else {

        // 2
        if (startNormal.dot(direction) < 0)
          i = startNormal.similarity(start.translated(startNormal.scaled(10)))
        else {
          if (horizontal)
            i = average.y
          else
            i = average.x
        }

        positions.add(i)
        horizontal = !horizontal

        if (endNormal.dot(direction) > 0) {
          i = endNormal.similarity(end.translated(endNormal.scaled(10)))
        }
        else {
          if (horizontal) {
            i = average.y
          }
          else {
            i = average.x
          }
        }
        positions.add(i)
        horizontal = !horizontal
      }
    } else {
      if (startNormal.dot(endNormal) > 0) {
        //1
        if (startNormal.dot(direction) >= 0)
          i = startNormal.similarity(start.translated(startNormal.scaled(10)))
        else
          i = endNormal.similarity(end.translated(endNormal.scaled(10)))
        positions.add(i)
        horizontal = !horizontal
      } else {
        //3 or 1
        if (startNormal.dot(direction) < 0) {
          i = startNormal.similarity(start.translated(startNormal.scaled(10)))
          positions.add(i)
          horizontal = !horizontal
        }

        // my tweak to route SCA wires starts
        if (this.isCycle(conn)) {
          if (horizontal)
            i = conn.getSource().getParent().getBoundingBox().getTop() - 10// * index;
          else
            i = conn.getSource().getParent().getBoundingBox().getRight() + 10// * index;
        } else {
          if (horizontal) {
            let j = average.y

            let next = endNormal.similarity(end.translated(endNormal.scaled(10)))

            let trial = new draw2d.geo.Ray((positions.get(positions.getSize() - 1)), j)
            let figure = this.findFirstFigureAtStraightLine(canvas, trial, this.LEFT, draw2d.util.ArrayList.EMPTY_LIST)

            while (figure != null && figure.getBoundingBox().x + figure.getBoundingBox().width > next) {
              j = figure.getBoundingBox().y + figure.getBoundingBox().height + 5
              trial.y = j
              figure = this.findFirstFigureAtStraightLine(canvas, trial, this.LEFT, draw2d.util.ArrayList.EMPTY_LIST)
            }

            i = j

          } else {
            let figure = this.findFirstFigureAtStraightLine(canvas, start, this.RIGHT, this.getExcludingFigures(conn))
            if (figure == null)
              i = average.x
            else {
              i = Math.min(average.x, start.translated(new draw2d.geo.Ray(3 * (figure.getBoundingBox().x - start.x) / 4, 0)).x)
              i = Math.max(start.x, i)
            }
            i = this.adjust(conn, i)
          }
        }
        // my tweak to route SCA wires ends
        positions.add(i)
        horizontal = !horizontal
      }
    }
    if (horizontal)
      positions.add(end.y)
    else
      positions.add(end.x)

    this.processPositions(start, end, positions, startNormal.isHorizontal(), conn)


    this._paint(conn)
  },

  /**
   * @method
   *
   * @param {draw2d.Connection} connection
   * @param {Number} r
   * @param {Number} n
   * @param {Number} x
   *
   * @private
   */
  getColumnNear: function (connection, r, n, x) {
    let min = Math.min(n, x)
    let max = Math.max(n, x)

    if (min > r) {
      max = min
      min = r - (min - r)
    }
    if (max < r) {
      min = max
      max = r + (r - max)
    }

    let proximity = 0
    let direction = -1
    if (r % 6 !== 0) {
      r = r - (r % 6)
    }

    let i
    while (proximity < r) {
      i = parseInt(r + proximity * direction)
      if (!(i in this.colsUsed)) {
        this.colsUsed[i] = i
        this.reserveColumn(connection, i)
        return i
      }

      if (i <= min) {
        return i + 6
      }

      if (i >= max) {
        return i - 6
      }

      if (direction === 1) {
        direction = -1
      }
      else {
        direction = 1
        proximity += 6
      }
    }
    return r
  },

  getRowNear: function (connection, r, n, x) {
    let min = Math.min(n, x)
    let max = Math.max(n, x)

    if (min > r) {
      max = min
      min = r - (min - r)
    }
    if (max < r) {
      min = max
      max = r + (r - max)
    }

    let proximity = 0
    let direction = -1
    if (r % 6 !== 0) {
      r = r - (r % 6)
    }

    let i
    while (proximity < r) {
      i = parseInt(r + proximity * direction)
      if (!(i in this.rowsUsed)) {
        this.rowsUsed[i] = i
        this.reserveRow(connection, i)
        return i
      }
      if (i <= min)
        return i + 6
      if (i >= max)
        return i - 6
      if (direction === 1)
        direction = -1
      else {
        direction = 1
        proximity += 6
      }
    }
    return r
  },

  /**
   *   <li>up -&gt; 0</li>
   *   <li>right -&gt; 1</li>
   *   <li>down -&gt; 2</li>
   *   <li>left -&gt; 3</li>
   **/
  getEndDirection: function (conn) {
    let p = conn.getEndPoint()
    let rect = conn.getTarget().getParent().getBoundingBox()
    return this.getDirection(rect, p)
  },


  /**
   *   <li>up -&gt; 0</li>
   *   <li>right -&gt; 1</li>
   *   <li>down -&gt; 2</li>
   *   <li>left -&gt; 3</li>
   **/
  getStartDirection: function (conn) {
    let p = conn.getStartPoint()
    let rect = conn.getSource().getParent().getBoundingBox()
    return this.getDirection(rect, p)
  },

  /**
   * Returns the direction the point <i>p</i> is in relation to the given rectangle.
   * Possible values are LEFT (-1,0), RIGHT (1,0), UP (0,-1) and DOWN (0,1).
   *
   * @param r the rectangle
   * @param p the point
   * @return the direction from <i>r</i> to <i>p</i>
   */
  getDirection: function (r, p) {
    let i = Math.abs(r.y - p.y)
    let distance = Math.abs(r.x - p.x)
    let direction = this.LEFT

    if (i <= distance) {
      distance = i
      direction = this.UP
    }

    i = Math.abs(r.getBottom() - p.y)
    if (i <= distance) {
      distance = i
      direction = this.DOWN
    }

    i = Math.abs(r.getRight() - p.x)
    if (i < distance) {
      direction = this.RIGHT
    }

    return direction
  },

  processPositions: function (/*Ray*/ start, /*Ray*/ end, /*List*/ positions, /*boolean*/ horizontal, /*Connection*/ conn) {
    this.removeReservedLines(conn)

    let pos = []
    if (horizontal)
      pos.push(start.x)
    else
      pos.push(start.y)
    let i
    for (i = 0; i < positions.getSize(); i++) {
      pos.push(positions.get(i))
    }

    if (horizontal === (positions.getSize() % 2 === 1)) {
      pos.push(end.x)
    }
    else {
      pos.push(end.y)
    }

    conn.addPoint(new draw2d.geo.Point(start.x, start.y))
    let p
    let current, prev, min, max
    let adjust
    for (i = 2; i < pos.length - 1; i++) {
      horizontal = !horizontal
      prev = pos[i - 1]
      current = pos[i]

      adjust = (i !== pos.length - 2)
      if (horizontal) {
        if (adjust) {
          min = pos[i - 2]
          max = pos[i + 2]
          pos[i] = current = this.getRowNear(conn, current, min, max)
        }
        p = new draw2d.geo.Point(prev, current)
      } else {
        if (adjust) {
          min = pos[i - 2]
          max = pos[i + 2]
          pos[i] = current = this.getColumnNear(conn, current, min, max)
        }
        p = new draw2d.geo.Point(current, prev)
      }
      conn.addPoint(p)
    }
    conn.addPoint(new draw2d.geo.Point(end.x, end.y))
  },


  removeReservedLines: function (connection) {
    let rInfo = this.reservedInfo[connection]
    if (typeof rInfo === "undefined" || rInfo === null)
      return

    for (let i = 0; i < rInfo.reservedRows.getSize(); i++) {
      delete this.rowsUsed[rInfo.reservedRows.get(i)]
    }
    for (let i = 0; i < rInfo.reservedCols.getSize(); i++) {
      delete this.colsUsed[rInfo.reservedCols.get(i)]
    }
    delete this.reservedInfo[connection]
  },

  reserveColumn: function (connection, column) {
    let info = this.reservedInfo[connection]
    if (typeof info === "undefined" || info === null) {
      info = {reservedCols: new draw2d.util.ArrayList(), reservedRows: new draw2d.util.ArrayList()}
      this.reservedInfo[connection] = info
    }
    info.reservedCols.add(column)
  },

  reserveRow: function (connection, row) {
    let info = this.reservedInfo[connection]
    if (typeof info === "undefined" || info === null) {
      info = {reservedCols: new draw2d.util.ArrayList(), reservedRows: new draw2d.util.ArrayList()}
      this.reservedInfo[connection] = info
    }
    info.reservedRows.add(row)
  },

  getConstraint: function (connection) {
    return this.constraints[connection]
  },

  setConstraint: function (connection, constraint) {
    this.constraints[connection] = constraint
  },

  isCycle: function (conn) {
    let source = conn.getSource().getParent()
    let target = conn.getTarget().getParent()

    return source.id === target.id
  },

  getExcludingFigures: function (conn) {
    let excluding = new draw2d.util.ArrayList()

    excluding.add(conn.getSource().getParent())
    excluding.add(conn.getTarget().getParent())

    return excluding
  },

  findFirstFigureAtStraightLine: function (canvas, /*Ray*/ start, /*Ray*/ direction, /*List*/ excluding) {
    let figure = null

    let figures = canvas.getFigures()
    let _this = this
    figures.each(function (i, child) {
      try {
        if (!excluding.contains(child)) {
          let rect = child.getBoundingBox()
          if (_this.LEFT.equals(direction)) {
            if (start.x > rect.x && start.y >= rect.y && start.y <= rect.y + rect.h) {
              if (figure === null || rect.x > figure.getBoundingBox().x)
                figure = child
            }
          } else if (_this.RIGHT.equals(direction)) {
            if (start.x < rect.x + rect.w && start.y >= rect.y && start.y <= rect.y + rect.h) {
              if (figure == null || rect.x < figure.getBoundingBox().x)
                figure = child
            }
          } else if (_this.UP.equals(direction)) {
            if (start.y > rect.y && start.x >= rect.x && start.x <= rect.x + rect.w) {
              if (figure === null || rect.y > figure.getBoundingBox().y)
                figure = child
            }
          } else if (_this.DOWN.equals(direction)) {
            if (start.y < rect.y + rect.h && start.x >= rect.x && start.x <= rect.x + rect.w) {
              if (figure === null || rect.y < figure.getBoundingBox().y)
                figure = child
            }
          }
        }
      }
      catch (exc) {
        console.log(exc)
        debugger
      }
    })
    return figure
  },

  adjust: function (connection, col) {
    let column = col

    let start = connection.getSource().getPosition()

    let connections = connection.getCanvas().getLines()
    connections.each(function (i, conn) {
      try {
        if (conn === connection)
          return

        let end = conn.getTarget().getPosition()
        if (start.x < end.x && start.y === end.y) {
          if (conn.getVertices().getMidpoint().x <= col)
            column = conn.getVertices().getMidpoint().x - 5
        }
      }
      catch (exc) {
        console.log(exc)
        debugger
      }
    })
    return column
  }


})
