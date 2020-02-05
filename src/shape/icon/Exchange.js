import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Exchange

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.Exchange();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Exchange = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Exchange.prototype */
  {

  NAME: "draw2d.shape.icon.Exchange",

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
    return this.canvas.paper.path("M21.786,12.876l7.556-4.363l-7.556-4.363v2.598H2.813v3.5h18.973V12.876zM10.368,18.124l-7.556,4.362l7.556,4.362V24.25h18.974v-3.501H10.368V18.124z")
  }
})

