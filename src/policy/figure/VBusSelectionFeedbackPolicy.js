
/**
 * @class
 *
 * Selection feedback policy for vertical bus figures.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.BusSelectionFeedbackPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.VBusSelectionFeedbackPolicy = draw2d.policy.figure.BusSelectionFeedbackPolicy.extend(
    /** @lends draw2d.policy.figure.VBusSelectionFeedbackPolicy.prototype */
    {
    
    NAME: "draw2d.policy.figure.VBusSelectionFeedbackPolicy",
    /**
     * Creates a new Router object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },


  /**
   * 
   * Called by the framework of the Policy should show a resize handle for the given shape
   *
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    if (figure.selectionHandles.isEmpty()) {
      let r2 = this.createResizeHandle(figure, 2) // 2 = CENTER_TOP
      let r6 = this.createResizeHandle(figure, 6) // 6 = CENTER_BOTTOM

      figure.selectionHandles.add(r2, r6)

      r2.setDraggable(figure.isResizeable())
      r6.setDraggable(figure.isResizeable())

      r2.show(canvas)
      r6.show(canvas)
    }
    this.moved(canvas, figure)
  },
    /**
     *
     * Callback if the figure has been moved
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     *
     **/
    moved: function(canvas,figure)
    {
        if(figure.selectionHandles.isEmpty()){
            return; // silently
        }

        let r2= figure.selectionHandles.find( handle => handle.type===2);
        let r6= figure.selectionHandles.find( handle => handle.type===6);

        let objWidth = figure.getWidth();
        // adjust the resize handles on the left/right to the new dimension of the shape
        //
        r2.setDimension(objWidth, r2.getHeight());
        r6.setDimension(objWidth, r6.getHeight());

        this._super(canvas,figure);
     }

});
