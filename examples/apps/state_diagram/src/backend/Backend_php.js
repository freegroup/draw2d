

example.backend.Backend = Class.extend({
	
    definitions : {},
    
	init:function(){
      
	},
	
    /**
     * @method
     * Called if the selection in the canvas has been changed. You must register this
     * class on the canvas to receive this event.
     * 
     * @param {draw2d.Figure} figure
     */
    getDefinitions : function(successCallback, errorCallback){
        $.getJSON( "backend/php/getFiles.php" , function(data){
            successCallback(data);
        });
    },
   
    getPrerequisitVariables: function(successCallback){
        successCallback( ["activityResult", "currentUser", "selectedIntent", "selectedIntents", "selectedUser" ]);
    },
        
	getActivities: function(successCallback){
		successCallback( [
		  	            { id:"NOP",
		  	              parameters: {input:[], 
		  	            	           output:[]}
		  	            },
                        { id:"ReloadDefinitions",
	                      parameters: {input:[], 
	                    	           output:[]}
	                    },
                        { id:"SendSMS",
	                      parameters:{input: [{parameterName:"userToContact"},
	                                          {parameterName:"messageToSend"}],
	                    	          output:[]
	                      }
	                    },
                        { id:"SendEmail",
	                      parameters:{input: [{parameterName:"userToContact"},
	                                          {parameterName:"messageSubject"},
	                                          {parameterName:"messageBody"}],
	                    	          output:[]
	                      }
	                    },
	                    { id:"PoiCount",
	                      parameters:{input: [{parameterName:"requestedDay"}],
	                    	          output:[]
	                      }
	                    },
                        { id:"TextResponse_FreeMarker",
	                          parameters:{input: [{parameterName:"messageTemplate"}],
	                                      output:[]
	                          }
	                    },
			            { id:"IntentDeleteFromList",
				  	      parameters:{input: [{parameterName:"indexOfIntent"}],
	                    	          output:[]
	                      }
   		                },
   		                { id:"IntentDelete",
  				  	      parameters:{input: [],
  	                    	          output:[]
  	                      }
     		            },
			            { id:"IntentRequestForDay",
			  	          parameters:{input: [{parameterName:"requestedDayStart"},
			  	                              {parameterName:"requestedDayEnd"},
			  	                              {parameterName:"maxResultSize"}],
	                    	          output:[]
	                      }
   		                }
	           ]);
	},

	getCompareOperations: function(successCallback){
		successCallback( [
		  	            { name:"IsTrue",
		  	              unary: true
		  	            }, 
		  	            { name:"IsFalse",
                          unary: true
                        }, 
                        { name:"IsNotNull",
	                      unary: true
	                    }, 
		  	            { name:"IsNull",
		  	              unary: true
		  	            }
	           ]);
	},

    create: function(definitionId, successCallback, errorCallback){
        $.post("backend/php/createFile.php",  { 
            id: definitionId
        }).done(function(data) {
            successCallback(data);
        });
    }, 
    
    del: function(definitionId, successCallback, errorCallback){
        $.post("backend/php/deleteFile.php",  { 
            id: definitionId
        }).done(function(data) {
            successCallback(data);
        });
    }, 
        
    save: function(definitionId, content, successCallback, errorCallback){
        $.post("backend/php/saveFile.php",  { 
            id: definitionId,
            content: JSON.stringify(content,null,2)
        }).done(function(data) {
            successCallback();
        });
    },
    
    load:  function(definitionId, successCallback, errorCallback){
        $.getJSON( "backend/php/getFile.php?id="+definitionId , function(data){
            successCallback(data);
        });
    }
    
});

