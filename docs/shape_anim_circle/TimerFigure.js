
var TimerFigure = draw2d.SetFigure.extend({

    init : function(attr)
    {
    	this.degree = 0;

    	this._super($.extend({width:100, height:100},attr));

        this.startTimer(100);
    },

    /**
     * @method
     * Create the additional elements for the figure
     * 
     */
    createSet: function(){
    	var paper = this.canvas.paper;
        var set = paper.set();

        this.rect = paper.rect(0,0,150, 100);
        this.rect.attr({fill:"#3d3d6d"});
        this.line = paper.path("M0 0 l0 0");
        
        set.push(this.line);
        set.push(this.rect);
        
        return set;
    },


    /**
     * @method
     * Private callback method for the internal timer.<br>
     * 
     * Calculate the new angle of the line and update the SVG path.
     * 
     * @private
     */
    onTimer:function(){
        this.degree = (this.degree-3) % 360;

        // Keep in mind: This is far from a good coding.
        //   1. I always calculate sin/cos
        //   2. no lookup table for the stroke (cache degree => path string)
        //
        var x = (Math.sin((Math.PI*2/360)*this.degree)*75);
        var y = (Math.cos((Math.PI*2/360)*this.degree)*50);

        // it is possible to cache the "path" with a simple map: degree => path string
        var path = "M"+(75)+" "+(50)+" l"+x+" "+y;
        this.line.attr({stroke:"#f03d3d", "stroke-width":3,"stroke-dasharray":".", path:path});
    }

});
