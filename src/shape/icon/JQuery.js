
/**
 * @class draw2d.shape.icon.JQuery

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.JQuery();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.JQuery = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.JQuery",

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
        return this.canvas.paper.path("M10.322,23.041C4.579,18.723,2.777,11.07,5.494,4.583c-0.254,0.291-0.502,0.59-0.739,0.904c-5.177,6.887-4.008,16.505,2.613,21.482c6.62,4.979,16.184,3.432,21.362-3.455c0.237-0.314,0.454-0.635,0.663-0.959C23.915,26.963,16.064,27.357,10.322,23.041zM13.662,18.598c4.765,3.582,11.604,2.564,15.567-2.198c-3.609,2.641-9.09,2.475-13.361-0.736S9.916,7.231,11.451,3.03C7.976,8.161,8.897,15.015,13.662,18.598zM18.642,11.976c3.254,2.447,8.146,1.438,10.967-2.242c-2.604,1.921-6.341,1.955-9.157-0.164c-2.819-2.118-3.826-5.718-2.701-8.754C14.998,4.549,15.387,9.528,18.642,11.976z");
    }
});

