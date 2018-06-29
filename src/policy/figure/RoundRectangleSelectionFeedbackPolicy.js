
/**
 * @class draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy
 *
 * See the example:
 *
 *       @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.RoundRectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.RectangleSelectionFeedbackPolicy
 */
import draw2d from '../../packages';

draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
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
     * @param {Boolean} isPrimarySelection
     */
    onSelect: function(canvas,figure, isPrimarySelection)
    {

        this._super(canvas,figure, isPrimarySelection);

        if(!figure.selectionHandles.isEmpty())
        {
            figure.selectionHandles.each(function(i,e){
               e.setDimension(12,12);
               e.setRadius(4);
            });
        }
        this.moved(canvas,figure);
   }
});
