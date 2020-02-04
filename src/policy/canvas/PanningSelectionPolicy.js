/**
 * @class draw2d.policy.canvas.PanningSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.PanningSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend(
  /** @lends draw2d.policy.canvas.PanningSelectionPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.PanningSelectionPolicy",

  /**
   * Creates a new Router object
   * @constructs
   */
  init: function () {
    this._super()
  },


  /**
   * 
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
    this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)

    if (this.mouseDraggingElement === null && this.mouseDownElement === null) {

      // check if we are dragging a port. This isn't reported by the selection handler anymore
      //
      let p = canvas.fromDocumentToCanvasCoordinate(canvas.mouseDownX + (dx / canvas.zoomFactor), canvas.mouseDownY + (dy / canvas.zoomFactor))
      let figure = canvas.getBestFigure(p.x, p.y)

      if (figure === null) {
        let area = canvas.getScrollArea()
        area.scrollTop(area.scrollTop() - dy2)
        area.scrollLeft(area.scrollLeft() - dx2)
      }
    }
  }
})
