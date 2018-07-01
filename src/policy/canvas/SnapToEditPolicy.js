import draw2d from '../../packages';
import extend from '../../util/extend';

draw2d.SnapToHelper = {};

draw2d.SnapToHelper.NORTH   =  1;
draw2d.SnapToHelper.SOUTH   =  4;
draw2d.SnapToHelper.WEST    =  8;
draw2d.SnapToHelper.EAST    = 16;
draw2d.SnapToHelper.CENTER_H= 32;
draw2d.SnapToHelper.CENTER_V= 642;

draw2d.SnapToHelper.NORTH_EAST  = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST  = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST  = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST  = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST   = draw2d.SnapToHelper.EAST | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW        = draw2d.SnapToHelper.NORTH_SOUTH | draw2d.SnapToHelper.EAST_WEST;

/**
 * @class draw2d.policy.canvas.SnapToEditPolicy
 *
 * A helper used by Tools for snapping certain mouse interactions.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SnapToEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.SnapToEditPolicy",

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     */
    init: function( attr, setter, getter)
    {
        this.lineColor = null;

        this._super(
            extend({
                lineColor: "#51C1FC"
            },attr),
            extend({
                /** @attr {draw2d.util.Color} color the line color of the snapTo lines */
                lineColor : this.setLineColor
            }, setter),
            extend({
                lineColor : this.getLineColor
            }, getter));
    },

    /**
     * @method
     * Set the color of the snap line.
     *
     *      // Alternatively you can use the attr method:
     *      policy.attr({
     *        lineColor: color
     *      });
     *
     * @param {draw2d.util.Color|String} color The new color of the line.
     **/
    setLineColor: function( color)
    {
        this.lineColor = new draw2d.util.Color(color);
        return this;
    },

    /**
     * @method
     * Return the current paint color.
     *
     * @return {draw2d.util.Color} The paint color of the line.
     * @since 5.6.1
     **/
    getLineColor: function()
    {
        return this.lineColor;
    },


    /**
     * @method
     * Adjust the coordinates to the given constraint of the policy.
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the figure to snap
     * @param {draw2d.geo.Point} modifiedPos the already modified position of the figure (e.g. from an another Policy)
     * @param {draw2d.geo.Point} originalPos the original requested position of the figure
     */
    snap: function(canvas, figure, modifiedPos, originalPos)
    {
        return modifiedPos;
    }
});
