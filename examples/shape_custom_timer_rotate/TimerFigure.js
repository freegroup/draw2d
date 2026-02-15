var TimerFigure = draw2d.shape.basic.Label.extend({

    init : function(attr, setter, getter)
    {
    	this.counter = 0;
    	
        this._super($.extend({text:"Counter: 0"},attr), setter, getter);
        
        // Start the internal timer
        // IMPORTANT: Rotation works best with basic shapes (Label, Rectangle, Circle)
        // For shapes with ports, rotation may interfere with connection routing and cause
        // connections to "jump" or be incorrectly routed during rotation updates
        this.startTimer(10);
    },

    /**
     * @method
     * Private callback method for the internal timer.
     * Updates both text and rotation angle every 10ms.
     * 
     * IMPORTANT: setRotationAngle() should be avoided on shapes with ports
     * as it can cause connection routing issues.
     * 
     * @private
     */
    onTimer:function(){
    	this.counter+=4;
    	
        this.setText("Counter: "+(this.counter));
        this.setRotationAngle(this.counter%360);
    }

});