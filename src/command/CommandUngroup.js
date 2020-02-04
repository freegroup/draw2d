/**
 * @class draw2d.command.CommandUngroup
 * Command to ungroup a given group figures
 *
 * @extends draw2d.command.Command
 */
import draw2d from '../packages'


draw2d.command.CommandUngroup = draw2d.command.Command.extend(
  /** @lends draw2d.command.CommandUngroup.prototype */
  {

  NAME: "draw2d.command.CommandUngroup",

  /**
   * Create a group command for the given figure.
   *
   * @param {draw2d.Canvas} canvas the responsible canvas
   * @param {draw2d.util.ArrayList|draw2d.Selection} group the figures to group
   */
  init: function (canvas, group) {
    this._super(draw2d.Configuration.i18n.command.ungroupShapes)
    if (group instanceof draw2d.Selection) {
      this.group = group.getAll().first()
    }
    else {
      this.group = group
    }

    this.canvas = canvas
    this.figures = this.group.getAssignedFigures().clone()
  },


  /**
   *
   * Returns [true] if the command can be execute and the execution of the
   * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
   * return false. The execution of this Command doesn't modify the model.
   *
   * @return {Boolean} return try if the command modify the model or make any relevant changes
   **/
  canExecute: function () {
    return !this.figures.isEmpty()
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
    let _this = this
    this.figures.each(function (i, figure) {
      _this.group.assignFigure(figure)
    })
    this.canvas.add(this.group)
    this.canvas.setCurrentSelection(this.group)
  },

  /**
   *
   * Redo the command after the user has undo this command
   *
   **/
  redo: function () {
    let _this = this
    this.figures.each(function (i, figure) {
      _this.group.unassignFigure(figure)
    })

    this.canvas.setCurrentSelection(this.figures)
    this.canvas.remove(this.group)
  }
})
