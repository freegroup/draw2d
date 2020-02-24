var MarkerStateBFigure = draw2d.shape.layout.HorizontalLayout.extend({

    NAME : "MarkerStateBFigure",

    /**
     * @param attr
     */
    init : function(attr, setter, getter)
    {
        this._super($.extend({
            bgColor:"#FFFFFF",
            stroke:1,
            color:"#00bcd4",
            radius:2,
            padding:{left:3, top:3, bottom:3, right:8},
            gap:5
        },attr), 
        setter, 
        getter);

        this.stickTick = new draw2d.shape.basic.Circle({
            diameter:10,
            bgColor:"#f0f0f0",
            stroke:1,
            resizeable:false
        });
        this.add(this.stickTick);
        this.stickTick.hitTest = function(){return false};
        this.stickTick.addCssClass("cursorPointer");

        this.label = new draw2d.shape.basic.Label({
            text:attr.text,
            resizeable:false,
            stroke:0,
            padding:0,
            fontSize:10,
            fontColor:"#303030"
        });
        this.add(this.label);
        // don't catch the mouse events. This is done by the parent container
        this.label.hitTest = function(){return false};
        this.label.addCssClass("cursorPointer");

        // we must override the hitTest method to ensure that the parent can receive the mouseenter/mouseleave events.
        // Unfortunately draw2D didn't provide event bubbling like HTML. The first shape in queue consumes the event.
        //
        // now this shape is "dead" for any mouse events and the parent must/can handle this.
        this.hitTest = function(){return false};
    },

    setText: function(text)
    {
        this.label.setText(text);
    },

    setTick :function(flag)
    {
        this.stickTick.attr({bgColor:flag?"#00bcd4":"#f0f0f0"});
   },

    getStickTickFigure:function()
    {
        return this.stickTick;
    },

    getLabelFigure:function()
    {
        return this.label;
    },

    /**
     * @method
     *
     *
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        attributes= attributes || {};

        attributes.path = this.calculatePath();

        this._super(attributes);
    },


    /**
     * @method
     *
     * Override the default rendering of the HorizontalLayout, which is a simple
     * rectangle. We want an arrow.
     */
    createShapeElement : function()
    {
        return this.canvas.paper.path(this.calculatePath());
    },

    /**
     * stupid copy&paste the code from the Polygon shape...unfortunately the LayoutFigure isn't a polygon.
     *
     * @returns {string}
     */
    calculatePath: function()
    {
        var arrowLength=8;

        this.vertices   = new draw2d.util.ArrayList();

        var w= this.width;
        var h= this.height;
        var pos= this.getAbsolutePosition();
        this.vertices.add(new draw2d.geo.Point(pos.x,  pos.y)  );
        this.vertices.add(new draw2d.geo.Point(pos.x+w-arrowLength,pos.y)  );

        this.vertices.add(new draw2d.geo.Point(pos.x+w,pos.y+h/2));

        this.vertices.add(new draw2d.geo.Point(pos.x+w-arrowLength,pos.y+h));
        this.vertices.add(new draw2d.geo.Point(pos.x  ,pos.y+h));

        var radius = this.getRadius();
        var path = [];
        // hard corners
        //
        if(radius === 0){
            var length = this.vertices.getSize();
            var p = this.vertices.get(0);
            path.push("M",(p.x|0)+0.5," ",(p.y|0)+0.5);
            for(var i=1;i<length;i++){
                p = this.vertices.get(i);
                path.push("L", (p.x|0)+0.5, " ", (p.y|0)+0.5);
            }
            path.push("Z");
        }
        // soften/round corners
        //
        else{
            length = this.vertices.getSize();
            var start = this.vertices.first();
            var end   = this.vertices.last();
            if(start.equals(end)){
                length = length-1;
                end = this.vertices.get(length-1);
            }
            var begin   = draw2d.geo.Util.insetPoint(start,end, radius);
            path.push("M", (begin.x|0)+0.5, ",", (begin.y|0)+0.5);
            for( var i=0 ;i<length;i++){
                start = this.vertices.get(i);
                end   = this.vertices.get((i+1)%length);
                modStart = draw2d.geo.Util.insetPoint(start,end, radius);
                modEnd   = draw2d.geo.Util.insetPoint(end,start,radius);
                path.push("Q",start.x,",",start.y," ", (modStart.x|0)+0.5, ", ", (modStart.y|0)+0.5);
                path.push("L", (modEnd.x|0)+0.5, ",", (modEnd.y|0)+0.5);
            }
        }
        return path.join("");
    }


});
