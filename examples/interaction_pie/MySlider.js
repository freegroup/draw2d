
var MySlider = draw2d.shape.widget.Slider.extend({

    NAME : "MySlider",

    init : function(attr)
    {
        this._super({width:150, height:15,...attr});

        this.createPort("output");

        this.on("change:value", (element, event)=>{
            try {
                var canvas = this.getCanvas();
                if (!canvas) return;

                var connections = this.getOutputPort(0).getConnections();
                
                // Use CommandStack with transaction to group all changes as ONE undo/redo operation
                canvas.getCommandStack().startTransaction();
                
                connections.each((i, conn)=>{
                    var targetPort = conn.getTarget();
                    var targetFigure = targetPort.getParent();
                    
                    // Use CommandAttr to make changes undoable/redoable
                    var cmd = new draw2d.command.CommandAttr(targetFigure, {value: event.value});
                    canvas.getCommandStack().execute(cmd);
                });
                
                canvas.getCommandStack().commitTransaction();
            }
            catch (exc) {
                console.error("Error in MySlider change:value handler:", exc);
                // Rollback transaction if it was started
                if (canvas && canvas.getCommandStack()) {
                    try {
                        canvas.getCommandStack().undo();
                    } catch (rollbackExc) {
                        console.error("Failed to rollback transaction:", rollbackExc);
                    }
                }
            }
        });

    }
});
