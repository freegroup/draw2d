
/**
 * @class example.command.CommandSetActivityDef
 * 
 * Command to change an activity definition on an example.shape.Activity element
 * 
 * @extends draw2d.command.Command
 */
example.command.CommandSetActivityDef = draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Figure} figure the figure to add
     */
    init: function(figure, newActivityDef)
    {
       this._super("Change activity definition");
       
       this.figure = figure;
       this.oldActivityDef = figure.getActivity();
       this.newActivityDef = newActivityDef;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        this.figure.setActivity(this.newActivityDef);
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        this.figure.setActivity(this.newActivityDef);
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        this.figure.setActivity(this.oldActivityDef);
    }
    
});