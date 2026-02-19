/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var LabelConnection= draw2d.Connection.extend({
    
    init:function(attr)
    {
      this._super(attr);
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new draw2d.shape.basic.Label({
          text:"I'm a Label",
          color:"#0d0d0d",
          fontColor:"#0d0d0d",
          bgColor:"#f0f0f0"
      });
     
      // add the new decoration to the connection with a position locator.
      //
      this.add(this.label, new draw2d.layout.locator.ManhattanMidpointLocator());
      // avoid drag/drop
      this.label.setSelectionAdapter( null) 

      // Register a label editor with a dialog
      //
      this.label.installEditor(new draw2d.ui.LabelEditor());
      
      this.attr({
          router:new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
          outlineStroke:1,
          outlineColor:"#303030",
          stroke:2,
          color:"#00a8f0",
          radius:4
      });
    }
});
