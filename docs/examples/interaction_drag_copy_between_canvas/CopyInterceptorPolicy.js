
var CopyInterceptorPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({

    init : function()
    {
        this._super();
        
        this.cloneOnDrag = false;
    },

    /**
     * @method
     * 
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown:function(canvas, x, y, shiftKey, ctrlKey)
    {
    	this.cloneOnDrag = shiftKey;
		this.mouseDownPos = new draw2d.geo.Point(x,y);

    	this._super(canvas, x,y,shiftKey, ctrlKey);
    },
    
    /**
     * create a PNG snapshot of the selected figure and provide a DIV for
	 * inter-canvas drag&drop of figures.
	 *
	 * Keep in mind that this example is far from perfect or complet. It is a good
	 * starting point for your implementation.
     * 
     */
    onMouseDrag:function(canvas, dx, dy, dx2, dy2)
    {
		var _this = this;

    	if( !((this.mouseDraggingElement instanceof draw2d.ResizeHandle) || (this.mouseDraggingElement instanceof draw2d.Port))){
	    	if(this.cloneOnDrag ===true && this.mouseDraggingElement !==null){
				var tmp = this.mouseDraggingElement;

	    		// get the current position of the selected shape
	    		// cancel the current drag&drop operation
				var pos = this.mouseDraggingElement.getPosition();
	    		this.mouseDraggingElement.onDragEnd(pos.x, pos.y, false,false);
				this.mouseDraggingElement = null;

				// PNG snapshot's didn'T work with all kind of shapes. You can use
				// a DIV ghost as workaround if this didn't work for you
				//
				var usePNGSnapshot = true;

				// create an base64 coded image snapshoot from the figure
				// (not from the complete canvas)
				//
				if(usePNGSnapshot===true) {
					new draw2d.io.png.Writer().marshal(tmp, function (base64Image) {
						// add the image to the DOM tree
						//
						var ghost = $("<img  style='position:absolute'>");
						ghost.attr("src", base64Image);

						_this.setupDragDropGhost(tmp, ghost);

					});
				}
				else{
					var ghost = $("<div>");
					ghost.css({
						position: "absolute",
						width: tmp.getWidth(),
						height: tmp.getHeight(),
						border:"1px dotted black",
						borderRadius:"3",
						backgroundColor:"rgba(128,128,200,0.3)"
					});

					_this.setupDragDropGhost(tmp, ghost);
				}
	    	}
    	}
		this.cloneOnDrag=false;
    	this._super(canvas, dx,dy,dx2,dy2);
    },

	setupDragDropGhost: function(figure, ghost){
		var _this = this;

		$("body").append(ghost);

		// and track mouseMove events to move the IMG element around
		//
		var offset = _this.mouseDownPos.subtract(figure.getPosition());
		var mousemoveHandler = function (e) {
			var diffX = e.pageX - offset.x;
			var diffY = e.pageY - offset.y;
			ghost.css('left', diffX + 'px').css('top', diffY + 'px');
		};
		$(document).bind('mousemove', mousemoveHandler);

		ghost.bind('mouseup', function (e) {
			try {
				// this is a drop event...determine the related canvas and add
				// the figure clone to the canvas
				//
				$(document).unbind('mousemove', mousemoveHandler);
				var r1 = new draw2d.geo.Rectangle($("#container1")[0].getBoundingClientRect());
				var r2 = new draw2d.geo.Rectangle($("#container2")[0].getBoundingClientRect());
				var canvas1Hit = r1.hitTest(e.pageX, e.pageY);
				var canvas2Hit = r2.hitTest(e.pageX, e.pageY);

				if (canvas1Hit) {
					var clone = figure.clone();
					var p = canvas1.fromDocumentToCanvasCoordinate(e.pageX, e.pageY);
					clone.setPosition(p.subtract(offset));
					canvas1.add(clone);
				}
				if (canvas2Hit) {
					var clone = figure.clone();
					var p = canvas2.fromDocumentToCanvasCoordinate(e.pageX, e.pageY);
					clone.setPosition(p.subtract(offset));
					canvas2.add(clone);
				}
			}
			finally{
				ghost.remove();
			}
		});
	}
});
