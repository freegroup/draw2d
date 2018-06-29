

example.propertypane.PropertyPaneState = Class.extend({
	
	init:function(stateFigure){
	    this.figure = stateFigure;
	},
	
	injectPropertyView: function( domId)
	{
	    var view = $("<form class='form-horizontal'>"+
	                 "<div class='control-group'>"+
	                 "   <label class='control-label' for='stateNameProperty'>State </label>"+
	                 "   <div class='controls'>"+
	                 "      <input id='stateNameProperty' class='input-xlarge' type='text' value='"+this.figure.getLabel()+"'/>"+
	                 "   </div>"+
	                 "</div>"+
	                 "</form>");
	    var input = view.find("#stateNameProperty");
	    var handler =$.proxy(function(e){
	        e.preventDefault();
            // provide undo/redo for the label field
            app.executeCommand(new example.command.CommandSetLabel(this.figure, input.val()));
	    },this);
	    input.change(handler);
	    view.submit(function(e){
	        return false;
	    });
	    
	    domId.append(view);
	},

    /**
     * @method
     * called by the framework if the pane has been resized. This is a good moment to adjust the layout if
     * required.
     * 
     */
    onResize: function()
    {
    },
    

    /**
     * @method
     * called by the framework before the pane will be removed from the DOM tree
     * 
     */
    onHide: function()
    {
    }
    
});

