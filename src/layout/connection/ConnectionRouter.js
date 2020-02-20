import draw2d from '../../packages'


/**
 * @class
 * Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */

draw2d.layout.connection.ConnectionRouter = Class.extend(
  /** @lends draw2d.layout.connection.ConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.ConnectionRouter",

  /**
   * Creates a new Router object
   */
  init: function () {
  },


  /**
   *
   * Routes the Connection.
   *
   * @param {draw2d.Connection} connection The Connection to route
   * @param {Object} [routingHints] some helper attributes for the router
   * @param {Boolean} [routingHints.startMoved] is true if just the start location has moved
   * @param {Boolean} [routingHints.endMoved] is true if the destination location has changed
   * @param {draw2d.util.ArrayList} [routingHints.oldVertices] the vertices before the reroute has been triggered
   *
   * @template
   */
  route: function (connection, routingHints) {
    throw "subclasses must implement the method [ConnectionRouter.route]"
  },

  _paint: function (conn) {
    // calculate the path string for the SVG rendering
    // Important: to avoid subpixel error rendering we add 0.5 to each coordinate
    //            With this offset the canvas can paint the line on a "full pixel" instead
    //            of subpixel rendering.
//    let adjust = val => (val| 0) +0.5
    let adjust = val => val

    let ps = conn.getVertices()
    let p = ps.get(0)
    let radius = conn.getRadius()
    let path = ["M", adjust(p.x), " ", adjust(p.y)]
    let i = 1
    let length, inset, p2
    if (radius > 0) {
      let lastP = p
      length = (ps.getSize() - 1)
      for (; i < length; i++) {
        p = ps.get(i)
        inset = draw2d.geo.Util.insetPoint(p, lastP, radius)
        path.push("L", adjust(inset.x), ",", adjust(inset.y))

        p2 = ps.get(i + 1)
        inset = draw2d.geo.Util.insetPoint(p, p2, radius)

        path.push("Q", p.x, ",", p.y, " ", adjust(inset.x), ", ", adjust(inset.y))
        lastP = p
      }
      p = ps.get(i)
      path.push("L", adjust(p.x), ",", adjust(p.y))
    }
    else {
      length = ps.getSize()
      for (; i < length; i++) {
        p = ps.get(i)
        path.push("L", adjust(p.x), ",", adjust(p.y))
      }
    }
    conn.svgPathString = path.join("")
  },


  /**
   *
   * Callback method if the router has been assigned to a connection.
   *
   * @param {draw2d.shape.basic.PolyLine} connection The assigned connection
   * @template
   * @since 2.7.2
   */
  onInstall: function (connection) {
  },

  /**
   *
   * Callback method if the router has been removed from the connection.
   *
   * @param {draw2d.shape.basic.PolyLine} connection The related connection
   * @template
   * @since 2.7.2
   */
  onUninstall: function (connection) {
  },

  /**
   *
   * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
   * the list. The router can send an veto for this.
   * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
   * router is installed.
   *
   * @param {Number} index
   * @since 4.2.3
   */
  canRemoveVertexAt: function (index) {
    return false
  },

  /**
   * Callback method for the PolyLine or Connection to verify that a segment is deletable.
   *
   * @param {Number} index
   * @returns {Boolean}
   * @since 4.2.3
   */
  canRemoveSegmentAt: function (index) {
    return false
  },

  /**
   *
   * Tweak or enrich the polyline persistence data with routing information
   *
   * @since 2.10.0
   * @param {draw2d.shape.basic.PolyLine} line
   * @param {Object} memento The memento data of the polyline
   * @returns {Object}
   */
  getPersistentAttributes: function (line, memento) {
    return memento
  },

  /**
   *
   * set the attributes for the polyline with routing information
   *
   * @since 2.10.0
   * @param {draw2d.shape.basic.Line} line
   * @param {Object} memento the JSON data to read
   */
  setPersistentAttributes: function (line, memento) {
  },

  /**
   *
   *
   * The draw2d.Connection delegates the drag operation to the router. The router can
   * handle the different constraints of the connection.
   *
   * @param {draw2d.shape.basic.Line} line
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   */
  onDrag: function (line, dx, dy, dx2, dy2) {
  },

  /**
   *
   * Called by the connection if the vertices set outside.
   * This enforce the router to avoid full autoroute. E.g. InteractiveManhattanRouter
   *
   * @protected
   * @param {draw2d.shape.basic.Line} line
   */
  verticesSet: function (line) {
  }

})
