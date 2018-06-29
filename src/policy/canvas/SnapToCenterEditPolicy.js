

/**
 * @class draw2d.policy.canvas.SnapToCenterEditPolicy
 *
 * Snapping is based on the existing children of a container. When snapping a shape,
 * the center of the bounding box will snap to the center of other figures of the given canvas.
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 * @since 5.6.4
 */
import draw2d from '../../packages';

draw2d.policy.canvas.SnapToCenterEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend({

    NAME : "draw2d.policy.canvas.SnapToCenterEditPolicy",

    SNAP_THRESHOLD   : 5,
    FADEOUT_DURATION : 500,

    /**
     * @constructor
     * Creates a new constraint policy for snap to geometry
     *
     */
    init: function( attr, setter, getter)
    {
        this._super(attr, setter, getter);

        this.centers=null;

        this.horizontalGuideLines = null;
        this.verticalGuideLines = null;
    },

    /**
     * @method
     *
     * @param {draw2d.Figure} figure the shape below the mouse or null
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseUp: function(figure, x, y, shiftKey, ctrlKey)
    {
        this.centers=null;
        this.hideHorizontalGuides(false);
        this.hideVerticalGuides(false);
    },

    /**
     * @method
     * Adjust the coordinates to the canvas neighbours
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the figure to snap
     * @param {draw2d.geo.Point} modifiedPos the already modified position of the figure (e.g. from an another Policy)
     * @param {draw2d.geo.Point} originalPos the original requested position of the figure
     *
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    snap: function(canvas, figure, modifiedPos, originalPos)
    {
        // do nothing for resize handles
        if(figure instanceof draw2d.ResizeHandle) {
           return modifiedPos;
        }

        // do nothing for lines
        if(figure instanceof draw2d.shape.basic.Line) {
            return modifiedPos;
        }



        var allowXChanges = modifiedPos.x=== originalPos.x;
        var allowYChanges = modifiedPos.y=== originalPos.y;

        var inputBounds = new draw2d.geo.Rectangle(modifiedPos.x,modifiedPos.y, figure.getWidth(), figure.getHeight());
        var inputCenter = inputBounds.getCenter();

        modifiedPos = modifiedPos.clone();

        if(allowXChanges===true) {
            var horizontal = this.snapHorizontal(inputCenter);

            // Show a horizontal line if the snapper has modified the inputPoint
            //
            if (horizontal.snapped) {
                // show the snap lines..
                this.showHorizontalGuides(figure, horizontal);

                // and snap the x coordinate
                modifiedPos.y += horizontal.diff;
            }
            else {
                this.hideHorizontalGuides(true);
            }
        }
        else{
            this.hideHorizontalGuides(true);
        }

        if(allowYChanges===true) {
            var vertical = this.snapVertical(inputCenter);

            // Show a vertical guides if the snapper has modified the inputPoint
            //
            if (vertical.snapped) {
                // show the snap lines..
                this.showVerticalGuides(figure, vertical);

                // and snap the x coordinate
                modifiedPos.x += vertical.diff;
            }
            else {
                this.hideVerticalGuides(true);
            }
        }
        else{
            this.hideVerticalGuides(true);
        }

        return modifiedPos;
    },


    snapVertical: function( center  )
    {
        var _this = this;
        if(this.centers===null) {
            this.populateCenters();
        }

        var result = {
            point:center,
            snapped:false,
            diff : 0
        };


        var candidates= [];
        this.centers.forEach(function( point){
            if(Math.abs(point.x - center.x)<_this.SNAP_THRESHOLD){
                candidates.push(point);
            }
        });

        // we can abort if we didn't find an intersection on the right hand side
        if(candidates.length===0){
            return result;
        }

        // sort the intersection point and get the closest point to the tested inputPoint
        // In this case it is the point with the greates X coordinate
        //
        candidates.sort(function(a, b) {
            return a.x - b.x;
        });

        var diff = candidates[0].x -center.x;
        var snappedPoint = center.clone();
        snappedPoint.x +=diff;
        return {snapped: true, diff:diff, point:candidates[0], snappedPoint:snappedPoint};
    },



    snapHorizontal: function( center  )
    {
        var _this = this;
        if(this.centers===null) {
            this.populateCenters();
        }

        var result = {
            point:center,
            snapped:false,
            diff : 0
        };


        var candidates= [];
        this.centers.forEach(function( point){
            if(Math.abs(point.y - center.y)<_this.SNAP_THRESHOLD){
                candidates.push(point);
            }
        });

        // we can abort if we didn't find an intersection on the right hand side
        if(candidates.length===0){
            return result;
        }

        // sort the intersection point and get the closest point to the tested inputPoint
        // In this case it is the point with the greatest X coordinate
        //
        candidates.sort(function(a, b) {
            return a.y - b.y;
        });

        var diff = candidates[0].y -center.y;
        var snappedPoint = center.clone();
        snappedPoint.y +=diff;
        return {snapped: true, diff:diff, point:candidates[0], snappedPoint:snappedPoint};
    },

    populateCenters: function()
    {
       var selection = this.canvas.getSelection().getAll(true);
       var centers = this.centers = [];

       var figures = this.canvas.getFigures();
       figures.each(function(index, figure){
          if(!selection.contains(figure)){
             centers.push(figure.getBoundingBox().getCenter());
         }
       });
    },

    showHorizontalGuides: function(causedFigure, constraint)
    {
        if(this.horizontalGuideLines!==null){
            this.horizontalGuideLines.stop();
            this.horizontalGuideLines.remove();
        }

        var start  = constraint.point;
        var end    = constraint.snappedPoint;

        this.canvas.paper.setStart();

        // horizontal lines
        //
        this.canvas.paper.path("M " + (start.x)  + " "+((start.y|0)+0.5)+" L "+(end.x)+ " "  + ((end.y|0)+0.5)).attr({"stroke":this.lineColor.hash(),"stroke-width":1});

        this.horizontalGuideLines = this.canvas.paper.setFinish();
        this.horizontalGuideLines.toFront();
    },

    /**
     * @method
     * Hide the horizontal snapüing guides
     *
     * @param soft
     */
    hideHorizontalGuides: function( fast)
    {
        if(this.horizontalGuideLines===null){
            return;
        }
        if(fast===true) {
            if (this.horizontalGuideLines !== null) {
                this.horizontalGuideLines.remove();
                this.horizontalGuideLines = null;
            }
        }
        else {
            this.horizontalGuideLines.animate(
                {opacity: 0.1},
                this.FADEOUT_DURATION,
                $.proxy(function () {
                    if (this.horizontalGuideLines !== null) {
                        this.horizontalGuideLines.remove();
                        this.horizontalGuideLines = null;
                    }
                }, this)
            );
        }
    },


    showVerticalGuides: function(causedFigure, constraint)
    {
        if(this.verticalGuideLines!==null){
            this.verticalGuideLines.stop();
            this.verticalGuideLines.remove();
        }

        var start  = constraint.point;
        var end    = constraint.snappedPoint;

        this.canvas.paper.setStart();

        // horizontal lines
        //
        this.canvas.paper.path("M " + ((start.x|0)+0.5)  + " "+(start.y)+" L "+((end.x|0)+0.5)+ " "  + (end.y)).attr({"stroke":this.lineColor.hash(),"stroke-width":1});


        this.verticalGuideLines = this.canvas.paper.setFinish();
        this.verticalGuideLines.toFront();
    },

    /**
     * @method
     * Hide the horizontal snapüing guides
     *
     * @param soft
     */
    hideVerticalGuides: function( fast)
    {
        if(this.verticalGuideLines===null){
            return;
        }
        if(fast===true) {
            if (this.verticalGuideLines !== null) {
                this.verticalGuideLines.remove();
                this.verticalGuideLines = null;
            }
        }
        else {
            this.verticalGuideLines.animate(
                {opacity: 0.1},
                this.FADEOUT_DURATION,
                $.proxy(function () {
                    if (this.verticalGuideLines !== null) {
                        this.verticalGuideLines.remove();
                        this.verticalGuideLines = null;
                    }
                }, this)
            );
        }
    }
});
