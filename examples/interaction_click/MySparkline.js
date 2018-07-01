
MySparkline = draw2d.shape.diagram.Sparkline.extend({

    NAME : "MySparkline",
    
    init : function(attr)
    {
        this.maxValues = 100;
        
        this._super($.extend({bgColor:"#ff765e", radius:5},attr));

        this.createPort("input");
        this.startTimer(500);

    },

    
    /**
     * @method
     * Called if the value of any port has been changed
     * 
     * @param {draw2d.Port} relatedPort
     * @template
     */
    onPortValueChanged: function(relatedPort){
        // call the timer manually. In this case we are safe and we
        // didn'T lost any data...
        this.onTimer();
    },
    
    /**
     * @method
     * 
     * Update the chart with the current value of the input port.
     * 
     */
    onTimer:function(){
         var port = this.getInputPort(0);
         var value=port.getValue();
         this.data.push(value===true?5:0);
         if(this.data.length>this.maxValues)
             this.data.shift();
         this.setData(this.data);
    }

});
