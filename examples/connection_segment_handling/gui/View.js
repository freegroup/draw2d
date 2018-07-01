

example.View = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id);
		
		this.setScrollArea("#"+id);
	}

});

