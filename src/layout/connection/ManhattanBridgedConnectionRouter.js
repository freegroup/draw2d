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
   */
  init: function () {
    this._super()
    this.bridgeRadius = 5
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

      // line goes from right->left. Inverse the intersection order
      if (oldP.x > p.x) {
        intersectionForCalc = intersectionsDESC
      } else {
        intersectionForCalc = intersectionsASC
      }

      intersectionForCalc.each((ii, interP) => {
        if (interP.justTouching === false && draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
          
          let other = interP.other
          let otherZ = other.getZOrder()
          let connZ = conn.getZOrder()
          
          // Only draw the arc if THIS connection has the higher z-index
          // This ensures the arc is always on top of the crossing line
          if (connZ > otherZ) {
            let isHorizontalSegment = (oldP.y | 0) === (p.y | 0)
            let isVerticalSegment = (oldP.x | 0) === (p.x | 0)
            
            // The arc is centered on the intersection point (interP.x, interP.y)
            // We draw from (interP - radius) to (interP + radius)
            
            if (isHorizontalSegment) {
              // Horizontal segment: draw arc that curves upward, centered on intersection
              let startX = ((interP.x - r) | 0) + 0.5
              let y = (interP.y | 0) + 0.5
              
              // SVG arc: a rx ry x-rotation large-arc sweep-flag dx dy
              // sweep-flag=1 means clockwise (arc goes upward for left-to-right)
              path.push(" L", startX, " ", y)
              path.push(" a", r, " ", r, " 0 0 1 ", (r * 2), " 0")
            }
            else if (isVerticalSegment) {
              // Vertical segment: draw arc that curves to the right, centered on intersection
              let x = (interP.x | 0) + 0.5
              
              // For top-to-bottom: arc curves to the right (sweep=1)
              // For bottom-to-top: arc curves to the right (sweep=0, going upward)
              if (oldP.y < p.y) {
                // Top to bottom
                let startY = ((interP.y - r) | 0) + 0.5
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
      })

      path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5)
      oldP = p
    }
    conn.svgPathString = path.join("")
  }

})