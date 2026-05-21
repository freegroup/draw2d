
GlossyRectangle = draw2d.SetFigure.extend({

    /**
     * @param {Object} [attr] the configuration of the shape
     */
    init : function(attr)
    {
        this._super({
            width:100,
            height:100,
            ...attr
        });
    }

 

});
