var TimerFigure = draw2d.SetFigure.extend({

    init : function(attr, setter, getter)
    {
    	this.degree = 0;
        this.shapeWidth = 100;
        this.shapeHeight = 100;

    	this._super($.extend({width:this.shapeWidth, height:this.shapeHeight},attr), setter, getter);

        this.startTimer(100);
    },

    /**
     * @method
     * Create the additional elements for the figure
     * 
     */
    createSet: function(){
    	var paper = this.canvas.paper;
        var set = paper.set();

        this.rect = paper.rect(0, 0, this.shapeWidth, this.shapeHeight);
        this.rect.attr({fill:"#3d3d6d"});
        this.line = paper.path("M0 0 l0 0");
        this.circle = paper.circle(0, 0, 4);
        
        set.push(this.line);
        set.push(this.circle);
        set.push(this.rect);
        
        return set;
    },


    /**
     * @method
     * Private callback method for the internal timer.
     * 
     * Creates a rotating line that follows the rectangle's edge and extends 3px beyond it.
     * Uses draw2d.geo utilities for clean intersection calculation.
     * 
     * Algorithm:
     * 1. Create a long line from center in the current rotation direction
     * 2. Calculate intersection with rectangle using draw2d.geo.Rectangle.intersectionWithLine()
     * 3. Extend the intersection point 3px beyond the edge
     * 
     * @private
     */
    onTimer:function(){
        this.degree = (this.degree + 2) % 360;

        // Get the bounding box and convert to local coordinates (0,0 origin)
        var bbox = new draw2d.geo.Rectangle(0, 0, this.shapeWidth, this.shapeHeight);
        var center = bbox.getCenter();
        // Convert degree to radians and calculate direction vector
        var rad = (this.degree * Math.PI) / 180;
        var dx = Math.cos(rad);
        var dy = Math.sin(rad);
        
        // Create a long line from center in the direction (longer than rectangle diagonal)
        let farEnd = center.translated(dx * 500, dy * 500)
        
        // Use draw2d.geo.Rectangle to find intersection with rectangle edge
        var intersections = bbox.intersectionWithLine(center, farEnd);
        
        if (intersections.getSize() > 0) {
            // Get the first intersection point (should be only one from center outward)
            let edgePoint = intersections.get(0);
            
            // Extend 3px beyond the edge in the same direction
            let endPoint = draw2d.geo.Util.insetPoint( edgePoint, center, -10)
     
            // Create path from center to extended point
            var path = ["M", center.x, center.y, "L", endPoint.x, endPoint.y].join(" ");
            
            this.line.attr({
                stroke: "#f03d3d", 
                "stroke-width": 3,
                path: path
            });
            
            this.circle.attr({
                cx: endPoint.x,
                cy: endPoint.y,
                fill: "#f03d3d",
                stroke: "none"
            });
        }
    }

});