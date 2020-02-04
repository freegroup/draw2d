/**
 * @class draw2d.shape.icon.Pc

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Pc();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Pc = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Pc.prototype */
  {

  NAME: "draw2d.shape.icon.Pc",

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
    return this.canvas.paper.path("M29.249,3.14h-9.188l-0.459,0.459v18.225l0.33,2.389H19.57v0.245h-0.307v-0.306h-0.611v0.244h-0.311v-0.367h-0.486v0.307h-1.104l-2.022-0.367v-0.92h0.858l0.302-1.47h2.728c0.188,0,0.339-0.152,0.339-0.339V7.828c0-0.187-0.149-0.338-0.339-0.338H1.591c-0.187,0-0.339,0.152-0.339,0.338V21.24c0,0.187,0.152,0.339,0.339,0.339h3.016l0.199,1.47h1.409l-3.4,3.4L2.11,27.951c0,0,2.941,1.102,6.678,1.102c3.737,0,9.679-0.857,10.476-0.857s4.84,0,4.84,0v-1.225l-0.137-1.068h1.744c-0.2,0.106-0.322,0.244-0.322,0.396v0.979c0,0.341,0.604,0.613,1.352,0.613c0.742,0,1.348-0.272,1.348-0.613v-0.979c0-0.339-0.604-0.611-1.348-0.611c-0.188,0-0.364,0.019-0.525,0.049v-0.17h-2.29l-0.055-0.432h5.382L29.249,3.14L29.249,3.14zM2.478,20.17V8.714h15.07V20.17H2.478z")
  }
})

