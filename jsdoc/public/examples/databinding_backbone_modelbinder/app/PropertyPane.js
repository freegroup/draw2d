
example.PropertyPane = Class.extend({
	
	init:function(elementId, view)
	{
		this.html = $("#"+elementId);
		this.view = view;
		
		this.templateView = null;
		
        view.on("select", $.proxy(this.onSelectionChanged,this));
    },

	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 *
	 * @param {draw2d.Canvas} emitter
	 * @param {Object} event
	 * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event)
	{
	    if(this.templateView!=null){
	        this.templateView.close();
	        this.templateView=null;
	    }
	    
        this.html.html("");
        if(event.figure instanceof draw2d.shape.node.Node){
        	this.showPropertiesOpAmp(event.figure);
        }
	},


	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	showPropertiesOpAmp : function(figure)
	{
        // Set some good defaults
        // (better you create  new class and set the defaults in the init method)
        var userData = figure.getUserData();
        if(userData===null){
          figure.setUserData(userData={name:""});   
        }
        
        // Databinding: create a backboneJS view with the bounded properties
        //
        this.templateView = new OpAmpBackboneView({model:figure});
        this.html.append(this.templateView .render().$el);
       
	}
});