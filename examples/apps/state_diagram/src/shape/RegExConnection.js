
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
example.shape.RegExConnection = draw2d.shape.state.Connection.extend({

    NAME : "example.shape.RegExConnection",

	init : function()
    {
        this._super();
        
        // set some good defaults
        this.setLabel(null);
        this.setUserData( [{regexpr:"", defaultAnswer:"", test:"", mapping:[]} ]);
        this.setCssClass("RegExConnection");
    },
    
    /**
     * @method
     * validate all regular expression from this connection and set a corresponding
     * color for the connection if any errors are in.
     * 
     */
    validate: function(){
        var color = "#303030";
        var data = this.getUserData();
        var atLeastOneValid = false;
        $.each(data, function(i,line){
            try{
                expr = line.regexpr;
                if(typeof expr!== "undefined" && expr!==null && expr!==""){
                    new RegExp(expr);
                    atLeastOneValid = true;
                }
            }
            catch(exc){
                color = "#ff0000";
                return false;
            }
        });

        this.setAlpha(atLeastOneValid?1.0:0.1);

        this.setColor(color);
                   
        return this;
    },
    
    /**
     * @method
     * Return all variables in the reqular expression group mapping
     * 
     * @return {Array}
     */
    getVariables: function(){
        var result = new draw2d.util.ArrayList();

        $.each(this.getUserData(), function(i,line){
            var mapping = line.mapping;
            if(typeof mapping ==="undefined" || mapping ===null ){
                return;
            }
            $.each(mapping, function(i,varDecl){
                var name = varDecl.variable;
                if(typeof name !=="undefined" && name!==null && name !==""){
                    if(result.contains){
                        result.add(name);
                    }
                }
            });
        });
        
        return result;
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
        delete memento.cssClass;
        
        this._super(memento);

        this.validate();
    }
    

});
