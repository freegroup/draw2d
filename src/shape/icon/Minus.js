import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Minus

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.Minus();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Minus = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Minus.prototype */
  {

  NAME: "draw2d.shape.icon.Minus",

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
    return this.canvas.paper.path("M25.979,12.896,5.979,12.896,5.979,19.562,25.979,19.562z")
  }
})

