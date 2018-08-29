/**
 * @class draw2d.shape.basic.PolyLine
 *
 * A PolyLine is a line with more than 2 points.
 *
 *
 *     @example preview small frame
 *
 *     var line = new draw2d.shape.basic.PolyLine();
 *     line.setVertices([{x:10,y:10},{x:80,y:70},{x:100,y:110}]);
 *     canvas.add(line);
 *
 *
 *     canvas.setCurrentSelection(line);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Line
 */
import draw2d from '../../packages'
import jsonUtil from '../../util/JSONUtil'
import extend from '../../util/extend'

draw2d.shape.basic.PolyLine = draw2d.shape.basic.Line.extend({

  NAME: "draw2d.shape.basic.PolyLine",

  /**
   * @constructor
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // internal status handling for performance reasons
    //
    this.svgPathString = null
    this.oldPoint = null

    this.router = null
    this.routingRequired = true
    this.lineSegments = new draw2d.util.ArrayList()

    this.radius = ""

    this._super(
      extend(
        {
          router: new draw2d.layout.connection.VertexRouter()
        }, attr),
      extend({}, {
        /** @attr {draw2d.layout.connection.ConnectionRouter} the router to use to layout the polyline */
        router: this.setRouter,
        /** @attr {Number} radius the radius to render the line edges */
        radius: this.setRadius
      }, setter),
      extend({}, {
        router: this.getRouter,
        radius: this.getRadius
      }, getter)
    )
  },

  /**
   * @method
   * Sets the corner radius of the edges.
   *
   * @param {Number} radius the corner radius
   * @since 4.2.1
   */
  setRadius: function (radius) {
    this.radius = radius
    this.svgPathString = null
    this.repaint()
    this.fireEvent("change:radius", {value: this.radius})

    return this
  },


  setOutlineStroke: function (w) {
    if (this.outlineStroke !== w) {
      this.svgPathString = null
      this.routingRequired = true
    }
    this._super(w)

    return this
  },

  /**
   * @method
   * Get the corner radius of the edges.
   *
   * @return {Number}
   * @since 4.2.1
   */
  getRadius: function () {
    return this.radius
  },


  /**
   * @method
   * Set the start point of the line.
   *
   * @param {Number} x the x coordinate of the start point
   * @param {Number} y the y coordinate of the start point
   **/
  setStartPoint: function (x, y) {
    if (this.vertices.getSize() > 0) {
      this.vertices.first().setPosition(x, y)
    }
    else {
      this.vertices.add(new draw2d.geo.Point(x, y))
    }
    this.start = this.vertices.first().clone()
    //     if(this.isInDragDrop===false)
    this.calculatePath({startMoved: true, endMoved: false})

    this.repaint()

    var _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })

    this.fireEvent("change:start", {value: this.start})

    return this
  },

  /**
   * @method
   * Set the end point of the line.
   *
   * @param {Number} x the x coordinate of the end point
   * @param {Number} y the y coordinate of the end point
   */
  setEndPoint: function (x, y) {
    if (this.vertices.getSize() > 1) {
      this.vertices.last().setPosition(x, y)
    }
    else {
      this.vertices.add(new draw2d.geo.Point(x, y))
    }
    this.end = this.vertices.last().clone()

    if (this.isInDragDrop === false)
      this.calculatePath({startMoved: false, endMoved: true})

    this.repaint()

    var _this = this
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.moved(_this.canvas, _this)
      }
    })
    this.fireEvent("change:end", {value: this.end})

    return this
  },

  /**
   * @method
   * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
   *
   * @param {Number} index the insert index
   * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
   * @param {Number} [y] the y coordinate or undefined of the second argument is a point
   *
   * @since 4.0.0
   */
  addVertex: function (x, y) {
    this.vertices.add(new draw2d.geo.Point(x, y))

    this.start = this.vertices.first().clone()
    this.end = this.vertices.last().clone()

    this.svgPathString = null
    this.repaint()

    if (!this.selectionHandles.isEmpty()) {
      var _this = this
      this.editPolicy.each(function (i, e) {
        if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
          e.onUnselect(_this.canvas, _this)
          e.onSelect(_this.canvas, _this)
        }
      })
    }
    this.fireEvent("change:vertices", {value: this.vertices})

    return this
  },


  /**
   * @method
   * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
   *
   * @param {Number} index the insert index
   * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
   * @param {Number} [y] the y coordinate or undefined of the second argument is a point
   *
   * @since 4.0.0
   */
  insertVertexAt: function (index, x, y) {
    var vertex = new draw2d.geo.Point(x, y)

    this.vertices.insertElementAt(vertex, index)

    this.start = this.vertices.first().clone()
    this.end = this.vertices.last().clone()

    this.svgPathString = null
    this.repaint()

    if (!this.selectionHandles.isEmpty()) {
      var _this = this
      this.editPolicy.each(function (i, e) {
        if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
          e.onUnselect(_this.canvas, _this)
          e.onSelect(_this.canvas, _this)
        }
      })
    }
    this.fireEvent("change:vertices", {value: this.vertices})

    return this
  },


  /**
   * @method
   * Remove a vertex from the polyline and return the removed point. The current installed connection router
   * can send an veto for this operation.
   *
   * @param index
   * @returns {draw2d.geo.Point} the removed point or null of the current router decline this operation
   * @since 4.0.0
   */
  removeVertexAt: function (index) {
    var removedPoint = this.vertices.removeElementAt(index)

    this.start = this.vertices.first().clone()
    this.end = this.vertices.last().clone()

    this.svgPathString = null
    this.repaint()

    if (!this.selectionHandles.isEmpty()) {
      var _this = this
      this.editPolicy.each(function (i, e) {
        if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
          e.onUnselect(_this.canvas, _this)
          e.onSelect(_this.canvas, _this)
        }
      })
    }
    this.fireEvent("change:vertices", {value: this.vertices})

    return removedPoint
  },


  /**
   * @method
   * Set the router for this connection.
   *
   * @param {draw2d.layout.connection.ConnectionRouter} [router] the new router for this connection or null if the connection should use the default routing
   **/
  setRouter: function (router) {
    if (this.router !== null) {
      this.router.onUninstall(this)
    }

    if (typeof router === "undefined" || router === null) {
      this.router = new draw2d.layout.connection.DirectRouter()
    }
    else {
      this.router = router
    }

    this.router.onInstall(this)

    this.routingRequired = true

    // repaint the connection with the new router
    this.repaint()

    this.fireEvent("change:router", {value: this.router})

    return this
  },

  /**
   * @method
   * Return the current active router of this connection.
   *
   * @type draw2d.layout.connection.ConnectionRouter
   **/
  getRouter: function () {
    return this.router
  },

  /**
   * @method
   * Calculate the path of the polyline
   *
   * @param {Object} routingHints some helper attributes for the router
   * @param {Boolean} routingHints.startMoved is true if just the start location has moved
   * @param {Boolean} routingHints.endMoved is true if the destination location has changed
   *
   * @private
   */
  calculatePath: function (routingHints) {
    routingHints = routingHints || {}

    if (this.shape === null) {
      return
    }

    this.svgPathString = null

    routingHints.oldVertices = this.vertices

    // cleanup the routing cache
    //
    this.oldPoint = null
    this.lineSegments = new draw2d.util.ArrayList()
    this.vertices = new draw2d.util.ArrayList()

    // Use the internal router
    //
    this.router.route(this, routingHints)
    this.routingRequired = false
    this.fireEvent("routed")
    this.fireEvent("change:route", {})
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return this
    }

    if (this.svgPathString === null || this.routingRequired === true) {
      this.calculatePath()
    }

    if (typeof attributes === "undefined") {
      attributes = {}
    }
    attributes.path = this.svgPathString
    jsonUtil.ensureDefault(attributes, "stroke-linecap", "round")
    jsonUtil.ensureDefault(attributes, "stroke-linejoin", "round")

    return this._super(attributes)
  },


  /**
   * @method
   * Return all line segments of the polyline.
   *
   * @returns {draw2d.util.ArrayList}
   */
  getSegments: function () {
    return this.lineSegments
  },

  /**
   * @method
   * used for the router to add the calculated points
   *
   * @protected
   *
   **/
  addPoint: function (/*:draw2d.geo.Point*/ p, y) {
    if (typeof y !== "undefined") {
      p = new draw2d.geo.Point(p, y)
    }
    this.vertices.add(p)

    if (this.oldPoint !== null) {
      // store the painted line segment for the "mouse selection test"
      // (required for user interaction)
      this.lineSegments.add({
        start: this.oldPoint,
        end: p
      })
    }
    this.svgPathString = null
    this.oldPoint = p
  },

  /**
   * @method
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
    var result = this._super(x, y, shiftKey, ctrlKey, isFaked)

    if (result === true && isFaked !== true) {
      this.draggedSegment = this.hitSegment(x, y)
    }
    return result
  },

  /**
   * @method
   * Returns the length of the polyline.
   *
   * @return {Number}
   * @since 6.1.43
   **/
  getLength: function () {
    var result = 0
    for (var i = 0; i < this.lineSegments.getSize(); i++) {
      var segment = this.lineSegments.get(i)
      var p1 = segment.start
      var p2 = segment.end
      result += Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
    }
    return result
  },

  setVertices: function (vertices) {
    // inform the router tha the vertices has set outside. This switch some
    // router from full autoroute to half autoroute
    this.router.verticesSet(this)

    this._super(vertices)
  },


  /**
   * @method
   * Returns the projection of the point on the line.
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @return {draw2d.geo.Point}
   **/
  pointProjection: function (px, py) {
    var result = null,
      projection = null,
      p1 = null,
      p2 = null,
      segment = null
    var lastDist = Number.MAX_SAFE_INTEGER
    var pt = new draw2d.geo.Point(px, py)
    for (var i = 0; i < this.lineSegments.getSize(); i++) {
      segment = this.lineSegments.get(i)
      p1 = segment.start
      p2 = segment.end
      projection = draw2d.geo.Line.pointProjection(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y)
      if (projection !== null) {
        var dist = projection.distance(pt)
        if (result == null || dist < lastDist) {
          result = projection
          result.index = i
          lastDist = dist
        }
      }
    }

    if (result !== null) {
      var length = 0
      var segment
      for (var i = 0; i < result.index; i++) {
        segment = this.lineSegments.get(i)
        length += segment.start.distance(segment.end)
      }
      segment = this.lineSegments.get(result.index)
      p1 = segment.start
      p2 = segment.end
      length += p1.distance(p2) * draw2d.geo.Line.inverseLerp(p2.x, p2.y, p1.x, p1.y, result.x, result.y)
      result.percentage = (1.0 / this.getLength()) * length
    }
    return result
  },

  /**
   * @method
   * Returns the point onto the line which has the relative 'percentage' position onto the line.
   *
   * @param {Number} percentage the relative position between [0..1]
   * @returns {draw2d.geo.Point}
   */
  lerp: function (percentage) {
    var length = this.getLength() * percentage
    var lastValidLength = length
    var segment = null, p1 = null, p2 = null
    for (var i = 0; i < this.lineSegments.getSize(); i++) {
      segment = this.lineSegments.get(i)
      p1 = segment.start
      p2 = segment.end
      length = length - p1.distance(p2)
      if (length <= 0) {
        percentage = 1.0 / p1.distance(p2) * lastValidLength
        return new draw2d.geo.Point(p1.x + (p2.x - p1.x) * percentage, p1.y + (p2.y - p1.y) * percentage)
      }
      lastValidLength = length
    }
    return p2
  },

  /**
   * @method
   * get the best segment of the line which is below the given coordinate or null if
   * all segment are not below the coordinate. <br>
   * The 'corona' property of the polyline is considered for this test. This means
   * the point isn't direct on the line. Is it only close to the line!
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @return {Object}
   * @since 4.4.0
   **/
  hitSegment: function (px, py) {
    for (var i = 0; i < this.lineSegments.getSize(); i++) {
      var segment = this.lineSegments.get(i)
      if (draw2d.shape.basic.Line.hit(this.corona + this.stroke, segment.start.x, segment.start.y, segment.end.x, segment.end.y, px, py)) {
        return {index: i, start: segment.start, end: segment.end}
      }
    }
    return null
  },

  /**
   * @method
   * Checks if the hands over coordinate close to the line. The 'corona' property of the polyline
   * is considered for this test. This means the point isn't direct on the line. Is it only close to the
   * line!
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @return {Boolean}
   **/
  hitTest: function (px, py) {
    return this.hitSegment(px, py) !== null
  },

  /**
   * @inheritdoc
   */
  createCommand: function (request) {

    if (request.getPolicy() === draw2d.command.CommandType.DELETE) {
      if (this.isDeleteable() === true) {
        return new draw2d.command.CommandDelete(this)
      }
    }
    else if (request.getPolicy() === draw2d.command.CommandType.MOVE_VERTEX) {
      if (this.isResizeable() === true) {
        return new draw2d.command.CommandMoveVertex(this)
      }
    }
    else if (request.getPolicy() === draw2d.command.CommandType.MOVE_VERTICES) {
      if (this.isResizeable() === true) {
        return new draw2d.command.CommandMoveVertices(this)
      }
    }

    return this._super(request)
  },

  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    var memento = extend(this._super(), {
      router: this.router.NAME,
      radius: this.radius
    })

    memento = this.router.getPersistentAttributes(this, memento)

    return memento
  },

  /**
   * @inheritdoc
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.router !== "undefined") {
      try {
        this.setRouter(eval("new " + memento.router + "()"))
      }
      catch (exc) {
        debug.warn("Unable to install router '" + memento.router + "' forced by " + this.NAME + ".setPersistendAttributes. Using default")
      }
    }

    if (typeof memento.radius !== "undefined") {
      this.setRadius(memento.radius)
    }

    this.router.setPersistentAttributes(this, memento)

    if (this.vertices.getSize() > 1) {
      this.start = this.vertices.first().clone()
      this.end = this.vertices.last().clone()
    }
  }
})
