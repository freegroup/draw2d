
TooltipFigure = draw2d.shape.basic.Rectangle.extend({

    NAME : "TooltipFigure",
    
    /**
     * @constructor 
     * Creates a new figure element which is not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init : function(attr)
    {
    	this.tooltip = null;

    	this._super($.extend({
            width:50,
            height:50,
            radius:2
        },attr));
        
        this.createPort("input");
        this.createPort("output");
        this.zoomCallback = $.proxy(this.positionTooltip,this);
    },

    setCanvas: function(canvas)
    {
        if(this.canvas !==null) this.canvas.off(this.zoomCallback);
        this._super(canvas);
        if(this.canvas !==null) this.canvas.on("zoom",this.zoomCallback);
    },
    /**
     * @method
     * Change the color and the internal value of the figure.
     * Post the new value to related input ports.
     * 
     */
    onMouseEnter: function()
    {
        this.showTooltip();
    },
    
    onMouseLeave: function()
    {
        this.hideTooltip();
    },
    
    setPosition: function(x,y)
    {
        this._super(x,y);
        this.positionTooltip();
    },
    
    hideTooltip:function()
    {
        this.tooltip.fadeOut(500, function() {
            $(this).remove();
        });
        this.tooltip = null;
    },
    
    
    showTooltip:function()
    {
        this.tooltip= $('<div class="tooltip">Tooltip</div>')
            .appendTo('body')
            .hide()
            .fadeIn(1000);
        this.positionTooltip();        
    },
    
    positionTooltip: function()
    {
        if( this.tooltip===null){
            return;
        }
        
        var width =  this.tooltip.outerWidth(true);
        var pos = this.canvas.fromCanvasToDocumentCoordinate(
                this.getAbsoluteX()+this.getWidth()/2-width/2+8,
                this.getAbsoluteY()+this.getHeight() + 10);

        // remove the scrolling part from the tooltip because the tooltip is placed
        // inside the scrolling container
        pos.x +=this.canvas.getScrollLeft();
        pos.y +=this.canvas.getScrollTop();

        this.tooltip.css({'top': pos.y, 'left': pos.x});
    }
});
