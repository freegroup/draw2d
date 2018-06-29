
/**
 * @class draw2d.policy.line.LineSelectionFeedbackPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
import draw2d from '../../packages';

draw2d.policy.line.LineSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.line.LineSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new selection feedback policy for a line or connection
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Boolean} [isPrimarySelection]
     */
    onSelect: function(canvas, figure, isPrimarySelection)
    {
        if(figure.selectionHandles.isEmpty()){
            figure.selectionHandles.add( new draw2d.shape.basic.LineStartResizeHandle(figure));
            figure.selectionHandles.add( new draw2d.shape.basic.LineEndResizeHandle(figure));

            figure.selectionHandles.each(function(i,e){
                e.setDraggable(figure.isResizeable());
                e.show(canvas);
            });
        }
        this.moved(canvas, figure);
    },

    /**
     * @method
     * Callback method if the figure has been moved.
     *
     * @template
     */
    moved: function(canvas,figure)
    {
    	figure.selectionHandles.each(function(i,e){
            e.relocate();
        });
    }

});
