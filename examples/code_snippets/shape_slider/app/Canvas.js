

example.Canvas = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id, 2000,2000);
		
		this.setScrollArea("#"+id);
		this.installEditPolicy(new CopyInterceptorPolicy());
	}
});

