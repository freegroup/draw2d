import draw2d from '../../packages'


/**
 * @class
 *
 * Orthogonal router for circuit/schematic diagrams.
 *
 * - **Bridge (arc):** drawn at crossings where connections have NO shared ports
 * - **Vertex (dot):** drawn at crossings where connections share a source or target port
 *
 * Use {@link draw2d.layout.connection.ManhattanBridgedConnectionRouter} if you only need bridges.
 *
 *
 * @example
 *
 *    let createConnection=function(){
 *       let con = new draw2d.Connection();
 *       con.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
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
 *    let f1 = new draw2d.shape.analog.OpAmp({x:10, y:10});
 *    let f2 = new draw2d.shape.analog.ResistorVertical({angle:90, height:20, x:300, y:150});
 *    let f3 = new draw2d.shape.analog.ResistorVertical({x:250, y:70});
 *    let f4 = new draw2d.shape.analog.ResistorVertical({x:10, y:90});
 *
 *    // ...add it to the canvas
 *    //
 *    canvas.add( f1);
 *    canvas.add( f2);
 *    canvas.add( f3);
 *    canvas.add( f4);
 *
 *    // first Connection
 *    //
 *    let c = createConnection();
 *    c.setSource(f1.getOutputPort(0));
 *    c.setTarget(f2.getHybridPort(0));
 *    canvas.add(c);
 *
 *    // second Connection between the other resistors
 *    //
 *    c = createConnection();
 *    c.setSource(f3.getHybridPort(1));
 *    c.setTarget(f4.getHybridPort(0));
 *    canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */

