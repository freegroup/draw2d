/**
 * @class draw2d.shape.icon.No

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.No();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.No = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.No",

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
    return this.canvas.paper.path("M16,2.939C9.006,2.942,3.338,8.61,3.335,15.605C3.335,22.6,9.005,28.268,16,28.27c6.994-0.002,12.662-5.67,12.664-12.664C28.663,8.61,22.995,2.939,16,2.939zM25.663,15.605c-0.003,1.943-0.583,3.748-1.569,5.264L10.736,7.513c1.515-0.988,3.32-1.569,5.265-1.573C21.337,5.951,25.654,10.269,25.663,15.605zM6.335,15.605c0.004-1.943,0.584-3.75,1.573-5.266l13.355,13.357c-1.516,0.986-3.32,1.566-5.264,1.569C10.664,25.26,6.346,20.941,6.335,15.605z")
  }
})

