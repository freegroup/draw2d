/**
 * @class draw2d.shape.composite.WeakComposite
 * A WeakComposite is a composite figure with loose coupling of the children and the composite.
 * The child didn't know anything about the assigned composite nor did they receive any events
 * about assignment to a composite.
 * 
 * Assignment without obligation.
 * 
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.composite.Composite
 * @since 4.8.0
 */ import draw2d from '../../packages';
draw2d.shape.composite.WeakComposite = draw2d.shape.composite.Composite.extend({
    NAME : "draw2d.shape.composite.WeakComposite",

    /**
     * @constructor
     * Creates a new weak composite element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter)
    {
       this._super(attr, setter, getter);
    }
});






