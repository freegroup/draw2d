import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Calendar();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Calendar = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Calendar.prototype */
  {

  NAME: "draw2d.shape.icon.Calendar",

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
   * @returns {Object} the raphaelJS path object
   */
  createSet: function () {
    return this.canvas.paper.path("M11.758,15.318c0.312-0.3,0.408-0.492,0.408-0.492h0.024c0,0-0.012,0.264-0.012,0.528v5.469h-1.871v1.031h4.87v-1.031H13.33v-7.436h-1.055l-2.027,1.967l0.719,0.744L11.758,15.318zM16.163,21.207c0,0.205,0.024,0.42,0.06,0.647h5.457v-1.031h-4.197c0.023-1.931,4.065-2.362,4.065-5.146c0-1.463-1.114-2.436-2.674-2.436c-1.907,0-2.675,1.607-2.675,1.607l0.875,0.587c0,0,0.6-1.08,1.716-1.08c0.887,0,1.522,0.563,1.522,1.403C20.312,17.754,16.163,18.186,16.163,21.207zM12,3.604h-2v3.335h2V3.604zM23,4.77v3.17h-4V4.77h-6v3.168H9.002V4.77H6.583v21.669h18.833V4.77H23zM24.417,25.438H7.584V10.522h16.833V25.438zM22,3.604h-2v3.335h2V3.604z")
  }
})

