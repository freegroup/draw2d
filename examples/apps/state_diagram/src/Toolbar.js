
example.Toolbar = Class.extend({
	
	init:function(elementId, view){
		this.html = $("#"+elementId);
		this.view = view;
		
		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
        view.on("select", $.proxy(this.onSelectionChanged,this));
		
		var buttonBar = $('<div class="well well-small"></div>');
		this.html.append(buttonBar);
		
		// the branding
		buttonBar.append($("<span id='title' class='lead'>Interactive Voice Response</span>"));
		
        var buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);
		
        this.openButton  = $("<button class='btn'>Open</button>");
        buttonGroup.append(this.openButton);
        this.openButton.click($.proxy(function(){
            (new example.dialog.OpenDialog()).show();
        },this)).attr("disabled",false);

        this.newButton  = $("<button class='btn'>New</button>");
        buttonGroup.append(this.newButton);
        this.newButton.click($.proxy(function(){
            (new example.dialog.NewDialog()).show();
        },this));

        
        this.saveButton  = $("<button class='btn'>Save</button>");
        buttonGroup.append(this.saveButton);
        this.saveButton.click($.proxy(function(){
            app.saveDefinition();
        },this)).attr("disabled",true);
        
        this.saveDropDown = $('<button class="btn dropdown-toggle" data-toggle="dropdown">'+
                             '<span class="caret"></span>'+
                             '</button>'+
                             '<ul class="dropdown-menu">'+
                             '<li><a tabindex="-1" href="#">Save as..</a></li>'+
                             '</ul>');
        buttonGroup.append(this.saveDropDown);
        this.saveAsButton = this.saveDropDown.find("a").on("click",function(){
            (new example.dialog.SaveAsDialog()).show();
        });
        
        buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);
		 
		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button class='btn'>Undo</button>");
		buttonGroup.append(this.undoButton);
		this.undoButton.click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this)).attr("disabled",true);

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button class='btn'>Redo</button>");
		buttonGroup.append(this.redoButton);
		this.redoButton.click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this)).attr( "disabled", true );
		
		var buttonGroup = $('<div class="btn-group"></div>');
		buttonBar.append(buttonGroup);

		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button class='btn'>Delete</button>");
		buttonGroup.append(this.deleteButton);
        /*
		this.deleteButton.click($.proxy(function(){
			var node = this.view.getCurrentSelection();
			var command= new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		},this)).attr("disabled", true );
		*/
        this.deleteButton.click($.proxy(function(){
            var self = this,
                selectedFigures = this.view.getSelection();
            this.view.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            if (selectedFigures && selectedFigures.getSize()) {
                selectedFigures.each(function (index, figure) {
                    var cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                    if (cmd !== null) {
                        self.view.getCommandStack().execute(cmd);
                    }
                });
            }
            this.view.getCommandStack().commitTransaction();
        },this)).attr("disabled", true );

		buttonBar.append("<div id='loadedFileName'></div>");
	},

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	onSelectionChanged : function(emitter, figure){
		this.deleteButton.attr( "disabled", figure===null );
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged:function(event)
	{
		this.undoButton.attr("disabled", !event.getStack().canUndo() );
		this.redoButton.attr("disabled", !event.getStack().canRedo() );
		
	    this.saveButton.attr("disabled",   !event.getStack().canUndo() && !event.getStack().canRedo()  );
	}
});