// declare the namespace for this example
var example = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
example.Application = Class.extend(
{
    NAME : "example.Application", 

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
    {
	      this.view    = new example.View("canvas");
      this.view.installEditPolicy(new EditPolicy())
        this.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
          createConnection: function(){
            let connection = new TAMConnection({
              stroke:2,
              outlineStroke:1,
              outlineColor:"#303030",
              radius: 10,
              color:"#ab47bc",
              router:new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
              // router:new draw2d.layout.connection.SplineConnectionRouter()
            });
            return connection;
          }
        }));

      this.toolbar = new example.Toolbar("toolbar", this, this.view );
	       
          this.appLayout = $('#container').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	},
	   
    layout:function(){
        this.appLayout.resizeAll();
    }
});
