
/**
 * @class draw2d.policy.canvas.SingleSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
import draw2d from '../../packages';

draw2d.policy.canvas.SingleSelectionPolicy =  draw2d.policy.canvas.SelectionPolicy.extend({

    NAME : "draw2d.policy.canvas.SingleSelectionPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function()
    {
        this._super();
        this.mouseMovedDuringMouseDown = false;
        this.mouseDraggingElement = null;
        this.mouseDownElement = null;
    },

    /**
     * @inheritdoc
     */
    select: function(canvas, figure)
    {
        if(canvas.getSelection().contains(figure)){
            return; // nothing to to
        }

        var oldSelection = canvas.getSelection().getPrimary();
        if(canvas.getSelection().getPrimary()!==null){
            this.unselect(canvas, canvas.getSelection().getPrimary());
        }

        if(figure !==null) {
            figure.select(true); // primary selection
        }

        canvas.getSelection().setPrimary(figure);

        // inform all selection listeners about the new selection.
        //
        if(oldSelection !== figure){
            canvas.fireEvent("select",{figure:figure});
        }
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
    onMouseDown: function(canvas, x, y, shiftKey, ctrlKey)
    {
        this.mouseMovedDuringMouseDown  = false;
        var canDragStart = true;

        // ignore ports since version 6.1.0. This is handled by the ConnectionCreatePolicy
        //
        var figure = canvas.getBestFigure(x, y);

        // may the figure is assigned to a composite. In this case the composite can
        // override the event receiver
        while(figure!==null){
            var delegate = figure.getSelectionAdapter()();
            if(delegate===figure){
                break;
            }
            figure = delegate;
        }

        // ignore ports since version 6.1.0. This is handled by the ConnectionCreatePolicy
        //
        if (figure instanceof draw2d.Port) {
            return;// silently
        }

        if (figure !== null && figure.isDraggable()) {
            canDragStart = figure.onDragStart(x - figure.getAbsoluteX(), y - figure.getAbsoluteY(), shiftKey, ctrlKey);
            // Element send a veto about the drag&drop operation
            this.mouseDraggingElement = canDragStart===false ? null : figure;
        }

        this.mouseDownElement = figure;
        if(this.mouseDownElement!==null){
            this.mouseDownElement.fireEvent("mousedown", {x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});
        }

        if (figure !== canvas.getSelection().getPrimary() && figure !== null && figure.isSelectable() === true) {
            this.select(canvas,figure);

            // it's a line
            if (figure instanceof draw2d.shape.basic.Line) {
                // you can move a line with Drag&Drop...but not a connection.
                // A Connection is fixed linked with the corresponding ports.
                //
                if (!(figure instanceof draw2d.Connection)) {
                    canvas.draggingLineCommand = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));
                    if (canvas.draggingLineCommand !== null) {
                        canvas.draggingLine = figure;
                    }
                }
            }
            else if (canDragStart === false) {
                figure.unselect();
            }
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)
    {
        this.mouseMovedDuringMouseDown = true;
        if (this.mouseDraggingElement !== null) {
            // Can be a ResizeHandle or a normal Figure
            //
            var sel =canvas.getSelection();
            if(!sel.contains(this.mouseDraggingElement)){
                this.mouseDraggingElement.onDrag(dx, dy, dx2, dy2, shiftKey, ctrlKey);
            }
            else{
                sel.each(function(i,figure){
                    figure.onDrag(dx, dy, dx2, dy2, shiftKey, ctrlKey);
                });
            }

            var p = canvas.fromDocumentToCanvasCoordinate(canvas.mouseDownX + (dx/canvas.zoomFactor), canvas.mouseDownY + (dy/canvas.zoomFactor));
            var target = canvas.getBestFigure(p.x, p.y,this.mouseDraggingElement);

            if (target !== canvas.currentDropTarget) {
                if (canvas.currentDropTarget !== null) {
                    canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                    canvas.currentDropTarget.fireEvent("dragLeave",{draggingElement:this.mouseDraggingElement});
                    canvas.currentDropTarget = null;
                }
                if (target !== null) {
                    canvas.currentDropTarget = target.delegateTarget(this.mouseDraggingElement);
                    // inform all listener that the element has accept the dragEnter event
                    //
                    if( canvas.currentDropTarget !==null) {
                        canvas.currentDropTarget.onDragEnter(this.mouseDraggingElement); // legacy
                        canvas.currentDropTarget.fireEvent("dragEnter", {draggingElement: this.mouseDraggingElement});
                    }
                }
            }
       }
       // Connection didn't support panning at the moment. There is no special reason for that. Just an interaction
       // decision.
       //
       else if(this.mouseDownElement!==null && !(this.mouseDownElement instanceof draw2d.Connection)){
           if(this.mouseDownElement.panningDelegate!==null){
               this.mouseDownElement.panningDelegate.fireEvent("panning", {dx:dx,dy:dy,dx2:dx2,dy2:dy2, shiftKey:shiftKey, ctrlKey:ctrlKey});
               this.mouseDownElement.panningDelegate.onPanning(dx, dy, dx2, dy2, shiftKey, ctrlKey);
           }
           else{
               this.mouseDownElement.fireEvent("panning", {dx:dx, dy:dy, dx2:dx2, dy2:dy2, shiftKey:shiftKey, ctrlKey:ctrlKey });
               this.mouseDownElement.onPanning(dx, dy, dx2, dy2, shiftKey, ctrlKey);
           }
       }
    },

    /**
     * @method
     *
     * @param {draw2d.Figure} figure the shape below the mouse or null
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseUp: function(canvas, x, y, shiftKey, ctrlKey)
    {
        if (this.mouseDraggingElement !== null) {
            var redrawConnection = new draw2d.util.ArrayList();
            if(this.mouseDraggingElement instanceof draw2d.shape.node.Node){
                // TODO: don't add the connections with to check if a repaint is required
                //       may a moved connection didn't have an intersection with the named lines.
                //       in this case a redraw is useless
                canvas.lineIntersections.each(function(i, inter){
                    if(!redrawConnection.contains(inter.line))redrawConnection.add(inter.line);
                    if(!redrawConnection.contains(inter.other))redrawConnection.add(inter.other);
                });
            }

            // start CommandStack transaction
            canvas.getCommandStack().startTransaction();

                    var sel =canvas.getSelection().getAll();
                    if(!sel.contains(this.mouseDraggingElement)){
                        this.mouseDraggingElement.onDragEnd( x, y, shiftKey, ctrlKey);
                    }
                    else{
                        canvas.getSelection().getAll().each(function(i,figure){
                             figure.onDragEnd( x, y, shiftKey, ctrlKey);
                        });
                    }

                    if(canvas.currentDropTarget!==null && !this.mouseDraggingElement.isResizeHandle){
                        this.mouseDraggingElement.onDrop(canvas.currentDropTarget, x, y, shiftKey, ctrlKey);
                        canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                        canvas.currentDropTarget.fireEvent("dragLeave",{draggingElement:this.mouseDraggingElement});
                        canvas.currentDropTarget.onCatch(this.mouseDraggingElement, x, y, shiftKey, ctrlKey);
                        canvas.currentDropTarget = null;
                    }

            // end command stack trans
            canvas.getCommandStack().commitTransaction();

            if(this.mouseDraggingElement instanceof draw2d.shape.node.Node){
                canvas.lineIntersections.each(function(i, inter){
                    if(!redrawConnection.contains(inter.line))redrawConnection.add(inter.line);
                    if(!redrawConnection.contains(inter.other))redrawConnection.add(inter.other);
                });
                redrawConnection.each(function(i, line){
                    line.svgPathString=null;
                    line.repaint();
                });
            }

            this.mouseDraggingElement = null;
        }
        // Connection didn't support panning at the moment. There is no special reason for that. Just an interaction
        // decision.
        //
        else if(this.mouseDownElement!==null && !(this.mouseDownElement instanceof draw2d.Connection)){
            if(this.mouseDownElement.panningDelegate!==null){
                this.mouseDownElement.panningDelegate.fireEvent("panningEnd");
                this.mouseDownElement.panningDelegate.onPanningEnd();
            }
            else{
                this.mouseDownElement.fireEvent("panningEnd");
                this.mouseDownElement.onPanningEnd();
            }
        }

        // Reset the current selection if the user click in the blank canvas.
        // Don't reset the selection if the user pan the canvas
        //
        if (this.mouseDownElement === null && this.mouseMovedDuringMouseDown===false) {
            this.select(canvas,null);
        }

        if(this.mouseDownElement!==null){
            this.mouseDownElement.fireEvent("mouseup", {x:x, y:y, shiftKey:shiftKey, ctrlKey:ctrlKey});
        }

        this.mouseDownElement = null;
        this.mouseMovedDuringMouseDown  = false;
    },

    /**
     * @method
     * Called by the canvas if the user click on a figure.
     *
     * @param {draw2d.Figure} the figure under the click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 3.0.0
     */
    onClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        if(figure!==null){
            figure.fireEvent("click", {
                figure:figure,
                x:mouseX,
                y:mouseY,
                relX: mouseX-figure.getAbsoluteX(),
                relY: mouseY-figure.getAbsoluteY(),
                shiftKey:shiftKey,
                ctrlKey:ctrlKey});

            figure.onClick();
        }
    },

    /**
     * @method
     * Called by the canvas if the user double click on a figure.
     *
     * @param {draw2d.Figure} the figure under the double click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 4.1.0
     */
    onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        if(figure!==null){
            figure.fireEvent("dblclick", {x:mouseX, y:mouseY, shiftKey:shiftKey, ctrlKey:ctrlKey});
            figure.onDoubleClick();
        }
    }

});
