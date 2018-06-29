
/**
 * @class draw2d.shape.node.Start
 * 
 * A generic Node which has an OutputPort. Mainly used for demo and examples.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.node.Start();
 *     figure.setColor("#3d3d3d");
 *     
 *     canvas.add(figure,50,10);
 *     
 * @extends draw2d.shape.basic.Rectangle
 */
example.shape.AutoConnection = draw2d.shape.state.Connection.extend({

    NAME : "example.shape.AutoConnection",

	init : function()
    {
        this._super();
        
        // set some good defaults
        this.setLabel(null);
        this.setUserData( {condition:"IsTrue", variable:"activityResult"});
        
        var arrow = new draw2d.decoration.connection.ArrowDecorator(17,8);
        this.setTargetDecorator(arrow);
            
        this.setCssClass("AutoConnection");
    },
    
    /**
     * @method
     * validate all regular expression from this connection and set a corresponding
     * color for the connection if any errors are in.
     * 
     */
    validate: function(){

        return this;
    },
    
    /**
     * @method
     * Return all variables in the reqular expression group mapping
     * 
     * @return {Array}
     */
    getVariables: function(){
        return draw2d.util.ArrayList.EMPTY_LIST;
    },
    
    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     * @returns 
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        this.validate();
    }
    

});
