import draw2d from '../packages'


/**
 * @class draw2d.command.CommandAttr
 *
 *Command to change attributes of a shape with undo/redo support
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandAttr = draw2d.command.Command.extend(
  /** @lends draw2d.command.CommandAttr.prototype */
  {

  NAME: "draw2d.command.CommandAttr",

  /**
   * Create a new Command objects which provides undo/redo for attributes.
   *
   * @param {draw2d.Figure} figure the figure to handle
   * @param {Object} attributes new attributes to set
   */
  init: function (figure, newAttributes) {
    this._super(draw2d.Configuration.i18n.command.changeAttributes)

    this.figure = figure
    this.newAttributes = newAttributes
    this.oldAttributes = {}
    // Get the current attributes from the shape before we modify them.
    // Required for undo/redo
    Object.keys(newAttributes).forEach( (key) => {
      this.oldAttributes[key] = figure.attr(key)
    })
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
    return true
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
    this.figure.attr(this.oldAttributes)
  },

  /**
   * 
   *
   * Redo the move command after the user has undo this command
   *
   **/
  redo: function () {
    this.figure.attr(this.newAttributes)
  }
})
