/**
 * @class draw2d.decoration.connection.DiamondDecorator
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *     c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.DiamondDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extend draw2d.decoration.connection.Decorator
 */
import draw2d from '../../packages';


draw2d.decoration.connection.DiamondDecorator = draw2d.decoration.connection.Decorator.extend({

	NAME : "draw2d.decoration.connection.DiamondDecorator",

	/**
	 * @constructs
	 *
	 * @param {Number} [width] the width of the arrow
	 * @param {Number} [height] the height of the arrow
	 */
	init: function(width, height)
	{
        this._super( width, height);
	},

	/**
	 * Draw a filled diamond decoration.
	 *
	 * It's not your work to rotate the arrow. The draw2d do this job for you.
	 *
	 * @param {Raphael} paper the raphael paper object for the paint operation
	 **/
	paint: function(paper)
	{
		var st = paper.set();

		st.push(
	        paper.path(["M", this.width/2," " , -this.height/2,  // Go to the top center..
	                    "L", this.width  , " ", 0,               // ...draw line to the right middle
	                    "L", this.width/2, " ", this.height/2,   // ...bottom center...
	                    "L", 0           , " ", 0,               // ...left middle...
	                    "L", this.width/2, " ", -this.height/2,  // and close the path
	                    "Z"].join(""))
		);

		st.attr({fill:this.backgroundColor.rgba(),stroke:this.color.rgba()});
		return st;
	}

});

