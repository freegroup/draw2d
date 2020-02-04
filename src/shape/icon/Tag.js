/**
 * @class draw2d.shape.icon.Tag

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Tag();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Tag = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Tag.prototype */
  {

  NAME: "draw2d.shape.icon.Tag",

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
    return this.canvas.paper.path("M14.263,2.826H7.904L2.702,8.028v6.359L18.405,30.09l11.561-11.562L14.263,2.826zM6.495,8.859c-0.619-0.619-0.619-1.622,0-2.24C7.114,6,8.117,6,8.736,6.619c0.62,0.62,0.619,1.621,0,2.241C8.117,9.479,7.114,9.479,6.495,8.859z")
  }
})

