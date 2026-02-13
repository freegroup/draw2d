import draw2d from '../../packages'


/**
 * @class
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors.
 *
 *
 * @example
 *
 *    // Override the default connection type. This is used during drag&drop operations of ports.
 *    //
 *    let createConnection=function(sourcePort, targetPort){
 *       // return my special kind of connection
 *       let con = new draw2d.Connection();
 *       con.setRouter(new draw2d.layout.connection.ManhattanConnectionRouter());
 *       return con;
 *    };
 *
 *    // Install a special policy into the canvas to use my own implementation of connection
 *    // if we drag&drop a port
 *    //
 *    canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *          createConnection: createConnection
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
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */

draw2d.layout.connection.ManhattanConnectionRouter = draw2d.layout.connection.ConnectionRouter.extend(
  /** @lends draw2d.layout.connection.ManhattanConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.ManhattanConnectionRouter",

  MINDIST: 20,
  TOL: 0.1,
  TOLxTOL: 0.01,
  TOGGLE_DIST: 20,

  /**
   * Creates a new Router object.
   *
   */
  init: function () {
    this._super()
  },


  /**
   *
   * Callback method if the router has been assigned to a connection.
   *
   * @param {draw2d.Connection} connection The assigned connection
   * @since 2.7.2
   */
  onInstall: function (connection) {
    connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy())
  },

  /**
   * @inheritdoc
   */
  route: function (conn, routingHints) {
    let fromPt = conn.getStartPosition()
    let fromDir = conn.getSource().getConnectionDirection(conn.getTarget())

    let toPt = conn.getEndPosition()
    let toDir = conn.getTarget().getConnectionDirection(conn.getSource())

    // calculate the lines between the two points.
    //
    this._route(conn, toPt, toDir, fromPt, fromDir)
    // if the start/end are too close, the router do not route anything at all - shortcut. But for the drawing routine
    // and the later processing, we need at least two points - "start" and "end". we fix this here
    if(conn.getVertices().getSize()<2){
      conn.addPoint(fromPt)
    }
    
    // Ensure perfect orthogonal lines by aligning coordinates
    // Horizontal segments must have identical Y values
    // Vertical segments must have identical X values
    this._normalizeVertices(conn)
    
    this._paint(conn)
  },

  /**
   * Normalize vertices to ensure perfect orthogonal lines.
   * This corrects floating point errors from division operations.
   * Only internal vertices are modified - start and end points remain unchanged
   * to preserve port attachment.
   * 
   * Manhattan routes always alternate between horizontal and vertical segments.
   * We determine the first segment direction from start point and align accordingly.
   * 
   * @private
   * @param {draw2d.Connection} conn
   */
  _normalizeVertices: function(conn) {
    let vertices = conn.getVertices()
    let count = vertices.getSize()
    
    // Need at least 3 vertices to have internal points to correct
    if (count < 3) return
    
    let first = vertices.get(0)
    let second = vertices.get(1)
    
    // Determine if first segment is horizontal or vertical
    let firstSegmentHorizontal = Math.abs(first.x - second.x) > Math.abs(first.y - second.y)
    
    // Iterate only internal vertices (skip first and last)
    for (let i = 1; i < count - 1; i++) {
      let prev = vertices.get(i - 1)
      let curr = vertices.get(i)
      
      // Segments alternate: if first is horizontal, segment 0 is H, segment 1 is V, etc.
      // Segment i-1 connects prev to curr
      let segmentIndex = i - 1
      let isHorizontal = (segmentIndex % 2 === 0) ? firstSegmentHorizontal : !firstSegmentHorizontal
      
      if (isHorizontal) {
        // Horizontal segment: Y must match
        curr.y = prev.y
      } else {
        // Vertical segment: X must match
        curr.x = prev.x
      }
    }
  },

  /**
   *
   * Internal routing algorithm.
   *
   * @private
   * @param {draw2d.Connection} conn
   * @param {draw2d.geo.Point} fromPt
   * @param {Number} fromDir
   * @param {draw2d.geo.Point} toPt
   * @param {Number} toDir
   */
  _route: function (conn, fromPt, fromDir, toPt, toDir) {
    // fromPt is an x,y to start from.
    // fromDir is an angle that the first link must
    //
    let UP = draw2d.geo.Rectangle.DIRECTION_UP
    let RIGHT = draw2d.geo.Rectangle.DIRECTION_RIGHT
    let DOWN = draw2d.geo.Rectangle.DIRECTION_DOWN
    let LEFT = draw2d.geo.Rectangle.DIRECTION_LEFT

    let xDiff = fromPt.x - toPt.x
    let yDiff = fromPt.y - toPt.y
    let point
    let dir
    let pos

    if (((xDiff * xDiff) < (this.TOLxTOL)) && ((yDiff * yDiff) < (this.TOLxTOL))) {
      conn.addPoint(new draw2d.geo.Point(toPt.x, toPt.y))
      return
    }

    if (fromDir === LEFT) {
      if ((xDiff > 0) && ((yDiff * yDiff) < this.TOL) && (toDir === RIGHT)) {
        point = toPt
        dir = toDir
      }
      else {
        if (xDiff < 0) {
          point = new draw2d.geo.Point(fromPt.x - this.MINDIST, fromPt.y)
        }
        else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
          point = new draw2d.geo.Point(toPt.x, fromPt.y)
        }
        else if (fromDir === toDir) {
          pos = Math.min(fromPt.x, toPt.x) - this.MINDIST
          point = new draw2d.geo.Point(pos, fromPt.y)
        }
        else {
          point = new draw2d.geo.Point(fromPt.x - (xDiff / 2), fromPt.y)
        }

        if (yDiff > 0) {
          dir = UP
        }
        else {
          dir = DOWN
        }
      }
    }
    else if (fromDir === RIGHT) {
      if ((xDiff < 0) && ((yDiff * yDiff) < this.TOL) && (toDir === LEFT)) {
        point = toPt
        dir = toDir
      }
      else {
        if (xDiff > 0) {
          point = new draw2d.geo.Point(fromPt.x + this.MINDIST, fromPt.y)
        }
        else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
          point = new draw2d.geo.Point(toPt.x, fromPt.y)
        }
        else if (fromDir === toDir) {
          pos = Math.max(fromPt.x, toPt.x) + this.MINDIST
          point = new draw2d.geo.Point(pos, fromPt.y)
        }
        else {
          point = new draw2d.geo.Point(fromPt.x - (xDiff / 2), fromPt.y)
        }

        if (yDiff > 0) {
          dir = UP
        }
        else {
          dir = DOWN
        }
      }
    }
    else if (fromDir === DOWN) {
      if (((xDiff * xDiff) < this.TOL) && (yDiff < 0) && (toDir === UP)) {
        point = toPt
        dir = toDir
      }
      else {
        if (yDiff > 0) {
          point = new draw2d.geo.Point(fromPt.x, fromPt.y + this.MINDIST)
        }
        else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
          point = new draw2d.geo.Point(fromPt.x, toPt.y)
        }
        else if (fromDir === toDir) {
          pos = Math.max(fromPt.y, toPt.y) + this.MINDIST
          point = new draw2d.geo.Point(fromPt.x, pos)
        }
        else {
          point = new draw2d.geo.Point(fromPt.x, fromPt.y - (yDiff / 2))
        }

        if (xDiff > 0) {
          dir = LEFT
        }
        else {
          dir = RIGHT
        }
      }
    }
    else if (fromDir === UP) {
      if (((xDiff * xDiff) < this.TOL) && (yDiff > 0) && (toDir === DOWN)) {
        point = toPt
        dir = toDir
      }
      else {
        if (yDiff < 0) {
          point = new draw2d.geo.Point(fromPt.x, fromPt.y - this.MINDIST)
        }
        else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
          point = new draw2d.geo.Point(fromPt.x, toPt.y)
        }
        else if (fromDir === toDir) {
          pos = Math.min(fromPt.y, toPt.y) - this.MINDIST
          point = new draw2d.geo.Point(fromPt.x, pos)
        }
        else {
          point = new draw2d.geo.Point(fromPt.x, fromPt.y - (yDiff / 2))
        }

        if (xDiff > 0) {
          dir = LEFT
        }
        else {
          dir = RIGHT
        }
      }
    }
    this._route(conn, point, dir, toPt, toDir)
    conn.addPoint(fromPt)
  }

})
