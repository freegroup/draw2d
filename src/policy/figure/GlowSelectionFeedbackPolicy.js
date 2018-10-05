/**
 * @class draw2d.policy.figure.GlowSelectionFeedbackPolicy
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label("Click on the circle to see the selection feedback"),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.GlowSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

  NAME: "draw2d.policy.figure.GlowSelectionFeedbackPolicy",

  /**
   * @constructor
   * Creates a new Router object
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * @method
   * Called by the framework of the Policy should show a resize handle for the given shape
   *
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    figure.setGlow(true)
    this.moved(canvas, figure)
  },


  /**
   * @method
   *
   * @param {draw2d.Figure} figure the unselected figure
   */
  onUnselect: function (canvas, figure) {
    this._super(canvas, figure)
    figure.setGlow(false)
  }

})
