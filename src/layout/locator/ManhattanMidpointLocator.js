/**
 * @class draw2d.layout.locator.ManhattanMidpointLocator
 *
 * A ManhattanMidpointLocator that is used to place figures at the midpoint of a Manhatten routed
 * connection. The midpoint is always in the center of an edge.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *     //create and add two Node which contains Ports (In and OUT)
 *     let start = new draw2d.shape.node.Start({x:50,y:50});
 *     let end   = new draw2d.shape.node.End({x:230,y:100});
 *
 *     canvas.add( start);
 *     canvas.add( end);
 *
 *     // Create a Connection and connect he Start and End node
 *     //
 *     let c = new draw2d.Connection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // create a label which should attach to the connection
 *     //
 *     let label = new draw2d.shape.basic.Label({text:"I'm a Label"});
 *     label.setColor("#0d0d0d");
 *     label.setFontColor("#0d0d0d");
 *     label.setBackgroundColor("#f0f0f0");
 *
 *     // add the decoration to the connection with a ManhattanMidpointLocator.
 *     //
 *     c.add(label, new draw2d.layout.locator.ManhattanMidpointLocator());
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ConnectionLocator
 */
import draw2d from '../../packages'

draw2d.layout.locator.ManhattanMidpointLocator = draw2d.layout.locator.ConnectionLocator.extend(
  /** @lends draw2d.layout.locator.ManhattanMidpointLocator.prototype */
  {

  NAME: "draw2d.layout.locator.ManhattanMidpointLocator",

  /**
   * Constructs a ManhattanMidpointLocator with associated Connection c.
   *
   * @constructs
   */
  init: function () {
    this._super()
  },


  /**
   *
   * Relocates the given Figure always in the center of an edge.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    let conn = target.getParent()
    let points = conn.getVertices()

    let segmentIndex = Math.floor((points.getSize() - 2) / 2)
    if (points.getSize() <= segmentIndex + 1)
      return

    let p1 = points.get(segmentIndex)
    let p2 = points.get(segmentIndex + 1)

    target.setPosition(
      ((p2.x - p1.x) / 2 + p1.x - target.getWidth() / 2) | 0,
      ((p2.y - p1.y) / 2 + p1.y - target.getHeight() / 2) | 0)
  }
})
