
GlossyRectangle = draw2d.SetFigure.extend({

    init : function(attr)
    {
        this._super({
            width:100,
            height:100,
            ...attr
        });
    }

 

});
