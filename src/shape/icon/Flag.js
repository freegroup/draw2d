import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Flag

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Flag();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Flag = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Flag.prototype */
  {
  
  NAME: "draw2d.shape.icon.Flag",

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
    return this.canvas.paper.path("M26.04,9.508c0.138-0.533,0.15-1.407,0.028-1.943l-0.404-1.771c-0.122-0.536-0.665-1.052-1.207-1.146l-3.723-0.643c-0.542-0.094-1.429-0.091-1.97,0.007l-4.033,0.726c-0.542,0.098-1.429,0.108-1.973,0.023L8.812,4.146C8.817,4.165,8.826,4.182,8.83,4.201l2.701,12.831l1.236,0.214c0.542,0.094,1.428,0.09,1.97-0.007l4.032-0.727c0.541-0.097,1.429-0.107,1.973-0.022l4.329,0.675c0.544,0.085,0.906-0.288,0.807-0.829l-0.485-2.625c-0.1-0.541-0.069-1.419,0.068-1.952L26.04,9.508zM6.667,3.636C6.126,3.75,5.78,4.279,5.894,4.819l5.763,27.378H13.7L7.852,4.409C7.736,3.867,7.207,3.521,6.667,3.636z")
  }
})

