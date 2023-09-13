import draw2d from '../../packages'


/**
 * @class
 *
 * A SelectionFeedbackPolicy with resize handles (rectangles) on each side and corner of the shape
 *
 *
 * @example
 *
 *      circle =new draw2d.shape.basic.Circle({diameter:50});
 *      circle.installEditPolicy(new draw2d.policy.RectangleSelectionFeedbackPolicy());
 *      canvas.add(circle,90,50);
 *
 *      canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.RaftSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.RaftSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.RaftSelectionFeedbackPolicy",


  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  createResizeHandle: function (owner, type){
    return new draw2d.shape.composite.RaftResizeHandle({ owner:owner, type:type, width:10, height:10 });
  }
})
