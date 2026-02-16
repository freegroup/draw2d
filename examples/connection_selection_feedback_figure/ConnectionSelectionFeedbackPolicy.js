/**
 * A custom SelectionFeedbackPolicy for connections.
 * Extends LineSelectionFeedbackPolicy to add visual feedback (color, stroke, outline)
 * while keeping the standard resize handles functionality.
 * 
 * @extends draw2d.policy.line.LineSelectionFeedbackPolicy
 */
var ConnectionSelectionFeedbackPolicy = draw2d.policy.line.LineSelectionFeedbackPolicy.extend({
  
  NAME: "ConnectionSelectionFeedbackPolicy",

  /**
   * Constructor
   */
  init: function(attr, setter, getter) {
    this._super(attr, setter, getter);
  },

  /**
   * Called when the figure is selected.
   * Store original attributes and apply selection feedback.
   * 
   * @param {draw2d.Canvas} canvas - The canvas
   * @param {draw2d.Figure} figure - The figure being selected (should be a Connection)
   * @param {Boolean} isPrimarySelection - Whether this is the primary selection
   */
  onSelect: function(canvas, figure, isPrimarySelection) {
    this._super(canvas, figure, isPrimarySelection);
    
    // Store original state if not already stored
    if (!figure._selectionFeedbackState) {
      figure._selectionFeedbackState = {
        stroke: figure.getStroke(),
        color: figure.getColor(),
        outlineStroke: figure.getOutlineStroke(),
        outlineColor: figure.getOutlineColor()
      };
    }

    // Apply selection feedback
    var originalColor = figure._selectionFeedbackState.color;
    var originalStroke = figure._selectionFeedbackState.stroke;
    
    // Make color lighter (60% lighter) - originalColor is already a Color object
    var lighterColor = originalColor.lighter(0.6);
    
    // Apply the visual feedback using attr() for batch update
    figure.attr({
      stroke: originalStroke * 2,        // Double the stroke width
      color: lighterColor,               // Lighter color
      outlineStroke: 3,                  // Add outline
      outlineColor: "#000000"            // Black outline
    });
  },

  /**
   * Called when the figure is unselected.
   * Restore original attributes.
   * 
   * @param {draw2d.Canvas} canvas - The canvas
   * @param {draw2d.Figure} figure - The figure being unselected
   */
  onUnselect: function(canvas, figure) {
    this._super(canvas, figure);
    
    // Restore original attributes if we have stored state
    if (figure._selectionFeedbackState) {
      // Restore original attributes using attr() for batch update
      figure.attr({
        stroke: figure._selectionFeedbackState.stroke,
        color: figure._selectionFeedbackState.color,
        outlineStroke: figure._selectionFeedbackState.outlineStroke,
        outlineColor: figure._selectionFeedbackState.outlineColor
      });
      
      // Clean up stored state
      delete figure._selectionFeedbackState;
    }
  },

});