// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Tue Mar 29 2016 19:19:12 GMT+0200 (CEST)                                         
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//
var CardJailhouse = draw2d.shape.composite.Jailhouse.extend({

    NAME: "CardJailhouse",

    init:function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width:270,height:184},attr), setter, getter);
        var port;
    },

    createShapeElement : function()
    {
        var shape = this._super();
        this.originalWidth = 270;
        this.originalHeight= 184;
        return shape;
    },

    createSet: function(){
        var set= this.canvas.paper.set();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L270,0 L270,184 L0,184");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        set.push(shape);

        // Rectangle
        shape = this.canvas.paper.path('M0.5 24.5L0.5 184.5L270.5 184.5L270.5 0.5L81.5 0.5L0.5 24.5Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#EFFFEB","opacity":1});
        set.push(shape);

        return set;
    },

    applyAlpha: function(){
    }
});

