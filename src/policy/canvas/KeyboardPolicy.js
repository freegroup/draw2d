import draw2d from '../../packages'


/**
 * @class draw2d.policy.canvas.KeyboardPolicy
 * Default interface for keyboard interaction with the canvas.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.KeyboardPolicy = draw2d.policy.canvas.CanvasPolicy.extend(
  /** @lends draw2d.policy.canvas.KeyboardPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.KeyboardPolicy",

  /**
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  /**
   * 
   * Callback if the user release a key
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {Number} keyCode the pressed key
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onKeyUp: function (canvas, keyCode, shiftKey, ctrlKey) {
    // do nothing per default
  },

  /**
   * 
   * Callback if the user press a key down
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {Number} keyCode the pressed key
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onKeyDown: function (canvas, keyCode, shiftKey, ctrlKey) {
    // do nothing per default
  }


})
