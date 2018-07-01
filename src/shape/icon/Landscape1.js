
/**
 * @class draw2d.shape.icon.Landscape1

 * See the example:
 *
 *     @example preview small frame
 *
 *     var icon =  new draw2d.shape.icon.Landscape1();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Landscape1 = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Landscape1",

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
        return this.canvas.paper.path("M19.883,5.71H2.746c-0.163,0-0.319,0.071-0.435,0.188c-0.118,0.117-0.18,0.272-0.18,0.435v18.364c0,0.164,0.063,0.318,0.18,0.436c0.123,0.117,0.287,0.18,0.435,0.18h25.75c0.164,0,0.324-0.066,0.438-0.18c0.118-0.114,0.182-0.273,0.182-0.436V14.551c-0.002-0.102-0.01-0.188-0.021-0.271c-0.186-1.543-1.543-3.424-3.236-5.168C24.039,7.31,21.869,5.753,19.883,5.71zM26.914,12.314c-0.008-0.005-0.019-0.007-0.029-0.01c-1.092-0.293-2.33-0.355-3.199-0.355c-0.162,0-0.312,0.002-0.445,0.004c-0.037-0.604-0.129-1.604-0.356-2.625c-0.11-0.461-0.246-0.94-0.433-1.42c0.857,0.541,1.748,1.264,2.535,2.068C25.74,10.718,26.41,11.551,26.914,12.314zM3.365,6.947h16.517c0.058,0,0.12,0,0.183,0.004c0.694,0.105,1.307,1.221,1.616,2.646c0.335,1.484,0.354,2.997,0.354,3l0.007,0.656l0.651-0.051c0,0,0.398-0.027,0.99-0.025c0.809,0,1.977,0.062,2.871,0.312c0.939,0.275,1.352,0.635,1.326,1.051h0.002v9.542H3.365V6.951V6.947z");
    }
});

