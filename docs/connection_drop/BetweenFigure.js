
let BetweenFigure = draw2d.shape.node.Between.extend({

    init : function(attr)
    {
        this._super(attr);
        this.setBackgroundColor("#fdc11d");

        this.add(new draw2d.shape.basic.Label({text: "label"}), new draw2d.layout.locator.CenterLocator(this));
    },

  
    /**
     * @method
     * Called if the user drop this element onto the dropTarget. 
     * 
     * In this Example we create a "smart insert" of an existing connection.
     * COOL and fast network editing.
     * 
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey)
    {
      console.log("onDrop")
    	// Activate a "smart insert" If the user drop this figure on connection
    	//
    	if(dropTarget instanceof draw2d.Connection){
    	  let oldSource = dropTarget.getSource();
    	  let oldTarget = dropTarget.getTarget();

    	  let stack = this.getCanvas().getCommandStack();

    	  let cmd = new draw2d.command.CommandReconnect(dropTarget);
        cmd.setNewPorts(oldSource, this.getInputPort(0));
        stack.execute(cmd);

    		let additionalConnection = createConnection();
    		cmd = new draw2d.command.CommandConnect(oldTarget,this.getOutputPort(0));
    		cmd.setConnection(additionalConnection);
        stack.execute(cmd);

    	}
    }

});
