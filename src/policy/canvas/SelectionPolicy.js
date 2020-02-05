import draw2d from '../../packages'


/**
 * @class draw2d.policy.canvas.SelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SelectionPolicy = draw2d.policy.canvas.CanvasPolicy.extend(
  /** @lends draw2d.policy.canvas.SelectionPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.SelectionPolicy",

  /**
   * Creates a new selection policy
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  /**
   *
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
   *
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





