
var TimerFigure = draw2d.shape.basic.Label.extend({

    init : function(attr, setter, getter)
    {
    	this.counter = 0;
    	
        this._super($.extend({text:"Counter: 0"},attr), setter, getter);
        
        this.startTimer(10);
        
    },

    /**
     * @method
     * private callback method for the internal timer.
     * 
     * @private
     */
    onTimer:function(){
    	this.counter+=4;
    	
        this.setText("Counter: "+(this.counter));
        this.setRotationAngle(this.counter%360);
    }

});
