import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.DockBottom();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.DockBottom = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.DockBottom.prototype */
  {

  NAME: "draw2d.shape.icon.DockBottom",

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
    return this.canvas.paper.path("M3.083,7.333v16.334h24.833V7.333H3.083zM24.915,16.833H6.083v-6.501h18.833L24.915,16.833L24.915,16.833z")
  }
})

