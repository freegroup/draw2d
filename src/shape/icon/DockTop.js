import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.DockTop();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.DockTop = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.DockTop.prototype */
  {

  NAME: "draw2d.shape.icon.DockTop",

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
    return this.canvas.paper.path("M27.916,23.667V7.333H3.083v16.334H27.916zM24.915,20.668H6.083v-6.501h18.833L24.915,20.668L24.915,20.668z")
  }
})

