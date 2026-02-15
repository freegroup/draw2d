var TimerFigure = draw2d.shape.basic.Label.extend({

    init : function(attr, setter, getter)
    {
    	this.counter = 0;
    	
        this._super($.extend({text:"Counter: 0"},attr), setter, getter);
        
        // Option 1: Using the onTimer() template method (shown in this example)
        // Override onTimer() to handle timer events
        // IMPORTANT: Rotation works best with basic shapes (Label, Rectangle, Circle)
        // For shapes with ports, rotation may interfere with connection routing and cause
        // connections to "jump" or be incorrectly routed during rotation updates
        this.startTimer(10);
        
        // Option 2: Using a custom callback function (alternative approach)
        // Pass a callback function to startTimer() instead of overriding onTimer()
        // Note: Use arrow function () => or regular function, both work because
        // the callback is called with .call(this) internally
        // Uncomment to see this approach in action:
        /*
        this.startTimer(10, () => {
            this.counter += 4;
            this.setText("Counter: " + this.counter);
            this.setRotationAngle(this.counter % 360);
        });
        */
    },

    /**
     * @method
     * Template method for timer events. Called every 10ms (based on startTimer interval).
     * Updates both text and rotation angle.
     * 
     * This method is ALWAYS called when the timer fires, regardless of whether you 
     * provide a custom callback to startTimer() or not.
     * 
     * IMPORTANT: You can omit this method implementation entirely if you pass a callback 
     * function to startTimer(). The callback will handle the timer events instead.
     * 
     * IMPORTANT: setRotationAngle() should be avoided on shapes with ports
     * as it can cause connection routing issues. Use rotation only with basic shapes
     * (Label, Rectangle, Circle, etc.) without ports.
     * 
     * Usage patterns:
     * 1. Override onTimer() only (traditional approach) - shown in this example
     * 2. Pass callback to startTimer() and omit onTimer() (modern approach)
     * 3. Use both for combined behavior (e.g., callback for logic + onTimer for logging)
     * 
     * API styles:
     * Modern attr() API (shown in example) vs. conventional setter methods (commented):
     *   this.attr({text: "...", angle: 90});           // Modern
     *   this.setText("..."); this.setRotationAngle(90); // Conventional
     * 
     * @private
     */
    onTimer:function(){
    	this.counter+=4;
    	
        this.attr({
          text: "Counter: " + this.counter,
          angle: this.counter % 360
        });
        
        // Conventional alternative using setter methods:
        // this.setText("Counter: " + this.counter);
        // this.setRotationAngle(this.counter % 360);
    }

});