import draw2d from '../../packages'

/**
 * @class
 * Combines the interactive segment manipulation of {@link draw2d.layout.connection.InteractiveManhattanConnectionRouter}
 * with the circuit diagram features of {@link draw2d.layout.connection.CircuitConnectionRouter}.
 *
 * This router allows users to manually adjust connection segments by dragging them, while also
 * drawing:
 * - **Bridge (arc):** at crossings where connections have NO shared ports
 * - **Vertex (dot):** at crossings where connections share a source or target port
 *
 * Perfect for interactive circuit/schematic diagram editors.
 *
 * @example
 *
 *    let createConnection = function() {
 *       let con = new draw2d.Connection({
 *         radius: 4,
 *         router: new draw2d.layout.connection.InteractiveCircuitConnectionRouter()
 *       });
 *       return con;
 *    };
 *
 *    canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
 *           createConnection: createConnection
 *    }));
 *
 *    let f1 = new draw2d.shape.analog.OpAmp({x:10, y:10});
 *    let f2 = new draw2d.shape.analog.ResistorVertical({angle:90, height:20, x:300, y:150});
 *
 *    canvas.add(f1);
 *    canvas.add(f2);
 *
 *    let c = createConnection();
 *    c.setSource(f1.getOutputPort(0));
 *    c.setTarget(f2.getHybridPort(0));
 *    canvas.add(c);
 *
 *    // select the connection to show the segment handles
 *    c.select();
 *
 * @author Andreas Herz
 * @since 7.0.0
 * @extends draw2d.layout.connection.InteractiveManhattanConnectionRouter
 */

