import draw2d from '../../packages'


/**
 * @class
 *
 * A SelectionFeedbackPolicy with resize handles (rectangles) on each side and corner of the shape
 *
 *
 * @example
 *
 *      circle =new draw2d.shape.basic.Circle({diameter:50});
 *      circle.installEditPolicy(new draw2d.policy.RectangleSelectionFeedbackPolicy());
 *      canvas.add(circle,90,50);
 *
 *      canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.RectangleSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend(
  /** @lends draw2d.policy.figure.RectangleSelectionFeedbackPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.RectangleSelectionFeedbackPolicy",
  /**
   * Creates a selection feedback for a shape.
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * @inheritdoc
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    if (figure.selectionHandles.isEmpty()) {
      // Add a dotted line rectangle to the figure. Override the show/hide method of the standard
      // figure to avoid adding these element to the hit test of the canvas. In this case the element
      // is just visible but not part of the model or responsible for any drag/drop operation
      // #2C70FF #2096fc
      let box = new draw2d.shape.basic.Rectangle({bgColor: null, dashArray: "- ", color: "#2C70FF", stroke: 0.5})
      box.hide = function () {
        // IMPORTANT
        // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
        // dragDrop operation
        //canvas.resizeHandles.remove(box);
        box.setCanvas(null)
      }
      box.show = function (canvas) {
        box.setCanvas(canvas)
        // IMPORTANT
        // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
        // dragDrop operation
        //canvas.resizeHandles.remove(box);
        //canvas.resizeHandles.add(box);
        box.toFront(figure)
      }

      // create standard Resize handles for the figure
      //
      let r1 = this.createResizeHandle(figure, 1) // 1 = LEFT TOP
      let r3 = this.createResizeHandle(figure, 3) // 3 = RIGHT_TOP
      let r5 = this.createResizeHandle(figure, 5) // 5 = RIGHT_BOTTOM
      let r7 = this.createResizeHandle(figure, 7) // 7 = LEFT_BOTTOM
      figure.selectionHandles.add(r1, r3, r5, r7)
      r1.show(canvas)
      r3.show(canvas)
      r5.show(canvas)
      r7.show(canvas)


      // change the look&feel of the corner resizehandles if the
      // figure isn't resizeable
      //
      if (figure.isResizeable() === false) {
        let attr = {bgColor: null, draggable:false}
        r1.attr(attr)
        r3.attr(attr)
        r5.attr(attr)
        r7.attr(attr)
        r1.setDraggable(false)
        r3.setDraggable(false)
        r5.setDraggable(false)
        r7.setDraggable(false)
      }

      // show only the additional resizehandles if the figure is resizeable and didn't care about
      // the aspect ration
      //
      if ((!figure.getKeepAspectRatio()) && figure.isResizeable()) {
        let r2 = this.createResizeHandle(figure, 2) // 2 = CENTER_TOP
        let r4 = this.createResizeHandle(figure, 4) // 4 = RIGHT_MIDDLE
        let r6 = this.createResizeHandle(figure, 6) // 6 = CENTER_BOTTOM
        let r8 = this.createResizeHandle(figure, 8) // 8 = LEFT_MIDDLE
        figure.selectionHandles.add(r2, r4, r6, r8)
        r2.show(canvas)
        r4.show(canvas)
        r6.show(canvas)
        r8.show(canvas)
      }

      // add the reference of the "ant box" to the figure as well. But wee add them
      // to the end of the array because inherit classes expect the resizehandles
      // on index 0-7.
      //
      figure.selectionHandles.add(box)

      // call the box.show() at last to ensure that the resize handles are above the
      // rectangle. The rectangle did a toFront(parentShape);
      box.show(canvas)
    }
    this.moved(canvas, figure)
  },


  /**
   * 
   * Callback if the figure has been moved. In this case we must update the position of the
   * resize handles and the "ant" box.
   *
   * @param figure
   *
   * @template
   */
  moved: function (canvas, figure) {

    if (figure.selectionHandles.isEmpty()) {
      return // silently
    }

    let margin = 3 * canvas.getZoom()
    let objHeight = figure.getHeight()
    let objWidth = figure.getWidth()
    let xPos = figure.getAbsoluteX()
    let yPos = figure.getAbsoluteY()

    let r1 = figure.selectionHandles.find(handle => handle.type === 1)
    let r3 = figure.selectionHandles.find(handle => handle.type === 3)
    let r5 = figure.selectionHandles.find(handle => handle.type === 5)
    let r7 = figure.selectionHandles.find(handle => handle.type === 7)

    r1.setPosition(xPos-r1.getWidth(),yPos-r1.getHeight());
    r3.setPosition(xPos+objWidth,yPos-r3.getHeight());
    r5.setPosition(xPos+objWidth,yPos+objHeight);
    r7.setPosition(xPos-r7.getWidth(),yPos+objHeight);

    if (!figure.getKeepAspectRatio() && figure.isResizeable()) {
      let r2 = figure.selectionHandles.find(handle => handle.type === 2)
      let r4 = figure.selectionHandles.find(handle => handle.type === 4)
      let r6 = figure.selectionHandles.find(handle => handle.type === 6)
      let r8 = figure.selectionHandles.find(handle => handle.type === 8)

      r2.setPosition(xPos+(objWidth/2)-(r2.getWidth()/2),yPos-r2.getHeight());
      r4.setPosition(xPos+objWidth,yPos+(objHeight/2)-(r4.getHeight()/2));
      r6.setPosition(xPos+(objWidth/2)-(r6.getWidth()/2),yPos+objHeight);
      r8.setPosition(xPos-r8.getWidth(),yPos+(objHeight/2)-(r8.getHeight()/2));
    }
    let box = figure.selectionHandles.last()
    box.attr({
      x:xPos-margin,
      y:yPos-margin,
      width:objWidth + margin*2,
      height: objHeight + margin*2,
      stroke:canvas.getZoom()
    })

    box.setRotationAngle(figure.getRotationAngle())
  },

  createResizeHandle: function (owner, type){
    return new draw2d.ResizeHandle({ owner:owner, type:type, width:10, height:10 });
  }
})
