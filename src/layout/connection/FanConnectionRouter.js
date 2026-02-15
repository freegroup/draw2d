import draw2d from '../../packages'


/**
 * @class
 *
 * Automatic router that spreads its  {@link draw2d.Connection Connections} in a fan-like fashion upon collision.
 *
 *
 * @example
 *
 *    let createConnection=function(){
 *       // return my special kind of connection
 *       let con = new draw2d.Connection({
 *         radius: 14,
 *         router: new draw2d.layout.connection.FanConnectionRouter()
 *       });
 *       return con;
 *    };
 *
 *    // install a custom connection create policy
 *    //
 *    canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *           createConnection: createConnection
 *    }));
 *
 *    // create and add two nodes which contains Ports (In and OUT)
 *    //
 *    let start = new draw2d.shape.node.Start();
 *    let end   = new draw2d.shape.node.End();

 *    // ...add it to the canvas
 *    canvas.add( start, 50,50);
 *    canvas.add( end, 230,80);
 *
 *    // first Connection
 *    //
 *    let c = createConnection();
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *    canvas.add(c);
 *
 *    // second Connection
 *    //
 *    c = createConnection();
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *    canvas.add(c);
 *
 *    // third Connection
 *    //
 *    c = createConnection();
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *    canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.layout.connection.DirectRouter
 */

draw2d.layout.connection.FanConnectionRouter = draw2d.layout.connection.DirectRouter.extend(
  /** @lends draw2d.layout.connection.FanConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.FanConnectionRouter",

  /**
   * Creates a new Router object.
   *
   * @param {Object} [attr] optional attributes for the router
   * @param {Object} [setter] optional key/value map of injected setter-methods
   * @param {Object} [getter] optional key/value map of injected getter-methods
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * 
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
   * 
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
    lines.grep( other => other.getTarget() === conn.getTarget() || other.getSource() === conn.getTarget())

    if (lines.getSize() > 1) {
      this.routeCollision(conn, lines.indexOf(conn), lines.getSize())
    }
    else {
      this._super(conn, routingHints)
    }
  },

  /**
   * 
   * route the connection if connections overlap. Two connections overlap if the combination
   * of source and target anchors are equal.
   *
   * @param {draw2d.Connection} conn
   * @param {Number} index
   * @param {Number} count Total number of overlapping connections
   */
  routeCollision: function (conn, index, count) {
    let start = conn.getStartPoint()
    let end = conn.getEndPoint()

    let separation = 15

    // Calculate the midpoint between start and end - this is where the bend will be centered
    let midPoint = new draw2d.geo.Point((end.x + start.x) / 2, (end.y + start.y) / 2)
    
    // Determine the relative position of end point to start point
    // This is used to ensure consistent fan direction regardless of connection direction
    let position = end.getPosition(start)
    
    // Calculate the direction vector (ray) from start to end
    // We flip the direction for NORTH/WEST positions to ensure the fan always spreads
    // in a consistent direction (perpendicular to the connection line)
    let ray
    if (position === draw2d.geo.PositionConstants.SOUTH || position === draw2d.geo.PositionConstants.EAST) {
      ray = new draw2d.geo.Point(end.x - start.x, end.y - start.y)
    }
    else {
      ray = new draw2d.geo.Point(start.x - end.x, start.y - end.y)
    }

    // Normalize the ray vector to unit length
    // This gives us a direction vector with length 1
    let length = Math.sqrt(ray.x * ray.x + ray.y * ray.y)

    // Calculate the perpendicular offset components
    // The separation is applied perpendicular to the connection line:
    // - xSeparation and ySeparation represent the normalized direction vector
    // - When applied with (-ySeparation, +xSeparation), we get a perpendicular vector
    //   (rotating 90 degrees counterclockwise)
    let xSeparation = separation * ray.x / length
    let ySeparation = separation * ray.y / length

    let bendPoint

    // Symmetric distribution: spread connections evenly around the midpoint
    // For count=2: offsets are -0.5, +0.5 (both equally distant from center)
    // For count=3: offsets are -1, 0, +1 (center one on midline)
    // For count=4: offsets are -1.5, -0.5, +0.5, +1.5
    let offset = index - (count - 1) / 2

    bendPoint = new draw2d.geo.Point(
      midPoint.x + offset * (-ySeparation), 
      midPoint.y + offset * xSeparation
    )

    // required for hit tests
    conn.addPoint(start)
    conn.addPoint(bendPoint)
    conn.addPoint(end)

    // calculate the path string for the SVG rendering
    //
    this._paint(conn)
  }

})
