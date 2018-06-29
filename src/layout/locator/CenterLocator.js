
/**
 * @class draw2d.layout.locator.CenterLocator
 * 
 * A CenterLocator is used to place figures in the center of a parent shape.
 *
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({diameter:120});
 *     circle.setStroke(3);
 *     circle.setColor("#A63343");
 *     circle.setBackgroundColor("#E65159");
 *     circle.add(new draw2d.shape.basic.Label({text:"Center Label"}), new draw2d.layout.locator.CenterLocator());	
 *     canvas.add( circle, 100,50);
 *
 *     
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
import draw2d from '../../packages';

draw2d.layout.locator.CenterLocator= draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.CenterLocator",
    
    /**
     * @constructor
     * Constructs a locator with associated parent.
     * 
     */
    init: function()
    {
      this._super();
    },
    
    
    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function(index, target)
    {
       var parent = target.getParent();
       var boundingBox = parent.getBoundingBox();

       // TODO: instanceof is always a HACK. ugly. Redirect the call to the figure instead of 
       // determine the position with a miracle.
       //
       if(target instanceof draw2d.Port){
           target.setPosition(boundingBox.w/2,boundingBox.h/2);
       }
       else{
           var targetBoundingBox = target.getBoundingBox();
           target.setPosition(((boundingBox.w/2-targetBoundingBox.w/2)|0)+0.5,((boundingBox.h/2-(targetBoundingBox.h/2))|0)+0.5);
       }
    }
});
