/**
 * @class draw2d.shape.icon.Star2Off

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Star2Off();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Star2Off = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Star2Off.prototype */
  {

  NAME: "draw2d.shape.icon.Star2Off",

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
    return this.canvas.paper.path("M26.522,12.293l-5.024-0.73c-1.089-0.158-2.378-1.095-2.864-2.081l-2.249-4.554c-0.487-0.986-1.284-0.986-1.771,0l-2.247,4.554c-0.487,0.986-1.776,1.923-2.864,2.081l-5.026,0.73c-1.088,0.158-1.334,0.916-0.547,1.684l3.637,3.544c0.788,0.769,1.28,2.283,1.094,3.368l-0.858,5.004c-0.186,1.085,0.458,1.553,1.432,1.041l4.495-2.363c0.974-0.512,2.566-0.512,3.541,0l4.495,2.363c0.974,0.512,1.618,0.044,1.433-1.041l-0.859-5.004c-0.186-1.085,0.307-2.6,1.095-3.368l3.636-3.544C27.857,13.209,27.611,12.452,26.522,12.293zM22.037,16.089c-1.266,1.232-1.966,3.394-1.67,5.137l0.514,2.984l-2.679-1.409c-0.757-0.396-1.715-0.612-2.702-0.612s-1.945,0.216-2.7,0.61l-2.679,1.409l0.511-2.982c0.297-1.743-0.404-3.905-1.671-5.137l-2.166-2.112l2.995-0.435c1.754-0.255,3.592-1.591,4.373-3.175L15.5,7.652l1.342,2.716c0.781,1.583,2.617,2.92,4.369,3.173l2.992,0.435L22.037,16.089z")
  }
})

