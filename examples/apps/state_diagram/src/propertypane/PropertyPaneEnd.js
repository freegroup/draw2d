

example.propertypane.PropertyPaneStart = Class.extend({
	
	init:function(stateFigure){
	    this.figure = stateFigure;
	},
	
	injectPropertyView: function( domId)
	{
	    var view = $(
	                 "<div class='control-group'>"+
	                 "   <label class='control-label'>Start Node </label>"+
	                 "</div>"
	               );
	    
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

