import draw2d from '../packages'


/**
 * @class draw2d.command.CommandStackEventListener
 *
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 * @author Andreas Herz
 */

draw2d.command.CommandStackEventListener = Class.extend(
  /** @lends draw2d.command.CommandStackEventListener.prototype */
  {

  NAME: "draw2d.command.CommandStackEventListener",

  /**
   * Creates a new Listener Object
   *
   */
  init: function () {
  },

  /**
   *
   * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @template
   *
   * @param {draw2d.command.CommandStackEvent} event
   **/
  stackChanged: function (event) {
  }

})
