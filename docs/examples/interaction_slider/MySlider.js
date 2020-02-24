
MySlider = draw2d.shape.widget.Slider.extend({

    NAME : "MySlider",
    
    init : function()
    {
        this._super();
        
        this.createPort("output");


        this.on("change:value", $.proxy(function(element, event){
            var connections = this.getOutputPort(0).getConnections();
            connections.each($.proxy(function(i, conn){
                var targetPort = conn.getTarget();
                targetPort.setValue(event.value);
            },this));
        },this));

        this.setDimension(120,20);
    }
});
