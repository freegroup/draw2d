/**
 * @class draw2d.policy.line.VertexSelectionFeedbackPolicy
 *
 * Feedback and edit policy for the VertexRouter.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.line.LineSelectionFeedbackPolicy
 */
import draw2d from '../../packages'

draw2d.policy.line.VertexSelectionFeedbackPolicy = draw2d.policy.line.LineSelectionFeedbackPolicy.extend({

  NAME: "draw2d.policy.line.VertexSelectionFeedbackPolicy",

  /**
   * @constructor
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },


  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Connection} figure the selected figure
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, figure, isPrimarySelection) {
    let startHandle = new draw2d.shape.basic.LineStartResizeHandle(figure)
    let endHandle = new draw2d.shape.basic.LineEndResizeHandle(figure)
    figure.selectionHandles.add(startHandle)
    figure.selectionHandles.add(endHandle)

    let points = figure.getVertices()
    let count = points.getSize() - 1
    let i = 1
    for (; i < count; i++) {
      figure.selectionHandles.add(new draw2d.shape.basic.VertexResizeHandle(figure, i))
      figure.selectionHandles.add(new draw2d.shape.basic.GhostVertexResizeHandle(figure, i - 1))
    }

    figure.selectionHandles.add(new draw2d.shape.basic.GhostVertexResizeHandle(figure, i - 1))

    figure.selectionHandles.each( (i, e) => {
      e.setDraggable(figure.isResizeable())
      e.show(canvas)
    })

    this.moved(canvas, figure)
  }

})
