/**
 * @class draw2d.shape.icon.Windows

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Windows();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Windows = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Windows",

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
    return this.canvas.paper.path("M20.023,17.484c-1.732-0.205-3.022-0.908-4.212-1.701l0,0l-0.559,0.279l-2.578,8.924l0,0c1.217,0.805,2.905,1.707,4.682,1.914c2.686,0.312,5.56-0.744,6.391-1.195l2.617-9.061l-0.559-0.279C25.805,16.365,23.193,17.857,20.023,17.484zM14.424,14.825c-1.267-0.87-2.578-1.652-4.375-1.816c-0.318-0.029-0.627-0.042-0.925-0.042c-3.011,0-4.948,1.347-4.948,1.347l-2.565,8.877l0,0l0.526,0.281c0.981-0.476,2.78-1.145,5.09-0.984c1.665,0.113,2.92,0.781,4.117,1.531l0.507-0.26l0,0L14.424,14.825zM10.201,12.094c1.664,0.114,2.921,0.78,4.117,1.533l0.509-0.26l0,0L17.4,4.431c-1.27-0.87-2.579-1.653-4.377-1.816c-0.318-0.029-0.626-0.042-0.924-0.042C9.088,2.573,7.15,3.92,7.15,3.92l-2.566,8.878L5.11,13.08C6.092,12.604,7.891,11.936,10.201,12.094zM28.779,5.971L28.779,5.971c0,0.001-2.609,1.492-5.779,1.119c-1.734-0.204-3.023-0.907-4.213-1.701L18.227,5.67l-2.576,8.923l0,0c1.215,0.803,2.906,1.709,4.68,1.915c2.687,0.312,5.558-0.745,6.392-1.197l2.615-9.059L28.779,5.971z")
  }
})

