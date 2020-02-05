/**
 * @class draw2d.shape.icon.Rw

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.Rw();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Rw = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Rw.prototype */
  {

  NAME: "draw2d.shape.icon.Rw",

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
    return this.canvas.paper.path("M5.5,15.499,15.8,21.447,15.8,15.846,25.5,21.447,25.5,9.552,15.8,15.152,15.8,9.552z")
  }
})

