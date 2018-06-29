/**
 * @class draw2d.shape.composite.StrongComposite
 * A StrongComposite is a composite figure with strong assignment of the children and the composite.
 * The child knows everything about the assigned composite and receives events about assignment to a 
 * composite.
 * 
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.composite.Composite
 * @since 4.8.0
 */ import draw2d from '../../packages';
draw2d.shape.composite.StrongComposite = draw2d.shape.composite.Composite.extend({
    NAME : "draw2d.shape.composite.StrongComposite",

    /**
     * @constructor
     * Creates a new strong composite element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) 
    {
        this.assignedFigures = new draw2d.util.ArrayList();
   
        this._super(attr, setter, getter);
    },

    /**
     * @method
     * Check to see if a figure is a descendant of another figure.
     * <br>
     * The contains() method returns true if the figure provided by the argument is a descendant of this figure,
     * whether it is a direct child or nested more deeply. Otherwise, it returns false.
     *
     * @param {draw2d.Figure} containedFigure The figure that may be contained by (a descendant of) this figure.
     * @since 5.5.4
     */
    contains: function(containedFigure)
    {
        for(var i= 0,len=this.assignedFigures.getSize(); i<len;i++){
            var child = this.assignedFigures.get(i);
            if(child===containedFigure || child.contains(containedFigure)) {
                return true;
            }
        }
        return this._super(containedFigure);
    },

    /**
     * @method
     * Assign a figure to the composite.
     * 
     * @param {draw2d.Figure} figure
     * @template
     */
    assignFigure: function(figure)
    {
        return this;
    },
    
    /**
     * @method
     * Remove the given figure from the group assignment
     * 
     * @param {draw2d.Figure} figure the figure to remove
     * @template
     */
    unassignFigure: function(figure)
    {
        return this;
    },
    
    /**
     * @method
     * Return all assigned figures of the composite
     * 
     * @returns {draw2d.util.ArrayList}
     */
    getAssignedFigures: function()
    {
        return this.assignedFigures;
    },
    
    
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. This event is ONLY fired if the
     * shape return "this" in the onDragEnter method.
     * 
     * 
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since  4.7.4
     **/
    onDrop: function(dropTarget, x, y, shiftKey, ctrlKey)
    {
    },
    
    /**
     * @method
     * Called if the user dropped an figure onto this element. This event is ONLY fired if the
     * shape return "this" in the onDragEnter method.
     * 
     * 
     * @param {draw2d.Figure} droppedFigure The dropped figure.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.7.4
     **/
    onCatch: function(droppedFigure, x, y, shiftKey, ctrlKey)
    {
    },
    
    /**
     * @method
     * Moves the element so it is the closest to the viewer’s eyes, on top of other elements. Additional
     * the internal model changed as well.
     * 
     * Optional: Inserts current object in front of the given one. 
     * 
     * @param {draw2d.Figure} [figure] move current object in front of the given one. 
     */
     toFront: function(figure)
     {
         this._super(figure);
         // ensure that all assigned figures are in front of the composite
         //
         var figures = this.getAssignedFigures().clone();
         figures.sort(function(a,b){
             // return 1  if a before b
             // return -1 if b before a
             return a.getZOrder()>b.getZOrder()?-1:1;
         });
         var _this = this;
         figures.each(function(i,f){
             f.toFront(_this);
         });
         
         return this;
     },

    /**
     * @method
     * Moves the element to the background. Additional
     * the internal model changed as well.
     *
     * @since 4.7.2
     */
     toBack: function(figure)
     {
         this._super(figure);
         // ensure that all assigned figures are in front of the composite
         //
         var figures = this.getAssignedFigures().clone();
         figures.sort(function(a,b){
             // return 1  if a before b
             // return -1 if b before a
             return a.getZOrder()>b.getZOrder()?-1:1;
         });
         
         var _this = this;
         figures.each(function(i,f){
             f.toBack(_this);
         });
         
         return this;
     }     
});






