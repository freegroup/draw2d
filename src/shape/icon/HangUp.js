
/**
 * @class draw2d.shape.icon.HangUp

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.HangUp();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.HangUp = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.HangUp",

    /**
     * 
     * @constructor
     * Creates a new icon element which are not assigned to any canvas.
     * 
     * @param {Object} attr the configuration of the shape
     */
    init: function(attr, setter, getter ) {
      this._super(extend({width:50,height:50},attr), setter, getter);
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M28.563,10.494c-7.35-7.349-19.265-7.348-26.612,0.001c-1.796,1.796-0.247,6.84-0.247,6.84c0.135,0.443,0.616,0.72,1.067,0.614l6.898-1.604c0.451-0.105,0.82-0.57,0.82-1.033l0.001-3.685c0-0.463,0.379-0.842,0.842-0.842h8.285c0.464,0,0.843,0.379,0.843,0.842l-0.001,3.471c0.001,0.462,0.375,0.907,0.83,0.986l7.635,1.316c0.456,0.08,0.873-0.232,0.926-0.692C29.851,16.708,30.359,12.29,28.563,10.494zM17.264,14.072h-3.501v4.39h-2.625l4.363,7.556l4.363-7.556h-2.6V14.072z");
    }
});

