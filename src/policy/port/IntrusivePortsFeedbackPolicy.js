import draw2d from '../../packages'
import {Tweenable} from "shifty"


/**
 * @class
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.IntrusivePortsFeedbackPolicy = draw2d.policy.port.PortFeedbackPolicy.extend(
  /** @lends draw2d.policy.port.IntrusivePortsFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.port.IntrusivePortsFeedbackPolicy",

  /**
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
    this.connectionLine = null
    this.tweenable = null
  },

  /**
   *
   * Called by the framework if the related shape has init a drag&drop
   * operation
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    let start = 0
    let allPorts = canvas.getAllPorts().clone()
    allPorts.each(function (i, element) {
      if (typeof element.__beforeInflate === "undefined") {
        element.__beforeInflate = element.getWidth()
      }
      start = element.__beforeInflate
    })


    // animate the resize of the ports
    //
    allPorts.grep(function (p) {
      return (p.NAME != figure.NAME && p.parent !== figure.parent) || (p instanceof draw2d.HybridPort) || (figure instanceof draw2d.HybridPort)
    })
    this.tweenable = new Tweenable()
    this.tweenable.tween({
      from: {'size': start / 2},
      to: {'size': start},
      duration: 200,
      easing: "easeOutSine",
      step: function (params) {
        allPorts.each(function (i, element) {
          // IMPORTANT shortcut to avoid rendering errors!!
          // performance shortcut to avoid a lot of events and recalculate/routing of all related connections
          // for each setDimension call. Additional the connection is following a port during Drag&Drop operation
          element.shape.attr({rx: params.size, ry: params.size})
          element.width = element.height = params.size * 2
        })
      }
    })

    this.connectionLine = new draw2d.shape.basic.Line()
    this.connectionLine.setCanvas(canvas)
    this.connectionLine.getShapeElement()
    this.connectionLine.setDashArray("- ")
    this.connectionLine.setColor("#30c48a")

    this.onDrag(canvas, figure)

    return true
  },


  /**
   *
   * Called by the framework during drag a figure.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @template
   */
  onDrag: function (canvas, figure) {
    let x1 = figure.ox + figure.getParent().getAbsoluteX()
    let y1 = figure.oy + figure.getParent().getAbsoluteY()

    this.connectionLine.setStartPosition(x1, y1)
    this.connectionLine.setEndPosition(figure.getAbsoluteX(), figure.getAbsoluteY())
  },

  /**
   *
   * Called by the framework if the drag drop operation ends.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @template
   */
  onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    if (this.tweenable) {
      this.tweenable.stop(true)
      this.tweenable.dispose()
      this.tweenable = null
    }
    canvas.getAllPorts().each(function (i, element) {
      // IMPORTANT shortcut to avoid rendering errors!!
      // performance shortcut to avoid a lot of events and recalculate/routing of all related connections
      // for each setDimension call. Additional the connection is following a port during Drag&Drop operation
      element.shape.attr({rx: element.__beforeInflate / 2, ry: element.__beforeInflate / 2})
      element.width = element.height = element.__beforeInflate
      delete element.__beforeInflate
    })
    this.connectionLine.setCanvas(null)
    this.connectionLine = null
  },

  onHoverEnter: function (canvas, draggedFigure, hoverFiger) {
    this.connectionLine.setGlow(true)
    hoverFiger.setGlow(true)
  },

  onHoverLeave: function (canvas, draggedFigure, hoverFiger) {
    hoverFiger.setGlow(false)
    if (this.connectionLine === null) {
      debugger
    }
    this.connectionLine.setGlow(false)
  }


})
