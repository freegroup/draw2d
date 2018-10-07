/**
 * This is only the mouseover reactive shape. A little bit smaller than the visible shape
 *
 * Or you can display this shape with opacity of 0.2 to indicate that this is a reactive area.
 */
var MarkerStateAFigure = draw2d.shape.basic.Label.extend({

    NAME : "MarkerStateAFigure",

    /**
     * @param attr
     */
    init : function(attr, setter, getter)
    {
        this._super($.extend({
            padding:{left:5, top:2, bottom:2, right:10},
            bgColor:null,
            stroke:1,
            color:null,
            fontColor:null,
            fontSize:10
        },attr), 
        setter, 
        getter);

        // we must override the hitTest method to ensure that the parent can receive the mouseenter/mouseleave events.
        // Unfortunately draw2D didn't provide event bubbling like HTML. The first shape in queue consumes the event.
        //
        // now this shape is "dead" for any mouse events and the parent must/can handle this.
        this.hitTest = function(){return false};
    }

});