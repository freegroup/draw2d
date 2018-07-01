
var FigureHighDetail = draw2d.SetFigure.extend({

    init : function(attr)
    {
        this._super(attr);
        
        this.strokeScale = true; // scale the stroke width of the children nodes if the parent resize
        this.setKeepAspectRatio(true);
    },
    

    /** 
     * @template
     **/
    createSet : function()
    {
        this.canvas.paper.setStart();

        var halfW = this.getWidth() / 2;
        var halfH = this.getHeight() / 2;

        this.canvas.paper.rect(0, 0, this.getWidth(), this.getHeight()).attr({
            "fill" : "#f9f9f9", r:3
        });
        
        this.canvas.paper.ellipse(halfW, halfH, halfW / 10 * 4, halfH / 10 * 4).attr({
            "fill" : "#ff0000", stroke:2
        });
        
        this.canvas.paper.text(3, 7, "In 1").attr({
            "text-anchor" : "start"
        });
        
        this.canvas.paper.text(3, this.getHeight() - 7, "In 2").attr({
            "text-anchor" : "start"
        });

        return this.canvas.paper.setFinish();
    }
});
