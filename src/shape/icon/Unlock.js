/**
 * @class draw2d.shape.icon.Unlock

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Unlock();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Unlock = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Unlock",

  /**
   *
   * @constructs
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 50, height: 50}, attr), setter, getter)
  },

  /**
   * @private
   * @returns
   */
  createSet: function () {
    return this.canvas.paper.path("M20.375,12.833h-2.209V10c0,0,0,0,0-0.001c0-2.389,1.945-4.333,4.334-4.333c2.391,0,4.335,1.944,4.335,4.333c0,0,0,0,0,0v2.834h2V9.999h-0.001c-0.001-3.498-2.836-6.333-6.334-6.333S16.166,6.502,16.166,10v2.833H3.125V25h17.25V12.833z")
  }
})

