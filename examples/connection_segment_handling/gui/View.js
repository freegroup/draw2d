example.View = draw2d.Canvas.extend({
	
	init: function(id) {
		this._super(id);
		
		// Set scroll area to the scrollable container, not the canvas itself
		this.setScrollArea("#gfx_holder");
	}

});