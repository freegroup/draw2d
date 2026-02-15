import draw2d from '../packages'


/**
 * @class
 *
 * An implementation of a command stack. A stack manages the executing, undoing, and redoing of Commands. Executed
 * commands are pushed onto a a stack for undoing later. Commands which are undone are pushed onto a redo stack.
 * Whenever a new command is executed, the redo stack is flushed.
 *
 * You can retrieve the current used CommandStack just by calling <code>canvas.getCommandStack()</code>
 *
 */
draw2d.command.CommandStack = Class.extend(
  /** @lends draw2d.command.CommandStack.prototype */
  {

  NAME: "draw2d.command.CommandStack",


  /**
   * Create a new CommandStack objects which can be execute via the CommandStack.
   *
   */
  init: function () {
    this.undostack = []
    this.redostack = []
    this.maxundo = 50
    this.transactionCommand = null
    this.transactionStack = []  // Stack for nested transactions
    this.eventListeners = new draw2d.util.ArrayList()
  },


  /**
   *
   * Set the maximal undo stack size. Entries will be remove if the max. stack
   * size has been reached.
   *
   * @param {Number} count The maximal undo stack size.
   * @returns {this}
   **/
  setUndoLimit: function (count) {
    this.maxundo = count

    return this
  },

  /**
   *
   * Remove the undo / redo history. This is useful if the user has been save the
   * document.
   *
   * @returns {this}
   **/
  markSaveLocation: function () {
    this.undostack = []
    this.redostack = []

    // fire an empty command to inform all listener that the stack has been changed
    this.notifyListeners(new draw2d.command.Command(), draw2d.command.CommandStack.POST_EXECUTE)

    return this
  },

  /**
   *
   *
   * Executes the specified Command if possible. Prior to executing the command, a
   * draw2d.command.CommandStackEvent for {@link #PRE_EXECUTE} will be fired to event listeners.
   * Similarly, after attempting to execute the command, an event for {@link #POST_EXECUTE}
   * will be fired.
   *
   * @param {draw2d.command.Command} command The command to execute.
   * @returns {this}
   **/
  execute: function (command) {
    if (typeof command === "undefined")
      throw "Missing parameter [command] for method call CommandStack.execute"

    // nothing to do
    if (command === null)
      return this//silently

    // return if the command can't execute or it doesn't change the model
    // => Empty command
    if (command.canExecute() === false)
      return this

    // A command stack transaction is open.
    // The execution will be postpone until the transaction will commit
    //
    if (this.transactionCommand !== null) {
      this.transactionCommand.add(command)
      return this
    }

    this.notifyListeners(command, draw2d.command.CommandStack.PRE_EXECUTE, "PRE_EXECUTE")

    this.undostack.push(command)
    command.execute()

    // cleanup the redo stack if the user execute a new command.
    // I think this will create a "clean" behaviour of the unde/redo mechanism.
    //
    this.redostack = []

    // monitor only the max. undo stack size
    //
    if (this.undostack.length > this.maxundo) {
      this.undostack = this.undostack.slice(this.undostack.length - this.maxundo)
    }
    this.notifyListeners(command, draw2d.command.CommandStack.POST_EXECUTE, "POST_EXECUTE")

    return this
  },

  /**
   *
   * Opens a transaction for further multiple commands. If you execute a command all
   * {@ #execute} calls will be ignored until you commit the current transaction.
   * 
   * Nested transactions are supported: each startTransaction() pushes a new CommandCollection
   * onto a stack. When commitTransaction() is called, the collection is either added to the
   * parent collection (if nested) or executed on the command stack (if top-level).
   *
   * @param {String} [commandLabel] the label to show for the undo/redo operation
   * @returns {this}
   * @since 4.0.0
   */
  startTransaction: function (commandLabel) {
    // Push current transaction onto stack if one exists (nested transaction)
    if (this.transactionCommand !== null) {
      this.transactionStack.push(this.transactionCommand)
    }

    // Create new transaction
    this.transactionCommand = new draw2d.command.CommandCollection(commandLabel)

    return this
  },

  /**
   *
   * Returns true if the Command Stack has an open transaction.
   * You can start or stop a transaction with `startTransaction`and `commitTransaction`.
   *
   * A transaction is one undo/redo operation.
   *
   * @returns {Boolean}
   */
  isInTransaction: function () {
    return this.transactionCommand !== null
  },

  /**
   *
   * Commit the running transaction. All commands between the start/end of a transaction
   * can be undo/redo in a single step.
   * 
   * For nested transactions: the committed collection is added to the parent collection.
   * For top-level transactions: the collection is executed on the command stack.
   *
   * @since 4.0.0
   * @returns {this}
   */
  commitTransaction: function () {
    if (this.transactionCommand === null) {
      return this//silently
    }

    let cmd = this.transactionCommand
    
    // Check if we have a parent transaction (nested transaction)
    if (this.transactionStack.length > 0) {
      // Pop parent transaction from stack
      this.transactionCommand = this.transactionStack.pop()
      
      // Add current collection to parent collection
      // Optimize: if only one command, add it directly
      if (cmd.commands.getSize() === 1) {
        this.transactionCommand.add(cmd.commands.first())
      }
      else if (cmd.commands.getSize() > 0) {
        this.transactionCommand.add(cmd)
      }
    }
    else {
      // Top-level transaction: execute on command stack
      this.transactionCommand = null
      
      // we can drop the CommandCollection if the collection contains only one command.
      if (cmd.commands.getSize() === 1) {
        this.execute(cmd.commands.first())
      }
      else if (cmd.commands.getSize() > 0) {
        this.execute(cmd)
      }
    }

    return this
  },

  /**
   *
   * Undo on command from the stack and store them on the redo command stack.
   * @returns {this}
   **/
  undo: function () {
    let command = this.undostack.pop()
    if (command) {
      this.notifyListeners(command, draw2d.command.CommandStack.PRE_UNDO)
      this.redostack.push(command)
      command.undo()
      this.notifyListeners(command, draw2d.command.CommandStack.POST_UNDO)
    }

    return this
  },

  /**
   *
   * Redo a command after the user has undo a command
   *
   * @returns {this}
   **/
  redo: function () {
    let command = this.redostack.pop()

    if (command) {
      this.notifyListeners(command, draw2d.command.CommandStack.PRE_REDO)
      this.undostack.push(command)
      command.redo()
      this.notifyListeners(command, draw2d.command.CommandStack.POST_REDO)
    }

    return this
  },

  /**
   *
   * Return the label of the next REDO command.
   *
   * @returns {String}
   **/
  getRedoLabel: function () {
    if (this.redostack.length === 0)
      return ""

    let command = this.redostack[this.redostack.length - 1]

    if (command) {
      return command.getLabel()
    }
    return ""
  },


  /**
   *
   * Return the label of the next UNDO command.
   *
   * @returns {String}
   **/
  getUndoLabel: function () {
    if (this.undostack.length === 0)
      return ""

    let command = this.undostack[this.undostack.length - 1]

    if (command) {
      return command.getLabel()
    }
    return ""
  },


  /**
   *
   * Indicates whenever a REDO is possible.
   *
   * @returns {Boolean} <code>true</code> if it is appropriate to call {@link #redo()}.
   */
  canRedo: function () {
    return this.redostack.length > 0
  },

  /**
   *
   * indicator whenever a undo is possible.
   *
   * @returns {Boolean} <code>true</code> if {@link #undo()} can be called
   **/
  canUndo: function () {
    return this.undostack.length > 0
  },

  /**
   *
   * Adds a listener to the command stack, which will be notified whenever a command has been processed on the stack.
   * @deprecated use on/off to register events
   * @param {draw2d.command.CommandStackEventListener|Function} listener the listener to add.
   * @returns {this}
   */
  addEventListener: function (listener) {
    return this.on("change", listener)
  },
  /**
   * Adds a listener to the command stack, which will be notified whenever a command has been processed on the stack.
   *
   * @param event
   * @param func
   * @returns {this}
   */
  on: function (event, listener) {
    if (event !== "change")
      throw "only event of kind 'change' is supported"

    if (listener instanceof draw2d.command.CommandStackEventListener) {
      this.eventListeners.add(listener)
    }
    else if (typeof listener.stackChanged === "function") {
      this.eventListeners.add(listener)
    }
    else if (typeof listener === "function") {
      this.eventListeners.add({stackChanged: listener})
    }
    else {
      throw "Object doesn't implement required callback interface [draw2d.command.CommandStackListener]"
    }

    return this
  },

  /**
   *
   * Removes a listener from the command stack.
   *
   * @deprecated use on/off to register events
   * @param {draw2d.command.CommandStackEventListener} listener the listener to remove.
   * @returns {this}
   */
  removeEventListener: function (listener) {
    this.off(listener)

    return this
  },

    /**
     *
      * @param listener
     * @returns {this}
     */
  off: function (listener) {
    this.eventListeners.grep(entry => (entry === listener || entry.stackChanged === listener))
    /*
    let size = this.eventListeners.getSize()
    for (let i = 0; i < size; i++) {
      let entry = this.eventListeners.get(i)
      if (entry === listener || entry.stackChanged === listener) {
        this.eventListeners.remove(entry)
        return
      }
    }
    */
    return this
  },

  /**
   *
   * Notifies command stack event listeners that the command stack has changed to the
   * specified state.
   *
   * @param {draw2d.command.Command} command the command
   * @param {Number} state the current stack state
   * @private
   **/
  notifyListeners: function (command, state, action) {
    let event = new draw2d.command.CommandStackEvent(this, command, state, action)
    let size = this.eventListeners.getSize()

    for (let i = 0; i < size; i++) {
      this.eventListeners.get(i).stackChanged(event)
    }
  }
})


