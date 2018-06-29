
/**
 * @class draw2d.shape.icon.Picker

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Picker();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Picker = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Picker",

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
        return this.canvas.paper.path("M22.221,10.853c-0.111-0.414-0.261-0.412,0.221-1.539l1.66-3.519c0.021-0.051,0.2-0.412,0.192-0.946c0.015-0.529-0.313-1.289-1.119-1.642c-1.172-0.555-1.17-0.557-2.344-1.107c-0.784-0.396-1.581-0.171-1.979,0.179c-0.42,0.333-0.584,0.7-0.609,0.75L16.58,6.545c-0.564,1.084-0.655,0.97-1.048,1.147c-0.469,0.129-1.244,0.558-1.785,1.815c-1.108,2.346-1.108,2.346-1.108,2.346l-0.276,0.586l1.17,0.553l-3.599,7.623c-0.38,0.828-0.166,1.436-0.166,2.032c0.01,0.627-0.077,1.509-0.876,3.21l-0.276,0.586l3.517,1.661l0.276-0.585c0.808-1.699,1.431-2.326,1.922-2.717c0.46-0.381,1.066-0.6,1.465-1.42l3.599-7.618l1.172,0.554l0.279-0.589c0,0,0,0,1.105-2.345C22.578,12.166,22.419,11.301,22.221,10.853zM14.623,22.83c-0.156,0.353-0.413,0.439-1.091,0.955c-0.577,0.448-1.264,1.172-2.009,2.6l-1.191-0.562c0.628-1.48,0.75-2.474,0.73-3.203c-0.031-0.851-0.128-1.104,0.045-1.449l3.599-7.621l3.517,1.662L14.623,22.83z");
    }
});

