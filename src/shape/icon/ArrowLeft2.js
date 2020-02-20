import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.ArrowLeft2

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.ArrowLeft2();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.ArrowLeft2 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.ArrowLeft2.prototype */
  {

  NAME: "draw2d.shape.icon.ArrowLeft2",

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
    return this.canvas.paper.path("M21.871,9.814 15.684,16.001 21.871,22.188 18.335,25.725 8.612,16.001 18.335,6.276z")
  }
})

