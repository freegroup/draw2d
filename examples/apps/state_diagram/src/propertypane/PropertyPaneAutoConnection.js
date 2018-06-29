
example.propertypane.PropertyPaneAutoConnection = Class.extend({
	
	init:function(stateFigure){
	    this.figure = stateFigure;
	    this.table = null;
	},
	
	injectPropertyView: function( domId)
	{
        app.getBackend().getPrerequisitVariables($.proxy(function(variables){
            
            this.variables = $.merge([],variables); // simple copy
            app.getView().getLines().each($.proxy(function(i,line){
                this.variables = $.merge(this.variables,line.getVariables().asArray());
            },this));
            
			app.getBackend().getCompareOperations($.proxy(function(operations){
				var userData = this.figure.getUserData();
		        var view = "<form class='form-horizontal'>"+
		                "<div class='control-group'>"+
		                "   <label class='control-label' for='stateNameProperty'>Variable</label>"+
		                "   <div class='controls'>"+
		                "      <select id='autoConnectionVariable' class='selectpicker show-tick'>"+
		                "         {{#variables}}<option>{{.}}</option>{{/variables}}"+
		                "      </select>"+
		                "   </div>"+
		                "</div>"+
		                "<div class='control-group'>"+
		                "   <label class='control-label' for='stateNameProperty'>Condition</label>"+
		                "   <div class='controls'>"+
		                "      <select id='autoConnectionCondition' class='selectpicker show-tick'>"+
		                "         {{#operations}}<option>{{name}}</option>{{/operations}}"+
		                "      </select>"+
		                "  </div>"+
		                "</div>"+
		                "<div class='control-group'>"+
		                "   <label class='control-label' for='stateNameProperty'>Default Answer</label>"+
		                "   <div class='controls'>"+
		                 "      <input id='defaultAnswerProperty' class='input-xlarge' type='text' value='{{defaultAnswer}}'/>"+
		                "  </div>"+
		                "</div>"+
		                "</form>";
				 var compiled = Hogan.compile(view);
				 view   = $(compiled.render({operations:operations,variables:this.variables, defaultAnswer:userData.defaultAnswer}));
		         view.submit(function(e){
		             return false;
		         });
		          
		         domId.append(view);	
		         
		         
		         this.autoConnectionCondition = view.find("#autoConnectionCondition");
		         this.autoConnectionVariable  = view.find("#autoConnectionVariable");

		         this.autoConnectionCondition.val(userData.condition);
		         this.autoConnectionVariable.val(userData.variable);

		         this.autoConnectionCondition.change($.proxy(function(){
		                var data =this.figure.getUserData();
		                var newData = {};
		                newData.condition=this.autoConnectionCondition.val();
		                app.executeCommand( new example.command.CommandSetJSON(this.figure, data, newData));
				 },this));

		         this.autoConnectionVariable.change($.proxy(function(){
		                var data =this.figure.getUserData();
		                var newData = {};
		                newData.variable=this.autoConnectionVariable.val();
		                app.executeCommand( new example.command.CommandSetJSON(this.figure, data, newData));
				 },this));
		         
		 	    var input = view.find("#defaultAnswerProperty");
		 	    input.on("focus",$.proxy(function(){
                    (new example.dialog.AutoConnectDefaultEditorDialog(this.figure)).show();
		 	    },this));

			    view.submit(function(e){
			        return false;
			    });

			},this));
		},this));
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

