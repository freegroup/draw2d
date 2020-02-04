/**
 * @class draw2d.shape.icon.LinkedIn

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.LinkedIn();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.LinkedIn = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.LinkedIn.prototype */
  {

  NAME: "draw2d.shape.icon.LinkedIn",

  /**
   *
   * @constructs
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
    return this.canvas.paper.path("M27.25,3.125h-22c-1.104,0-2,0.896-2,2v22c0,1.104,0.896,2,2,2h22c1.104,0,2-0.896,2-2v-22C29.25,4.021,28.354,3.125,27.25,3.125zM11.219,26.781h-4v-14h4V26.781zM9.219,11.281c-1.383,0-2.5-1.119-2.5-2.5s1.117-2.5,2.5-2.5s2.5,1.119,2.5,2.5S10.602,11.281,9.219,11.281zM25.219,26.781h-4v-8.5c0-0.4-0.403-1.055-0.687-1.213c-0.375-0.211-1.261-0.229-1.665-0.034l-1.648,0.793v8.954h-4v-14h4v0.614c1.583-0.723,3.78-0.652,5.27,0.184c1.582,0.886,2.73,2.864,2.73,4.702V26.781z")
  }
})

