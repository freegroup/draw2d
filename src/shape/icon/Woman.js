/**
 * @class draw2d.shape.icon.Woman

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Woman();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Woman = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Woman",

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
    return this.canvas.paper.path("M21.022,16.349c-0.611-1.104-1.359-1.998-2.109-2.623c-0.875,0.641-1.941,1.031-3.104,1.031c-1.164,0-2.231-0.391-3.105-1.031c-0.75,0.625-1.498,1.519-2.111,2.623c-1.422,2.563-1.579,5.192-0.351,5.874c0.55,0.307,1.127,0.078,1.723-0.496c-0.105,0.582-0.167,1.213-0.167,1.873c0,2.932,1.139,5.307,2.543,5.307c0.846,0,1.265-0.865,1.466-2.189c0.201,1.324,0.62,2.189,1.464,2.189c1.406,0,2.545-2.375,2.545-5.307c0-0.66-0.061-1.291-0.168-1.873c0.598,0.574,1.174,0.803,1.725,0.496C22.603,21.541,22.444,18.912,21.022,16.349zM15.808,13.757c2.363,0,4.279-1.916,4.279-4.279s-1.916-4.279-4.279-4.279c-2.363,0-4.28,1.916-4.28,4.279S13.445,13.757,15.808,13.757zM18.731,4.974c1.235,0.455,0.492-0.725,0.492-1.531s0.762-1.792-0.492-1.391c-1.316,0.422-2.383,0.654-2.383,1.461S17.415,4.489,18.731,4.974zM15.816,4.4c0.782,0,0.345-0.396,0.345-0.884c0-0.488,0.438-0.883-0.345-0.883s-0.374,0.396-0.374,0.883C15.442,4.005,15.034,4.4,15.816,4.4zM12.884,4.974c1.316-0.484,2.383-0.654,2.383-1.461S14.2,2.474,12.884,2.052c-1.254-0.402-0.492,0.584-0.492,1.391S11.648,5.428,12.884,4.974z")
  }
})

