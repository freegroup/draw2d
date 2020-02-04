/**
 * @class draw2d.command.CommandMoveVertices
 *
 * Command for the vertices movement of a polyline/polygon.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
import draw2d from '../packages'

draw2d.command.CommandMoveVertices = draw2d.command.Command.extend(
  /** @lends draw2d.command.CommandMoveVertices.prototype */
  {

  NAME: "draw2d.command.CommandMoveVertices",

  /**
   * Create a new Command objects which can be execute via the CommandStack.
   *
   * @param {draw2d.shape.basic.PolyLine} line the related line
   */
  init: function (line) {
    this._super(draw2d.Configuration.i18n.command.moveVertices)

    this.line = line
    this.oldVertices = line.getVertices().clone(true)
    this.newVertices = null
  },


  updateVertices: function (newVertices) {
    this.newVertices = newVertices
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
    return this.newVertices !== null
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
    this.line.setVertices(this.oldVertices)
  },

  /**
   *
   *
   * Redo the move command after the user has undo this command
   *
   **/
  redo: function () {
    this.line.setVertices(this.newVertices)
  }
})
