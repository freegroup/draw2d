
/**
 * @class draw2d.shape.icon.Crop

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Crop();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Crop = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Crop",

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
        return this.canvas.paper.path("M24.303,21.707V8.275l4.48-4.421l-2.021-2.048l-4.126,4.07H8.761V2.083H5.882v3.793H1.8v2.877h4.083v15.832h15.542v4.609h2.878v-4.609H29.2v-2.878H24.303zM19.72,8.753L8.761,19.565V8.753H19.72zM10.688,21.706l10.735-10.591l0.001,10.592L10.688,21.706z");
    }
});

