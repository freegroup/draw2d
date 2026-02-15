import draw2d from '../../packages'

/**
 * @class
 * Combines the interactive segment manipulation of {@link draw2d.layout.connection.InteractiveManhattanConnectionRouter}
 * with the bridge drawing capability of {@link draw2d.layout.connection.ManhattanBridgedConnectionRouter}.
 *
 * This router allows users to manually adjust connection segments by dragging them, while also
 * drawing bridges (arcs) where connections cross other connections.
 *
 * @example
 *
 *    let createConnection = function() {
 *       let con = new draw2d.Connection({
 *         radius: 4,
 *         router: new draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter()
 *       });
 *       return con;
 *    };
 *
 *    // install a custom connection create policy
 *    canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
 *           createConnection: createConnection
 *    }));
 *
 *    // create and add two nodes which contains Ports (In and OUT)
 *    let start = new draw2d.shape.node.Start();
 *    let end   = new draw2d.shape.node.End();
 *
 *    canvas.add(start, 50, 50);
 *    canvas.add(end, 230, 80);
 *
 *    let c = createConnection();
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *    canvas.add(c);
 *
 *    // select the connection to show the segment handles
 *    c.select();
 *
 * @author Andreas Herz
 * @since 7.0.0
 * @extends draw2d.layout.connection.InteractiveManhattanConnectionRouter
 */

draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter = draw2d.layout.connection.InteractiveManhattanConnectionRouter.extend(
  /** @lends draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter",

  /**
   * Creates a new Router object.
   *
   * @param {Object} [attr] optional attributes for the router
   * @param {Number} [attr.bridgeRadius=5] the radius of the bridge arc in pixels
   * @param {Object} [setter] optional key/value map of injected setter-methods
   * @param {Object} [getter] optional key/value map of injected getter-methods
   */
  init: function (attr, setter, getter) {
    this._super(
      {
        bridgeRadius: 5,
        ...attr
      },
      {
        bridgeRadius: this.setBridgeRadius,
        ...setter
      },
      {
        bridgeRadius: this.getBridgeRadius,
        ...getter
      }
    )
  },

  /**
   * Get the bridge radius.
   *
   * @returns {Number}
   */
  getBridgeRadius: function () {
    return this.bridgeRadius
  },

  /**
   * @inheritdoc
   */
  onInstall: function (conn) {
    this._super(conn)
  },

  /**
   * @inheritdoc
   */
  onUninstall: function (conn) {
    this._super(conn)
    // Clean up the bridge invalidation flag to avoid stale state when router is changed
    delete conn._bridgesInvalidated
  },

  /**
   * Set the radius of the bridge arc.
   *
   * @param {Number} radius the radius of the arc in pixels
   * @returns {this}
   */
  setBridgeRadius: function (radius) {
    this.bridgeRadius = radius
    return this
  },

  /**
   * @inheritdoc
   */
  route: function (conn, routingHints) {
    // First, let the parent router do the routing (handles interactive manipulation)
    this._super(conn, routingHints)
    
    // Then override the svgPathString to add bridges
    this._paintWithBridges(conn)
  },

  /**
   * Override the paint method to draw bridges at connection intersections
   * 
   * @param {draw2d.Connection} conn
   * @private
   */
  _paintWithBridges: function (conn) {
    let canvas = conn.getCanvas()
    if (!canvas) return
    
    let anyFigureMoving = canvas.mouseDown === true
    
    // Cache invalidation: suppress bridges during drag, redraw all after drag ends
    if (anyFigureMoving) {
      if (!conn._bridgesInvalidated) {
        conn._bridgesInvalidated = true
        // Invalidate all connections during drag
        canvas.getLines().each((i, line) => {
          line.svgPathString = null
          line.repaint()
        })
      }
    } else if (conn._bridgesInvalidated) {
      // Drag just ended - reset flag and redraw all connections
      conn._bridgesInvalidated = false
      canvas.getLines().each((i, line) => {
        line.svgPathString = null
        line.repaint()
      })
    }
    
    let allIntersections = anyFigureMoving 
      ? new draw2d.util.ArrayList() 
      : canvas.getIntersection(conn)

    // Filter out duplicate/near intersections (overlapping connections)
    let uniqueIntersections = new draw2d.util.ArrayList()
    let seenPositions = new Set()
    let tolerance = 3
    
    allIntersections.each((i, interP) => {
      let isDuplicate = false
      uniqueIntersections.each((j, seenP) => {
        let dx = Math.abs(interP.x - seenP.x)
        let dy = Math.abs(interP.y - seenP.y)
        if (dx < tolerance && dy < tolerance) {
          isDuplicate = true
          return false
        }
      })
      if (!isDuplicate) {
        uniqueIntersections.add(interP)
      }
    })
    
    allIntersections = uniqueIntersections

    // Only invalidate if we have intersections
    if (allIntersections.getSize() > 0) {
      conn.svgPathString = null
    }

    // ATTENTION: we cast all x/y coordinates to int and add 0.5 to avoid subpixel rendering of
    //            the connection. The 1px or 2px lines look much clearer than before.
    //
    let ps = conn.getVertices()
    let p = ps.get(0)
    let path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5]
    let oldP = p
    let r = this.bridgeRadius
    
    for (let i = 1; i < ps.getSize(); i++) {
      p = ps.get(i)

      // Collect intersections on this segment and remove from allIntersections
      let segmentIntersections = []
      let remainingIntersections = new draw2d.util.ArrayList()
      
      allIntersections.each((ii, interP) => {
        if (interP.justTouching === false && draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
          segmentIntersections.push(interP)
        } else {
          remainingIntersections.add(interP)
        }
      })
      
      allIntersections = remainingIntersections
      
      // Determine segment direction once
      let isHorizontalSegment = (oldP.y | 0) === (p.y | 0)
      
      // Sort by position along segment
      if (isHorizontalSegment) {
        if (oldP.x < p.x) {
          segmentIntersections.sort((a, b) => a.x - b.x)
        } else {
          segmentIntersections.sort((a, b) => b.x - a.x)
        }
      } else {
        if (oldP.y < p.y) {
          segmentIntersections.sort((a, b) => a.y - b.y)
        } else {
          segmentIntersections.sort((a, b) => b.y - a.y)
        }
      }

      // Process each intersection
      segmentIntersections.forEach((interP) => {
        let other = interP.other
        let otherZ = other.getZOrder()
        let connZ = conn.getZOrder()
        
        if (connZ > otherZ) {
            
            // The arc is centered on the intersection point (interP.x, interP.y)
            // We draw from (interP - radius) to (interP + radius)
            
            if (isHorizontalSegment) {
              // Horizontal segment: draw arc that ALWAYS curves upward
              // regardless of line direction (left-to-right or right-to-left)
              let y = (interP.y | 0) + 0.5
              
              if (oldP.x < p.x) {
                // Left to right: line, gap, arc, gap
                let startX = ((interP.x - r) | 0) + 0.5
                let endX = ((interP.x + r) | 0) + 0.5
                path.push(" L", startX, " ", y)
                path.push(" a", r, " ", r, " 0 0 1 ", (r * 2), " 0")
                path.push(" M", endX, " ", y)
              } else {
                // Right to left: line, gap, arc, gap
                let startX = ((interP.x + r) | 0) + 0.5
                let endX = ((interP.x - r) | 0) + 0.5
                path.push(" L", startX, " ", y)
                path.push(" a", r, " ", r, " 0 0 0 ", -(r * 2), " 0")
                path.push(" M", endX, " ", y)
              }
            }
            else {
              // Vertical segment: draw arc that curves to the right
              let x = (interP.x | 0) + 0.5
              
              if (oldP.y < p.y) {
                // Top to bottom: line, gap, arc, gap
                let startY = ((interP.y - r) | 0) + 0.5
                let endY = ((interP.y + r) | 0) + 0.5
                path.push(" L", x, " ", startY)
                path.push(" a", r, " ", r, " 0 0 1 0 ", (r * 2))
                path.push(" M", x, " ", endY)
              } else {
                // Bottom to top: line, gap, arc, gap
                let startY = ((interP.y + r) | 0) + 0.5
                let endY = ((interP.y - r) | 0) + 0.5
                path.push(" L", x, " ", startY)
                path.push(" a", r, " ", r, " 0 0 0 0 ", -(r * 2))
                path.push(" M", x, " ", endY)
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