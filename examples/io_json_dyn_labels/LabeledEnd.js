var example = {};

/**
 * @class example.connection_locator.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
example.LabeledEnd = draw2d.shape.node.End.extend({

    NAME : "example.LabeledEnd",

    init:function()
    {
      this._super();
      
      // labels are added via JSON document.
    },

    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();
        
        // add all decorations to the memento 
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });
    
        return memento;
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
        
        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();
        
        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");
            
            // apply all attributes
            figure.attr(json)
            
            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");
            
            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
    }
});
