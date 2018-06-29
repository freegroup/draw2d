var LabeledEnd = draw2d.shape.node.End.extend({
    
    init:function()
    {
      this._super();
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new draw2d.shape.basic.Label({text:"I'm a Label too", color:"#0d0d0d", fontColor:"#0d0d0d"});
    
      // add the new decoration to the connection with a position locator.
      //
      this.add(this.label, new draw2d.layout.locator.BottomLocator(this));
    },
    
    getLabel:function(){
    	return this.label.getText();
    },
    
    setLabel: function(text){
    	this.label.setText(text);
    }
});
