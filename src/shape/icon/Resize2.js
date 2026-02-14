import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Resize2();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Resize2 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Resize2.prototype */
  {

  NAME: "draw2d.shape.icon.Resize2",

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
    return this.canvas.paper.path("M1.999,2.332v26.499H28.5V2.332H1.999zM26.499,26.832H4V12.5h8.167V4.332h14.332V26.832zM15.631,17.649l5.468,5.469l-1.208,1.206l5.482,1.469l-1.47-5.481l-1.195,1.195l-5.467-5.466l1.209-1.208l-5.482-1.469l1.468,5.48L15.631,17.649z")
  }
})

