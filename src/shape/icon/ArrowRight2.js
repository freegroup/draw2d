import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.ArrowRight2

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.ArrowRight2();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.ArrowRight2 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.ArrowRight2.prototype */
  {

  NAME: "draw2d.shape.icon.ArrowRight2",

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
    return this.canvas.paper.path("M10.129,22.186 16.316,15.999 10.129,9.812 13.665,6.276 23.389,15.999 13.665,25.725z")
  }
})

