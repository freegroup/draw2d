import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Usb();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Usb = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Usb.prototype */
  {

  NAME: "draw2d.shape.icon.Usb",

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
    return this.canvas.paper.path("M15.5,1.667L13.745,4.74h1.252v15.709L11.8,17.391c-0.205-0.26-0.351-0.601-0.358-0.952c0-1.417-0.001-2.258-0.001-2.568c0.592-0.21,1.02-0.774,1.02-1.444c0-0.849-0.682-1.538-1.521-1.538c-0.84,0-1.521,0.689-1.521,1.538c0,0.67,0.427,1.234,1.019,1.444l-0.001,2.539c0,0.688,0.373,1.409,0.812,1.868c-0.013-0.013-0.027-0.025,0,0c0.011,0.01,3.392,3.245,3.392,3.245c0.205,0.26,0.35,0.6,0.357,0.951v1.776c-1.161,0.236-2.036,1.272-2.036,2.517c0,1.418,1.137,2.566,2.539,2.566c1.403,0,2.54-1.148,2.54-2.566c0-1.244-0.875-2.28-2.038-2.517v-1.746c0-0.005,0-0.009,0-0.014v-3.861c0.008-0.35,0.152-0.689,0.358-0.949c0,0,3.38-3.234,3.392-3.245c0.027-0.026,0.012-0.013,0,0c0.438-0.459,0.811-1.181,0.811-1.869V10.12h1.02V7.046h-3.041v3.075h1.018c0,0-0.002,0.644-0.002,2.476c-0.008,0.351-0.152,0.692-0.357,0.952l-3.198,3.06V4.74h1.254L15.5,1.667z")
  }
})

