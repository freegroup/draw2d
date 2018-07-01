
/**
 * @class draw2d.shape.icon.Printer

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Printer();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Printer = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Printer",

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
        return this.canvas.paper.path("M24.569,12.125h-2.12c-0.207-1.34-1.247-2.759-2.444-3.967c-1.277-1.24-2.654-2.234-3.784-2.37c-0.062-0.008-0.124-0.014-0.198-0.015H8.594c-0.119,0-0.235,0.047-0.319,0.132c-0.083,0.083-0.132,0.2-0.132,0.32v5.9H6.069c-1.104,0-2,0.896-2,2V23h4.074v2.079c0,0.118,0.046,0.23,0.132,0.318c0.086,0.085,0.199,0.131,0.319,0.131h13.445c0.118,0,0.232-0.046,0.318-0.131s0.138-0.199,0.138-0.318V23h4.074v-8.875C26.569,13.021,25.674,12.125,24.569,12.125zM21.589,24.626H9.043V21.5h12.546V24.626zM21.589,13.921c0-0.03,0-0.063-0.003-0.096c-0.015-0.068-0.062-0.135-0.124-0.2H9.043v-6.95h6.987v0.001c0.305-0.019,0.567,0.282,0.769,0.971c0.183,0.655,0.229,1.509,0.229,2.102c0.001,0.433-0.019,0.725-0.019,0.725l-0.037,0.478l0.48,0.005c0.002,0,1.109,0.014,2.196,0.26c1.044,0.226,1.86,0.675,1.938,1.184c0.003,0.045,0.003,0.091,0.003,0.133V13.921z");
    }
});

