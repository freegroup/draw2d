
example.PropertyPane = Class.extend({
	
	init:function(elementId, view)
	{
		this.html = $("#"+elementId);
		this.view = view;

		this.selectedFigure = null;
		this.attributesToWatch = ["x","y","userData"];
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
		// Databinding: unregister the binding from the previous selected figure
		//
		if(this.selectedFigure!=null){
			unwatch(this.selectedFigure,this.attributesToWatch);
		}
		
		this.selectedFigure = event.figure;
		
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
                '       <div class="input-group" ></div> '+ // required to ensure the correct width of the siblings
                '       x <input id="property_position_x" type="text" value="'+figure.getPosition().x+'"  class="form-control" /><br>'+
                '       y <input id="property_position_y" type="text" value="'+figure.getPosition().y+'"  class="form-control" />'+
                '   </div>'+
                ' </div>'+
                '</div>');


        this.html.append(
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     User Property'+
                '</div>'+
                ' <div class="panel-body" id="userdata_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+ // required to ensure the correct width of the siblings
                '       Type <input id="property_name" type="text" value="'+userData.name+'"  class="form-control" />'+
                '   </div>'+
                ' </div>'+
                '</div>');
        
    	// Databinding: Figure --> UI
        //
    	watch(figure, this.attributesToWatch, function(){
    		WatchJS.noMore = true; // avoid recursion
    		$("#property_position_x").val(figure.getPosition().x);
       		$("#property_position_y").val(figure.getPosition().y);
       		$("#property_name").val(figure.getUserData().name);
       	},2);
    	
    	// Databinding: UI --> Figure
        //
    	$("#position_panel input").on("change", function(){
    	    // with undo/redo support
    	    var cmd = new draw2d.command.CommandMove(figure);
    	    cmd.setPosition(parseInt($("#property_position_x").val()),parseInt($("#property_position_y").val()));
    	    figure.getCanvas().getCommandStack().execute(cmd);
    	});
    	$("#property_name").on("change", function(){
    		figure.getUserData().name=$("#property_name").val();
    	});

	}
});