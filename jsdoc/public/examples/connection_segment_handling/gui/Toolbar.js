example.Toolbar = Class.extend({
	
	init: function(elementId, app, view) {
		this.html = $("#" + elementId);
		this.view = view;
		this.app = app;
		
		// Inject the UNDO Button
		this.undoButton = $("<button disabled>↩ Undo</button>");
		this.html.append(this.undoButton);
		this.undoButton.click(() => {
			this.view.getCommandStack().undo();
		});

		// Inject the REDO Button
		this.redoButton = $("<button disabled>↪ Redo</button>");
		this.html.append(this.redoButton);
		this.redoButton.click(() => {
			this.view.getCommandStack().redo();
		});
        
		// Delimiter
		this.html.append($("<span class='toolbar_delimiter'></span>"));
		
		// Inject Zoom In Button
		this.zoomInButton = $("<button>+ Zoom In</button>");
		this.html.append(this.zoomInButton);
		this.zoomInButton.click(() => {
			this.view.setZoom(this.view.getZoom() * 0.7, true);
		});

		// Inject 1:1 Reset Button
		this.resetButton = $("<button>1:1</button>");
		this.html.append(this.resetButton);
		this.resetButton.click(() => {
			this.view.setZoom(1.0, true);
		});
		
		// Inject Zoom Out Button
		this.zoomOutButton = $("<button>- Zoom Out</button>");
		this.html.append(this.zoomOutButton);
		this.zoomOutButton.click(() => {
			this.view.setZoom(this.view.getZoom() * 1.3, true);
		});

		// Register for command stack changes using modern .on() method
		view.getCommandStack().on("change", (event) => {
			this.undoButton.prop("disabled", !event.getStack().canUndo());
			this.redoButton.prop("disabled", !event.getStack().canRedo());
		});
	}
});