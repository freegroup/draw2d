/**
 * Custom slider that propagates value changes to connected figures.
 * 
 * This slider demonstrates the proper way to implement undo/redo for cascading updates:
 * 
 * 1. Live Updates: During drag, values are updated directly via setValue() for immediate visual feedback
 * 2. Undo/Redo: Only when drag ends, a single CommandAttr is created for the entire operation
 * 3. Transaction: All connected figure updates are grouped as ONE undo/redo operation
 * 
 * Events used:
 * - change:value: Fired continuously during drag for live updates (no CommandStack)
 * - dragstart: Fired once when user starts dragging - stores initial values
 * - dragend: Fired once when user releases mouse - creates ONE command for undo/redo
 */
var MySlider = draw2d.shape.widget.Slider.extend({

    NAME: "MySlider",

    init: function(attr) {
        this._super({width: 150, height: 15, ...attr});

        this.createPort("output");

        // Live value propagation during drag
        // Updates connected figures immediately for visual feedback
        // Does NOT use CommandStack to avoid creating hundreds of commands
        this.on("change:value", (element, event) => {
            var canvas = this.getCanvas();
            if (!canvas) return;

            var connections = this.getOutputPort(0).getConnections();
            connections.each((i, conn) => {
                var targetPort = conn.getTarget();
                // Direct setValue() call - no command, just live update
                targetPort.setValue(event.value);
            });
        });

        // Store initial values when drag starts
        // These values will be used later for undo/redo
        this.on("dragstart", (element, event) => {
            var canvas = this.getCanvas();
            if (!canvas) return;

            var connections = this.getOutputPort(0).getConnections();
            connections.each((i, conn) => {
                var targetPort = conn.getTarget();
                // Store start value for later undo operation
                targetPort._startValue = targetPort.getValue();
            });
        });

        // Create ONE command for undo/redo when drag ends
        // This ensures the entire slider operation can be undone/redone as a single action
        this.on("dragend", (element, event) => {
            try {
                var canvas = this.getCanvas();
                if (!canvas) return;

                var connections = this.getOutputPort(0).getConnections();
                var commandStack = canvas.getCommandStack();
                
                // Use transaction to group all changes as ONE undo/redo operation
                // Nested transactions are now supported - no conflict even if shape is being dragged
                commandStack.startTransaction("Slider Value Change");
                
                connections.each((i, conn) => {
                    var targetPort = conn.getTarget();
                    
                    // Create CommandAttr with explicit old/new values
                    // This avoids reading potentially already-changed values
                    var cmd = new draw2d.command.CommandAttr(
                        targetPort,
                        {value: targetPort.getValue()},      // current value (new)
                        {value: targetPort._startValue}      // stored start value (old)
                    );
                    commandStack.execute(cmd);
                    
                    // Clean up temporary start value
                    delete targetPort._startValue;
                });

                commandStack.commitTransaction();
            }
            catch (exc) {
                console.error("Error in MySlider dragend handler:", exc);
            }
        });
    }
});