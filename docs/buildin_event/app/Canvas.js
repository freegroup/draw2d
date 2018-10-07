

example.Canvas = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id, 2000,2000);
		
		this.setScrollArea("#"+id);

		this.on("select", function(emitter, event){
			if(event.figure instanceof draw2d.Connection) {
				event.figure.addCssClass("connection_highlight");
			}
		});

		this.on("unselect", function(emitter, event){
			if(event.figure instanceof draw2d.Connection) {
				event.figure.removeCssClass("connection_highlight");
			}
		});
	}
});

