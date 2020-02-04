/**
 * @class draw2d.layout.locator.TopLocator
 *
 * A TopLocator  is used to place figures at the top/center of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     let circle = new draw2d.shape.basic.Circle({
 *         x:100,
 *         y:70,
 *         diameter:80,
 *         stroke: 3,
 *         color:"#A63343",
 *         bgColor:"#E65159"
 *     });
 *
 *     circle.add(new draw2d.shape.basic.Label({text:"Top Label"}), new draw2d.layout.locator.TopLocator());
 *     canvas.add( circle);
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
import draw2d from '../../packages'

draw2d.layout.locator.TopLocator = draw2d.layout.locator.Locator.extend(
  /** @lends draw2d.layout.locator.TopLocator.prototype */
  {

  NAME: "draw2d.layout.locator.TopLocator",

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
   * Relocates the given Figure.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    let parent = target.getParent()
    let boundingBox = parent.getBoundingBox()

    // I made a wrong decision in the port handling: anchor point
    // is in the center and not topLeft. Now I must correct this flaw here, and there, and...
    // shit happens.
    let offset = (parent instanceof draw2d.Port) ? boundingBox.w / 2 : 0


    let targetBoundingBox = target.getBoundingBox()
    if (target instanceof draw2d.Port) {
      target.setPosition(boundingBox.w / 2 - offset, 0)
    }
    else {
      target.setPosition(boundingBox.w / 2 - (targetBoundingBox.w / 2) - offset, -(targetBoundingBox.h + 2))
    }
  }
})
