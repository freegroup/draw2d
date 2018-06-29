
/**
 * @class example.command.CommandSetJSON
 * 
 * Command to add a figure with CommandStack support.
 * 
 * @extends draw2d.command.Command
 */
example.command.CommandSetLabel = draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command to change the label of the given figure. The figure
     * must have a getter/setter for the attribute "label".
     * 
     * @param {draw2d.Figure} figure the figure with the label to change
     * @param {String} newLabel the new label for the figure
     */
    init: function(figure, newLabel)
    {
       this._super("Change the label of a figure");
       this.figure  = figure;
       this.oldLabel =figure.getLabel();
       this.newLabel = newLabel;
    },
    
    
    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute:function()
    {
      return this.oldLabel !== this.newLabel;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        this.figure.setLabel(this.newLabel);
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        this.figure.setLabel(this.newLabel);
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        this.figure.setLabel(this.oldLabel);
    }
    
});