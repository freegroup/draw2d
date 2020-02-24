import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Shuffle();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Shuffle = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Shuffle.prototype */
  {

  NAME: "draw2d.shape.icon.Shuffle",

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
    return this.canvas.paper.path("M21.786,20.654c-0.618-0.195-1.407-0.703-2.291-1.587c-0.757-0.742-1.539-1.698-2.34-2.741c-0.191,0.256-0.382,0.51-0.574,0.77c-0.524,0.709-1.059,1.424-1.604,2.127c1.904,2.31,3.88,4.578,6.809,4.952v2.701l7.556-4.362l-7.556-4.362V20.654zM9.192,11.933c0.756,0.741,1.538,1.697,2.339,2.739c0.195-0.262,0.39-0.521,0.587-0.788c0.52-0.703,1.051-1.412,1.592-2.11c-2.032-2.463-4.133-4.907-7.396-5.025h-3.5v3.5h3.5C6.969,10.223,7.996,10.735,9.192,11.933zM21.786,10.341v2.535l7.556-4.363l-7.556-4.363v2.647c-1.904,0.219-3.425,1.348-4.751,2.644c-2.196,2.183-4.116,5.167-6.011,7.538c-1.867,2.438-3.741,3.888-4.712,3.771h-3.5v3.5h3.5c2.185-0.029,3.879-1.266,5.34-2.693c2.194-2.184,4.116-5.167,6.009-7.538C19.205,12.003,20.746,10.679,21.786,10.341z")
  }
})

