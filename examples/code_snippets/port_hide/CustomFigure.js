
var CustomFigure = draw2d.shape.basic.Rectangle.extend({

    NAME: "CustomFigure", // required for JSON read/write

    init : function( attr, setter, getter)
    {
        this._super( attr, setter, getter);

        var show=function(){this.setVisible(true);};
        var hide=function(){this.setVisible(false);};

        var input = this.createPort("input");
        var output= this.createPort("output");

        input.on("connect",hide,input);
        input.on("disconnect",show,input);

        output.on("connect",hide,output);
        output.on("disconnect",show,output);
    }
});
