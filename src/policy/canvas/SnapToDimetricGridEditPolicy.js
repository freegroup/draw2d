/**
 * @class draw2d.policy.canvas.SnapToDimetricGridEditPolicy
 *
 * A helper used to perform snapping to a grid, which is specified on the canvas via the various
 * properties defined in this class.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.ShowDimetricGridEditPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.SnapToDimetricGridEditPolicy = draw2d.policy.canvas.ShowDimetricGridEditPolicy.extend({

  NAME: "draw2d.policy.canvas.SnapToDimetricGridEditPolicy",


  /**
   * @constructor
   * Creates a new constraint policy for snap to grid
   *
   * @param {Number} grid the grid width of the canvas
   */
  init: function (grid) {
    this._super(grid)
  },


  /**
   * @method
   * Applies a snapping correction to the given result.
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the figure to snap
   * @param {draw2d.geo.Point} modifiedPos the already modified position of the figure (e.g. from an another Policy)
   * @param {draw2d.geo.Point} originalPos the original requested position of the figure
   * @since 2.3.0
   */
  snap: function (canvas, figure, modifiedPos, originalPos) {
    // do nothing for lines
    if (figure instanceof draw2d.shape.basic.Line) {
      return modifiedPos
    }

    let snapPoint = figure.getSnapToGridAnchor()

    modifiedPos.x = modifiedPos.x + snapPoint.x
    modifiedPos.y = modifiedPos.y + snapPoint.y

    let g = this.grid / 5

    modifiedPos.x = g * Math.floor(((modifiedPos.x + g / 2.0) / g))
    modifiedPos.y = g * Math.floor(((modifiedPos.y + g / 2.0) / g))

    modifiedPos.x = modifiedPos.x - snapPoint.x
    modifiedPos.y = modifiedPos.y - snapPoint.y

    return modifiedPos
  }
})
