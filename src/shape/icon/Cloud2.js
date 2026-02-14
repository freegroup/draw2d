import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Cloud2();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Cloud2 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Cloud2.prototype */
  {
  
  NAME: "draw2d.shape.icon.Cloud2",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super({width: 50, height: 50, ...attr}, setter, getter)
  },

  /**
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet: function () {
    return this.canvas.paper.path("M7.562,24.812c-3.313,0-6-2.687-6-6l0,0c0.002-2.659,1.734-4.899,4.127-5.684l0,0c0.083-2.26,1.937-4.064,4.216-4.066l0,0c0.73,0,1.415,0.19,2.01,0.517l0,0c1.266-2.105,3.57-3.516,6.208-3.517l0,0c3.947,0.002,7.157,3.155,7.248,7.079l0,0c2.362,0.804,4.062,3.034,4.064,5.671l0,0c0,3.313-2.687,6-6,6l0,0H7.562L7.562,24.812zM24.163,14.887c-0.511-0.095-0.864-0.562-0.815-1.079l0,0c0.017-0.171,0.027-0.336,0.027-0.497l0,0c-0.007-2.899-2.352-5.245-5.251-5.249l0,0c-2.249-0.002-4.162,1.418-4.911,3.41l0,0c-0.122,0.323-0.406,0.564-0.748,0.63l0,0c-0.34,0.066-0.694-0.052-0.927-0.309l0,0c-0.416-0.453-0.986-0.731-1.633-0.731l0,0c-1.225,0.002-2.216,0.993-2.22,2.218l0,0c0,0.136,0.017,0.276,0.045,0.424l0,0c0.049,0.266-0.008,0.54-0.163,0.762l0,0c-0.155,0.223-0.392,0.371-0.657,0.414l0,0c-1.9,0.313-3.352,1.949-3.35,3.931l0,0c0.004,2.209,1.792,3.995,4.001,4.001l0,0h15.874c2.209-0.006,3.994-1.792,3.999-4.001l0,0C27.438,16.854,26.024,15.231,24.163,14.887L24.163,14.887")
  }
})

