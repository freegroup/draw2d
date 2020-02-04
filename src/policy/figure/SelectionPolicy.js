/**
 * @class draw2d.policy.figure.SelectionFeedbackPolicy
 *
 * A {@link  draw2d.policy.SelectionFeedbackPolicy} that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.SelectionPolicy = draw2d.policy.figure.DragDropEditPolicy.extend(
  /** @lends draw2d.policy.figure.SelectionPolicy.prototype */
  {
  
  NAME: "draw2d.policy.figure.SelectionPolicy",

  /**
   *
   * @constructs
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   *
   *
   * @template
   * @param figure
   * @param isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
  },


  /**
   *
   *
   * @param {draw2d.Figure} figure the unselected figure
   */
  onUnselect: function (canvas, figure) {
  }

})
