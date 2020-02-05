import draw2d from '../../packages'


/**
 * @class draw2d.policy.canvas.DecorationPolicy
 * The base class for any canvas decoration like grid, chessboard, graph paper or
 * other.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.DecorationPolicy = draw2d.policy.canvas.CanvasPolicy.extend(
  /** @lends draw2d.policy.canvas.DecorationPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.DecorationPolicy",

  /**
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  }

})

