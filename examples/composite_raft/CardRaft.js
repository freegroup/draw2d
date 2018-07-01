// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Tue Mar 29 2016 14:50:53 GMT+0200 (CEST)
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//
var CardRaft = draw2d.shape.composite.Raft.extend({

    NAME: "CardRaft",

    init:function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0,bgColor:null,width:210,height:179},attr), setter, getter);
    },

    createSet: function(){
        var set= this.canvas.paper.set();

        // BoundingBox
        var shape = this.canvas.paper.path("M0,0 L210,0 L210,179 L0,179");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        set.push(shape);

        // Rectangle
        shape = this.canvas.paper.path('M0.5 27.5L0.5 179.5L210.5 179.5L210.5 0.5L69.5 0.5L0.5 27.5Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        set.push(shape);

        return set;
    },

    applyAlpha: function(){
    },

    setPosition:function(x,y){
        this._super(x,y);
        console.log(arguments);
    }
});

