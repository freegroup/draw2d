
var EndTypB = draw2d.shape.node.End.extend({

    NAME : "EndTypB",
    
    init : function(attr)
    {
        this._super($.extend({
          width:30,
          height:30,
          bgColor:"#9affd9"
        },attr));
    }
});
