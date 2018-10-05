/**
 * @class draw2d.command.CommandMoveConnection
 *
 * Command for the movement of figures.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
import draw2d from '../packages'

draw2d.command.CommandMoveConnection = draw2d.command.Command.extend({
  NAME: "draw2d.command.CommandMoveConnection",

  /**
   * @constructor
   * Create a new Command objects which can be execute via the CommandStack.
   *
   * @param {draw2d.Connection} figure the connection to move
   */
  init: function (figure) {
    this._super(draw2d.Configuration.i18n.command.moveLine)
    this.line = figure
    this.dx = 0
    this.dy = 0
  },

  /**
   * @method
   * set the offset of the line translation
   *
   * @param {Number} dx
   * @param {Number} dy
   */
  setTranslation: function (dx, dy) {
    this.dx = dx
    this.dy = dy
  },

  /**
   * Returns [true] if the command can be execute and the execution of the
   * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
   * return false. <br>
   * the execution of the Command doesn't modify the model.
   *
   * @returns {Boolean}
   **/
  canExecute: function () {
    // return false if we doesn't modify the model => NOP Command
    return this.dx !== 0 && this.dy !== 0
  },

  /**
   * Execute the command the first time
   *
   **/
  execute: function () {
    this.redo()
  },

  /**
   * Undo the command
   *
   **/
  undo: function () {
    let _this = this
    this.line.getVertices().each(function (i, e) {
      e.translate(-_this.dx, -_this.dy)
    })
    this.line.svgPathString = null
    // required to update resize handles and the painting of the line
    this.line.setPosition(this.line.getStartPosition())
  },

  /**
   * Redo the command after the user has undo this command
   *
   **/
  redo: function () {
    let _this = this
    this.line.getVertices().each(function (i, e) {
      e.translate(_this.dx, _this.dy)
    })
    this.line.svgPathString = null

    // required to update resize handles and the painting of the line
    this.line.setPosition(this.line.getStartPosition())
  }
})
