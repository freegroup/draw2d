/**
 * Custom Router that extends DirectRouter but does NOT install a default SelectionFeedbackPolicy.
 * This allows connections to keep their own custom SelectionFeedbackPolicy.
 * 
 * @extends draw2d.layout.connection.DirectRouter
 */
var MyRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
  
  NAME: "MyRouter",

  /**
   * Override onInstall to install our custom ConnectionSelectionFeedbackPolicy
   * instead of the default LineSelectionFeedbackPolicy.
   * 
   * @param {draw2d.Connection} connection - The connection this router is installed on
   */
  onInstall: function(connection) {
    // Install our custom SelectionFeedbackPolicy instead of LineSelectionFeedbackPolicy
    connection.installEditPolicy(new ConnectionSelectionFeedbackPolicy());
  }
});