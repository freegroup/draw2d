import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Star

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Star();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Star = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Star.prototype */
  {

  NAME: "draw2d.shape.icon.Star",

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
    return this.canvas.paper.path("M16,22.375L7.116,28.83l3.396-10.438l-8.883-6.458l10.979,0.002L16.002,1.5l3.391,10.434h10.981l-8.886,6.457l3.396,10.439L16,22.375L16,22.375z")
  }
})

