
LED = draw2d.shape.basic.Circle.extend({

	NAME: "LED",
	
    init: function(attr, setter, getter)
    {
        var _this = this;

    	this._super($.extend({
            bgColor:"#ff6d00",
            color:"#d7d7d7",
            stroke:3,
            radius:15
        },attr), setter,getter);

        var input= this.createPort("input");

        // allow only one connection for this port
        input.setMaxFanOut(1);

        input.on("connect", function(emitter, event){
            var value =event.connection.getSource().getValue();
            _this.setAlpha(value/100);
        });

        input.on("disconnect", function(emitter, event){
            _this.setAlpha(1);
        });

        // connect the input port with a callback
        //
        input.on("change:value",function(emitter, event){
            _this.setAlpha(event.value / 100);
        });

        // don't write the port information to the JSON structure.
        // All required ports are created in the "init" method
        //
        this.persistPorts = false;
    },

    clone: function()
    {
        // don't recreate all children in the base class.
        // We add some eventhandler in the init method and this
        // get lost if we use the base implementation
        var clone = this._super({exludeChildren:true, excludePorts:true});

        return clone;
    }

});
