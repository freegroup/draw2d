import draw2d from '../packages'


/**
 * @class
 *
 * Set the rotation angle of the given figure
 *
 * @since 4.4.1
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.command.Command
 */
draw2d.command.CommandRotate = draw2d.command.Command.extend(
  /** @lends draw2d.command.CommandRotate.prototype */
  {

  NAME: "draw2d.command.CommandRotate",

  /**
   * Create a new resize Command objects which can be execute via the CommandStack.
   *
   * @param {draw2d.Figure} figure the figure to resize
   * @param {Number} angle the angle to rotate
   */
  init: function (figure, angle) {
    this._super(draw2d.Configuration.i18n.command.rotateShape)
    this.figure = figure

    this.oldAngle = figure.getRotationAngle()
    this.newAngle = angle
  },


  /**
   *
   * Returns [true] if the command can be execute and the execution of the
   * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
   * return false. <br>
   * the execution of the Command doesn't modify the model.
   *
   * @returns {Boolean}
   **/
  canExecute: function () {
    // return false if we doesn't modify the model => NOP Command
    return this.oldAngle !== this.newAngle
  },

  /**
   *
   * Execute the command the first time
   *
   **/
  execute: function () {
    this.redo()
  },

  /**
   *
   * Undo the command
   *
   **/
  undo: function () {
    this.rotate(this.oldAngle)
  },

  /**
   *
   * Redo the command after the user has undo this command
   *
   **/
  redo: function () {
    this.rotate(this.newAngle)
  },

  rotate: function (angle) {
    let w = this.figure.getWidth()
    let h = this.figure.getHeight()

    this.figure.setRotationAngle(angle)

    this.figure.setDimension(w, h) // Bug: was swapped

    this.figure.portRelayoutRequired = true
  }
})
