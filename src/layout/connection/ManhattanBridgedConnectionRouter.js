import draw2d from '../../packages'


/**
 * @class
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors. Draws a bridge (arc) where connections cross.
 *
 * The connection with the HIGHER z-index draws the arc, ensuring the bridge is always
 * rendered on top of the crossing line. Supports both horizontal and vertical bridges.
 *
 * Use {@link draw2d.layout.connection.CircuitConnectionRouter} if you need vertex dots
 * at crossings with shared ports (typical for circuit diagrams).
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */

draw2d.layout.connection.ManhattanBridgedConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend(
  /** @lends draw2d.layout.connection.ManhattanBridgedConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.ManhattanBridgedConnectionRouter",

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
   * Callback method if the router has been removed from the connection.
   *
   * @param {draw2d.Connection} connection The related connection
   * @template
   * @since 2.7.2
   */
  onUninstall: function (connection) {
    // Clean up the bridge invalidation flag to avoid stale state when router is changed
    delete connection._bridgesInvalidated
  },

  /**
   * 
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
  route: function (conn, routingHints) {
    let fromPt = conn.getStartPoint()
    let fromDir = conn.getSource().getConnectionDirection(conn.getTarget())

    let toPt = conn.getEndPoint()
    let toDir = conn.getTarget().getConnectionDirection(conn.getSource())

    // calculate the lines between the two points.
    //
    this._route(conn, toPt, toDir, fromPt, fromDir)
    // if the start/end are too close, the router do not route anything at all - shortcut. But for the drawing routine
    // and the later processing, we need at least two points - "start" and "end". we fix this here
    if(conn.getVertices().getSize()<2){
      conn.addPoint(fromPt)
    }

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

    // Filter out duplicate/near intersections ONCE (happens when multiple connections overlap)
    // Use tolerance-based comparison instead of rounding to catch all near-duplicates
    let uniqueIntersections = new draw2d.util.ArrayList()
    let tolerance = 3  // pixels - intersections closer than this are considered duplicates
    
    allIntersections.each((i, interP) => {
      let isDuplicate = false
      
      // Check if this intersection is too close to any already seen intersection
      uniqueIntersections.each((j, seenP) => {
        let dx = Math.abs(interP.x - seenP.x)
        let dy = Math.abs(interP.y - seenP.y)
        
        if (dx < tolerance && dy < tolerance) {
          isDuplicate = true
          return false  // break out of loop
        }
      })
      
      if (!isDuplicate) {
        uniqueIntersections.add(interP)
      }
    })
    
    allIntersections = uniqueIntersections

    // Always invalidate to ensure fresh rendering (z-order can change via selection/reordering)
    conn.svgPathString = null

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

      // Collect intersections on this segment and remove them from allIntersections
      // This improves performance for subsequent segments
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
      
      // Determine segment direction once (will be reused for sorting and bridge drawing)
      let isHorizontalSegment = (oldP.y | 0) === (p.y | 0)
      
      // Sort intersections by their position along the segment direction
      if (isHorizontalSegment) {
        // Horizontal: sort by X (ascending if left->right, descending if right->left)
        if (oldP.x < p.x) {
          segmentIntersections.sort((a, b) => a.x - b.x)
        } else {
          segmentIntersections.sort((a, b) => b.x - a.x)
        }
      } else {
        // Vertical: sort by Y (ascending if top->bottom, descending if bottom->top)
        if (oldP.y < p.y) {
          segmentIntersections.sort((a, b) => a.y - b.y)
        } else {
          segmentIntersections.sort((a, b) => b.y - a.y)
        }
      }

      // Process each intersection in order along the segment
      segmentIntersections.forEach((interP) => {
        let other = interP.other
        let otherZ = other.getZOrder()
        let connZ = conn.getZOrder()
        
        // Only draw the arc if THIS connection has the higher z-index
        // This ensures the arc is always on top of the crossing line
        if (connZ > otherZ) {
            
            // Round intersection coordinates consistently with Line.intersection() which uses (| 0)
            let interX = (interP.x | 0) + 0.5
            let interY = (interP.y | 0) + 0.5
            
            if (isHorizontalSegment) {
              // Horizontal segment: draw arc that ALWAYS curves upward
              // regardless of line direction (left-to-right or right-to-left)
              let y = interY
              
              if (oldP.x < p.x) {
                // Left to right: line, gap, arc, gap
                let startX = ((interP.x - r) | 0) + 0.5
                let endX = ((interP.x + r) | 0) + 0.5
                path.push(" L", startX, " ", y)
                path.push(" a", r, " ", r, " 0 0 1 ", (r * 2), " 0")
                path.push(" M", endX, " ", y)  // Move creates gap after arc
              } else {
                // Right to left: line, gap, arc, gap
                let startX = ((interP.x + r) | 0) + 0.5
                let endX = ((interP.x - r) | 0) + 0.5
                path.push(" L", startX, " ", y)
                path.push(" a", r, " ", r, " 0 0 0 ", -(r * 2), " 0")
                path.push(" M", endX, " ", y)  // Move creates gap after arc
              }
            }
            else {
              // Vertical segment: draw arc that ALWAYS curves to the right
              // regardless of line direction (top-to-bottom or bottom-to-top)
              let x = interX
              
              if (oldP.y < p.y) {
                // Top to bottom: line, gap, arc, gap
                let startY = ((interP.y - r) | 0) + 0.5
                let endY = ((interP.y + r) | 0) + 0.5
                path.push(" L", x, " ", startY)
                path.push(" a", r, " ", r, " 0 0 1 0 ", (r * 2))
                path.push(" M", x, " ", endY)  // Move creates gap after arc
              } else {
                // Bottom to top: line, gap, arc, gap
                let startY = ((interP.y + r) | 0) + 0.5
                let endY = ((interP.y - r) | 0) + 0.5
                path.push(" L", x, " ", startY)
                path.push(" a", r, " ", r, " 0 0 0 0 ", -(r * 2))
                path.push(" M", x, " ", endY)  // Move creates gap after arc
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