/**
 * @class draw2d.shape.basic.Polygon
 * A Polygon figure.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var p1 =  new draw2d.shape.basic.Polygon({width:100, height:100});
 *     var p2 =  new draw2d.shape.basic.Polygon({width:100, height:60});
 *     
 *     canvas.add(p1,10,10);
 *     canvas.add(p2,100,10);
 *     
 *     p2.attr({color:"#f0f000", alpha:0.7});
 *     
 *     canvas.setCurrentSelection(p2);
 *     
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */ import draw2d from '../../packages';
draw2d.shape.basic.Polygon = draw2d.VectorFigure.extend({
    
    NAME: "draw2d.shape.basic.Polygon",
    
    /**
     * @constructor
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter )
    {
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.vertices   = new draw2d.util.ArrayList();

        this._super(attr, setter, getter);

        // we must cache the initial width/height because the width/height of the shape
        // is recalculated in the addVertex method. After the first call this values are 0/0
        if(this.vertices.getSize()===0){
            var w= this.width;
            var h= this.height;
            var pos= this.getPosition();
            this.addVertex(new draw2d.geo.Point(0,0) );
            this.addVertex(new draw2d.geo.Point(w,0) );
            this.addVertex(new draw2d.geo.Point(w,h) );

            this.setPosition(pos);
        }

        this.svgPathString=null;

        this.installEditPolicy(new draw2d.policy.figure.VertexSelectionFeedbackPolicy());
    },
    
    /**
     * @inheritdoc
     */
     setRadius: function(radius)
     {
        this.svgPathString =null;
        
        this._super(radius);
        this.fireEvent("change:radius",{value:radius});
        
        return this;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function()
    {
        // return some good default...
        return this.canvas.paper.path("M0 10L100 100");
    },

    /**
     * @method
     * calculate the path of the polygon
     * 
     */
    calculatePath: function()
    {
        var radius = this.getRadius();
        var path = [];
        // hard corners
        //
        if(radius === 0){
            var length = this.vertices.getSize();
            var p = this.vertices.get(0);
            path.push("M",p.x," ", p.y);
            for(var i=1;i<length;i++){
                  p = this.vertices.get(i);
                  path.push("L", p.x, " ", p.y);
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
            path.push("M", begin.x, ",", begin.y);
            for( var i=0 ;i<length;i++){
                  start = this.vertices.get(i);
                  end   = this.vertices.get((i+1)%length);
                  modStart = draw2d.geo.Util.insetPoint(start,end, radius);
                  modEnd   = draw2d.geo.Util.insetPoint(end,start,radius);
                  path.push("Q",start.x,",",start.y," ", modStart.x, ", ", modStart.y);
                  path.push("L", modEnd.x, ",", modEnd.y);
            }
        }
        this.svgPathString = path.join("");
        return this;
    },
    

    /**
     * @inheritdoc
     */
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        if(this.svgPathString===null){
            this.calculatePath();
        }
        
        attributes= attributes || {};

        draw2d.util.JSON.ensureDefault(attributes,"path" ,this.svgPathString);

        this._super(attributes);
    },

    /**
     * @method
     * Translate the figure with the given x/y offset. This method modifies all
     * vertices and the bounding box.
     *
     * @param {Number} dx The new x translate offset
     * @param {Number} dy The new y translate offset
     **/
    translate: function(dx , dy )
    {
        var _this = this;

        // TODO: This is not good. If the polygon part of an "Composite" I should call
        //       the adjustPosition. IF we DragDrap the composition the figures inside should follow
        //       without modify the dx/dy.
        //
        dx = this.x+dx;
        dy = this.y+dy;
        this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                var newPos = e.adjustPosition(_this,dx,dy);
                dx = newPos.x;
                dy = newPos.y;
            }
        });
        dx = dx-this.x;
        dy = dy-this.y;



        this.vertices.each(function(i,e){
            e.translate(dx,dy);
        });
        this.svgPathString = null;
        this.updateBoundingBox();

        this.repaint();


        // Update the resize handles if the user change the position of the
        // element via an API call.
        //
        this.editPolicy.each(function(i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("move",{figure:this, dx:dx, dy:dy});
        this.fireEvent("change:x",{value:this.x});
        this.fireEvent("change:y",{value:this.y});

        return this;
    },
  
    /**
     * @method
     * Change the position of the polygon. This method updates all vertices.
     * 
     * @param {Number|draw2d.geo.Point} x
     * @param {Number} y
     */
    setPosition: function(x, y)
    {
        if (x instanceof draw2d.geo.Point) {
            y = x.y;
            x = x.x;
        }
        this.svgPathString = null;

        var dx = x-this.minX;
        var dy = y-this.minY;

        this.translate(dx,dy);
        
        this.x = x;
        this.y = y;

        return this;
    },
    
    /**
     * @inheritdoc
     */
    setDimension: function(w, h)
    {
        var oldWidth = this.width;
        var oldHeight= this.height;
        
        this._super(w,h);
        
        var fracWidth  = (1/oldWidth)*this.width;
        var fracHeight = (1/oldHeight)*this.height;
        
        var thisX = this.x;
        var thisY = this.y;
        this.vertices.each(function(i,e){
            // calculate difference between point and figure origin
            var diffX = (e.getX()-thisX)*fracWidth;
            var diffY = (e.getY()-thisY)*fracHeight;
            e.setPosition(thisX+diffX,thisY+diffY);
        });

        this.svgPathString = null;
        this.repaint();
        this.fireEvent("change:dimension",{value:{width:this.width, height:this.height}});
        
        return this;
    },
    
    /**
     * @method
     * Return all vertices of the polygon.
     * 
     * @returns {draw2d.util.ArrayList}
     */
    getVertices: function()
    {
        return this.vertices;
    },
    

    /**
     * @method
     * Return the Vertex with the given index.
     *
     * @param {Number} index the index of the vertex to return
     * @since 5.0.2
     */
    getVertex: function( index)
    {
        return this.vertices.get(index);
    },


    resetVertices: function()
    {
        this.vertices = new draw2d.util.ArrayList();
        
        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();
        
        var _this = this;
        this.editPolicy.each(function(i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
    },
    
    /**
     * @method
     * Update the vertex at the given index. The method call didn't have any effect 
     * if the vertex didn't exists.
     * 
     * @param {Number} index
     * @param {Number} x
     * @param {Number} y
     */
    setVertex: function(index, x, y)
    {
        var vertex = this.vertices.get(index);

        // invalid point or nothing to do
        //
        if (vertex === null || (vertex.x === x && vertex.y === y)) {
            return this;
        }

        vertex.x = parseFloat(x);
        vertex.y = parseFloat(y);
        
        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();
        
        var _this = this;
        this.editPolicy.each(function(i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertices",{value:this.vertices});

        return this;
    },
    
    /**
     * @method
     * Append a new vertex to the polygon.
     * 
     * @param {Number | draw2d.geo.Point} x
     * @param {Number} [y]
     */
    addVertex: function( x, y)
    {
        this.vertices.add(new draw2d.geo.Point(x,y));
      
        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();
        
        var _this = this;
        this.editPolicy.each(function(i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertices",{value:this.vertices});

        return this;
    },

    /**
     * @method
     * Insert a new vertex at the given index. All vertices will be shifted to 
     * free the requested index.
     * 
     * @param {Number} index
     * @param {Number} x
     * @param {Number} y
     */
    insertVertexAt: function(index, x, y)
    {
        this.vertices.insertElementAt(new draw2d.geo.Point(x,y),index);
        
        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();
        
        if(!this.selectionHandles.isEmpty()){
            var _this = this;
	        this.editPolicy.each(function(i, e) {
	            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
	                e.onUnselect(_this.canvas, _this);
	                e.onSelect(_this.canvas, _this);
	            }
	        });
        }
        this.fireEvent("change:vertices",{value:this.vertices});

        return this;
    },


    /**
     * @method
     * Remove a vertex from the polygon and return the removed point.
     * 
     * @param {Number} index
     * 
     * @returns {draw2d.geo.Point} the removed vertex
     */
    removeVertexAt: function(index)
    {
        // a polygon need at least 3 vertices
        //
        if(this.vertices.getSize()<=3){
            return null;
        }
        
        var vertex = this.vertices.removeElementAt(index);
        
        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();
        
        if(!this.selectionHandles.isEmpty()){
            var _this = this;
	        this.editPolicy.each(function(i, e) {
	            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
	                e.onUnselect(_this.canvas, _this);
	                e.onSelect(_this.canvas, _this);
	            }
	        });
        }
        this.fireEvent("change:vertices",{value:this.vertices});

        return vertex;
    },
    

    
    /**
     * @inheritdoc
     */
    setRotationAngle: function(angle)
    {
        this.rotationAngle = 360%angle;
        
        // The different to the other figures is, the the vertices must rotated instead of
        // transform the shape with SVG matrix. 
        //
        // Reason: the vertices are selectable and in this case the coordinates must transform 
        //         and not only the resulting SVG shape.
        //
        var radian =  angle / (180/Math.PI);
        var center = this.getBoundingBox().getCenter();
        var rotate = function(x, y, xm, ym, radian) {
            var cos = Math.cos,
                sin = Math.sin;
                return {x: (x - xm) * cos(radian) - (y - ym) * sin(radian)   + xm,
                        y: (x - xm) * sin(radian) + (y - ym) * cos(radian)   + ym};
        };
        
        this.vertices.each(function(i,e){
            var rot =rotate(e.x,e.y,center.x,center.y,radian);
            e.setPosition(rot.x,rot.y);
        });
        
        this.updateBoundingBox();

        
        // Update the resize handles if the user change the position of the element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                e.moved(_this.canvas, _this);
            }
        });

        this.repaint();
        this.fireEvent("change:angle",{value:this.rotationAngle});

        return this;
    },

    /**
     * @method
     * Calculate the bounding box of the shape and store them in an internal
     * variable for fast access.
     * 
     * @private
     */
    updateBoundingBox: function()
    {
        if(this.vertices.isEmpty()){
            this.minX = this.x;
            this.minY = this.y;
            this.maxX = this.x+this.width;
            this.maxY = this.y+this.height;
        }
        else{
            this.minX = this.x= Math.min.apply(Math,$.map(this.vertices.asArray(),function(n,i){return n.x;}));
            this.minY = this.y= Math.min.apply(Math,$.map(this.vertices.asArray(),function(n,i){return n.y;}));
            this.maxX = Math.max.apply(Math,$.map(this.vertices.asArray(),function(n,i){return n.x;}));
            this.maxY = Math.max.apply(Math,$.map(this.vertices.asArray(),function(n,i){return n.y;}));
            this.width = this.maxX - this.minX;
            this.height= this.maxY - this.minY;
        }
    },
    
    
    /**
     * @inheritdoc
     */
    createCommand: function(request)
    {
 
      if(request.getPolicy() === draw2d.command.CommandType.MOVE_VERTEX){
          if(this.isResizeable()===true){
              return new draw2d.command.CommandMoveVertex(this);
            }
      }
    
      return this._super(request);
    },
   
    
    /**
     * @inheritdoc
     */
    getPersistentAttributes: function()
    {   
        var memento = this._super();
        
        memento.vertices = [];

        this.vertices.each(function(i,e){
            memento.vertices.push({x:e.x, y:e.y});
        });
 
        return memento;
    },
    
    /**
     * @inheritdoc
     */
    setPersistentAttributes: function( memento)
    {
        this._super(memento);

        // restore the points from the JSON data and add them to the polyline
        //
        if(typeof memento.vertices !=="undefined"){
            this.vertices = new draw2d.util.ArrayList();
            var _this = this;
            $.each(memento.vertices, function(i,point){
                _this.addVertex(point);
            });
        }
    }
});
