
/**
 * @class draw2d.shape.icon.Jigsaw

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Jigsaw();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Jigsaw = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Jigsaw",

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
        return this.canvas.paper.path("M3.739,13.619c0,0,3.516-4.669,5.592-3.642c2.077,1.027-0.414,2.795,1.598,3.719c2.011,0.924,5.048-0.229,4.376-2.899c-0.672-2.67-1.866-0.776-2.798-2.208c-0.934-1.432,4.586-4.59,4.586-4.59s3.361,6.651,4.316,4.911c1.157-2.105,3.193-4.265,5.305-1.025c0,0,1.814,2.412,0.246,3.434s-2.917,0.443-3.506,1.553c-0.586,1.112,3.784,4.093,3.784,4.093s-2.987,4.81-4.926,3.548c-1.939-1.262,0.356-3.364-2.599-3.989c-1.288-0.23-3.438,0.538-3.818,2.34c-0.13,2.709,1.604,2.016,2.797,3.475c1.191,1.457-4.484,4.522-4.484,4.522s-1.584-3.923-3.811-4.657c-2.227-0.735-0.893,2.135-2.917,2.531c-2.024,0.396-4.816-2.399-3.46-4.789c1.358-2.391,3.275-0.044,3.441-1.951C7.629,16.087,3.739,13.619,3.739,13.619z");
    }
});

