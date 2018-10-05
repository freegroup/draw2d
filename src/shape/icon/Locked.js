/**
 * @class draw2d.shape.icon.Locked

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Locked();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Locked = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Locked",

  /**
   *
   * @constructor
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
    return this.canvas.paper.path("M26.711,14.085L16.914,4.29c-0.778-0.778-2.051-0.778-2.829,0L4.29,14.086c-0.778,0.778-0.778,2.05,0,2.829l9.796,9.796c0.778,0.777,2.051,0.777,2.829,0l9.797-9.797C27.488,16.136,27.488,14.863,26.711,14.085zM8.218,16.424c-0.4-0.153-0.687-0.533-0.687-0.987s0.287-0.834,0.687-0.987V16.424zM8.969,16.424v-1.974c0.4,0.152,0.687,0.533,0.687,0.987S9.369,16.272,8.969,16.424zM13.5,19.188l1.203-3.609c-0.689-0.306-1.172-0.994-1.172-1.797c0-1.087,0.881-1.969,1.969-1.969c1.087,0,1.969,0.881,1.969,1.969c0,0.803-0.482,1.491-1.172,1.797l1.203,3.609H13.5zM22.03,16.549c-0.399-0.152-0.687-0.533-0.687-0.986s0.287-0.834,0.687-0.987V16.549zM22.781,16.549v-1.973c0.4,0.152,0.688,0.533,0.688,0.987S23.182,16.397,22.781,16.549z")
  }
})

