
/**
 * @class draw2d.shape.icon.WheelChair

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.WheelChair();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.WheelChair = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.WheelChair",

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
        return this.canvas.paper.path("M20.373,19.85c0,4.079-3.318,7.397-7.398,7.397c-4.079,0-7.398-3.318-7.398-7.397c0-2.466,1.213-4.652,3.073-5.997l-0.251-2.21c-2.875,1.609-4.825,4.684-4.825,8.207c0,5.184,4.217,9.4,9.401,9.4c4.395,0,8.093-3.031,9.117-7.111L20.37,19.73C20.37,19.771,20.373,19.81,20.373,19.85zM11.768,6.534c1.321,0,2.392-1.071,2.392-2.392c0-1.321-1.071-2.392-2.392-2.392c-1.321,0-2.392,1.071-2.392,2.392C9.375,5.463,10.446,6.534,11.768,6.534zM27.188,22.677l-5.367-7.505c-0.28-0.393-0.749-0.579-1.226-0.538c-0.035-0.003-0.071-0.006-0.106-0.006h-6.132l-0.152-1.335h4.557c0.53,0,0.96-0.429,0.96-0.959c0-0.53-0.43-0.959-0.96-0.959h-4.776l-0.25-2.192c-0.146-1.282-1.303-2.203-2.585-2.057C9.869,7.271,8.948,8.428,9.094,9.71l0.705,6.19c0.136,1.197,1.154,2.078,2.332,2.071c0.004,0,0.007,0.001,0.012,0.001h8.023l4.603,6.436c0.439,0.615,1.338,0.727,2.007,0.248C27.442,24.178,27.628,23.292,27.188,22.677z");
    }
});

