/**
 * @class draw2d.layout.connection.VertexRouter
 *
 * A Router with unlimited vertices.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection type. This is used during drag&drop operations of ports.
 *     //
 *     let createConnection=function(){
 *        // return my special kind of connection
 *        let con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.VertexRouter());
 *        return con;
 *     };
 *
 *     // Install a special policy into the canvas to use my own implementation of connection
 *     // if we drag&drop a port
 *     //
 *     canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *           createConnection: createConnection
 *     }));
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     let start = new draw2d.shape.node.Start();
 *     let end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     let c = createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
import draw2d from '../../packages'

draw2d.layout.connection.VertexRouter = draw2d.layout.connection.ConnectionRouter.extend({

  NAME: "draw2d.layout.connection.VertexRouter",

  /**
   * @constructor
   * Creates a new Router object
   */
  init: function () {
    this._super()
  },


  /**
   * @method
   * Callback method if the router has been assigned to a connection.
   *
   * @param {draw2d.Connection} connection The assigned connection
   * @template
   * @since 2.7.2
   */
  onInstall: function (connection) {
    connection.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy())
  },

  /**
   * @method
   * Invalidates the given Connection
   */
  invalidate: function () {
  },

  /**
   * @inheritdoc
   */
  route: function (connection, routingHints) {
    // reuse all existing vertex points
    //
    let count = routingHints.oldVertices.getSize()
    for (let i = 0; i < count; i++) {
      connection.addPoint(routingHints.oldVertices.get(i))
    }

    let ps = connection.getVertices()

    // respect the calculated anchor position if the start/end port has set any Anchor impl.
    let startAnchor = connection.getStartPosition(ps.get(1))
    let endAnchor = connection.getEndPosition(ps.get(ps.getSize() - 2))
    ps.first().setPosition(startAnchor)
    ps.last().setPosition(endAnchor)

    this._paint(connection)
  },

  /**
   * @method
   * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
   * the list. The router can send an veto for this.
   * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
   * router is installed.
   *
   * @param {draw2d.Connection} conn
   * @param {Number} index
   *
   * @since 4.2.3
   */
  canRemoveVertexAt: function (conn, index) {
    return false
  },

  /**
   * Callback method for the PolyLine or Connection to verify that a segment is deletable.
   *
   * @param {draw2d.Connection} conn
   * @param {Number} index
   *
   * @returns {Boolean}
   * @since 4.2.3
   */
  canRemoveSegmentAt: function (conn, index) {

    let segmentCount = conn.getVertices().getSize() - 1 // segmentCount is one less than vertex count

    // The first and last segment isn't deletable
    //
    if ((index <= 0) || (index >= segmentCount)) {
      return false
    }

    // a connection need at least one strokes
    //
    return (segmentCount >= 2)
  },


  /**
   * @method
   * Tweak or enrich the polyline persistence data with routing information
   *
   * @since 2.10.0
   * @param {draw2d.shape.basic.PolyLine} line
   * @param {Object} memento The memento data of the polyline
   *
   * @returns {Object}
   */
  getPersistentAttributes: function (line, memento) {
    memento.vertex = []

    line.getVertices().each(function (i, e) {
      memento.vertex.push({x: e.x, y: e.y})
    })

    return memento
  },

  /**
   * @method
   * set the attributes for the polyline with routing information
   *
   * @since 2.10.0
   * @param {Object} memento
   */
  setPersistentAttributes: function (line, memento) {
    // restore the points from the JSON data and add them to the polyline
    //
    if (Array.isArray(memento.vertex) && memento.vertex.length > 1) {

      line.oldPoint = null
      line.lineSegments = new draw2d.util.ArrayList()

      line.setVertices(memento.vertex)
    }
  },

  /**
   * @method
   *
   * The draw2d.Connection delegates the drag operation to the router. The router can
   * handle the different constraints of the connection and just drag&drop a single segment
   * instead of the complete connection.
   *
   * @param {draw2d.shape.basic.Line} line the related line to handle
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   *
   * @since 6.1.0
   */
  onDrag: function (line, dx, dy, dx2, dy2) {
    let count = line.getVertices().getSize() - 1
    for (let i = 1; i < count; i++) {
      line.getVertex(i).translate(dx2, dy2)
    }
  }

})
