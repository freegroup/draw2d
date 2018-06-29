
/**
 * @class draw2d.layout.locator.BottomLocator
 *
 * A bottomLocator is used to place figures at the bottom of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({
 *         x:100,
 *         y:50,
 *         diameter:100,
 *         stroke: 3,
 *         color:"#A63343",
 *         bgColor:"#E65159"
 *     });
 *
 *     circle.add(new draw2d.shape.basic.Label({text:"Bottom Label"}), new draw2d.layout.locator.BottomLocator());
 *     canvas.add( circle);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
import draw2d from '../../packages';

draw2d.layout.locator.BottomLocator= draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.BottomLocator",

    /**
     * @constructor
     *
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
       // I made a wrong decision in the port handling: anchor point
       // is in the center and not topLeft. Now I must correct this flaw here, and there, and...
       // shit happens.
       var offset = (parent instanceof draw2d.Port)?boundingBox.w/2:0;


       var targetBoundingBox = target.getBoundingBox();
       if(target instanceof draw2d.Port){
           target.setPosition(boundingBox.w/2-offset,boundingBox.h);
       }
       else{
           target.setPosition(boundingBox.w/2-targetBoundingBox.w/2-offset,2+boundingBox.h);
       }
    }
});
