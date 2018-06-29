
/**
 * @class draw2d.shape.icon.TShirt

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.TShirt();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.TShirt = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.TShirt",

    /**
     * 
     * @constructor
     * Creates a new icon element which are not assigned to any canvas.
     * 
     * @param {Object} attr the configuration of the shape
     */
    init: function(attr, setter, getter ) {
      this._super($.extend({width:50,height:50},attr), setter, getter);
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M20.1,4.039c-0.681,1.677-2.32,2.862-4.24,2.862c-1.921,0-3.56-1.185-4.24-2.862L1.238,8.442l2.921,6.884l3.208-1.361V28h17.099V14.015l3.093,1.312l2.922-6.884L20.1,4.039z");
    }
});

