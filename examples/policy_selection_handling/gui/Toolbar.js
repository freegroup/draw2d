
example.Toolbar = Class.extend({
	
	init:function(elementId, view){
        $( "#radio" ).buttonset();
        this.view = view;
        
        $('#radio>input').click(function() {
            var policy = eval("new "+$(this).data("policy")+"()");
            view.installEditPolicy(policy);
        });

	}
});