

example.backend.Backend = Class.extend({
	
    definitions : [{
                    name:"DefName01",
                    id:"id01",
                    content:[{"type":"draw2d.shape.state.Start","id":"98fcbeb5-3c72-af82-41e4-7f9bd73660c5","x":63,"y":73,"width":50,"height":50,"userData":null},{"type":"draw2d.shape.state.End","id":"174353d9-f4c6-617d-29d0-aa10601b2d07","x":252,"y":175,"width":50,"height":50,"userData":null},{"type":"draw2d.shape.state.Connection","id":"0c1c81f8-6e35-2a94-f186-b964528fac13","userData":null,"cssClass":"stroke","stroke":2,"color":"#1B1B1B","source":{"node":"98fcbeb5-3c72-af82-41e4-7f9bd73660c5","port":"output0"},"target":{"node":"174353d9-f4c6-617d-29d0-aa10601b2d07","port":"input0"},"router":"draw2d.layout.connection.FanConnectionRouter","label":"label"}]
                 },
                 {
                     name:"DefName02",
                     id:"id02",
                     content:[]
                  }
                ],
    
	init:function(){
      
	},
	
	getActivities: function(successCallback){
		successCallback( [
	            { id:"ReloadDefinitions",
	              parameters:[]
	            }
	           ]);
	},
	
    getPrerequisitVariables: function(successCallback){
        successCallback( [ "currentUser" ]);
    },
    	
    /**
     * @method
     * Called if the selection in the canvas has been changed. You must register this
     * class on the canvas to receive this event.
     * 
     * @param {draw2d.Figure} figure
     */
    getDefinitions : function(successCallback, errorCallback){
        successCallback({ definitions:this.definitions });
    },
    
    create: function(definitionId, successCallback, errorCallback){
        this.definitions = $.grep(this.definitions, function(e){ return e.id !== definitionId; });
        var newDef = {name:definitionId, id:definitionId, content:[]};
        
        result.push(newDef);
        successCallback(newDef.content);
    }, 

    del: function(definitionId, successCallback, errorCallback){
        this.definitions = $.grep(this.definitions, function(e){ return e.id !== definitionId; });
        successCallback();
    }, 
    
    
    save: function(definitionId, content, successCallback, errorCallback){
        var result = $.grep(this.definitions, function(e){ return e.id == definitionId; });
        if (result.length == 0) {
            result.push({name:definitionId, id:definitionId, content:content});
        } else if (result.length == 1) {
            result[0].content = content;
            successCallback();
        } 
    },
    
    load:  function(definitionId, successCallback, errorCallback){
        var result = $.grep(this.definitions, function(e){ return e.id == definitionId; });
        if (result.length == 0) {
            // not found
        } else if (result.length == 1) {
            successCallback(result[0].content );
        } 
       
    }
    
});

