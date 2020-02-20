import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Sencha

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Sencha();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Sencha = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Sencha.prototype */
  {
  
  NAME: "draw2d.shape.icon.Sencha",

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
    return this.canvas.paper.path("M18.265,22.734c1.365,0.662,2.309,2.062,2.309,3.682c0,1.566-0.881,2.928-2.176,3.615l1.922-0.98c3.16-1.58,5.332-4.846,5.332-8.617c0-3.719-2.109-6.945-5.195-8.547l-6.272-3.144c-1.366-0.662-2.308-2.062-2.308-3.682c0-1.567,0.881-2.928,2.175-3.614L12.13,2.428c-3.161,1.578-5.332,4.843-5.332,8.616c0,3.718,2.108,6.944,5.195,8.546L18.265,22.734z")
  }
})

