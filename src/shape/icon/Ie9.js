import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Ie9

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.Ie9();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Ie9 = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Ie9.prototype */
  {

  NAME: "draw2d.shape.icon.Ie9",

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
    return this.canvas.paper.path("M27.751,17.887c0.054-0.434,0.081-0.876,0.081-1.324c0-1.744-0.413-3.393-1.146-4.854c1.133-2.885,1.155-5.369-0.201-6.777c-1.756-1.822-5.391-1.406-9.433,0.721c-0.069-0.001-0.138-0.003-0.206-0.003c-6.069,0-10.988,4.888-10.988,10.917c0,0.183,0.005,0.354,0.014,0.529c-2.688,4.071-3.491,7.967-1.688,9.838c1.557,1.613,4.691,1.344,8.2-0.392c1.363,0.604,2.873,0.938,4.462,0.938c4.793,0,8.867-3.049,10.369-7.299H21.26c-0.814,1.483-2.438,2.504-4.307,2.504c-2.688,0-4.867-2.104-4.867-4.688c0-0.036,0.002-0.071,0.003-0.106h15.662V17.887zM26.337,6.099c0.903,0.937,0.806,2.684-0.087,4.818c-1.27-2.083-3.221-3.71-5.546-4.576C23.244,5.217,25.324,5.047,26.337,6.099zM16.917,10.372c2.522,0,4.585,1.991,4.748,4.509h-9.496C12.333,12.363,14.396,10.372,16.917,10.372zM5.687,26.501c-1.103-1.146-0.712-3.502,0.799-6.298c0.907,2.546,2.736,4.658,5.09,5.938C8.92,27.368,6.733,27.587,5.687,26.501z")
  }
})

