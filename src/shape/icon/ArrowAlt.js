import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.ArrowAlt

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.ArrowAlt();
 *     icon.setDimension(150,100);
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.ArrowAlt = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.ArrowAlt.prototype */
  {
  
  NAME: "draw2d.shape.icon.ArrowAlt",

  /**
   *
   * Creates a new figure element which are not assigned to any canvas.
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
    return this.canvas.paper.path("M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM13.665,25.725l-3.536-3.539l6.187-6.187l-6.187-6.187l3.536-3.536l9.724,9.723L13.665,25.725z")
  }
})

