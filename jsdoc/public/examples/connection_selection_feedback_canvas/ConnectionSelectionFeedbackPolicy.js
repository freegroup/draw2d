/**
 * Custom SelectionPolicy that provides enhanced visual feedback for selected connections.
 * When a connection is selected:
 * - Stroke width is doubled
 * - Color becomes lighter/brighter
 * - Outline stroke is added for better visibility
 * 
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
var ConnectionSelectionFeedbackPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({
  NAME: "ConnectionSelectionFeedbackPolicy",
  
  /**
   * Called when a figure is selected. Applies custom visual feedback for connections.
   * 
   * @param {draw2d.Canvas} canvas - The canvas containing the figure
   * @param {draw2d.Figure} figure - The figure being selected
   */
  select: function(canvas, figure) {
    this._super(canvas, figure);
    
    // Apply custom visual feedback for connections
    if (figure instanceof draw2d.Connection) {
      // Store all original values in a state object
      figure._stateBeforeSelect = {
        stroke: figure.getStroke(),
        color: figure.getColor(),
        outlineStroke: figure.getOutlineStroke(),
        outlineColor: figure.getOutlineColor()
      };
      
      // Apply selection feedback using attr() for multiple properties at once
      figure.attr({
        stroke: figure._stateBeforeSelect.stroke * 4,
        color: figure._stateBeforeSelect.color.lighter(0.6),
        outlineStroke: 3,
        outlineColor: new draw2d.util.Color("#000000")
      });
    }
  },
  
  /**
   * Called when a figure is unselected. Restores the original appearance.
   * 
   * @param {draw2d.Canvas} canvas - The canvas containing the figure
   * @param {draw2d.Figure} figure - The figure being unselected
   */
  unselect: function(canvas, figure) {
    // Restore all original values from the state object
    if (figure instanceof draw2d.Connection && figure._stateBeforeSelect) {
      figure.attr(figure._stateBeforeSelect);
      delete figure._stateBeforeSelect;
    }
    
    this._super(canvas, figure);
  }
});