draw2d.layout.connection.InteractiveCircuitConnectionRouter = draw2d.layout.connection.InteractiveManhattanConnectionRouter.extend(
  /** @lends draw2d.layout.connection.InteractiveCircuitConnectionRouter.prototype */
  {

  NAME: "draw2d.layout.connection.InteractiveCircuitConnectionRouter",

  /**
   * Creates a new Router object.
   *
   * @param {Object} [attr] optional attributes for the router
   * @param {Number} [attr.bridgeRadius=5] the radius of the bridge arc in pixels
   * @param {Number} [attr.vertexRadius=null] the radius of the vertex circle (default: connection stroke * 2)
   * @param {Object} [setter] optional key/value map of injected setter-methods
   * @param {Object} [getter] optional key/value map of injected getter-methods
   */
  init: function (attr, setter, getter) {
    this._super(
      {
        // defaults first, then user attr overrides
        bridgeRadius: 5,
        vertexRadius: null,  // null = use default (connection stroke * 2)
        ...attr
      },
      // extend setter whitelist
      {
        bridgeRadius: this.setBridgeRadius,
        vertexRadius: this.setVertexRadius,
        ...setter
      },
      // extend getter whitelist
      {
        bridgeRadius: this.getBridgeRadius,
        vertexRadius: this.getVertexRadius,
        ...getter
      }
    )

    // experimental
    this.abortRoutingOnFirstVertexNode = false
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
    // Clean up vertex nodes
    if (typeof conn.vertexNodes !== "undefined" && conn.vertexNodes !== null) {
      conn.vertexNodes.remove()
      delete conn.vertexNodes
    }
    // Clean up the bridge invalidation flag
    delete conn._bridgesInvalidated
  },

  /**
   * Set the radius of the vertex circle (dot at shared port crossings).
   * If not set, defaults to connection stroke * 2.
   *
   * @param {Number} radius
   * @returns {this}
   */
  setVertexRadius: function (radius) {
    this.vertexRadius = radius
    return this
  },

  /**
   * Get the vertex radius.
   *
   * @returns {Number|null}
   */
  getVertexRadius: function () {
    return this.vertexRadius
  },

  /**
   * Get the vertex radius for drawing. Returns the set value or calculates default from connection stroke.
   *
   * @param {draw2d.Connection} conn
   * @returns {Number}
   * @private
   */
  _getVertexRadius: function (conn) {
    if (this.vertexRadius !== null) {
      return this.vertexRadius
    }
    // Default: connection stroke * 2
    return conn.stroke * 2
  },

  /**
   * Set the radius of the bridge arc (arc at non-shared crossings).
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
    // First, let the parent router do the routing (handles interactive manipulation)
    this._super(conn, routingHints)
    
    // Then override the svgPathString to add bridges and vertex dots
    this._paintWithCircuitFeatures(conn)
  },

  /**
   * Override the paint method to draw bridges and vertex nodes at connection intersections
   * 
   * @param {draw2d.Connection} conn
   * @private
   */
  _paintWithCircuitFeatures: function (conn) {
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

    // Filter duplicates
    let uniqueIntersections = new draw2d.util.ArrayList()
    let tolerance = 3
    allIntersections.each((i, interP) => {
      let isDuplicate = false
      uniqueIntersections.each((j, seenP) => {
        if (Math.abs(interP.x - seenP.x) < tolerance && Math.abs(interP.y - seenP.y) < tolerance) {
          isDuplicate = true
          return false
        }
      })
      if (!isDuplicate) {
        uniqueIntersections.add(interP)
      }
    })
    allIntersections = uniqueIntersections

    if (allIntersections.getSize() > 0) {
      conn.svgPathString = null
    }

    // Add a ArrayList of all added vertex nodes to the connection
    if (typeof conn.vertexNodes !== "undefined" && conn.vertexNodes !== null) {
      conn.vertexNodes.remove()
    }
    conn.vertexNodes = conn.canvas.paper.set()

    // ATTENTION: we cast all x/y coordinates to integer and add 0.5 to avoid subpixel rendering
    let ps = conn.getVertices()
    let p = ps.get(0)
    let path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5]

    let oldP = p
    let lastVertexNode = null
    let r = this.bridgeRadius

    for (let i = 1; i < ps.getSize(); i++) {
      p = ps.get(i)

      // Collect intersections on this segment and remove from allIntersections
      let segmentIntersections = []
      let remainingIntersections = new draw2d.util.ArrayList()
      
      allIntersections.each((ii, interP) => {
        if (draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
          segmentIntersections.push(interP)
        } else {
          remainingIntersections.add(interP)
        }
      })
      
      allIntersections = remainingIntersections
      
      // Determine segment direction
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

          // It is a vertex node (shared port)
          if (conn.sharingPorts(interP.other)) {
            let other = interP.other
            let otherZ = other.getZOrder()
            let connZ = conn.getZOrder()
            if (connZ < otherZ) {
              // Style vertex node to match connection styling
              let vertexAttrs = {
                fill: conn.lineColor.rgba()
              }
              // Only add stroke if connection has an outlineWidth/stroke
              if (conn.outlineStroke > 0) {
                vertexAttrs.stroke = conn.outlineColor.rgba()
                vertexAttrs["stroke-width"] = conn.outlineStroke
              } else {
                vertexAttrs.stroke = "none"
              }
              let vRadius = this._getVertexRadius(conn)
              let vertexNode = conn.canvas.paper.ellipse(interP.x, interP.y, vRadius, vRadius).attr(vertexAttrs)
              conn.vertexNodes.push(vertexNode)
              
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
          else {
            let other = interP.other
            let otherZ = other.getZOrder()
            let connZ = conn.getZOrder()
            
            // Only draw the arc if THIS connection has the higher z-index
            if (connZ > otherZ) {
              let isHorizontalSegment = (oldP.y | 0) === (p.y | 0)
              let isVerticalSegment = (oldP.x | 0) === (p.x | 0)
              
              if (isHorizontalSegment) {
                // Horizontal segment: draw arc that ALWAYS curves upward
                // regardless of line direction (left-to-right or right-to-left)
                let y = (interP.y | 0) + 0.5
                
                if (oldP.x < p.x) {
                  // Left to right: line comes from left, arc curves up (sweep=1)
                  let startX = ((interP.x - r) | 0) + 0.5
                  path.push(" L", startX, " ", y)
                  path.push(" a", r, " ", r, " 0 0 1 ", (r * 2), " 0")
                } else {
                  // Right to left: line comes from right, arc curves up (sweep=0)
                  let startX = ((interP.x + r) | 0) + 0.5
                  path.push(" L", startX, " ", y)
                  path.push(" a", r, " ", r, " 0 0 0 ", -(r * 2), " 0")
                }
              }
              else if (isVerticalSegment) {
                // Vertical segment: draw arc that ALWAYS curves to the right
                // regardless of line direction (top-to-bottom or bottom-to-top)
                let x = (interP.x | 0) + 0.5
                
                if (oldP.y < p.y) {
                  // Top to bottom: line comes from top, arc curves right (sweep=1)
                  let startY = ((interP.y - r) | 0) + 0.5
                  path.push(" L", x, " ", startY)
                  path.push(" a", r, " ", r, " 0 0 1 0 ", (r * 2))
                } else {
                  // Bottom to top: line comes from bottom, arc curves right (sweep=0)
                  let startY = ((interP.y + r) | 0) + 0.5
                  path.push(" L", x, " ", startY)
                  path.push(" a", r, " ", r, " 0 0 0 0 ", -(r * 2))
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