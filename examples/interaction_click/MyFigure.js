
MyFigure = draw2d.shape.basic.Rectangle.extend({

    NAME : "MyFigure",
    
    init : function(attr)
    {
        this.value=false;
        this.colors={};
        this.colors[true]="#00f000";
        this.colors[false]="#f00000";
        

        this._super($.extend({ width:30, height:30, resizeable:false, bgColor:this.colors[this.value]},attr));
        
        this.createPort("output");

    },

    /**
     * @method
     * Change the color and the internal value of the figure.
     * Post the new value to related input ports.
     * 
     */
    onClick: function(){
        this.value = !this.value;
        this.setBackgroundColor(this.colors[this.value]);
        
        var connections = this.getOutputPort(0).getConnections();
        connections.each($.proxy(function(i, conn){
            var targetPort = conn.getTarget();
            targetPort.setValue(this.value);
            conn.setColor(this.getBackgroundColor());
        },this));
    }

});
