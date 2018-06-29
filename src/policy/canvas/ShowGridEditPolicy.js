
/**
 * @class draw2d.policy.canvas.ShowGridEditPolicy
 * 
 * A cavas decoration which paints a grid in the background.
 * <br>
 * <br>
 * See the example:
 *
 *     @example preview small frame
 *
 *     canvas.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
 *     var shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with grid background."});
 *
 *     canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 * 
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
import draw2d from '../../packages';

draw2d.policy.canvas.ShowGridEditPolicy = draw2d.policy.canvas.DecorationPolicy.extend({

    NAME : "draw2d.policy.canvas.ShowGridEditPolicy",
    
    GRID_COLOR  : "#f0f0f0",
    GRID_WIDTH  : 20,
    
    /**
     * @constructor 
     * Creates a new constraint policy for snap to grid
     * 
     * @param {Number} [grid] the grid width of the canvas
     */
    init: function( grid)
    {
        this.color = new draw2d.util.Color(this.GRID_COLOR);
        this.zoom=1;
        this.svg = null;

        this._super();

        if(typeof grid ==="number"){
            this.grid = grid;
        }
        else{
            this.grid = this.GRID_WIDTH;
        }
    },
	
	onInstall: function(canvas)
	{
        this._super(canvas);
	    this.zoom = canvas.getZoom();
        this.setGrid(this.grid);
	},
	
	onUninstall: function(canvas)
	{
        this._super(canvas);
        if(this.svg  !==null){
            this.svg.remove();
        }
	},
	
	/**
	 * @method
	 * Set the grid color 
	 * 
	 * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
	 * @since 5.0.3
	 */
	setGridColor: function(color)
	{
	    this.color=new draw2d.util.Color(color);
        this.setGrid(this.grid);
	},
	
	/**
	 * @method
	 * Set a new grid width/height
	 * 
	 * @param {Number} grid
     * @since 5.0.3
	 */
    setGrid: function(grid)
    {
        this.grid = grid;

        if(this.canvas !=null){
            if(this.svg  !==null){
                    this.svg.remove();
            }

            var r= this.canvas.paper;
            var d = this.grid, i;
            var w= r.width;
            var h = r.height;
            var props = {stroke: this.color.hash()};
            r.setStart();
                // horizontal
                for (i = d+0.5; i < h; i += d) {
                    r.path([[ "M", 0, i], ["L", w, i]]).attr(props);
                }
                // vertical
                for (i = d+0.5; i < w; i += d) {
                    r.path([["M", i, 0], ["L", i, h]]).attr(props);
                }
            this.svg = r.setFinish();

            this.svg.toBack();
        }
    }

});
