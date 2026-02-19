import draw2d from '../packages'


/**
 * @class
 *
 * Commands are passed around throughout editing. They are used to encapsulate and combine
 * changes to the application's model. An application has a single command stack. Commands must
 * be executed using the command stack rather than directly calling execute.
 * <br>
 * This is required for a generic support for the undo/redo concept within draw2d.<br>
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.command.Command = Class.extend(
  /** @lends draw2d.command.Command.prototype */
  {
  
  NAME: "draw2d.command.Command",

  /**
   * Create a new Command objects which can be execute via the CommandStack.
   *
   * @param {String} label
   */
  init: function (label) {
    this.label = label
  },


  /**
   * 
   * Returns a label of the Command. e.g. `move figure`.
   *
   * @returns {String} the label for this command
   **/
  getLabel: function () {
    return this.label
  },


  /**
   * 
   * Returns [true] if the command can be execute and the execution of the
   * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
   * return false. The execution of this Command doesn't modify the model.
   *
   * @returns {Boolean} return try if the command modify the model or make any relevant changes
   **/
  canExecute: function () {
    return true
  },

  /**
   * 
   * Execute the command the first time.
   * Sup-classes must implement this method.
   *
   * @template
   **/
  execute: function () {
  },

  /**
   * 
   * Will be called if the user cancel the operation.
   *
   * @template
   **/
  cancel: function () {
  },

  /**
   * 
   * Undo the command.
   * Sup-classes must implement this method.
   *
   * @template
   **/
  undo: function () {
  },

  /**
   * 
   * Redo the command after the user has undo this command.
   * Sup-classes must implement this method.
   *
   * @template
   **/
  redo: function () {
  },

  /**
   * 
   * Returns the figures affected by this command.
   * Sub-classes must implement this method to return an array of figures
   * that are modified/affected by this command.
   *
   * @returns {draw2d.Figure[]} Array of affected figures. Returns empty array if no figures are affected.
   * @template
   * @since 7.0.0
   **/
  getAffectedFigures: function () {
    return []
  }
})
