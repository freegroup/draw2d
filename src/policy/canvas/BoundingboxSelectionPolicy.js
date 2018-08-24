/**
 * @class draw2d.policy.canvas.BoundingboxSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.BoundingboxSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({

  NAME: "draw2d.policy.canvas.BoundingboxSelectionPolicy",

  /**
   * @constructor
   * Creates a new selection policy for a canvas.
   */
  init: function () {
    this.isInsideMode = function (rect1, rect2) {
      return rect1.isInside(rect2)
    }
    this.intersectsMode = function (rect1, rect2) {
      return rect1.intersects(rect2)
    }

    this.decision = this.isInsideMode

    this._super()

    this.boundingBoxFigure1 = null
    this.boundingBoxFigure2 = null
    this.x = 0
    this.y = 0

    // falls ein Port getroffen wird, dann darf keine BoundingBox gezeichnet werden.
    //
    this.canDrawBoundingBox = false
  },

  /**
   * @inheritdoc
   */
  select: function (canvas, figure) {
    if (canvas.getSelection().contains(figure)) {
      return // nothing to to
    }

    var oldSelection = canvas.getSelection().getPrimary()

    if (figure !== null) {
      figure.select(true) // primary selection
    }

    if (oldSelection !== figure) {
      canvas.getSelection().setPrimary(figure)

      // inform all selection listeners about the new selection.
      //
      canvas.fireEvent("select", {figure: figure})
    }

    // adding connections to the selection of the source and target port part of the current selection
    //
    var _this = this
    var selection = canvas.getSelection()
    canvas.getLines().each(function (i, line) {
      if (line instanceof draw2d.Connection) {
        if (selection.contains(line.getSource().getRoot()) && selection.contains(line.getTarget().getRoot())) {
          _this.select(canvas, line, false)
        }
      }
    })


  },


  /**
   * @method
   * Set the selection handling mode to <b>intersection</b> or to <b>isInside</b>.
   * <ul>
   *   <li>true = intersection, shapes must only touch the selection bounding box </li>
   *   <li>false = isInside, shapes must complete inside the selection bounding box (default)</li>
   * </ul>
   *
   * @param {Boolean} useIntersectionMode set true if the selection handle should use the alternative selection approach
   * @since 4.9.0
   */
  setDecisionMode: function (useIntersectionMode) {
    if (useIntersectionMode === true) {
      this.decision = this.intersectsMode
    }
    else {
      this.decision = this.isInsideMode
    }

    return this
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
  onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
    try {
      var _this = this

      this.x = x
      this.y = y

      var currentSelection = canvas.getSelection().getAll()

      // COPY_PARENT
      // this code part is copied from the parent implementation. The main problem is, that
      // the sequence of unselect/select of elements is broken if we call the base implementation
      // in this case wrong  events are fired if we select a figure if already a figure is selected!
      // WRONG: selectNewFigure -> unselectOldFigure
      // RIGHT: unselectOldFigure -> selectNewFigure
      // To ensure this I must copy the parent code and postbound the event propagation
      //
      this.mouseMovedDuringMouseDown = false
      var canDragStart = true

      this.canDrawBoundingBox = false

      var figure = canvas.getBestFigure(x, y)

      // may the figure is assigned to a composite. In this case the composite can
      // override the event receiver
      while (figure !== null) {
        var delegated = figure.getSelectionAdapter()()
        if (delegated === figure) {
          break
        }
        figure = delegated
      }

      // ignore ports since version 6.1.0. This is handled by the ConnectionCreatePolicy
      //
      if (figure instanceof draw2d.Port) {
        return// silently
      }

      this.canDrawBoundingBox = true

      if (figure !== null && figure.isDraggable()) {
        canDragStart = figure.onDragStart(x - figure.getAbsoluteX(), y - figure.getAbsoluteY(), shiftKey, ctrlKey)
        // Element send a veto about the drag&drop operation
        this.mouseDraggingElement = canDragStart === false ? null : figure
      }

      this.mouseDownElement = figure

      if (this.mouseDownElement !== null) {
        this.mouseDownElement.fireEvent("mousedown", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})
      }

      // we click on an element which are not part of the current selection
      // => reset the "old" current selection if we didn't press the shift key
      if (shiftKey === false) {
        if (this.mouseDownElement !== null && this.mouseDownElement.isResizeHandle === false && !currentSelection.contains(this.mouseDownElement)) {
          currentSelection.each(function (i, figure) {
            _this.unselect(canvas, figure)
          })
        }
      }

      if (figure !== canvas.getSelection().getPrimary() && figure !== null && figure.isSelectable() === true) {
        this.select(canvas, figure)

        // its a line
        if (figure instanceof draw2d.shape.basic.Line) {
          // you can move a line with Drag&Drop...but not a connection.
          // A Connection is fixed linked with the corresponding ports.
          //
          if (!(figure instanceof draw2d.Connection)) {
            canvas.draggingLineCommand = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE))
            if (canvas.draggingLineCommand !== null) {
              canvas.draggingLine = figure
            }
          }
        }
        else if (canDragStart === false) {
          figure.unselect()
        }
      }
      // END_COPY FROM PARENT


      // inform all figures that they have a new ox/oy position for the relative
      // drag/drop operation
      if (this.mouseDownElement !== null && this.mouseDownElement.isResizeHandle === false) {
        currentSelection = canvas.getSelection().getAll()
        currentSelection.each(function (i, figure) {
          let fakeDragX = 1
          let fakeDragY = 1

          let handleRect = figure.getHandleBBox()
          if (handleRect !== null) {
            handleRect.translate(figure.getAbsolutePosition().scale(-1))
            fakeDragX = handleRect.x + 1
            fakeDragY = handleRect.y + 1
          }

          let canDragStart = figure.onDragStart(fakeDragX, fakeDragY, shiftKey, ctrlKey, true /*fakeFlag*/)
          // its a line
          if (figure instanceof draw2d.shape.basic.Line) {
            // no special handling
          }
          else if (canDragStart === false) {
            _this.unselect(canvas, figure)
          }
        })
      }
    }
    catch (exc) {
      console.log(exc)
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
  onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    // don't drag a selection box if we drag&drop a port
    //
    if (this.canDrawBoundingBox === false) {
      return
    }

    try {
      this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)

      if (this.mouseDraggingElement === null && this.mouseDownElement === null && this.boundingBoxFigure1 === null) {
        this.boundingBoxFigure1 = new draw2d.shape.basic.Rectangle({
          width: 1,
          height: 1,
          x: this.x,
          y: this.y,
          bgColor: "#d4d1d4",
          alpha: 0.1
        })
        this.boundingBoxFigure1.setCanvas(canvas)

        this.boundingBoxFigure2 = new draw2d.shape.basic.Rectangle({
          width: 1,
          height: 1,
          x: this.x,
          y: this.y,
          dash: "--..",
          stroke: 0.5,
          color: "#37a8ff",
          bgColor: null
        })
        this.boundingBoxFigure2.setCanvas(canvas)
      }

      if (this.boundingBoxFigure1 !== null) {
        this.boundingBoxFigure1.setDimension(Math.abs(dx), Math.abs(dy))
        this.boundingBoxFigure1.setPosition(this.x + Math.min(0, dx), this.y + Math.min(0, dy))
        this.boundingBoxFigure2.setDimension(Math.abs(dx), Math.abs(dy))
        this.boundingBoxFigure2.setPosition(this.x + Math.min(0, dx), this.y + Math.min(0, dy))
      }
    }
    catch (exc) {
      console.log(exc)
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
  onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
    try {
      var _this = this
      // delete the current selection if you have clicked in the empty
      // canvas.
      if (this.mouseDownElement === null) {
        canvas.getSelection().getAll().each(function (i, figure) {
          _this.unselect(canvas, figure)
        })
      }
      else if (this.mouseDownElement instanceof draw2d.ResizeHandle || (this.mouseDownElement instanceof draw2d.shape.basic.LineResizeHandle)) {
        // Do nothing
        // A click on a resize handle didn't change the selection of the canvas
        //
      }
      // delete the current selection if you click on another figure than the current
      // selection and you didn't drag the complete selection.
      else if (this.mouseDownElement !== null && this.mouseMovedDuringMouseDown === false) {
        var sel = canvas.getSelection().getAll()
        if (!sel.contains(this.mouseDownElement)) {
          canvas.getSelection().getAll().each(function (i, figure) {
            _this.unselect(canvas, figure)
          })
        }
      }
      this._super(canvas, x, y, shiftKey, ctrlKey)

      if (this.boundingBoxFigure1 !== null) {
        // retrieve all figures which are inside the bounding box and select all of them
        //
        var selectionRect = this.boundingBoxFigure1.getBoundingBox()
        canvas.getFigures().each(function (i, figure) {
          if (figure.isSelectable() === true && _this.decision(figure.getBoundingBox(), selectionRect)) {
            var fakeDragX = 1
            var fakeDragY = 1

            var handleRect = figure.getHandleBBox()
            if (handleRect !== null) {
              handleRect.translate(figure.getAbsolutePosition().scale(-1))
              fakeDragX = handleRect.x + 1
              fakeDragY = handleRect.y + 1
            }
            var canDragStart = figure.onDragStart(fakeDragX, fakeDragY, shiftKey, ctrlKey)
            if (canDragStart === true) {
              _this.select(canvas, figure, false)
            }
          }
        })

        this.boundingBoxFigure1.setCanvas(null)
        this.boundingBoxFigure1 = null
        this.boundingBoxFigure2.setCanvas(null)
        this.boundingBoxFigure2 = null
      }

    }
    catch (exc) {
      console.log(exc)
      debugger
    }
  }

})
