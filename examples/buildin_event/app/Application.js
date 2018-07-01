// declare the namespace for this example
var example = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 */
example.Application = Class.extend({
    NAME : "example.Application",

    /**
     * @constructor
     * 
     */
    init : function() 
    {
        var router = new draw2d.layout.connection.CircuitConnectionRouter();
        router.abortRoutingOnFirstVertexNode=false;

        this.canvas = new example.Canvas("canvas");
        this.toolbar = new example.Toolbar("toolbar", this.canvas);
        this.properties = new example.EventPane( this.canvas);

        // install a custome ConnectionCreate policy into the canvas
        this.canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function(){

                var c = new draw2d.Connection({
                    outlineColor:"#ffffff",
                    outlineStroke:1,
                    router: router,
                    stroke:2
                });

                return c;
            }
        }));

    }

});
