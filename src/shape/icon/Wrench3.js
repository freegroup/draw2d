/**
 * @class draw2d.shape.icon.Wrench3

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Wrench3();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Wrench3 = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Wrench3",

  /**
   *
   * @constructor
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
    return this.canvas.paper.path("M27.839,6.775l-3.197,3.239L21.77,9.246l-0.771-2.874l3.188-3.231c-1.992-0.653-4.268-0.192-5.848,1.391c-1.668,1.668-2.095,4.111-1.279,6.172L7.42,20.344c-0.204-0.032-0.408-0.062-0.621-0.062c-2.173,0-3.933,1.759-3.933,3.933c0,2.173,1.76,3.933,3.933,3.933c2.171,0,3.931-1.76,3.933-3.933c0-0.24-0.03-0.473-0.071-0.7l9.592-9.59c2.069,0.828,4.523,0.406,6.202-1.272C28.047,11.062,28.504,8.772,27.839,6.775zM6.799,25.146c-0.517,0-0.933-0.418-0.935-0.933c0.002-0.515,0.418-0.933,0.935-0.933c0.514,0,0.932,0.418,0.932,0.933S7.313,25.146,6.799,25.146z")
  }
})

