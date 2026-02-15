
var CustomFigure = draw2d.shape.basic.Label.extend({

	NAME: "CustomFigure",
	
    init : function(attr)
    {
    	this._super({text:"Figure with HTML flyout menu",...attr});

        this.installEditPolicy(new SelectionMenuPolicy());
    }

});
