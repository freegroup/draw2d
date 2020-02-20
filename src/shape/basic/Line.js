import draw2d from '../../packages'
import jsonUtil from '../../util/JSONUtil'
import extend from '../../util/extend'


/**
 * @class draw2d.shape.basic.Line
 * The base class for all visible elements inside a canvas.
 *
 *
 * @example
 *
 *    // Create the line and modify the start/end after inserting them into
 *    // the canvas
 *    let line1 =  new draw2d.shape.basic.Line({startX:30, startY:30, endX:100, endY:80});
 *
 *    canvas.add(line1);
 *
 *    // Create the line with a given start/end coordinate in the constructor
 *    //
 *    let line2 = new draw2d.shape.basic.Line({
 *          startX:20,
 *          startY:80,
 *          endX:200,
 *          endY:150,
 *          stroke:3,
 *          color:"#1d1dff"
 *     });
 *    canvas.add(line2);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.Figure
 */
draw2d.shape.basic.Line = draw2d.Figure.extend(
  /** @lends draw2d.shape.basic.Line.prototype */
  {

  NAME: "draw2d.shape.basic.Line",

  DEFAULT_COLOR: new draw2d.util.Color(0, 0, 0),

  /**
   * Creates a new figure element which are not assigned to any canvas witht he given start and
   * end coordinate.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // click area for the line hit test
    this.corona = 10
    this.isGlowing = false
    this.lineColor = this.DEFAULT_COLOR
    this.stroke = 1
    this.outlineStroke = 0
    this.outlineColor = new draw2d.util.Color(null)
    this.outlineVisible = false

    this.draggedSegment = null

    this.dasharray = null

    this.start = new draw2d.geo.Point(30, 30)
    this.end = new draw2d.geo.Point(100, 100)

    this.vertices = new draw2d.util.ArrayList()
    this.vertices.add(this.start.clone())
    this.vertices.add(this.end.clone())

    this._super(
      extend({
        deleteable: false,
        selectable: true
      }, attr),
      extend({}, {
        // @attr {Number} start the  coordinates of the start point */
        start: this.setStartPosition,
        // @attr {Number} startX the x coordinate of the start point */
        startX: this.setStartX,
        // @attr {Number} startY the y coordinate of the start point */
        startY: this.setStartY,
        // @attr {Number} end the coordinates of the end point */
        end: this.setEndPosition,
        // @attr {Number} endX the x coordinate of the end */
        endX: this.setEndX,
        // @attr {Number} endY the y coordinate of the end */
        endY: this.setEndY,
        // @attr {Number} vertices the x coordinate of the start point */
        vertices: this.setVertices,
        // @attr {String | draw2d.util.Color} outlineColor the outline color of the line */
        outlineColor: this.setOutlineColor,
        // @attr {Number} outlineStroke the line width of the outline */
        outlineStroke: this.setOutlineStroke,
        // @attr {String|draw2d.util.Color} color the color of the line */
        color: this.setColor,
        // @attr {Number} stroke the line width of the color */
        stroke: this.setStroke,
        // @attr {String} dasharray the line pattern see {@link draw2d.shape.basic.Line#setDashArray} for more information*/
        dasharray: this.setDashArray,
        // @attr {Boolean} glow the glow flag for the shape. The representation of the "glow" depends on the shape */
        glow: this.setGlow
      }, setter),

      extend({}, {
        start: this.getStartPosition,
        end: this.getEndPosition,
        outlineColor: this.getOutlineColor,
        outlineStroke: this.getOutlineStroke,
        stroke: this.getStroke,
        color: this.getColor,
        dasharray: this.getDashArray,
        vertices: this.getVertices
      }, getter))

    // some router installs a edit policy. In this case we want delete them
    //
    if (this.editPolicy.getSize() === 0) {
      this.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy())
    }
  },

  /**
   *
   * Set the outline color of the line.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       outlineColor: color
   *     });
   *
   * @param {draw2d.util.Color/String} color The new color of the line.
   * @since 4.2.1
   **/
  setOutlineColor: function (color) {
    this.outlineColor = new draw2d.util.Color(color)
    this.repaint()
    this.fireEvent("change:outlineColor", {value: this.outlineColor})

    return this
  },

  /**
   *
   * The outline color of the text
   *
   * @returns {draw2d.util.Color}
   * @since 4.2.1
   */
  getOutlineColor: function () {
    return this.outlineColor
  },

  /**
   *
   * Set the outline stroke of the line to use.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       outlineStroke: w
   *     });
   *
   * @param {Number} w The new outline width of the line
   * @since 4.2.1
   **/
  setOutlineStroke: function (w) {
    this.outlineStroke = w
    this.repaint()
    this.fireEvent("change:outlineStroke", {value: this.outlineStroke})

    return this
  },

  /**
   *
   * The used outline line width.
   *
   * @returns {Number}
   * @since 4.2.1
   **/
  getOutlineStroke: function () {
    return this.outlineStroke
  },

  /**
   *
   * Called if the drag and drop action begins. You can return [false] if you
   * want avoid that the figure can be move.
   *
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @return {Boolean} true if the figure accepts dragging
   **/
  onDragStart: function (x, y, shiftKey, ctrlKey, isFaked) {
    let result = this._super(x, y, shiftKey, ctrlKey)

    if (result === true && isFaked !== true) {
      this.draggedSegment = {index: 0, start: this.start, end: this.end}
    }
    return result
  },

  /**
   *
   * Don't call them manually. This will be done by the framework.<br>
   * Will be called if the object are moved via drag and drop.
   * Sub classes can override this method to implement additional stuff. Don't forget to call
   * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
   * @private
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   **/
  onDrag: function (dx, dy, dx2, dy2) {
    if (this.command === null) {
      return
    }

    this.vertices.each(function (i, e) {
      e.translate(dx2, dy2)
    })
    this.command.updateVertices(this.vertices.clone())

    // start/end are separate draw2d.geo.Point objects. Required for routing and determining if a node is dragged away
    // from the connection. In this case we must modify the start/end by hand
    this.start.translate(dx2, dy2)
    this.end.translate(dx2, dy2)


    this.svgPathString = null
    this._super(dx, dy, dx2, dy2)
  },

  /**
   *
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onDragEnd: function (x, y, shiftKey, ctrlKey) {
    // Element ist zwar schon an seine Position, das Command muss aber trotzdem
    // in dem CommandStack gelegt werden damit das Undo funktioniert.
    //
    this.isInDragDrop = false
    this.draggedSegment = null

    if (this.command === null) {
      return
    }

    this.canvas.getCommandStack().execute(this.command)
    this.command = null
    this.isMoving = false

    // notify all installed policies
    //
    this.editPolicy.each( (i, e) => {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.onDragEnd(this.canvas, this, x, y, shiftKey, ctrlKey)
      }
    })

    // inform all other listener
    this.fireEvent("move", {figure: this, dx: 0, dy: 0})

    // fire an event
    // @since 5.3.3
    this.fireEvent("dragend", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})

  },

  /**
   *
   * Called when a user clicks on the element.
   *
   *     // Alternatively you can register for this event with
   *     figure.on("click", function(emitterFigure){
   *         alert("clicked");
   *     });
   *
   * @template
   * @since 4.0.0
   */
  onClick: function () {
  },

  /**
   *
   * Set the line style for this object.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       dasharray: dashPattern
   *     });
   *
   * @param {String} dashPattern Can be one of this ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
   */
  setDashArray: function (dashPattern) {
    this.dasharray = dashPattern
    this.repaint()

    this.fireEvent("change:dashArray", {value: this.dasharray})

    return this
  },

  /**
   *
   * Get the line style for this object.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr("dasharray");
   *
   * @since 5.1.0
   */
  getDashArray: function () {
    return this.dasharray
  },


  /**
   *
   * Set the width for the click hit test of this line.
   *
   * @param {Number} width the width of the line hit test.
   **/
  setCoronaWidth: function (width) {
    this.corona = width

    return this
  },


  /**
   *
   * Called by the framework. Don't call them manually.
   *
   * @private
   **/
  createShapeElement: function () {
    let set = this.canvas.paper.set()

    // the drop shadow or border line
    set.push(this.canvas.paper.path("M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y))
    // the main path
    set.push(this.canvas.paper.path("M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y))
    set.node = set.items[1].node

    // indicate that the outline is visible at the moment
    // the repaint update the status correct and set the attributes for
    // the first time
    this.outlineVisible = true//this.outlineStroke>0;

    return set
  },

  /**
   * @inheritdoc
   *
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    // don't override existing values
    //
    if (typeof attributes === "undefined") {
      attributes = {
        "stroke": this.lineColor.rgba(),
        "stroke-width": this.stroke,
        "path": ["M", this.start.x, this.start.y, "L", this.end.x, this.end.y].join(" ")
      }
    }
    else {
      // may a router has calculate another path. don't override them.
      if (typeof attributes.path === "undefined") {
        attributes.path = ["M", this.start.x, this.start.y, "L", this.end.x, this.end.y].join(" ")
      }
      jsonUtil.ensureDefault(attributes, "stroke", this.lineColor.rgba())
      jsonUtil.ensureDefault(attributes, "stroke-width", this.stroke)
    }

    jsonUtil.ensureDefault(attributes, "stroke-dasharray", this.dasharray)
    this._super(attributes)

    if (this.outlineStroke > 0) {
      this.shape.items[0].attr({
        "stroke-width": (this.outlineStroke + this.stroke),
        "stroke": this.outlineColor.rgba()
      })
      if (this.outlineVisible === false)
        this.shape.items[0].show()
      this.outlineVisible = true
    }
    else if (this.outlineVisible === true) {
      // reset them once
      this.shape.items[0].attr({"stroke-width": 0, "stroke": "none"})
      this.shape.items[0].hide()
      this.outlineVisible = false
    }
  },

  /**
   *
   * Moves the element to the background. Additional
   * the internal model changed as well.
   *
   * @since 4.7.2
   */
  toBack: function (figure) {
    this._super(figure)

    if (this.outlineVisible === true) {
      this.shape.items[0].insertBefore(this.shape.items[1])
    }

    return this
  },


  /**
   *
   * Highlight the element or remove the highlighting
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       glow: flag
   *     });
   *
   * @param {Boolean} flag indicates glow/noGlow
   * @template
   */
  setGlow: function (flag) {
    if (this.isGlowing === flag) {
      return
    }

    if (flag === true) {
      // store old values for restore
      this._lineColor = this.lineColor
      this._stroke = this.stroke

      this.setColor(new draw2d.util.Color("#3f72bf"))
      this.setStroke((this.stroke * 4) | 0)
    }
    else {
      this.setColor(this._lineColor)
      this.setStroke(this._stroke)
    }

    this.isGlowing = flag

    return this
  },


  /**
   * You can't drag&drop the resize handles if the line not resizeable.
   * @returns boolean
   **/
  isResizeable: function () {
    return true
  },


  /**
   * Set the line width. This enforce a repaint of the line.
   * This method fires a <i>document dirty</i> event.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       stroke: w
   *     });
   *
   * @param {Number} w The new line width of the figure.
   **/
  setStroke: function (w) {
    this.stroke = parseFloat(w)

    this.repaint()
    this.fireEvent("change:stroke", {value: this.stroke})

    return this
  },


  /**
   *
   * The used line width.
   *
   * @returns {Number}
   **/
  getStroke: function () {
    return this.stroke
  },


  /**
   *
   * Set the color of the line.
   * This method fires a <i>document dirty</i> event.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       color: color
   *     });
   *
   * @param {draw2d.util.Color|String} color The new color of the line.
   **/
  setColor: function (color) {
    this.lineColor = new draw2d.util.Color(color)
    this.repaint()
    this.fireEvent("change:color", {value: this.lineColor})

    return this
  },

  /**
   *
   * Return the current paint color.
   *
   * @return {draw2d.util.Color} The paint color of the line.
   **/
  getColor: function () {
    return this.lineColor
  },

  /**
   *
   * Translate the line with the given x/y offset.
   *
   * @param {Number} dx The new x translate offset
   * @param {Number} dy The new y translate offset
   * @since 4.1.0
   **/
  translate: function (dx, dy) {
    this.vertices.each(function (i, e) {
      e.translate(dx, dy)
    })

    // update start/end if the first or last vertex has been changed
    //
    this.start = this.vertices.first().clone()
    this.end = this.vertices.last().clone()

    let _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })

    this.svgPathString = null
    this.repaint()

    return this
  },

  /**
   *
   * return the bounding box of the line or polygon
   *
   * TODO: precalculate or cache this values
   *
   * @returns {draw2d.geo.Rectangle}
   * @since 4.8.2
   */
  getBoundingBox: function () {
    let minX = Math.min(...this.vertices.asArray().map(n => n.x))
    let minY = Math.min(...this.vertices.asArray().map(n => n.y))
    let maxX = Math.max(...this.vertices.asArray().map(n => n.x))
    let maxY = Math.max(...this.vertices.asArray().map(n => n.y))
    let width = maxX - minX
    let height = maxY - minY

    return new draw2d.geo.Rectangle(minX, minY, width, height)
  },


  /**
   *
   * Set the start point of the line.
   * This method fires a <i>document dirty</i> event.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       startX: x,
   *       startY: y
   *     });
   *
   * @param {Number|draw2d.geo.Point} x the x coordinate of the start point
   * @param {Number} [y] the y coordinate of the start point
   **/
  setStartPosition: function (x, y) {
    let pos = new draw2d.geo.Point(x, y)
    if (this.start.equals(pos)) {
      return this
    }

    this.start.setPosition(pos)
    this.vertices.first().setPosition(pos)
    this.repaint()

    let _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })
    this.fireEvent("change:start", {value: this.start})

    return this
  },
  /** @deprecated */
  setStartPoint: function (x, y) {
    return this.setStartPosition(x, y)
  },

  setStartX: function (x) {
    this.setStartPosition(x, this.start.y)
  },

  setStartY: function (y) {
    this.setStartPosition(this.start.x, y)
  },

  setEndX: function (x) {
    this.setEndPosition(x, this.end.y)
  },

  setEndY: function (y) {
    this.setEndPosition(this.end.x, y)
  },

  /**
   * Set the end point of the line.
   * This method fires a <i>document dirty</i> event.
   *
   *     // Alternatively you can use the attr method:
   *     figure.attr({
   *       endX: 3,
   *       endY: 10
   *     });
   *
   *     // or
   *     figure.attr({
   *       end: {x:3, y:10}
   *     });
   * @param {Number|draw2d.geo.Point} x the x coordinate or a draw2d.geo.Point of the end point
   * @param {Number} [y] the y coordinate of the end point
   **/
  setEndPosition: function (x, y) {
    let pos = new draw2d.geo.Point(x, y)
    if (this.end.equals(pos)) {
      return this
    }

    this.end.setPosition(pos)
    this.vertices.last().setPosition(pos)
    this.repaint()

    let _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })

    this.fireEvent("change:end", {value: this.end})

    return this
  },
  /** @deprecated **/
  setEndPoint: function (x, y) {
    return this.setEndPosition(x, y)
  },

  /**
   *
   * Return the x coordinate of the start.
   * @return {Number}
   **/
  getStartX: function () {
    return this.start.x
  },

  /**
   *
   * Return the y coordinate of the start.
   *
   * @return {Number}
   **/
  getStartY: function () {
    return this.start.y
  },

  /**
   *
   * Return the start point.
   *
   * @return {draw2d.geo.Point}
   **/
  getStartPosition: function () {
    return this.start.clone()
  },
  /** @deprecated **/
  getStartPoint: function () {
    return this.getStartPosition()
  },


  /**
   *
   * Return the x coordinate of the end point
   *
   * @return {Number}
   **/
  getEndX: function () {
    return this.end.x
  },

  /**
   *
   * Return the y coordinate of the end point.
   *
   * @return {Number}
   **/
  getEndY: function () {
    return this.end.y
  },

  /**
   *
   * Return the end point.
   *
   * @return {draw2d.geo.Point}
   **/
  getEndPosition: function () {
    return this.end.clone()
  },
  /** @deprecated **/
  getEndPoint: function () {
    return this.getEndPosition()
  },

  /**
   *
   * The x-offset related to the parent figure or canvas.
   *
   * @return {Number} the x-offset to the parent figure
   **/
  getX: function () {
    return this.getBoundingBox().x
  },


  /**
   *
   * The x-offset related to the parent figure or canvas.
   *
   * @return {Number} the x-offset to the parent figure
   **/
  getY: function () {
    return this.getBoundingBox().y
  },


  /**
   *
   * Return the Vertex with the given index.
   *
   * @param {Number} index the index of the vertex to return
   */
  getVertex: function (index) {
    return this.vertices.get(index)
  },


  /**
   *
   * Update the vertex at the give position with the new coordinate
   *
   * @param {Number} index the index of the vertex to update
   * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
   * @param {Number} [y] the y coordinate or undefined of the second argument is a point
   *
   * @since 4.0.0
   */
  setVertex: function (index, x, y) {
    if (x instanceof draw2d.geo.Point) {
      y = x.y
      x = x.x
    }

    let vertex = this.vertices.get(index)

    // invalid point or nothing to do
    //
    if (vertex === null || (vertex.x === x && vertex.y === y)) {
      return
    }

    vertex.x = parseFloat(x)
    vertex.y = parseFloat(y)

    // update start/end if the first or last vertex has been changed
    //
    this.start = this.vertices.first().clone()
    this.end = this.vertices.last().clone()

    this.svgPathString = null
    this.routingRequired = true
    this.repaint()

    let _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })
    this.fireEvent("change:vertices", {value: this.vertices})

    return this
  },

  /**
   *
   * Returns the vertices of the connection
   *
   * @return {draw2d.util.ArrayList} an draw2d.util.ArrayList of type draw2d.Point
   **/
  getVertices: function () {
    return this.vertices
  },

  /**
   *
   * Update the vertices of the object. The given array is copied and assigned.
   *
   * @param {draw2d.util.ArrayList|Array} vertices the new vertices of the polyline.
   *
   * @since 4.0.1
   */
  setVertices: function (vertices) {
    let _this = this
    // convert json document/array to draw2d ArrayList
    //
    if (Array.isArray(vertices)) {
      this.vertices = new draw2d.util.ArrayList()
      vertices.forEach(element => {
        this.vertices.add(new draw2d.geo.Point(element))
      })
    }
    // use the given ArrayList
    //
    else if (vertices instanceof draw2d.util.ArrayList) {
      this.vertices = vertices.clone(true)
    }
    else {
      throw "invalid argument for Line.setVertices"
    }

    // can happen if the given vertices array is empty
    //
    if (this.vertices.getSize() > 1) {
      this.start = this.vertices.first().clone()
      this.end = this.vertices.last().clone()
    }

    // update the UI and the segment parts
    this.svgPathString = null
    this.repaint()

    // align the SelectionHandles to the new situation
    // This is a Hack....normally this should be done below and the Line shouldn't know
    // something about this issue....this is complete a "EditPolicy" domain to handle this.
    if (!this.selectionHandles.isEmpty()) {
      this.editPolicy.each(function (i, e) {
        if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
          e.onUnselect(_this.canvas, _this)
          e.onSelect(_this.canvas, _this)
        }
      })
    }

    // notify the listener about the changes
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })

    this.fireEvent("change:vertices", {value: this.vertices})

    return this
  },

  /**
   *
   * Return the segments of the line with {start:s, end: e} JSON array list
   *
   * @returns {draw2d.util.ArrayList}
   */
  getSegments: function () {
    let result = new draw2d.util.ArrayList()
    result.add({start: this.getStartPosition(), end: this.getEndPosition()})

    return result
  },

  /**
   *
   * Returns the length of the line.
   *
   * @return {Number}
   **/
  getLength: function () {
    return Math.sqrt((this.start.x - this.end.x) * (this.start.x - this.end.x) + (this.start.y - this.end.y) * (this.start.y - this.end.y))
  },

  /**
   *
   * Returns the angle of the line in degree.
   *
   * <pre>
   *                                270°
   *                              |
   *                              |
   *                              |
   *                              |
   * 180° -------------------------+------------------------> +X
   *                              |                        0°
   *                              |
   *                              |
   *                              |
   *                              V +Y
   *                             90°
   * </pre>
   * @return {Number}
   **/
  getAngle: function () {
    let length = this.getLength()
    let angle = -(180 / Math.PI) * Math.asin((this.start.y - this.end.y) / length)

    if (angle < 0) {
      if (this.end.x < this.start.x) {
        angle = Math.abs(angle) + 180
      }
      else {
        angle = 360 - Math.abs(angle)
      }
    }
    else {
      if (this.end.x < this.start.x) {
        angle = 180 - angle
      }
    }
    return angle
  },

  /**
   *
   * Returns the Command to perform the specified Request or null if the shape want cancel the
   * operation or it can't operate the command.
   *
   * @param {draw2d.command.CommandType} request describes the Command being requested
   * @return {draw2d.command.Command} null or a Command
   * @private
   **/
  createCommand: function (request) {
    if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
      if (this.isDraggable()) {
        return new draw2d.command.CommandMoveVertices(this)
      }
    }

    if (request.getPolicy() === draw2d.command.CommandType.DELETE) {
      if (this.isDeleteable()) {
        return new draw2d.command.CommandDelete(this)
      }
    }

    if (request.getPolicy() === draw2d.command.CommandType.MOVE_BASEPOINT) {
      if (this.isDraggable()) {
        return new draw2d.command.CommandMoveVertex(this)
      }
    }

    return null
  },

  installEditPolicy: function (policy) {
    if (!(policy instanceof draw2d.policy.line.LineSelectionFeedbackPolicy) && policy instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
      return// silently
    }

    this._super(policy)

  },

  /**
   *
   * Checks if the hands over coordinate close to the line. The 'corona' is considered
   * for this test. This means the point isn't direct on the line. Is it only close to the
   * line!
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @return {Boolean}
   **/
  hitTest: function (px, py) {
    return draw2d.shape.basic.Line.hit(this.corona + this.stroke, this.start.x, this.start.y, this.end.x, this.end.y, px, py)
  },

  /**
   *
   * Returns the projection of the point on the line.
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @return {draw2d.geo.Point}
   **/
  pointProjection: function (px, py) {
    let pt = new draw2d.geo.Point(px, py)
    let p1 = this.getStartPosition()
    let p2 = this.getEndPosition()
    return draw2d.geo.Line.pointProjection(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y)
  },


  /**
   *
   * Returns the point onto the line which has the 'percentage' position onto the line.
   *
   * @param {Number} percentage value between [0..1]
   * @returns {*}
   */
  lerp: function (percentage) {
    let p1 = this.getStartPosition()
    let p2 = this.getEndPosition()
    percentage = Math.min(1, Math.max(0, percentage))
    return new draw2d.geo.Point(p1.x + (p2.x - p1.x) * percentage, p1.y + (p2.y - p1.y) * percentage)
  },


  /**
   *
   * Return all intersection points between the given Line.
   *
   * @param {draw2d.shape.basic.Line} other
   * @returns {draw2d.util.ArrayList}
   */
  intersection: function (other) {
    let result = new draw2d.util.ArrayList()

    // empty result. the lines are equal...infinit array
    if (other === this) {
      return result
    }

    let segments1 = this.getSegments()
    let segments2 = other.getSegments()

    segments1.each(function (i, s1) {
      segments2.each(function (j, s2) {
        let p = draw2d.shape.basic.Line.intersection(s1.start, s1.end, s2.start, s2.end)
        if (p !== null) {
          result.add(p)
        }
      })
    })
    return result
  },


  /**
   *
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    let memento = this._super()
    delete memento.x
    delete memento.y
    delete memento.width
    delete memento.height

    memento.stroke = this.stroke
    memento.color = this.getColor().rgba()
    memento.outlineStroke = this.outlineStroke
    memento.outlineColor = this.outlineColor.rgba()
    if (this.dasharray !== null) {
      memento.dasharray = this.dasharray
    }

    if (this.editPolicy.getSize() > 0) {
      memento.policy = this.editPolicy.first().NAME
    }

    // the attribute "vertex" will be overridden by a router if the element is a
    // "PolyLine" instance and has the correct router. Connections mainly ignore this
    // attribute because the start/end is defined by the ports and the vertices in between are
    // calculated by a router.
    memento.vertex = []
    this.getVertices().each(function (i, e) {
      memento.vertex.push({x: e.x, y: e.y})
    })

    return memento
  },

  /**
   *
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.dasharray === "string") {
      this.dasharray = memento.dasharray
    }
    if (typeof memento.stroke !== "undefined") {
      this.setStroke(parseFloat(memento.stroke))
    }
    if (typeof memento.color !== "undefined") {
      this.setColor(memento.color)
    }
    if (typeof memento.outlineStroke !== "undefined") {
      this.setOutlineStroke(memento.outlineStroke)
    }
    if (typeof memento.outlineColor !== "undefined") {
      this.setOutlineColor(memento.outlineColor)
    }
    if (typeof memento.policy !== "undefined") {
      try {
        this.installEditPolicy(eval("new " + memento.policy + "()"))
      }
      catch (exc) {
        debug.warn("Unable to install edit policy '" + memento.policy + "' forced by " + this.NAME + ".setPersistentAttributes. Using default.")
      }
    }

    // restore the vertex of the connection/line if any are given
    //
    // it makes no sense to restore vertices with only zero or one vertex. This
    // isn't a "line" at all.
    if (Array.isArray(memento.vertex) && memento.vertex.length > 1) {
      this.setVertices(memento.vertex)
    }

  }
})


/**
 * see: http://en.wikipedia.org/wiki/Line-line_intersection
 *
 * @param {draw2d.geo.Point} a1
 * @param {draw2d.geo.Point} a2
 * @param {draw2d.geo.Point} b1
 * @param {draw2d.geo.Point} b2
 *
 * @static
 * @private
 * @returns {draw2d.geo.Point}
 */
