
var MyFigure = draw2d.shape.basic.Rectangle.extend({

    init : function(attr, setter, getter)
    {
        this._super($.extend({bgColor:"#ff765e", radius:5},attr), setter, getter);
 
    },

    /**
     * @method
     * Change the corner radius if the user clicks on the element. 
     * quite simple....
     *
     *      // Alternatively you can register an event with:
     *      //
     *      figure.on("dblclick", function(emitter, event){
     *          alert("user dbl click on the figure");
     *      });
     *
     */
    onDoubleClick: function()
    {
    	this.setRadius( this.getRadius()===5?20:5);
    }

});
