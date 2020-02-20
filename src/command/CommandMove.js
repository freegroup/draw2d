import draw2d from '../packages'


/**
 * @class
 *
 * Command for the movement of figures.
 *
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandMove = draw2d.command.Command.extend(
  /** @lends draw2d.command.CommandMove.prototype */
  {

  NAME: "draw2d.command.CommandMove",

  /**
   * Create a new Command objects which can be execute via the CommandStack.
   *
   * @param {draw2d.Figure} figure the figure to move
   * @param {Number} [x] the current x position
   * @param {Number} [y] the current y position
   */
  init: function (figure, x, y) {
    this._super(draw2d.Configuration.i18n.command.moveShape)
    this.figure = figure
    if (typeof x === "undefined") {
      this.oldX = figure.getX()
      this.oldY = figure.getY()
    }
    else {
      this.oldX = x
      this.oldY = y
    }
  },


  /**
   * 
   * Set the initial position of the element
   *
   * @param {Number} x the new initial x position
   * @param {Number} y the new initial y position
   **/
  setStartPosition: function (x, y) {
    this.oldX = x
    this.oldY = y
  },

  /**
   * 
   * Set the target/final position of the figure move command.
   *
   * @param {Number} x the new x position
   * @param {Number} y the new y position
   **/
  setPosition: function (x, y) {
    this.newX = x
    this.newY = y
  },

  /**
   * 
   * Returns [true] if the command can be execute and the execution of the
   * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
   * return false. <br>
   * the execution of the Command doesn't modify the model.
   *
   * @return {Boolean}
   **/
  canExecute: function () {
    // return false if we doesn't modify the model => NOP Command
    return this.newX !== this.oldX || this.newY !== this.oldY
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
   *
   * Undo the move command
   *
   **/
  undo: function () {
    this.figure.setPosition(this.oldX, this.oldY)
  },

  /**
   * 
   *
   * Redo the move command after the user has undo this command
   *
   **/
  redo: function () {
    this.figure.setPosition(this.newX, this.newY)
  }
})
