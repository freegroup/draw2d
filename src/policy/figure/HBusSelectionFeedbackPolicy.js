
/**
 * @class
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.BusSelectionFeedbackPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.HBusSelectionFeedbackPolicy = draw2d.policy.figure.BusSelectionFeedbackPolicy.extend(
    /** @lends draw2d.policy.figure.HBusSelectionFeedbackPolicy.prototype */
    {
    
    NAME: "draw2d.policy.figure.HBusSelectionFeedbackPolicy",
    /**
     * Creates a new Router object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },

    /**
     * 
     * Callback if the figure has been moved
     *
     * @param figure
     *
     * @template
     */
    moved: function(canvas, figure){
        if(figure.selectionHandles.isEmpty()){
            return; // silently
        }
        var r4= figure.selectionHandles.find(function(handle){return handle.type===4});
        var r8= figure.selectionHandles.find(function(handle){return handle.type===8});

        r4.setDimension(r4.getWidth(), figure.getHeight());
        r8.setDimension(r4.getWidth(), figure.getHeight());

        this._super(canvas,figure);
     }


});
