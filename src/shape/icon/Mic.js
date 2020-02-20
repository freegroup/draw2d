import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Mic

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Mic();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Mic = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Mic.prototype */
  {
  
  NAME: "draw2d.shape.icon.Mic",

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
    return this.canvas.paper.path("M15.5,21.125c2.682,0,4.875-2.25,4.875-5V5.875c0-2.75-2.193-5-4.875-5s-4.875,2.25-4.875,5v10.25C10.625,18.875,12.818,21.125,15.5,21.125zM21.376,11v5.125c0,3.308-2.636,6-5.876,6s-5.875-2.691-5.875-6V11H6.626v5.125c0,4.443,3.194,8.132,7.372,8.861v2.139h-3.372v3h9.749v-3h-3.376v-2.139c4.181-0.727,7.375-4.418,7.375-8.861V11H21.376z")
  }
})

