
/**
 * @class draw2d.shape.icon.Clip

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Clip();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Clip = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Clip",

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
        return this.canvas.paper.path("M23.898,6.135c-1.571-1.125-3.758-0.764-4.884,0.808l-8.832,12.331c-0.804,1.122-0.546,2.684,0.577,3.488c1.123,0.803,2.684,0.545,3.488-0.578l6.236-8.706l-0.813-0.583l-6.235,8.707h0c-0.483,0.672-1.42,0.828-2.092,0.347c-0.673-0.481-0.827-1.419-0.345-2.093h0l8.831-12.33l0.001-0.001l-0.002-0.001c0.803-1.119,2.369-1.378,3.489-0.576c1.12,0.803,1.379,2.369,0.577,3.489v-0.001l-9.68,13.516l0.001,0.001c-1.124,1.569-3.316,1.931-4.885,0.808c-1.569-1.125-1.93-3.315-0.807-4.885l7.035-9.822l-0.813-0.582l-7.035,9.822c-1.447,2.02-0.982,4.83,1.039,6.277c2.021,1.448,4.831,0.982,6.278-1.037l9.68-13.516C25.83,9.447,25.47,7.261,23.898,6.135z");
    }
});

