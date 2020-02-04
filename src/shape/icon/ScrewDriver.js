/**
 * @class draw2d.shape.icon.ScrewDriver

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.ScrewDriver();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.ScrewDriver = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.ScrewDriver",

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
    return this.canvas.paper.path("M19.387,14.373c2.119-2.619,5.322-6.77,5.149-7.75c-0.128-0.729-0.882-1.547-1.763-2.171c-0.883-0.625-1.916-1.044-2.645-0.915c-0.98,0.173-3.786,4.603-5.521,7.49c-0.208,0.344,0.328,1.177,0.156,1.468c-0.172,0.292-1.052,0.042-1.18,0.261c-0.263,0.451-0.417,0.722-0.417,0.722s-0.553,0.823,1.163,2.163l-5.233,7.473c-0.267,0.381-1.456,0.459-1.456,0.459l-1.184,3.312l0.859,0.602l2.708-2.246c0,0-0.334-1.143-0.068-1.523l5.242-7.489c1.719,1,2.377,0.336,2.377,0.336s0.201-0.238,0.536-0.639c0.161-0.194-0.374-0.936-0.159-1.197C18.169,14.467,19.133,14.685,19.387,14.373z")
  }
})

