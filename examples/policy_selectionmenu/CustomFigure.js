
var CustomFigure = draw2d.shape.basic.Label.extend({

	NAME: "CustomFigure",
	
    init : function(attr)
    {
    	this._super($.extend({text:"FigureWith Flyout menu"},attr));

        this.installEditPolicy(new SelectionMenuPolicy());
    }

});
