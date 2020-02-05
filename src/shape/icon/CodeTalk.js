/**
 * @class draw2d.shape.icon.CodeTalk

 *
 * @example
 *
 *     let icon =  new draw2d.shape.icon.CodeTalk();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.CodeTalk = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.CodeTalk.prototype */
  {
  
  NAME: "draw2d.shape.icon.CodeTalk",

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
    return this.canvas.paper.path("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM13.704,19.47l-2.338,2.336l-6.43-6.431l6.429-6.432l2.339,2.341l-4.091,4.091L13.704,19.47zM20.775,21.803l-2.337-2.339l4.092-4.09l-4.092-4.092l2.337-2.339l6.43,6.426L20.775,21.803z")
  }
})

