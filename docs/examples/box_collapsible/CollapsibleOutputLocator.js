var CollapsibleOutputLocator =  draw2d.layout.locator.OutputPortLocator.extend({

    init: function(){
        this._super();
    },
    
    relocate:function(index, port){
        CollapsibleLocator.checkDelegate(port);

        var node = port.getParent();
        if(!port.visible){
            this.applyConsiderRotation( port, node.getParent().getWidth(), (node.getParent().getHeight()/2));
        }
        else{
            this._super(index, port);
        }
    }
});