
/**
 * @class draw2d.shape.icon.ReflectV

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.ReflectV();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.ReflectV = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.ReflectV",

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
        return this.canvas.paper.path("M20.643,16.008v-0.854h-1.705v0.854H20.643zM24.053,16.008v-0.854h-1.705v0.854H24.053zM27.463,16.008v-0.854h-1.705v0.854H27.463zM30.059,16.008v-0.854h-0.891v0.854H30.059zM17.232,16.008v-0.854h-1.709v0.854H17.232zM3.593,16.008v-0.854H1.888v0.854H3.593zM7.003,16.008v-0.854H5.298v0.854H7.003zM10.414,16.008v-0.854H8.709v0.854H10.414zM13.824,16.008v-0.854h-1.705v0.854H13.824zM3.694,13.167h22.134V1.152L3.694,13.167zM7.048,12.314l17.929-9.729v9.729H7.048zM25.828,18.042H3.694l22.134,12.015V18.042z");
    }
});

