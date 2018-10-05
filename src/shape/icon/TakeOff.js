/**
 * @class draw2d.shape.icon.TakeOff

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.TakeOff();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.TakeOff = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.TakeOff",

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
    return this.canvas.paper.path("M10.27,19.267c0,0,9.375-1.981,16.074-8.681c0,0,1.395-1.339-1.338-1.339c-2.305,0-5.6,2.438-5.6,2.438l-9.137-1.42l-1.769,1.769l4.983,2.411l-3.001,2.035l-2.571-1.285L6.09,16.052C6.09,16.052,8.02,18.062,10.27,19.267zM3.251,23.106v1.998h24.498v-1.998H3.251z")
  }
})

