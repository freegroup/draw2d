
MyFigure = draw2d.shape.basic.Rectangle.extend({

    NAME : "MyFigure",
    
    init : function(attr)
    {
        var _this = this;

        this.value=false;
        this.colors={};
        this.colors[false]="#00f000";
        this.colors[true]="#f00000";
        

        this._super($.extend({ width:30, height:30, resizeable:false, bgColor:this.colors[this.value]},attr));
        
        this.createPort("output");

        var updateConnections=function (flag){
            _this.setBackgroundColor(_this.colors[flag]);
            var connections = _this.getOutputPort(0).getConnections();
            connections.each(function(i, conn){
                var targetPort = conn.getTarget();
                targetPort.setValue(flag);
                conn.setColor(_this.getBackgroundColor());
            });
        };

        this.on("mousedown",function(emitter, event){
            updateConnections(true);
        });

        this.on("mouseup",function(emitter, event){
            updateConnections(false);
        });
    }
});