draw2d.shape.basic.Line.intersection = function (a1, a2, b1, b2) {
  let result = null

  let ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x)
  let ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x)
  let u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y)

  if (u_b !== 0) {
    let ua = ua_t / u_b
    let ub = ub_t / u_b

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
      result = new draw2d.geo.Point((a1.x + ua * (a2.x - a1.x)) | 0, (a1.y + ua * (a2.y - a1.y)) | 0)

      // determine if the lines are crossing or just touching
      //
      result.justTouching = (0 === ua || ua === 1 || 0 === ub || ub === 1)
    }
  }

  return result
}


/**
 * Static util function to determine is a point(px,py) on the line(x1,y1,x2,y2)
 * A simple hit test.
 *
 * @return {Boolean}
 * @static
 * @private
 * @param {Number} coronaWidth the accepted corona for the hit test
 * @param {Number} X1 x coordinate of the start point of the line
 * @param {Number} Y1 y coordinate of the start point of the line
 * @param {Number} X2 x coordinate of the end point of the line
 * @param {Number} Y2 y coordinate of the end point of the line
 * @param {Number} px x coordinate of the point to test
 * @param {Number} py y coordinate of the point to test
 **/
draw2d.shape.basic.Line.hit = function (coronaWidth, X1, Y1, X2, Y2, px, py) {
  return draw2d.geo.Line.distance(X1, Y1, X2, Y2, px, py) < coronaWidth
}

