
var DblClickCanvasPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    init : function()
    {
        this._super();
    },

    /**
     * @method
     * Called by the canvas if the user double click on a figure.
     *
     * @param {draw2d.Figure} the figure under the double click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     */
    onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        if(figure!==null) {
            // do the rotation Either by Command with undo/redo support
            //
            var command = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.ROTATE));
            if (command !== null) {
                this.canvas.getCommandStack().execute(command);
            }
        }
    }
});
