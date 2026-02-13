import draw2d from '../../packages'


/**
 * @class
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors. Draws a bridge (arc) where connections cross.
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

  BRIDGE_HORIZONTAL_LR: " r 0 0 3 -4 7 -4 10 0 13 0 ", // Left to right
  BRIDGE_HORIZONTAL_RL: " r 0 0 -3 -4 -7 -4 -10 0 -13 0 ", // right to left

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
   * @template
   * @since 2.7.2
   */
  onInstall: function (connection) {
    connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy())
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
    
    // calculate the path string for the SVG rendering
    //
    let intersectionsASC = conn.getCanvas().getIntersection(conn).sort("x")
    let intersectionsDESC = intersectionsASC.clone().reverse()

    let intersectionForCalc = intersectionsASC


    // ATTENTION: we cast all x/y coordinates to int and add 0.5 to avoid subpixel rendering of
    //            the connection. The 1px or 2px lines look much clearer than before.
    //
    let ps = conn.getVertices()
    let p = ps.get(0)
    let path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5]
    let oldP = p
    for (let i = 1; i < ps.getSize(); i++) {
      p = ps.get(i)

      // check for intersection and paint a bridge if required
      // line goes from left to right
      //
      let bridgeWidth = 5
      let bridgeCode = this.BRIDGE_HORIZONTAL_LR

      // line goes from right->left. Inverse the bridge and the bridgeWidth
      //
      if (oldP.x > p.x) {
        intersectionForCalc = intersectionsDESC
        bridgeCode = this.BRIDGE_HORIZONTAL_RL
        bridgeWidth = -bridgeWidth
      }

      intersectionForCalc.each(function (ii, interP) {
        if (interP.justTouching === false && draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
          // we draw only horizontal bridges. Just a design decision
          //
          if (p.y === interP.y) {
            path.push(" L", ((interP.x - bridgeWidth) | 0) + 0.5, " ", (interP.y | 0) + 0.5)
            path.push(bridgeCode)
          }
        }

      })

      path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5)
      oldP = p
    }
    conn.svgPathString = path.join("")
  }

})
