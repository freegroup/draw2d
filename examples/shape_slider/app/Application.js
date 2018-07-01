// declare the namespace for this example
var example = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
example.Application = Class.extend({
    NAME : "example.Application",

    /**
     * @constructor
     * 
     */
    init : function() 
    {
        this.canvas = new example.Canvas("canvas");
        this.toolbar = new example.Toolbar("toolbar", this.canvas);

        this.canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function(){
                return new draw2d.Connection({
                    outlineStroke:1,
                    outlineColor:"#1b5e20",
                    stroke:4,
                    radius:10,
                    color:"#00e676",
                    router:new draw2d.layout.connection.SplineConnectionRouter()
                });
            }
        }));
    }

});
