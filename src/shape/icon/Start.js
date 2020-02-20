import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Start

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Start();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Start = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Start.prototype */
  {

  NAME: "draw2d.shape.icon.Start",

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
    return this.canvas.paper.path("M24.316,5.318,9.833,13.682,9.833,5.5,5.5,5.5,5.5,25.5,9.833,25.5,9.833,17.318,24.316,25.682z")
  }
})

