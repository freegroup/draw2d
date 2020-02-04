/**
 * @class draw2d.shape.composite.Composite
 * Base interface for the compiste shapes
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 * @since 4.7.2
 */
import draw2d from '../../packages'

draw2d.shape.composite.Composite = draw2d.SetFigure.extend(
  /** @lends draw2d.shape.composite.Composite.prototype */
  {

  NAME: "draw2d.shape.composite.Composite",

  /**
   * Creates a new composite element which are not assigned to any canvas.
   *
   * @constructs
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({stroke: 1, "color": "#f0f0f0"}, attr), setter, getter)
  },

  /**
   * 
   * Called when a user dbl clicks on the element
   *
   * @template
   */
  onDoubleClick: function () {
    // do nothing per default. no rotation of the shape.
  },

  /**
   * 
   * Delegate method to calculate if a figure is selectable. A composite has the right to override the
   * initial selectable flag of the figure.
   *
   * @param {draw2d.Figure} figure the figure to test
   * @param {Boolean} selectable the initial selectable flag of the figure
   * @returns
   *
   */
  isMemberSelectable: function (figure, selectable) {
    return selectable
  },

  /**
   * 
   * Delegate method to calculate if a figure is draggable. A composite has the right to override the
   * initial draggable flag of the figure.
   *
   * @param {draw2d.Figure} figure the figure to test
   * @param {Boolean} draggable the initial draggable flag of the figure
   * @returns
   *
   */
  isMemberDraggable: function (figure, draggable) {
    return draggable
  },


  /**
   * 
   * Set the canvas element of this figures. This can be used to determine whenever an element
   * is added or removed to the canvas.
   *
   * @param {draw2d.Canvas} canvas the new parent of the figure or null
   */
  setCanvas: function (canvas) {
    this._super(canvas)

    // an composite shape goes always in the background
    //
    if (canvas !== null) {
      this.toBack()
    }
  }

})
