
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
		
		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button class='gray'>Undo</button>");
		this.html.append(this.undoButton);
		this.undoButton.click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this));

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button class='gray'>Redo</button>");
		this.html.append(this.redoButton);
		this.redoButton.click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this));
		
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button class='gray'>Delete</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.click($.proxy(function(){
			var node = this.view.getPrimarySelection();
			var command= new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		},this));
		
        this.disableButton(this.undoButton, true);
        this.disableButton(this.redoButton, true);
        this.disableButton(this.deleteButton, true);

        this.html.append($("<div id='toolbar_hint'></div>"));
    },

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
	 * @param {draw2d.Canvas} emitter
	 * @param {Object} event
	 * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event){
        this.disableButton(this.deleteButton,event.figure===null );
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
        this.disableButton(this.undoButton, !event.getStack().canUndo());
        this.disableButton(this.redoButton, !event.getStack().canRedo());
	},
	
	disableButton:function(button, flag)
	{
	   button.prop("disabled", flag);
       if(flag){
            button.addClass("disabled");
        }
        else{
            button.removeClass("disabled");
        }
	}
});