/**
 * @class draw2d.policy.canvas.SelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.SelectionPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

  NAME: "draw2d.policy.canvas.SelectionPolicy",

  /**
   * @constructor
   * Creates a new selection policy
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  /**
   * @method
   * Selects the given figure within the canvas. The policy must unselect already selected
   * figures or show any decorations.
   *
   * @param {draw2d.Canvas} canvas
   * @param {draw2d.Figure} figure
   *
   */
  select: function (canvas, figure) {
  },

  /**
   * @method
   * Unselect the given figure in the canvas and remove all resize handles
   *
   * @param {draw2d.Canvas} canvas
   * @param {draw2d.Figure} figure
   */
  unselect: function (canvas, figure) {
    canvas.getSelection().remove(figure)

    figure.unselect()

    // @since 6.1.42
    canvas.fireEvent("unselect", {figure: figure})
  }
})





