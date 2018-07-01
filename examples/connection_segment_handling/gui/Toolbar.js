
example.Toolbar = Class.extend({
	
	init:function(elementId, app,view){
		this.html = $("#"+elementId);
		this.view = view;
		this.app = app;
		
	      // register this class as event listener for the canvas
        // CommandStack. This is required to update the state of 
        // the Undo/Redo Buttons.
        //
        view.getCommandStack().addEventListener(this);

        // Inject the UNDO Button and the callbacks
        //
        this.undoButton  = $("<button>Undo</button>");
        this.html.append(this.undoButton);
        this.undoButton.button().click($.proxy(function(){
               this.view.getCommandStack().undo();
        },this)).button( "option", "disabled", true );

        // Inject the REDO Button and the callback
        //
        this.redoButton  = $("<button>Redo</button>");
        this.html.append(this.redoButton);
        this.redoButton.button().click($.proxy(function(){
            this.view.getCommandStack().redo();
        },this)).button( "option", "disabled", true );
        
        this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
        this.html.append(this.delimiter);
		
		// Inject the UNDO Button and the callbacks
		//
		this.zoomInButton  = $("<button>Zoom In</button>");
		this.html.append(this.zoomInButton);
		this.zoomInButton.button().click($.proxy(function(){
		      this.view.setZoom(this.view.getZoom()*0.7,true);
		      this.app.layout();
		},this));

		// Inject the DELETE Button
		//
		this.resetButton  = $("<button>1:1</button>");
		this.html.append(this.resetButton);
		this.resetButton.button().click($.proxy(function(){
		    this.view.setZoom(1.0, true);
            this.app.layout();
		},this));
		
		// Inject the REDO Button and the callback
		//
		this.zoomOutButton  = $("<button>Zoom Out</button>");
		this.html.append(this.zoomOutButton);
		this.zoomOutButton.button().click($.proxy(function(){
            this.view.setZoom(this.view.getZoom()*1.3, true);
            this.app.layout();
		},this));
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
        this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
        this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
    }

});