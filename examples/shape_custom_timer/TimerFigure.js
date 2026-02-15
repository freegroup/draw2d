var TimerFigure = draw2d.shape.basic.Label.extend({

    init : function(attr, setter, getter)
    {
    	this.counter = 0;
    	
        this._super($.extend({text:"Counter: 0"},attr), setter, getter);
        
        // Option 1: Using the onTimer() template method (shown in this example)
        // Override onTimer() to handle timer events
        this.startTimer(500);
        
        // Option 2: Using both onTimer() and custom callback
        // Both the callback and onTimer() will be called
        // Uncomment to see both approaches working together:
        /*
        this.startTimer(500, function() {
            this.setText("Counter: " + (++this.counter));
        });
        */
        
    },

    /**
     * @method
     * Template method for timer events. Called every 500ms (based on startTimer interval).
     * 
     * This method is ALWAYS called when the timer fires, regardless of whether you 
     * provide a custom callback to startTimer() or not.
     * 
     * IMPORTANT: You can omit this method implementation entirely if you pass a callback 
     * function to startTimer(). The callback will handle the timer events instead.
     * 
     * Usage patterns:
     * 1. Override onTimer() only (traditional approach) - shown in this example
     * 2. Pass callback to startTimer() and omit onTimer() (modern approach)
     * 3. Use both for combined behavior (e.g., callback for logic + onTimer for logging)
     * 
     * @private
     */
    onTimer:function(){
        this.setText("Counter: "+(++this.counter));
    }

});