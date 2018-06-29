
/**
 * @class draw2d.command.CommandReconnect
 *
 * Reconnects two ports. This command is used during the DragDrop operation of a draw2d.Connection.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
import draw2d from '../packages';

draw2d.command.CommandReconnect = draw2d.command.Command.extend({
    NAME : "draw2d.command.CommandReconnect",


    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Connection} con the related Connection which is currently in the drag&drop operation
     */
    init: function(con)
    {
       this._super(draw2d.Configuration.i18n.command.connectPorts);
       this.con      = con;
       this.oldSourcePort  = con.getSource();
       this.oldTargetPort  = con.getTarget();
   },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {Boolean}
     **/
    canExecute: function()
    {
      // return false if we doesn't modify the model => NOP Command
      return true;
    },

    /**
     * @method
     * The new ports to use during the execute of this command.
     *
     * @param {draw2d.Port} source
     * @param {draw2d.Port} target
     */
    setNewPorts: function(source,  target)
    {
      this.newSourcePort = source;
      this.newTargetPort = target;
    },


    setIndex: function( index)
    {
        // do nothing....but method is required for LineResizeHandle
        // With this common interface the ResizeHandle can handle Lines and Connections
        // with the same code
    },

    /**
     * compatibily method to the CommandMoveVertex to handle Line and Connections
     * transparent in the ResizeHandles
     *
     * @param x
     * @param y
     */
    updatePosition: function(x,y)
    {
       // do nothing....but method is required for LineResizeHandle
       // With this common interface the ResizeHandle can handle Lines and Connections
       // with the same code
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function()
    {
       this.redo();
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    cancel: function()
    {
        this.con.setSource(this.oldSourcePort);
        this.con.setTarget(this.oldTargetPort);

        // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
        // vertices
        this.con.routingRequired =true;
        this.con.repaint();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function()
    {
      this.con.setSource(this.oldSourcePort);
      this.con.setTarget(this.oldTargetPort);
      // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
      // vertices
      this.con.routingRequired =true;
      this.con.repaint();
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function()
    {
      this.con.setSource(this.newSourcePort);
      this.con.setTarget(this.newTargetPort);
      // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
      // vertices
      this.con.routingRequired =true;
      this.con.repaint();
    }

});
