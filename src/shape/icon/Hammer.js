/**
 * @class draw2d.shape.icon.Hammer

 * See the example:
 *
 *     @example preview small frame
 *
 *     let icon =  new draw2d.shape.icon.Hammer();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
import draw2d from '../../packages'

draw2d.shape.icon.Hammer = draw2d.shape.icon.Icon.extend({
  NAME: "draw2d.shape.icon.Hammer",

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
    return this.canvas.paper.path("M7.831,29.354c0.685,0.353,1.62,1.178,2.344,0.876c0.475-0.195,0.753-1.301,1.048-1.883c2.221-4.376,4.635-9.353,6.392-13.611c0-0.19,0.101-0.337-0.049-0.595c0.983-1.6,1.65-3.358,2.724-5.138c0.34-0.566,0.686-1.351,1.163-1.577l0.881-0.368c1.12-0.288,1.938-0.278,2.719,0.473c0.396,0.383,0.578,1.015,0.961,1.395c0.259,0.26,1.246,0.899,1.613,0.8c0.285-0.077,0.52-0.364,0.72-0.728l0.696-1.286c0.195-0.366,0.306-0.718,0.215-0.999c-0.117-0.362-1.192-0.84-1.552-0.915c-0.528-0.113-1.154,0.081-1.692-0.041c-1.057-0.243-1.513-0.922-1.883-2.02c-2.608-1.533-6.119-2.53-10.207-1.244c-1.109,0.349-2.172,0.614-2.901,1.323c-0.146,0.412,0.143,0.494,0.446,0.489c-0.237,0.216-0.62,0.341-0.399,0.848c2.495-1.146,7.34-1.542,7.669,0.804c0.072,0.522-0.395,1.241-0.682,1.835c-0.905,1.874-2.011,3.394-2.813,5.091c-0.298,0.017-0.366,0.18-0.525,0.287c-2.604,3.8-5.451,8.541-7.9,12.794c-0.326,0.566-1.098,1.402-1.002,1.906C5.961,28.641,7.146,29,7.831,29.354z")
  }
})

