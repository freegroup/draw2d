/**
 * @class draw2d.shape.node.Between
 * A simple Node which has a  InputPort and OutputPort. Mainly used for demo and examples.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.node.Between({color: "#3d3d3d"});
 *     
 *     canvas.add(figure,50,10);
 *     
 * @extends draw2d.shape.basic.Rectangle
 */ import draw2d from '../../packages';
draw2d.shape.node.Between = draw2d.shape.basic.Rectangle.extend({

    NAME : "draw2d.shape.node.Between",

    DEFAULT_COLOR : new draw2d.util.Color("#4D90FE"),

    /**
     * @constructor
     * 
     * @param {Object} [attr] the configuration of the shape
    */
	init: function(attr, setter, getter )
    {
        this._super($.extend({bgColor:this.DEFAULT_COLOR, color: this.DEFAULT_COLOR.darker(), width:50, height:50},attr), setter, getter);
        
        this.createPort("output");
        this.createPort("input");
    }
});