draw2d.layout.connection.CircuitConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend(
  /** @lends draw2d.layout.connection.CircuitConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.CircuitConnectionRouter",

  /**
   * Creates a new Router object.
   *
   */
  init: function () {
    this._super()
    this.setBridgeRadius(5)
    this.setVertexRadius(3)

    // experimental
    this.abortRoutingOnFirstVertexNode = false
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
   * Callback method if the router has been removed from the connection. In the case of the CircuitRouter
   * all vertex nodes will be removed from the canvas.
   *
   * @param {draw2d.Connection} connection The related connection
   * @template
   * @since 2.7.2
   */
  onUninstall: function (connection) {
    if (typeof connection.vertexNodes !== "undefined" && connection.vertexNodes !== null) {
      connection.vertexNodes.remove()
      delete connection.vertexNodes
    }
    // Clean up the bridge invalidation flag to avoid stale state when router is changed
    delete connection._bridgesInvalidated
  },

  /**
   * 
   * Set the radius of the vertex circle.
   *
   * @param {Number} radius
   */
  setVertexRadius: function (radius) {
    this.vertexRadius = radius

    return this
  },
  /** deprecated
   * @private
   * **/
  setJunctionRadius: function (radius) {
    this.vertexRadius = radius
  },

  /**
   * 
   * Set the radius or span of the bridge. A bridge will be drawn if two connections are crossing and didn't have any
   * common port.
   *
   * @param {Number} radius the radius of the arc in pixels
   * @returns {this}
   */
  setBridgeRadius: function (radius) {
    this.bridgeRadius = radius
    
    // Horizontal arcs (for horizontal line segments)
    // bridge_LR: Arc when line goes left-to-right, arc curves upward
    // bridge_RL: Arc when line goes right-to-left, arc curves upward
    this.bridge_LR = [" r", 0.5, -0.5, radius - (radius / 2), -(radius - radius / 4), radius, -radius, radius + (radius / 2), -(radius - radius / 4), radius * 2, "0 "].join(" ")
    this.bridge_RL = [" r", -0.5, -0.5, -(radius - (radius / 2)), -(radius - radius / 4), -radius, -radius, -(radius + (radius / 2)), -(radius - radius / 4), -radius * 2, "0 "].join(" ")
    
    // Vertical arcs (for vertical line segments)
    // The arc should curve AWAY from the crossing line (to the right when going down)
    // bridge_TB: Arc when line goes top-to-bottom, arc curves to the right
    // bridge_BT: Arc when line goes bottom-to-top, arc curves to the right  
    this.bridge_TB = [" r", (radius - radius / 4), 0.5, radius, radius - (radius / 2), radius, radius, (radius - radius / 4), radius + (radius / 2), "0 ", radius * 2].join(" ")
    this.bridge_BT = [" r", (radius - radius / 4), -0.5, radius, -(radius - (radius / 2)), radius, -radius, (radius - radius / 4), -(radius + (radius / 2)), "0 ", -radius * 2].join(" ")

    return this
  },

  /**
   * @inheritdoc
   */
  route: function (conn, routingHints) {
    let fromPt = conn.getStartPoint()
    let fromDir = conn.getSource().getConnectionDirection(conn.getTarget())

    let toPt = conn.getEndPoint()
    let toDir = conn.getTarget().getConnectionDirection(conn.getSource())

    // calculate the lines between the two points with the standard ManhattanRouter.
    //
    this._route(conn, toPt, toDir, fromPt, fromDir)

    // Ensure perfect orthogonal lines by normalizing internal vertices
    // This corrects any floating point errors from division operations in _route()
    this._normalizeVertices(conn)

    // Get the intersections to the other connections.
    // During drag operations, the intersection data is stale because
    // calculateConnectionIntersection() is only called on mouseup. To prevent
    // "ghost bridges" from appearing at old intersection positions, we skip
    // bridge drawing entirely while ANY figure/connection is being moved.
    // The bridge may be on a stationary horizontal line crossed by a moving vertical line.
    //
    let canvas = conn.getCanvas()
    let anyFigureMoving = canvas.mouseDown === true
    
    // If dragging started, invalidate crossing connections so they redraw without bridges
    if (anyFigureMoving && !conn._bridgesInvalidated) {
      conn._bridgesInvalidated = true
      canvas.lineIntersections.each((i, entry) => {
        if (entry.line === conn && entry.other !== conn) {
          entry.other.svgPathString = null
          entry.other.repaint()
        }
      })
    } else if (!anyFigureMoving) {
      conn._bridgesInvalidated = false
    }
    
    let intersectionsASC = anyFigureMoving 
      ? new draw2d.util.ArrayList() 
      : canvas.getIntersection(conn).sort("x")
    let intersectionsDESC = intersectionsASC.clone().reverse()

    let intersectionForCalc = intersectionsASC

    // add a ArrayList of all added vertex nodes to the connection
    //
    if (typeof conn.vertexNodes !== "undefined" && conn.vertexNodes !== null) {
      conn.vertexNodes.remove()
    }
    conn.vertexNodes = conn.canvas.paper.set()

    // ATTENTION: we cast all x/y coordinates to integer and add 0.5 to avoid subpixel rendering of
    //            the connection. The 1px or 2px lines look much clearer than before.
    //
    let ps = conn.getVertices()
    let p = ps.get(0)
    let path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5]

    let oldP = p
    let bridgeWidth = null
    let bridgeCode = null

    let lastVertexNode = null

    for (let i = 1; i < ps.getSize(); i++) {
      p = ps.get(i)

      // line goes from right->left.
      if (oldP.x > p.x) {
        intersectionForCalc = intersectionsDESC
        bridgeCode = this.bridge_RL
        bridgeWidth = -this.bridgeRadius
      }
      // line goes from left->right
      else {
        intersectionForCalc = intersectionsASC
        bridgeCode = this.bridge_LR
        bridgeWidth = this.bridgeRadius
      }

      // add a bridge or a vertex node depending to the intersection connection
      //
      // bridge   => the connections didn't have a common port
      // vertex => the connections did have a common source or target port
      //
      intersectionForCalc.each((ii, interP) => {
        if (draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {

          // It is a vertex node..
          //
          if (conn.sharingPorts(interP.other)) {
            let other = interP.other
            let otherZ = other.getZOrder()
            let connZ = conn.getZOrder()
            if (connZ < otherZ) {
              let vertexNode = conn.canvas.paper.ellipse(interP.x, interP.y, this.vertexRadius, this.vertexRadius).attr({fill: conn.lineColor.rgba()})
              conn.vertexNodes.push(vertexNode)
              // we found a vertex node. In this case an already existing connection did draw the connection.
              //
              if (this.abortRoutingOnFirstVertexNode === true) {
                if (conn.getSource() === other.getSource() || conn.getSource() === other.getTarget()) {
                  path = ["M", (interP.x | 0) + 0.5, " ", (interP.y | 0) + 0.5]
                  if (lastVertexNode !== null) {
                    lastVertexNode.remove()
                    conn.vertexNodes.exclude(lastVertexNode)
                  }
                }
                lastVertexNode = vertexNode
              }
            }
          }
          // ..or a bridge. The connection with the HIGHER z-index draws the arc.
          // This ensures the arc is always rendered on top of the crossing line.
          // 
          // IMPORTANT: We use integer truncation (| 0) for coordinate comparison because:
          // - The path rendering adds +0.5 to coordinates for crisp subpixel rendering (anti-aliasing)
          // - The intersection calculation returns original integer coordinates
          // - Without truncation, 303.5 !== 303 would fail even though they represent the same line
          //
          else {
            let other = interP.other
            let otherZ = other.getZOrder()
            let connZ = conn.getZOrder()
            
            // Only draw the arc if THIS connection has the higher z-index
            // This ensures the arc is always on top of the crossing line
            if (connZ > otherZ) {
              let isHorizontalSegment = (oldP.y | 0) === (p.y | 0)
              let isVerticalSegment = (oldP.x | 0) === (p.x | 0)
              let r = this.bridgeRadius
              
              // The arc is centered on the intersection point (interP.x, interP.y)
              // We draw from (interP - radius) to (interP + radius)
              
              if (isHorizontalSegment) {
                // Horizontal segment: draw arc that curves upward, centered on intersection
                // Line to start of arc (radius before intersection)
                let startX = ((interP.x - r) | 0) + 0.5
                let y = (interP.y | 0) + 0.5
                let endX = ((interP.x + r) | 0) + 0.5
                
                // SVG arc: a rx ry x-rotation large-arc sweep-flag dx dy
                // sweep-flag=1 means clockwise (arc goes upward for left-to-right)
                path.push(" L", startX, " ", y)
                path.push(" a", r, " ", r, " 0 0 1 ", (r * 2), " 0")
              }
              else if (isVerticalSegment) {
                // Vertical segment: draw arc that curves to the right, centered on intersection
                // Line to start of arc (radius before intersection)
                let x = (interP.x | 0) + 0.5
                let startY = ((interP.y - r) | 0) + 0.5
                let endY = ((interP.y + r) | 0) + 0.5
                
                // For top-to-bottom: arc curves to the right (sweep=1)
                // For bottom-to-top: arc curves to the right (sweep=0, going upward)
                if (oldP.y < p.y) {
                  // Top to bottom
                  path.push(" L", x, " ", startY)
                  path.push(" a", r, " ", r, " 0 0 1 0 ", (r * 2))
                } else {
                  // Bottom to top
                  path.push(" L", x, " ", ((interP.y + r) | 0) + 0.5)
                  path.push(" a", r, " ", r, " 0 0 1 0 ", (-r * 2))
                }
              }
            }
          }
        }
      })

      path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5)
      oldP = p
    }
    conn.svgPathString = path.join("")
  }
})
