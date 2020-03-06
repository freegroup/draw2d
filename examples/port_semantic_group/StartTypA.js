
var StartTypA = draw2d.shape.node.Start.extend({

    NAME : "StartTypA",
    
    init : function(attr)
    {
        this._super($.extend({
          width:30,
          height:30,
          bgColor:"#ff0000"
        },attr));

      this.getPorts().each( (i,port) => port.setSemanticGroup("red"))
    }
});
