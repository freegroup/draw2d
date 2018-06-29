/**
 * @class draw2d.decoration.connection.Decorator
 *
 *
 * @inheritable
 * @author Andreas Herz
 */
import draw2d from '../../packages';


draw2d.decoration.connection.Decorator = Class.extend({

	NAME : "draw2d.decoration.connection.Decorator",

	/**
	 * @constructor
	 */
	init: function(width, height) {

        if(typeof width === "undefined" || width<1){
            this.width  = 20;
        }
        else{
            this.width = width;
        }

        if(typeof height === "undefined" || height<1){
            this.height = 15;
        }
        else{
            this.height = height;
        }

		this.color = new draw2d.util.Color(0, 0, 0);
		this.backgroundColor = new  draw2d.util.Color(250, 250, 250);
	},

	/**
	 * @method
	 * Paint the decoration for a connector. The Connector starts always in
	 * [0,0] and ends in [x,0].
	 * It is not necessary to consider any rotation of the connection. This will be done by the
	 * framework.
	 *
	 * <pre>
	 *                | -Y
	 *                |
	 *                |
	 *  --------------+-----------------------------&gt; +X
	 *                |
	 *                |
	 *                |
	 *                V +Y
	 *
	 *
	 * </pre>
	 *
	 * See in ArrowConnectionDecorator for example implementation.
	 * @param {Raphael} paper
	 */
	paint: function(paper) {
		// do nothing per default
	},

	/**
	 * @method
	 * Set the stroke color for the decoration
	 *
	 * @param {draw2d.util.Color|String} c
	 */
	setColor: function(c) {
		this.color = new draw2d.util.Color(c);

		return this;
	},

	/**
	 * @method
	 * Set the background color for the decoration
	 *
	 * @param {draw2d.util.Color|String} c
	 */
	setBackgroundColor: function(c) {
		this.backgroundColor = new draw2d.util.Color(c);

		return this;
	},

	/**
	 * @method
     * Change the dimension of the decoration shape
     *
     * @param {Number} width  The new width of the decoration
     * @param {Number} height The new height of the decoration
     **/
    setDimension: function( width, height)
    {
        this.width=width;
        this.height=height;

        return this;
    }

});
