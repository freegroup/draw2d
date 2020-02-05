import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.DockLeft

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.DockLeft();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.DockLeft = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.DockLeft.prototype */
  {

  NAME: "draw2d.shape.icon.DockLeft",

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
    return this.canvas.paper.path("M3.084,7.333v16.334h24.832V7.333H3.084z M11.667,10.332h13.251v10.336H11.667V10.332z")
  }
})

