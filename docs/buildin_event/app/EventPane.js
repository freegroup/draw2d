
example.EventPane = Class.extend({
	
	init:function( canvas)
	{
	    var log= function(msg){
	        $("#events").prepend($("<div>"+new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")+" - "+msg+"</div>"));
	    };
	    
		canvas.on("figure:add", function(emitter, event){
            log("Figure added");
        });
        
        canvas.on("figure:remove", function(emitter, event){
            log("Figure removed");
        });

        canvas.on("select", function(emitter, event){
            log("Figure selected: "+event);
        });

        canvas.on("unselect", function(emitter, event){
            log("Figure unselected: "+event);
        });

        canvas.on("dblclick", function(emitter, event){
            log("double click: "+event);
        });

        canvas.on("click", function(emitter, event){
            log("click: "+event);
        });

        canvas.on("contextmenu", function(emitter, event){
            log("Context Menu: "+event);
        });
    }
    
});