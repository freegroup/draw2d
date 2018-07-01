/**
 * @class draw2d.shape.flowchart.Document
 * 
 * Typical flowchart <b>Document</b> shape
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure = new draw2d.shape.flowchart.Document({
 *        x:100,
 *        y:60
 *     });
 *     
 *     canvas.add( figure);
 *     
 * @extends draw2d.VectorFigure
 */ import draw2d from '../../packages';
draw2d.shape.flowchart.Document = draw2d.VectorFigure.extend({
	NAME : "draw2d.shape.flowchart.Document",

	/**
	 *
	 * @constructor
	 * Creates a new figure element which are not assigned to any canvas.
	 *
	 * @param {Object} [attr] the configuration of the shape
	 */
	init: function(attr, setter, getter) {
		this.amplitude = 0.08; // percentage of height

		this._super(extend({
			width : 80,
			height : 50,
			bgColor : "#2196f3",
			color : "#1B1B1B",
			stroke :1
		}, attr), setter, getter);
	},

    /**
     * @inheritdoc
     */
    createShapeElement: function()
    {
    	return this.canvas.paper.path(this.calcPath());
	},
	
	calcPath: function()
	{
        var w  = this.getWidth();
        var h  = this.getHeight();
		var w2 = w / 2;
		var w4 = w / 4;
        var h2 = (h*this.amplitude)|0;
        

		return [
			"M", this.getAbsoluteX(), ",", this.getAbsoluteY(), 
			"l", w, ",", 0, 
			"l", 0, ",", h-h2,
			"q", -w4, ",", -h2, -w2, ",", 0,
			"q", -w4, ",",  h2, -w2, ",", 0,
			"z"].join(" ");
	},
	
    /**
     * @inheritdoc
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
        
        attributes =extend({},{
            path : this.calcPath()
        },attributes);

        this._super(attributes);
        
        return this;
    }
	/*
	function draw_curve(Ax, Ay, Bx, By, M) {

    // Find midpoint J
    var Jx = Ax + (Bx - Ax) / 2
    var Jy = Ay + (By - Ay) / 2

    // We need a and b to find theta, and we need to know the sign of each to make sure that the orientation is correct.
    var a = Bx - Ax
    var asign = (a < 0 ? -1 : 1)
    var b = By - Ay
    var bsign = (b < 0 ? -1 : 1)
    var theta = Math.atan(b / a)

    // Find the point that's perpendicular to J on side
    var costheta = asign * Math.cos(theta)
    var sintheta = asign * Math.sin(theta)

    // Find c and d
    var c = M * sintheta
    var d = M * costheta

    // Use c and d to find Kx and Ky
    var Kx = Jx - c
    var Ky = Jy + d

    return "M" + Ax + "," + Ay +
           "Q" + Kx + "," + Ky +
           " " + Bx + "," + By
   }*/
});
