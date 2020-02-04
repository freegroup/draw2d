/**
 * @class draw2d.shape.basic.Diamond
 * A Diamond Figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let d1 =  new draw2d.shape.basic.Diamond({x:10,y:10});
 *     let d2 =  new draw2d.shape.basic.Diamond({x:100,y:10, bgColor:"#f0f000", alpha:0.7, width:100, height:60});
 *
 *     canvas.add(d1);
 *     canvas.add(d2);
 *
 *     canvas.setCurrentSelection(d2);
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
import draw2d from '../../packages'

draw2d.shape.basic.Diamond = draw2d.shape.basic.Polygon.extend(
  /** @lends draw2d.shape.basic.Diamond.prototype */
  {
  
  NAME: "draw2d.shape.basic.Diamond",

  /**
   * @constructs
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({bgColor: "#00a3f6", color: "#1B1B1B"}, attr), setter, getter)

    let pos = this.getPosition()

    this.resetVertices()

    let box = this.getBoundingBox()
    this.addVertex(box.w / 2, 0)       // Go to the top center..
    this.addVertex(box.w, box.h / 2) // ...draw line to the right middle
    this.addVertex(box.w / 2, box.h)   // ...bottom center...
    this.addVertex(0, box.h / 2) // ...left middle...

    // override the selection handler from the polygon. Because the vertices of
    // the diamond are not selectable and modifiable
    //
    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())

    this.setPosition(pos)
  }


})
