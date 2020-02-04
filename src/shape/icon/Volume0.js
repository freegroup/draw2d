/**
 * @class draw2d.shape.icon.Volume0

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Volume0();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Volume0 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Volume0.prototype */
  {

  NAME: "draw2d.shape.icon.Volume0",

  /**
   *
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
    return this.canvas.paper.path("M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z")
  }
})

