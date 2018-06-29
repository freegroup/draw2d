
example.Toolbar = Class.extend({
	
	init:function(elementId, view){
        $( "#radio" ).buttonset();
        this.view = view;
        this.installedPolicy = null;
        
        var oThis = this;
        $('#radio>input').click(function() {

            view.uninstallEditPolicy(oThis.installedPolicy);
            view.installedPolicy = null;
            
            var policy = $(this).data("policy");
            
            if(policy!==""){
                oThis.installedPolicy = eval("new "+$(this).data("policy")+"()");
                view.installEditPolicy( oThis.installedPolicy);
            }
        });

	}
});