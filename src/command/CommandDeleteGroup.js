
/**
 * @class draw2d.command.CommandDeleteGroup
 *
 * Command to remove a group with all related children.
 *
 * @extends draw2d.command.Command
 */
import draw2d from '../packages';

draw2d.command.CommandDeleteGroup = draw2d.command.Command.extend({

    NAME: "draw2d.command.CommandDeleteGroup",

    /**
     * @constructor
     * Create a delete command for the given figure.
     *
     * @param {draw2d.shape.composite.Group} group
     */
    init: function( group)
    {
       this._super(draw2d.Configuration.i18n.command.deleteShape);

       this.parent   = group.getParent();
       this.group    = group;
       this.canvas   = group.getCanvas();
       this.removedParentEntry = null; // can be null if the figure didn't have any parent shape assigned
       this.indexOfChild = -1;

       this.batchDelete = null;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {Boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute: function()
    {
        // we can only delete the shape if a children can be deleted
        //
        var children = this.group.getAssignedFigures();
        for(var i=0; i<children.getSize();i++){
            if(children.get(i).isDeleteable()===false){
                return false;
            }
        }

        // we can only delete the figure if its part of the canvas.
        return this.group.getCanvas()!==null;
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
     * Undo the command
     *
     **/
    undo: function()
    {
        this.batchDelete.undo();
        this.canvas.setCurrentSelection(this.group);
    },

    /**
     * @method
     *
     * Redo the command after the user has undo this command
     *
     **/
    redo: function()
    {
        if(this.batchDelete ===null){
            this.batchDelete = new  draw2d.command.CommandCollection();

            // remove the assignment of the children to the group before we delete the group
            //
            this.batchDelete.add(new  draw2d.command.CommandUngroup(this.canvas, this.group));

            // add the delete command of the children to the batch
            //
            var children = this.group.getAssignedFigures();
            for(var i=0; i<children.getSize();i++){
                var child = children.get(i);
                // request a delete Command from the child instead of create one by my own. May the child
                // provides its own implementation
                var cmd = child.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                this.batchDelete.add(cmd);
            }

        }


        this.batchDelete.execute();
    }
});
