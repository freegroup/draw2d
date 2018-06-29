function activityReadOnlyRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    if(typeof value!=="undefined" && value!==null && value !==""){
        td.innerHTML = value;
        td.className="htDimmed";
    }
    else{
        td.innerHTML="";
    }
    return td;
}


example.propertypane.PropertyPaneActivity = Class.extend({
	
	init:function(stateFigure){
	    // selected figure
	    this.figure = stateFigure;
	    
	    // all activities provided by the backend
	    this.activities = null;
	    
	},
	
	injectPropertyView: function( domId)
	{
		app.getBackend().getActivities($.proxy(function(activities){
		    this.activities = activities;
		    
		    var templ= "<form class='form-horizontal'>"+
                    '<div>'+
                    "    <div class='span6'>"+
		            "       <div class='control-group'>"+
		            "          <label class='control-label' for='stateNameProperty'>Name </label>"+
		            "          <div class='controls'>"+
		            "             <input id='activityNameProperty' class='span4' type='text' value='{{label}}'/>"+
		            "          </div>"+
		            "       </div>"+
		            "       <div class='control-group'>"+
		            "          <label class='control-label' for='stateNameProperty'>Activity </label>"+
		            "          <div class='controls'>"+
		            '             <select id="activityPaneActionSelect" multiple="multiple" class="span4">'+
		            '               {{#activities}}'+
					'                <option>{{id}}</option>'+
		            '               {{/activities}}'+
					'             </select>'+
                    "          </div>"+
 					'       </div>'+
                    "    </div>"+
                    "    <div class='span6'>"+
                    "       <div class='control-group' id='activityParameterMapping' style='min-height:200px'>"+
                    "       </div>"+
                    "    </div>"+
					"</div>"+
		            "</form>";
		    
		    
			 var compiled = Hogan.compile(templ);
			 var view   = $(compiled.render({label:this.figure.getLabel(), activities:activities}));
             view.submit(function(e){
                 return false;
             });
			 
			 // The "Label"
			 // install Events for the label of the figure for
			 //
			 var input = view.find("#activityNameProperty");
			 var handler =$.proxy(function(e){
			     // provide undo/redo for the label field
			     app.executeCommand(new example.command.CommandSetLabel(this.figure, input.val()));
			 },this);
			 input.change(handler);
			 		
			 this.activitySelect = view.find("#activityPaneActionSelect");
			 this.activitySelect.change($.proxy(function(){
                 this._onActivitySelect(this.activitySelect.val()[0],false);
			 },this));
			 domId.append(view);
			 
			 $("#activityParameterMapping").handsontable({
			     data: [],
		         minRows:0,
		         manualColumnResize: true,
		         rowHeaders: false,
                 minSpareRows: 0,
 	             stretchH: 'last',
			     colHeaders: ["Parameter Name", "Value"],
			     afterSelectionEnd: $.proxy(function(row, column){
			        if(column==1){
	                    var data =this.figure.getUserData();
	                    if(this.figure.getActivity().activity ==="TextResponse_FreeMarker"){
                            (new example.dialog.FreeMarkerEditorDialog(this.figure,data.mapping[row])).show();
	                    }
	                    else{
	                        (new example.dialog.ActivityVariableEditorDialog(this.figure,data.mapping[row])).show();
	                    }
			        }
			     },this),
			     columns: [
			       {data:"parameterName"  , type:{renderer: activityReadOnlyRenderer}, readOnly:true },
			       {data:"value",           type:{renderer: activityReadOnlyRenderer}, readOnly:true }
			     ]
			   });
			 
             this._onActivitySelect(this.figure.getActivity().activity,true);
		},this));

	},

	/**
	 * @method
	 * Called by this pane if the user select another activity in the select box.
	 * What must happen here:
	 *   update the figure
	 *   update the parameter mapping table
	 *   
	 * @parameter {String} activityId the id of the selected activity
	 */
	_onActivitySelect: function(activityId, initialCall){
	       
        // get the selected activity with corresponding settings
        //
        var activityDef = $.grep(this.activities, function(e){ return e.id===activityId;})[0];
        
        if(typeof activityDef ==="undefined"){
            return;
        }
       
	    // select the correct entry in the lsitbox for the first call     
	    if(initialCall===true){
	        this.activitySelect.val(activityId);
	    }
	    // otherwise we must update the figure itself because the user select another
	    // activityDef
	    else{
	        app.executeCommand(new example.command.CommandSetActivityDef(this.figure,{activity:activityId, mapping:activityDef.parameters.input} ));
	    }
               
	    // rerender the mapping table
        $('#activityParameterMapping').handsontable('loadData',this.figure.getActivity().mapping);
        if(activityDef.parameters.input.length!=0){
            $('#activityParameterMapping').show();
        }
        else{
            $('#activityParameterMapping').hide();
        }
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