//  Constant indicating notification prior to executing a command (value is 1).
draw2d.command.CommandStack.PRE_EXECUTE = 1
//  Constant indicating notification prior to redoing a command (value is 2).
draw2d.command.CommandStack.PRE_REDO = 2
//  Constant indicating notification prior to undoing a command (value is 4).
draw2d.command.CommandStack.PRE_UNDO = 4
//   Constant indicating notification after a command has been executed (value is 8).
draw2d.command.CommandStack.POST_EXECUTE = 8
//  Constant indicating notification after a command has been redone (value is 16).
draw2d.command.CommandStack.POST_REDO = 16
//  Constant indicating notification after a command has been undone (value is 32).
draw2d.command.CommandStack.POST_UNDO = 32
//  Constant indicating notification after the stack has been (re)init (value is 64).
draw2d.command.CommandStack.POST_INIT = 64

draw2d.command.CommandStack.POST_MASK = draw2d.command.CommandStack.POST_EXECUTE | draw2d.command.CommandStack.POST_UNDO | draw2d.command.CommandStack.POST_REDO
draw2d.command.CommandStack.PRE_MASK = draw2d.command.CommandStack.PRE_EXECUTE | draw2d.command.CommandStack.PRE_UNDO | draw2d.command.CommandStack.PRE_REDO


