import draw2d from '../../packages'


/**
 * @class
 *
 * A drag&Drop feedback handler for the canvas. The policy didn't move the
 * shapes in real time rather it shows a ghost rectangle as feedback. <br>
 * <br>
 * The shapes are updated after the drag&drop operation.
 *
 *
 *
 * @example
 *
 *      // install the policy to the canvas
 *      canvas.installEditPolicy(new draw2d.policy.canvas.GhostMoveSelectionPolicy());
 *
 *      // add some demo figure to the canvas
 *      canvas.add(new draw2d.shape.basic.Circle({diameter: 50, x: 10,  y: 30}));
 *      canvas.add(new draw2d.shape.basic.Circle({diameter: 30, x: 90,  y: 50}));
 *      canvas.add(new draw2d.shape.basic.Circle({diameter: 60, x: 110, y: 30}));
 *
 *      canvas.add(new draw2d.shape.basic.Label({text:"move the circle to see the drag&drop feedback"}),5,5);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
draw2d.policy.canvas.GhostMoveSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend(
  /** @lends draw2d.policy.canvas.GhostMoveSelectionPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.GhostMoveSelectionPolicy",

  /**
   */
  init: function () {
    this.clone = null
    this.ghostRectangle1 = null
    this.ghostRectangle2 = null

    this._super()
  },


  /**
   * @inheritdoc
   */
  onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    this.mouseMovedDuringMouseDown = true
    if (this.mouseDraggingElement !== null) {

      // if the figure not part of the selection it must be a ResizeHandle...
      let sel = canvas.getSelection().getAll()
      if (!sel.contains(this.mouseDraggingElement)) {
        this.mouseDraggingElement.onDrag(dx, dy, dx2, dy2, shiftKey, ctrlKey)
      }
      // it is a normal draw2d.Figure
      else {
        // create the ghost handles for the figure to move and update the position
        //
        if (this.ghostRectangle1 === null) {
          this.ghostRectangle1 = new draw2d.shape.basic.Rectangle(/*{bgColor:"#303030", alpha:0.1}*/) // new API with version 5.0.0
          // old API
          this.ghostRectangle1.setBackgroundColor("#303030")
          this.ghostRectangle1.setAlpha(0.1)

          this.ghostRectangle2 = new draw2d.shape.basic.Rectangle(/*{dash:"- ", stroke:1, color:"#5497DC", bgColor:null}*/)
          this.ghostRectangle2.setDashArray("- ")
          this.ghostRectangle2.setStroke(1)
          this.ghostRectangle2.setColor("#5497DC")
          this.ghostRectangle2.setBackgroundColor(null)

          this.ghostRectangle1.setBoundingBox(this.mouseDraggingElement.getBoundingBox())
          this.ghostRectangle2.setBoundingBox(this.mouseDraggingElement.getBoundingBox())

          this.ghostRectangle1.setCanvas(canvas)
          this.ghostRectangle1.toFront()

          this.ghostRectangle2.setCanvas(canvas)
          this.ghostRectangle2.toFront()

          this.clone = this.mouseDraggingElement.clone()
          if (this.clone instanceof draw2d.shape.node.Node) {
            this.clone.resetPorts()
          }
          this.clone.setCanvas(canvas)
          this.clone.getShapeElement()
          this.clone.setAlpha(0.4)
          this.clone.repaint()
        }
        else {
          this.ghostRectangle1.translate(dx2, dy2)
          this.ghostRectangle2.translate(dx2, dy2)
          this.clone.translate(dx2, dy2)
        }

        sel.each(function (i, figure) {
          // store the new location in a tmp var.
          figure._newPos = new draw2d.geo.Point(figure.ox + dx, figure.oy + dy)

          // don't move the figure. This will be done in the MouseUp event
          //figure.onDrag(dx, dy, dx2, dy2);
        })
      }

      let p = canvas.fromDocumentToCanvasCoordinate(canvas.mouseDownX + (dx / canvas.zoomFactor), canvas.mouseDownY + (dy / canvas.zoomFactor))
      let target = canvas.getBestFigure(p.x, p.y, this.mouseDraggingElement)

      if (target !== canvas.currentDropTarget) {
        if (canvas.currentDropTarget !== null) {
          canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement)
          canvas.currentDropTarget.fireEvent("dragLeave", {draggingElement: this.draggingElement})
          canvas.currentDropTarget = null
        }
        if (target !== null) {
          canvas.currentDropTarget = target.delegateTarget(this.mouseDraggingElement)
          // inform all listener that the element has accept a dropEnter event
          if (canvas.currentDropTarget !== null) {
            canvas.currentDropTarget.onDragEnter(this.mouseDraggingElement) // legacy
            canvas.currentDropTarget.fireEvent("dragEnter", {draggingElement: this.draggingElement})
          }
        }
      }
    }
    // Connection didn't support panning at the moment. There is no special reason for that. Just an interaction
    // decision.
    //
    else if (this.mouseDownElement !== null && !(this.mouseDownElement instanceof draw2d.Connection)) {
      if (this.mouseDownElement.panningDelegate !== null) {
        this.mouseDownElement.panningDelegate.fireEvent("panning", {
          dx: dx,
          dy: dy,
          dx2: dx2,
          dy2: dy2,
          shiftKey: shiftKey,
          ctrlKey: ctrlKey
        })
        this.mouseDownElement.panningDelegate.onPanning(dx, dy, dx2, dy2, shiftKey, ctrlKey)
      }
      else {
        this.mouseDownElement.fireEvent("panning", {
          dx: dx,
          dy: dy,
          dx2: dx2,
          dy2: dy2,
          shiftKey: shiftKey,
          ctrlKey: ctrlKey
        })
        this.mouseDownElement.onPanning(dx, dy, dx2, dy2, shiftKey, ctrlKey)
      }
    }
  },

  /**
   * @inheritdoc
   */
  onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {

    if (this.ghostRectangle1 !== null) {
      this.ghostRectangle1.setCanvas(null)
      this.ghostRectangle1 = null
      this.ghostRectangle2.setCanvas(null)
      this.ghostRectangle2 = null
      this.clone.setCanvas(null)
      this.clone = null
    }

    if (this.mouseDraggingElement !== null) {
      let redrawConnection = new draw2d.util.ArrayList()
      if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
        canvas.lineIntersections.each(function (i, inter) {
          if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line)
          if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other)
        })
      }


      // start CommandStack transaction
      // Trigger an update of the connections if we have move a draw2d.shape.node.Node figure.
      // (only "nodes" can have ports and connections)
      //
      canvas.getCommandStack().startTransaction()


      let sel = canvas.getSelection().getAll()
      // We move a resize handle...
      //
      if (!sel.contains(this.mouseDraggingElement)) {
        this.mouseDraggingElement.onDragEnd(x, y, shiftKey, ctrlKey)
      }
      // ... or a real figure.
      //
      else {
        canvas.getSelection().getAll().each(function (i, figure) {
          // set position and cleanup tmp variable
          if (figure._newPos) {
            figure.setPosition(figure._newPos)
            delete figure._newPos
          }
          // done
          figure.onDragEnd(x, y, shiftKey, ctrlKey)
        })
      }

      // May we drop the figure onto another shape..handle this here
      //
      if (canvas.currentDropTarget !== null && !this.mouseDraggingElement.isResizeHandle) {
        this.mouseDraggingElement.onDrop(canvas.currentDropTarget, x, y, shiftKey, ctrlKey)
        canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement)
        canvas.currentDropTarget.onCatch(this.mouseDraggingElement, x, y, shiftKey, ctrlKey)
        canvas.currentDropTarget = null
      }

      // end command stack trans
      canvas.getCommandStack().commitTransaction()

      if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
        canvas.lineIntersections.each((i, inter) => {
          if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line)
          if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other)
        })
        redrawConnection.each((i, line) => {
          line.svgPathString = null
          line.repaint()
        })
      }

      this.mouseDraggingElement = null
    }

    // Reset the current selection if the user click in the blank canvas.
    // Don't reset the selection if the user is panning the canvas
    //
    if (this.mouseDownElement === null && this.mouseMovedDuringMouseDown === false) {
      this.select(canvas, null)
    }

    this.mouseDownElement = null
    this.mouseMovedDuringMouseDown = false
  }
})
