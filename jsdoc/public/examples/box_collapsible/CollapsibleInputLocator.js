var CollapsibleInputLocator =  draw2d.layout.locator.InputPortLocator.extend({

    init: function( ){
        this._super();
    },
    
    relocate:function(index, port){
        CollapsibleLocator.checkDelegate(port);

        var node = port.getParent();
        if(!port.visible){
            this.applyConsiderRotation( port, 0, (node.getParent().getHeight()/2));
        }
        else{
            this._super(index, port);
        }
    }
});