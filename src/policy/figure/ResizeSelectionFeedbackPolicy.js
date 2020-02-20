import draw2d from '../../packages'


/**
 * @class draw2d.policy.figure.ResizeSelectionFeedbackPolicy
 *
 * Selection feedback policy without "marching ant lines" or any other rectangle highlight. Just
 * some resize handles at each corner of the shape.
 *
 *
 * @example
 *      circle =new draw2d.shape.basic.Circle();
 *      circle.installEditPolicy(new draw2d.policy.ResizeSelectionFeedbackPolicy());
 *      canvas.add(circle,90,50);
 *
 *      canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @since 4.0.0
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 *
 */
draw2d.policy.figure.ResizeSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.ResizeSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.ResizeSelectionFeedbackPolicy",
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
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the selected figure
   * @param {Boolean} [isPrimarySelection]
   */
  onSelect: function (canvas, figure, isPrimarySelection) {

    if (figure.selectionHandles.isEmpty()) {
      // create standard Resize handles for the figure
      //
      var r1 = draw2d.Configuration.factory.createResizeHandle(figure, 1) // 1 = LEFT TOP
      var r3 = draw2d.Configuration.factory.createResizeHandle(figure, 3) // 3 = RIGHT_TOP
      var r5 = draw2d.Configuration.factory.createResizeHandle(figure, 5) // 5 = RIGHT_BOTTOM
      var r7 = draw2d.Configuration.factory.createResizeHandle(figure, 7) // 7 = LEFT_BOTTOM
      figure.selectionHandles.add(r1, r3, r5, r7)
      r1.show(canvas)
      r3.show(canvas)
      r5.show(canvas)
      r7.show(canvas)

      // The corner ResizeHandles are only draggable fi the figure is
      // resizeable. But the Resize handles are visible
      //

      // change the look&feel of the corner resizehandles if the
      // figure isn't resizeable
      //
      if (figure.isResizeable() === false) {
        r1.setBackgroundColor(null)
        r3.setBackgroundColor(null)
        r5.setBackgroundColor(null)
        r7.setBackgroundColor(null)
        r1.setDraggable(false)
        r3.setDraggable(false)
        r5.setDraggable(false)
        r7.setDraggable(false)
      }

      // show only the additional resizehandles if the figure is resizeable
      //
      if ((!figure.getKeepAspectRatio()) && figure.isResizeable()) {
        var r2 = draw2d.Configuration.factory.createResizeHandle(figure, 2) // 2 = CENTER_TOP
        var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4) // 4 = RIGHT_MIDDLE
        var r6 = draw2d.Configuration.factory.createResizeHandle(figure, 6) // 6 = CENTER_BOTTOM
        var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8) // 8 = LEFT_MIDDLE
        figure.selectionHandles.add(r2, r4, r6, r8)
        r2.show(canvas)
        r4.show(canvas)
        r6.show(canvas)
        r8.show(canvas)
      }
    }
    this.moved(canvas, figure)
  },

  /**
   *
   * Callback if the figure has been moved. In this case we must update the position of the
   * resize handles.
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the moved figure
   *
   */
  moved: function (canvas, figure) {
    if (figure.selectionHandles.isEmpty()) {
      return // silently
    }

    var objHeight = figure.getHeight()
    var objWidth = figure.getWidth()
    var xPos = figure.getX()
    var yPos = figure.getY()

    var r1 = figure.selectionHandles.find(function (handle) {
      return handle.type === 1
    })
    var r3 = figure.selectionHandles.find(function (handle) {
      return handle.type === 3
    })
    var r5 = figure.selectionHandles.find(function (handle) {
      return handle.type === 5
    })
    var r7 = figure.selectionHandles.find(function (handle) {
      return handle.type === 7
    })
    r1.setPosition(xPos - r1.getWidth(), yPos - r1.getHeight())
    r3.setPosition(xPos + objWidth, yPos - r3.getHeight())
    r5.setPosition(xPos + objWidth, yPos + objHeight)
    r7.setPosition(xPos - r7.getWidth(), yPos + objHeight)

    if (!figure.getKeepAspectRatio()) {
      var r2 = figure.selectionHandles.find(function (handle) {
        return handle.type === 2
      })
      var r4 = figure.selectionHandles.find(function (handle) {
        return handle.type === 4
      })
      var r6 = figure.selectionHandles.find(function (handle) {
        return handle.type === 6
      })
      var r8 = figure.selectionHandles.find(function (handle) {
        return handle.type === 8
      })

      r2.setPosition(xPos + (objWidth / 2) - (r2.getWidth() / 2), yPos - r2.getHeight())
      r4.setPosition(xPos + objWidth, yPos + (objHeight / 2) - (r4.getHeight() / 2))
      r6.setPosition(xPos + (objWidth / 2) - (r6.getWidth() / 2), yPos + objHeight)
      r8.setPosition(xPos - r8.getWidth(), yPos + (objHeight / 2) - (r8.getHeight() / 2))
    }
  }


})
