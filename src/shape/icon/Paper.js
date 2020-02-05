/**
 * @class draw2d.shape.icon.Paper

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.Paper();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Paper = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Paper.prototype */
  {

  NAME: "draw2d.shape.icon.Paper",

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
    return this.canvas.paper.path("M28.916,8.009L15.953,1.888c-0.251-0.119-0.548-0.115-0.798,0.008c-0.25,0.125-0.433,0.357-0.491,0.629c-0.002,0.01-1.04,4.83-2.578,9.636c-0.526,1.646-1.114,3.274-1.728,4.704l1.665,0.786c2-4.643,3.584-11.052,4.181-13.614l11.264,5.316c-0.346,1.513-1.233,5.223-2.42,8.927c-0.767,2.399-1.665,4.797-2.585,6.532c-0.889,1.79-1.958,2.669-2.197,2.552c-1.419,0.03-2.418-1.262-3.09-2.918c-0.32-0.803-0.53-1.63-0.657-2.246c-0.127-0.618-0.166-1.006-0.168-1.006c-0.034-0.317-0.232-0.597-0.52-0.731l-12.962-6.12c-0.301-0.142-0.654-0.11-0.925,0.081c-0.27,0.193-0.416,0.518-0.38,0.847c0.008,0.045,0.195,1.848,0.947,3.736c0.521,1.321,1.406,2.818,2.845,3.575l12.956,6.131l0.006-0.013c0.562,0.295,1.201,0.487,1.947,0.496c1.797-0.117,2.777-1.668,3.818-3.525c3-5.69,5.32-16.602,5.338-16.642C29.512,8.615,29.302,8.19,28.916,8.009z")
  }
})

