/**
 * @class draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy
 *
 *
 * @example
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy",

  /**
   * Creates a new Router object
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },



  createResizeHandle: function (owner, type){
    return new draw2d.ResizeHandle({ owner:owner, type:type, width:15, height:15 });
  }

})
