
var BoundingboxFigure = draw2d.shape.basic.Rectangle.extend({

    init : function(attr, setter, getter)
    {
        this._super($.extend({
            width:100,
            height:90,
            opacity:0.5
        },attr));
        
        var mainPort = this.createPort("hybrid", new draw2d.layout.locator.CenterLocator());
        
        // calculation of the anchor port of the connection
        //
        mainPort.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.port));
        
        // override the standard behaviour of the connection direction calculation.
        // This is not a perfect solution because I didn't implement a behaviour pattern or something similar
        //
        mainPort.getConnectionDirection = function(conn, relatedPort){ 
            return mainPort.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        };

    }
});
