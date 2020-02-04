/**
 * @class draw2d.shape.icon.Stop

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Stop();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Stop = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Stop.prototype */
  {

  NAME: "draw2d.shape.icon.Stop",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @constructs
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
    return this.canvas.paper.path("M5.5,5.5h20v20h-20z")
  }
})

