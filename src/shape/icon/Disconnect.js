
/**
 * @class draw2d.shape.icon.Disconnect

 * See the example:
 *
 *     @example preview small frame
 *     
 *     var icon =  new draw2d.shape.icon.Disconnect();
 *     
 *     canvas.add(icon,50,10);
 *     
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Disconnect = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Disconnect",

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
        return this.canvas.paper.path("M9.219,9.5c-2.733,0-5.05,1.766-5.884,4.218H1.438v4.001h1.897c0.833,2.452,3.15,4.219,5.884,4.219c3.435,0,6.219-2.784,6.219-6.219S12.653,9.5,9.219,9.5zM27.685,13.719c-0.944-5.172-5.461-9.094-10.903-9.094v4c3.917,0.006,7.085,3.176,7.094,7.094c-0.009,3.917-3.177,7.085-7.094,7.093v4.002c5.442-0.004,9.959-3.926,10.903-9.096h2.065v-3.999H27.685z");
    }
});

