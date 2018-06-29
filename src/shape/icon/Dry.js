
/**
 * @class draw2d.shape.icon.Dry

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Dry();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Dry = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Dry",

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
        return this.canvas.paper.path("M14.784,26.991c0,1.238-1.329,1.696-1.835,1.696c-0.504,0-1.536-0.413-1.65-1.812c0-0.354-0.288-0.642-0.644-0.642c-0.354,0-0.641,0.287-0.641,0.642c0.045,1.056,0.756,3.052,2.935,3.052c2.432,0,3.166-1.882,3.166-3.144v-8.176l-1.328-0.024C14.787,18.584,14.784,25.889,14.784,26.991zM15.584,9.804c-6.807,0-11.084,4.859-11.587,8.326c0.636-0.913,1.694-1.51,2.89-1.51c1.197,0,2.22,0.582,2.855,1.495c0.638-0.904,1.69-1.495,2.88-1.495c1.2,0,2.26,0.6,2.896,1.517c0.635-0.917,1.83-1.517,3.03-1.517c1.19,0,2.241,0.591,2.879,1.495c0.636-0.913,1.659-1.495,2.855-1.495c1.197,0,2.254,0.597,2.89,1.51C26.669,14.663,22.393,9.804,15.584,9.804zM14.733,7.125v2.081h1.323V7.125c0-0.365-0.296-0.661-0.661-0.661C15.029,6.464,14.733,6.76,14.733,7.125zM7.562,6.015c0.54,0.312,1.229,0.128,1.54-0.412c0.109-0.189,0.157-0.398,0.15-0.602L9.251,3.09L7.59,4.047c-0.178,0.095-0.333,0.24-0.441,0.428C6.837,5.015,7.022,5.703,7.562,6.015zM5.572,11.717c0.109-0.19,0.158-0.398,0.151-0.602L5.721,9.203l-1.66,0.957c-0.178,0.096-0.333,0.241-0.441,0.429c-0.311,0.539-0.127,1.229,0.413,1.539C4.571,12.44,5.26,12.256,5.572,11.717zM10.523,9.355c0.539,0.312,1.229,0.126,1.541-0.412c0.109-0.189,0.156-0.398,0.15-0.603L12.214,6.43l-1.662,0.956c-0.177,0.097-0.332,0.241-0.441,0.43C9.799,8.354,9.984,9.044,10.523,9.355zM15.251,3.998c0.539,0.312,1.229,0.126,1.54-0.412c0.11-0.19,0.157-0.398,0.15-0.603L16.94,1.072l-1.661,0.956c-0.178,0.097-0.332,0.242-0.441,0.43C14.526,2.998,14.711,3.687,15.251,3.998zM19.348,8.914c0.539,0.312,1.228,0.128,1.541-0.412c0.109-0.189,0.156-0.398,0.149-0.602h-0.001V5.988l-1.661,0.957c-0.178,0.096-0.332,0.241-0.441,0.429C18.623,7.914,18.809,8.603,19.348,8.914zM23.633,5.196c0.54,0.312,1.23,0.126,1.542-0.413c0.109-0.189,0.156-0.398,0.149-0.602h-0.001V2.27l-1.662,0.957c-0.177,0.096-0.331,0.24-0.44,0.43C22.909,4.195,23.094,4.885,23.633,5.196zM27.528,8.51l-1.659,0.956c-0.18,0.097-0.334,0.242-0.443,0.43c-0.312,0.539-0.127,1.229,0.413,1.54c0.539,0.312,1.229,0.127,1.541-0.412c0.109-0.19,0.158-0.398,0.151-0.603L27.528,8.51z");
    }
});

