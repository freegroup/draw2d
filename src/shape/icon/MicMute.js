/**
 * @class draw2d.shape.icon.MicMute

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.MicMute();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.MicMute = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.MicMute.prototype */
  {

  NAME: "draw2d.shape.icon.MicMute",

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
    return this.canvas.paper.path("M10.121,18.529c-0.317-0.736-0.496-1.549-0.496-2.404V11H6.626v5.125c0,1.693,0.466,3.275,1.272,4.627L10.121,18.529zM20.375,8.276V5.875c0-2.75-2.193-5-4.875-5s-4.875,2.25-4.875,5v10.25c0,0.568,0.113,1.105,0.285,1.615L20.375,8.276zM21.376,12.931v3.195c0,3.308-2.636,6-5.876,6c-0.958,0-1.861-0.24-2.661-0.657l-2.179,2.179c0.995,0.659,2.123,1.128,3.338,1.34v2.139h-3.372v3h9.749v-3h-3.376v-2.139c4.181-0.727,7.375-4.418,7.375-8.861V11h-1.068L21.376,12.931zM20.375,16.125v-2.194l-6.788,6.788c0.588,0.26,1.234,0.405,1.913,0.405C18.182,21.125,20.375,18.875,20.375,16.125zM25.542,4.522L4.855,25.209l1.415,1.416L26.956,5.937L25.542,4.522z")
  }
})

