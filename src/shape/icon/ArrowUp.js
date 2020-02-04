/**
 * @class draw2d.shape.icon.ArrowUp

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.ArrowUp();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.ArrowUp = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.ArrowUp.prototype */
  {
  
  NAME: "draw2d.shape.icon.ArrowUp",

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
    return this.canvas.paper.path("M25.682,24.316L15.5,6.684L5.318,24.316H25.682z")
  }
})

