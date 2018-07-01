
MySparkline = draw2d.shape.diagram.Sparkline.extend({

    NAME : "MySparkline",
    
    init : function(attr)
    {
        this._super(attr);
        this.maxValues = 100;
        
        this.setBackgroundColor("#FF765E");
        this.setRadius(5);
        this.createPort("input");
        this.startTimer(100);
        this.setDimension(250,50);
    },
    
    setData:function( data)
    {
        this._super(data);

        this.min = 0;
        this.max = 100;
        this.cache= {};
        this.repaint();
    },
    
    /**
     * @method
     * 
     * Update the chart with the current value of the input port.
     * 
     */
    onTimer:function()
    {
         var port = this.getInputPort(0);
         var value=port.getValue();
         this.data.push(value===null?0:value);
         if(this.data.length>this.maxValues)
             this.data.shift();
         this.setData(this.data);
    }

});
