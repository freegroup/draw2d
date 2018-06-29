
/**
 * @class draw2d.shape.basic.GhostVertexResizeHandle
 * ResizeHandle for a vertex edit policy. Click of this kind of resize handles
 * adds a new vertex to the polyline or polygon.
 * 
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle 
 */ import draw2d from '../../packages';
draw2d.shape.basic.GhostVertexResizeHandle = draw2d.shape.basic.LineResizeHandle.extend({
    NAME : "draw2d.shape.basic.GhostVertexResizeHandle",

    init: function( figure, precursorIndex)
    {
        this.maxOpacity = 0.35;
        
        this._super(figure);
        this.precursorIndex = precursorIndex;
        
        this.setAlpha(this.maxOpacity);
    },
   
    createShapeElement: function()
    {
        var shape= this._super();
        
        shape.attr({"cursor":"pointer"});
        
        return shape;
     },

     /**
      * @method
      * Set the alpha blending of this figure. 
      *
      * @param {Number} percent Value between [0..1].
      * @template
      **/
     setAlpha: function( percent)
     {
       percent = Math.min(this.maxOpacity,Math.max(0,parseFloat(percent)));
       this._super(percent);
       
       return this;
     },

    /**
     * @method
     * Called when a user clicks on the element
     * 
     * @template
     */
    onClick: function()
    {
    	var cmd  = new draw2d.command.CommandAddVertex(this.owner, this.precursorIndex+1,this.getAbsoluteX() + this.getWidth()/2, this.getAbsoluteY() + this.getHeight()/2 );
        this.getCanvas().getCommandStack().execute(cmd);
    },

    onDragStart: function(x, y, shiftKey, ctrlKey)
    {
        return true;
    },

        /**
     * @method
     * Called from the framework during a drag&drop operation
     * 
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {Boolean}
     **/
    onDrag: function(dx, dy, dx2, dy2)
    {
        return true;
    },
    
    /**
     * @method Called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
     *         
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {Boolean}
     */
    onDragEnd: function(x, y, shiftKey, ctrlKey)
    {
        // fire an event
        // @since 5.3.3
        this.fireEvent("dragend",{x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});

        return true;
    },
    
    
    /**
     * @method
     * Controls the location of the resize handle 
     *
     * @template
     **/
    relocate: function()
    {
        var p1 = this.owner.getVertices().get(this.precursorIndex);
        var p2 = this.owner.getVertices().get(this.precursorIndex+1);
     
        var x = ((p2.x - p1.x) / 2 + p1.x - this.getWidth()/2);
        var y = ((p2.y - p1.y) / 2 + p1.y - this.getHeight()/2);

   		
  		this.setPosition(x,y);
    }    


});
