/**
 * @class draw2d.layout.connection.FanConnectionRouter
 *
 * Automatic router that spreads its  {@link draw2d.Connection Connections} in a fan-like fashion upon collision.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let createConnection=function(){
 *        // return my special kind of connection
 *        let con = new draw2d.Connection({
 *          radius: 14,
 *          router: new draw2d.layout.connection.FanConnectionRouter()
 *        });
 *        return con;
 *     };
 *
 *     // install a custom connection create policy
 *     //
 *     canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *            createConnection: createConnection
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
 *     // second Connection
 *     //
 *     c = createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // third Connection
 *     //
 *     c = createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.layout.connection.DirectRouter
 */
import draw2d from '../../packages'


draw2d.layout.connection.FanConnectionRouter = draw2d.layout.connection.DirectRouter.extend({
  NAME: "draw2d.layout.connection.FanConnectionRouter",

  /**
   * @constructor Creates a new Router object.
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
    connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy())

  },

  /**
   * @method
   * Layout the hands over connection in a manhattan like layout
   *
   * @param {draw2d.Connection}  conn
   * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
   * @param {Object} routingHints some helper attributes for the router
   * @param {Boolean} routingHints.startMoved is true if just the start location has moved
   * @param {Boolean} routingHints.destMoved is true if the destination location has changed
   */
  route: function (conn, routingHints) {
    let lines = conn.getSource().getConnections().clone()
    lines.grep(function (other) {
      return other.getTarget() === conn.getTarget() || other.getSource() === conn.getTarget()
    })

    if (lines.getSize() > 1) {
      this.routeCollision(conn, lines.indexOf(conn))
    }
    else {
      this._super(conn, routingHints)
    }
  },

  /**
   * @method
   * route the connection if connections overlap. Two connections overlap if the combination
   * of source and target anchors are equal.
   *
   * @param {draw2d.Connection} conn
   * @param {Number} index
   */
  routeCollision: function (conn, index) {
    index = index + 1
    let start = conn.getStartPoint()
    let end = conn.getEndPoint()

    let separation = 15

    let midPoint = new draw2d.geo.Point((end.x + start.x) / 2, (end.y + start.y) / 2)
    let position = end.getPosition(start)
    let ray
    if (position == draw2d.geo.PositionConstants.SOUTH || position == draw2d.geo.PositionConstants.EAST) {
      ray = new draw2d.geo.Point(end.x - start.x, end.y - start.y)
    }
    else {
      ray = new draw2d.geo.Point(start.x - end.x, start.y - end.y)
    }

    let length = Math.sqrt(ray.x * ray.x + ray.y * ray.y)

    let xSeparation = separation * ray.x / length
    let ySeparation = separation * ray.y / length

    let bendPoint

    if (index % 2 === 0) {
      bendPoint = new draw2d.geo.Point(midPoint.x + (index / 2) * (-1 * ySeparation), midPoint.y + (index / 2) * xSeparation)
    }
    else {
      bendPoint = new draw2d.geo.Point(midPoint.x + (index / 2) * ySeparation, midPoint.y + (index / 2) * (-1 * xSeparation))
    }

    // required for hit tests
    conn.addPoint(start)
    conn.addPoint(bendPoint)
    conn.addPoint(end)

    // calculate the path string for the SVG rendering
    //
    this._paint(conn)
  }

})
