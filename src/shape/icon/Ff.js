import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Ff();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Ff = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Ff.prototype */
  {
  
  NAME: "draw2d.shape.icon.Ff",

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
    return this.canvas.paper.path("M25.5,15.5,15.2,9.552,15.2,15.153,5.5,9.552,5.5,21.447,15.2,15.847,15.2,21.447z")
  }
})

