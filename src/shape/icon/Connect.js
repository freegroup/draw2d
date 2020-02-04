/**
 * @class draw2d.shape.icon.Connect

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Connect();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Connect = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Connect.prototype */
  {

  NAME: "draw2d.shape.icon.Connect",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @constructs
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
    return this.canvas.paper.path("M25.06,13.719c-0.944-5.172-5.461-9.094-10.903-9.094v4c3.917,0.006,7.085,3.176,7.094,7.094c-0.009,3.917-3.177,7.085-7.094,7.093v4.002c5.442-0.004,9.959-3.926,10.903-9.096h4.69v-3.999H25.06zM20.375,15.719c0-3.435-2.784-6.219-6.219-6.219c-2.733,0-5.05,1.766-5.884,4.218H1.438v4.001h6.834c0.833,2.452,3.15,4.219,5.884,4.219C17.591,21.938,20.375,19.153,20.375,15.719z")
  }
})

