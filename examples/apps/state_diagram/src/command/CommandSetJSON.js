
/**
 * @class example.command.CommandSetJSON
 * 
 * Command to add a figure with CommandStack support.
 * 
 * @extends draw2d.command.Command
 */
example.command.CommandSetJSON = draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {draw2d.Figure} figure the figure to add
     */
    init: function(figure, currentData, newData)
    {
       this._super("Change regular expression");
       this.figure = figure;
       this.data = currentData;
       this.oldData = $.extend({},currentData);
       this.newData = newData;
       
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        $.extend(this.data, this.newData);
        this.figure.validate();
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        $.extend(this.data, this.newData);
        this.figure.validate();
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        $.extend(this.data, this.oldData);
        this.figure.validate();
    }
    
});