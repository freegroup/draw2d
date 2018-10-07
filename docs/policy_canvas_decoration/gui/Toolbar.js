
example.Toolbar = Class.extend({
	
	init:function(elementId, view){
        $( "#radio" ).buttonset();
        this.view = view;
        this.installedPolicy = null;
        
        var oThis = this;
        $('#radio>input').click(function() {

            view.uninstallEditPolicy(oThis.installedPolicy);
            
            oThis.installedPolicy = eval("new "+$(this).data("policy")+"()");
            $("#help").text($(this).data("help"));
            
            view.installEditPolicy( oThis.installedPolicy);
        });

	}
});