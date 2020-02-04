/**
 * @class draw2d.policy.canvas.DecorationPolicy
 * The base class for any canvas decoration like grid, chessboard, graph paper or
 * other.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.DecorationPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

  NAME: "draw2d.policy.canvas.DecorationPolicy",

  /**
   * @constructs
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  }

})

