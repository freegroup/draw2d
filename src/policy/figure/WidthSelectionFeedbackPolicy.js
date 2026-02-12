import draw2d from '../../packages'


/**
 * @class
 * This selection shows only selection handles for the width. It is only possible to change the width
 * of an shaped. The height stays always the same or is recalculated by the figure itself.
 *
 * @example
 *      // add some demo figure to the canvas
 *      //
 *      let shape =new draw2d.shape.basic.Rectangle({width:50, height:100, x:10, y:30});
 *      canvas.add(shape);
 *
 *      // At this point you can only change the width of the shape
 *      //
 *      shape.installEditPolicy(new draw2d.policy.figure.WidthSelectionFeedbackPolicy());
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.WidthSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.BusSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.BusSelectionFeedbackPolicy",

  /**
   * Creates a new Router object
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   *
   * Called by the framework of the Policy should show a resize handle for the given shape
   *
   * @param {draw2d.Canvas} canvas the host of the diagram
   * @param {draw2d.Figure} figure the figure to select
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    if (figure.selectionHandles.isEmpty()) {
      let r4 = new draw2d.ResizeHandle({owner: figure, type: 4}) // 4 = RIGHT_MIDDLE
      let r8 = new draw2d.ResizeHandle({owner: figure, type: 8}) // 8 = LEFT_MIDDLE

      r4.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy())
      r8.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy())
      figure.selectionHandles.add(r4, r8)

      r4.setDraggable(figure.isResizeable())
      r8.setDraggable(figure.isResizeable())

      r4.show(canvas)
      r8.show(canvas)
    }
    this.moved(canvas, figure)
  },


  /**
   *
   * Callback if the figure has been moved
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   *
   * @template
   */
  moved: function (canvas, figure) {
    if (figure.selectionHandles.isEmpty()) {
      return // silently
    }
    let r4 = figure.selectionHandles.find(handle => handle.type === 4)
    let r8 = figure.selectionHandles.find(handle => handle.type === 8)

    let objWidth = figure.getWidth()

    let xPos = figure.getAbsoluteX()
    let yPos = figure.getAbsoluteY()
    r4.setDimension(r4.getWidth(), figure.getHeight())
    r8.setDimension(r8.getWidth(), figure.getHeight())
    r4.setPosition(xPos + objWidth, yPos)
    r8.setPosition(xPos - r8.getWidth(), yPos)
  }
})
