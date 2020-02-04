/**
 * @class draw2d.shape.icon.Notebook

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Notebook();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Notebook = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Notebook.prototype */
  {

  NAME: "draw2d.shape.icon.Notebook",

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
    return this.canvas.paper.path("M24.875,1.375H8c-1.033,0-1.874,0.787-1.979,1.792h1.604c1.102,0,2,0.898,2,2c0,1.102-0.898,2-2,2H6v0.999h1.625c1.104,0,2.002,0.898,2.002,2.002c0,1.104-0.898,2.001-2.002,2.001H6v0.997h1.625c1.102,0,2,0.898,2,2c0,1.104-0.898,2.004-2,2.004H6v0.994h1.625c1.102,0,2,0.898,2,2.002s-0.898,2.002-2,2.002H6v0.997h1.624c1.104,0,2.002,0.897,2.002,2.001c0,1.104-0.898,2.002-2.002,2.002H6.004C6.027,28.252,6.91,29.125,8,29.125h16.875c1.104,0,2-0.896,2-2V3.375C26.875,2.271,25.979,1.375,24.875,1.375zM25.25,8.375c0,0.552-0.447,1-1,1H14c-0.553,0-1-0.448-1-1V4c0-0.552,0.447-1,1-1h10.25c0.553,0,1,0.448,1,1V8.375zM8.625,25.166c0-0.554-0.449-1.001-1-1.001h-3.25c-0.552,0-1,0.447-1,1.001c0,0.552,0.449,1,1,1h3.25C8.176,26.166,8.625,25.718,8.625,25.166zM4.375,6.166h3.251c0.551,0,0.999-0.448,0.999-0.999c0-0.555-0.448-1-0.999-1H4.375c-0.553,0-1,0.445-1,1C3.374,5.718,3.822,6.166,4.375,6.166zM4.375,11.167h3.25c0.553,0,1-0.448,1-1s-0.448-1-1-1h-3.25c-0.553,0-1,0.448-1,1S3.822,11.167,4.375,11.167zM4.375,16.167h3.25c0.551,0,1-0.448,1-1.001s-0.448-0.999-1-0.999h-3.25c-0.553,0-1.001,0.446-1.001,0.999S3.822,16.167,4.375,16.167zM3.375,20.165c0,0.553,0.446,1.002,1,1.002h3.25c0.551,0,1-0.449,1-1.002c0-0.552-0.448-1-1-1h-3.25C3.821,19.165,3.375,19.613,3.375,20.165z")
  }
})

