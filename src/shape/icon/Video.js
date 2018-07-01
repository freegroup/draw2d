
/**
 * @class draw2d.shape.icon.Video

 * See the example:
 *
 *     @example preview small frame
 *
 *     var icon =  new draw2d.shape.icon.Video();
 *
 *     canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */ import draw2d from '../../packages';
draw2d.shape.icon.Video = draw2d.shape.icon.Icon.extend({
    NAME : "draw2d.shape.icon.Video",

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
        return this.canvas.paper.path("M27.188,4.875v1.094h-4.5V4.875H8.062v1.094h-4.5V4.875h-1v21.25h1v-1.094h4.5v1.094h14.625v-1.094h4.5v1.094h1.25V4.875H27.188zM8.062,23.719h-4.5v-3.125h4.5V23.719zM8.062,19.281h-4.5v-3.125h4.5V19.281zM8.062,14.844h-4.5v-3.125h4.5V14.844zM8.062,10.406h-4.5V7.281h4.5V10.406zM11.247,20.59V9.754l9.382,5.418L11.247,20.59zM27.188,23.719h-4.5v-3.125h4.5V23.719zM27.188,19.281h-4.5v-3.125h4.5V19.281zM27.188,14.844h-4.5v-3.125h4.5V14.844zM27.188,10.406h-4.5V7.281h4.5V10.406z");
    }
});

