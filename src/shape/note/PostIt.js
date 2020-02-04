/**
 * @class draw2d.shape.note.PostIt
 *
 * Simple Post-it like figure with text. Can be used for annotations or documentation.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let shape =  new draw2d.shape.note.PostIt({
 *        text:"This is a simple sticky note",
 *        color:"#000000",
 *        padding:20
 *     });
 *
 *     canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Label
 */
import draw2d from '../../packages'

draw2d.shape.note.PostIt = draw2d.shape.basic.Label.extend({

  NAME: "draw2d.shape.note.PostIt",

  /**
   * @constructs
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.setStroke(1)
    this.setBackgroundColor("#5b5b5b")
    this.setColor("#FFFFFF")
    this.setFontColor("#ffffff")
    this.setFontSize(14)
    this.setPadding(5)
    this.setRadius(5)
  }
})



