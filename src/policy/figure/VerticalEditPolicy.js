
/**
 * @class
 *
 * An EditPolicy for use with Figures. With this edit policy you can move the shape only in a vertical manner.
 *
 *
 * @example
 *      // add some demo figure to the canvas
 *      var circle =new draw2d.shape.basic.Circle({diameter:50, x:10, y:30});
 *      canvas.add(circle);
 *
 *      // add the edit policy to the shape. At this point you can move the shape only
 *      // horizontal
 *      circle.installEditPolicy(new draw2d.policy.figure.VerticalEditPolicy());
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.VerticalEditPolicy = draw2d.policy.figure.DragDropEditPolicy.extend(
    /** @lends draw2d.policy.figure.VerticalEditPolicy.prototype */
    {
    
    NAME: "draw2d.policy.figure.VerticalEditPolicy",

    /**
     * Creates a new constraint object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },


    /**
     *
     * It is only possible to drag&drop the element in a vertical line
     *
     * @param {draw2d.Figure} figure
     * @param {Number|draw2d.geo.Point} x
     * @param {number} [y]
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    adjustPosition: function(figure, x, y)
    {
        return new draw2d.geo.Point(figure.getX(),y);
    }

});
