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

draw2d.policy.figure.SelectionFeedbackPolicy = draw2d.policy.figure.SelectionPolicy.extend(
  /** @lends draw2d.policy.figure.SelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.SelectionFeedbackPolicy",

  /**
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * 
   *
   * @param {draw2d.Figure} figure the unselected figure
   */
  onUnselect: function (canvas, figure) {
    this._super(canvas, figure)

    figure.selectionHandles.each( (i, e) => e.hide())
    figure.selectionHandles = new draw2d.util.ArrayList()
  },

  /**
   * 
   * Called by the host if the policy has been installed.
   *
   * @param {draw2d.Figure} figure
   */
  onInstall: function (figure) {
    this._super(figure)

    let canvas = figure.getCanvas()
    if (canvas !== null) {
      if (canvas.getSelection().contains(figure)) {
        this.onSelect(canvas, figure, true)
      }
    }
  },


  /**
   * 
   * Called by the host if the policy has been uninstalled.
   *
   * @param {draw2d.Figure} figure
   */
  onUninstall: function (figure) {
    this._super(figure)

    figure.selectionHandles.each( (i, e) => e.hide())
    figure.selectionHandles = new draw2d.util.ArrayList()
  }

})
