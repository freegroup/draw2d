

example.PropertyPane = Class.extend({
	
	init:function(elementId, view)
	{
		this.html = $("#"+elementId);
		this.view = view;

		// Databinding: helper attribute for the current active databinding
        this.binding = null;
        
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
		// Databinding: remove old data binding from previous selection
		if(this.binding!=null){
			this.binding.unbind();
			this.binding=null;
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
        
        // simple x/y coordinate display
        //
        this.html.append(
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     Position'+
                '</div>'+
                ' <div class="panel-body" id="position_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+
                '       x <input id="property_position_x" type="text" class="form-control" rv-value="figure:x"/><br>'+
                '       y <input id="property_position_y" type="text" class="form-control" rv-value="figure:y"/>'+
                '   </div>'+
                ' </div>'+
                '</div>'+
                
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     User Property'+
                '</div>'+
                ' <div class="panel-body" id="userdata_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+ 
                '       Type <input id="property_name" type="text" class="form-control" rv-value="figure.userData.name"/>'+
                '   </div>'+
                ' </div>'+
                '</div>');
        

        
        // Databinding: bind the selected figure with the HTML form.
        this.binding = rivets.bind(this.html, {
          figure: figure
        });

        	
        
	}
});