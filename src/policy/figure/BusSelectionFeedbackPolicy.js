import draw2d from '../../packages'


/**
 * @class
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.BusSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.BusSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.BusSelectionFeedbackPolicy",

  /**
   * Creates a new Router object
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * 
   * Called by the framework of the Policy should show a resize handle for the given shape
   *
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    if (figure.selectionHandles.isEmpty()) {
      let r2 = draw2d.Configuration.factory.createResizeHandle(figure, 2) // 2 = CENTER_TOP
      let r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4) // 4 = RIGHT_MIDDLE
      let r6 = draw2d.Configuration.factory.createResizeHandle(figure, 6) // 6 = CENTER_BOTTOM
      let r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8) // 8 = LEFT_MIDDLE

      figure.selectionHandles.add(r2, r4, r6, r8)

      r2.setDraggable(figure.isResizeable())
      r4.setDraggable(figure.isResizeable())
      r6.setDraggable(figure.isResizeable())
      r8.setDraggable(figure.isResizeable())

      r2.show(canvas)
      r4.show(canvas)
      r6.show(canvas)
      r8.show(canvas)
    }
    this.moved(canvas, figure)
  },


  /**
   * 
   * Callback if the figure has been moved
   *
   * @param figure
   *
   * @template
   */
  moved: function (canvas, figure) {
    if (figure.selectionHandles.isEmpty()) {
      return // silently
    }
    let r2 = figure.selectionHandles.find(handle => handle.type === 2)
    let r4 = figure.selectionHandles.find(handle => handle.type === 4)
    let r6 = figure.selectionHandles.find(handle => handle.type === 6)
    let r8 = figure.selectionHandles.find(handle => handle.type === 8)

    let objHeight = figure.getHeight()
    let objWidth = figure.getWidth()

    let xPos = figure.getX()
    let yPos = figure.getY()
    r2.setPosition(xPos + (objWidth / 2) - (r2.getWidth() / 2), yPos - r2.getHeight())
    r4.setPosition(xPos + objWidth, yPos + (objHeight / 2) - (r4.getHeight() / 2))
    r6.setPosition(xPos + (objWidth / 2) - (r6.getWidth() / 2), yPos + objHeight)
    r8.setPosition(xPos - r8.getWidth(), yPos + (objHeight / 2) - (r8.getHeight() / 2))
  }


})
