/**
 * @class draw2d.shape.basic.Arc
 * Oval figure.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let arc =  new draw2d.shape.basic.Arc({diameter:150, x:50, y:10, startAngle:0, endAngle:45});
 *
 *     canvas.add(arc);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
import draw2d from '../../packages'
import extend from '../../util/extend'

draw2d.shape.basic.Arc = draw2d.SetFigure.extend({
  NAME: "draw2d.shape.basic.Arc",

  /**
   *
   * @constructor
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.startAngle = 180
    this.endAngle = 360

    this._super(extend({width: 80, height: 50, bgColor: null, color: "#1B1B1B"}, attr), setter, getter)
    this.strokeScale = false // scale the stroke width of the children nodes if the parent resize
  },


  /**
   * @template
   **/
  createSet: function () {
    this.canvas.paper.setStart()


    let flag = (this.endAngle - this.startAngle) > 180
    let a1 = (this.startAngle % 360) * Math.PI / 180
    let a2 = (this.endAngle % 360) * Math.PI / 180

    let w2 = this.getWidth() / 2
    let h2 = this.getHeight() / 2

    this.canvas.paper.path([
      ["M", w2, h2,
        "l", w2 * Math.cos(a1), h2 * Math.sin(a1),
        "A", w2, h2, 0, +flag, 1, w2 + w2 * Math.cos(a2), h2 + h2 * Math.sin(a2),
        "z"]
    ].join("")).attr({"fill": "#fff0f0"})

    return this.canvas.paper.setFinish()

  }

})

