import draw2d from '../../packages'


/**
 * @class
 * Abstract base class for selection policies. Controls how figures are selected and unselected,
 * including visual feedback and selection behavior.
 * 
 * **Important:** Only one SelectionPolicy can be active at a time. When installing a new 
 * SelectionPolicy, all other SelectionPolicies are automatically removed from the canvas 
 * to avoid conflicts.
 * 
 * Concrete implementations:
 * - {@link draw2d.policy.canvas.SingleSelectionPolicy} - Single selection behavior
 * - {@link draw2d.policy.canvas.BoundingboxSelectionPolicy} - Multiple selection via bounding box
 * - {@link draw2d.policy.canvas.ReadOnlySelectionPolicy} - Selection without editing
 * 
 * When creating custom selection policies, extend from SingleSelectionPolicy or 
 * BoundingboxSelectionPolicy instead of this base class to inherit complete 
 * selection/deselection logic and mouse event handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SelectionPolicy = draw2d.policy.canvas.CanvasPolicy.extend(
  /** @lends draw2d.policy.canvas.SelectionPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.SelectionPolicy",

  /**
   * Creates a new selection policy instance.
   * 
   * @param {Object} [attr]
   * @param {Object} [setter]
   * @param {Object} [getter]
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  /**
   * Selects the given figure. Must be implemented by subclasses to define
   * specific selection behavior (single, multi, etc.) and visual feedback.
   * 
   * @param {draw2d.Canvas} canvas
   * @param {draw2d.Figure} figure - The figure to select, or null to clear selection
   * @abstract
   * @template
   */
  select: function (canvas, figure) {
  },

  /**
   * Unselects the given figure and removes all visual feedback.
   * 
   * @param {draw2d.Canvas} canvas
   * @param {draw2d.Figure} figure
   * @fires draw2d.Canvas#unselect
   * @since 6.1.42
   */
  unselect: function (canvas, figure) {
    canvas.getSelection().remove(figure)

    figure.unselect()

    // @since 6.1.42
    canvas.fireEvent("unselect", {figure: figure})
  }
})





