import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.DockRight();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.DockRight = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.DockRight.prototype */
  {

  NAME: "draw2d.shape.icon.DockRight",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super({width: 50, height: 50, ...attr}, setter, getter)
  },

  /**
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet: function () {
    return this.canvas.paper.path("M3.083,7.333v16.334h24.833V7.333H3.083z M19.333,20.668H6.083V10.332h13.25V20.668z")
  }
})

