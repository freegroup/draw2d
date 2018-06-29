"use strict";

d2.directive("draw2dCanvas", ["$window","$parse", "$timeout", function($window,$parse, $timeout){

       return {
    		   restrict: 'E,A',
   	           link: function(scope, element, attrs,controller) {

   	                // provide the scope properties and override the defaults with the user settings
   	                //
	   	            scope.editor= $.extend(true,{
	   	        	    canvas: {
	   	        	    	width : 2000,
    	                    height: 2000,
	   	        	    	onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey){}
	   	        	    },
	   	        	    palette:{
	   	        	    	figures: []
	   	        	    },
	   	            	state:{
	   	            		dirty  : false,
		                	canUndo: false,
		                	canRedo: false
	   	            	},
	   	            	selection:{
	   	            		className:null,
	   	            		figure:null,
	   	            		attr:null
	   	            	}
	   	            	
	   	           }, scope.editor);
   	        	    
	   	           // init the Draw2D Canvas with the given user settings and overriden hooks
	   	           //
	   	           var canvas = new draw2d.Canvas(element.attr("id"), scope.editor.canvas.width, scope.editor.canvas.height);
   	               canvas.setScrollArea("#"+element.attr("id"));
    	           canvas.onDrop = $.proxy(scope.editor.canvas.onDrop, canvas);

    	           // update the scope model with the current state of the
    	           // CommandStack
    	           var stack = canvas.getCommandStack();
    	           stack.addEventListener(function(event){
    	               $timeout(function(){
    	                   scope.editor.state.canUndo= stack.canUndo();
    	                   scope.editor.state.canRedo= stack.canRedo();
    	               },0);
    	           });
    	           
    	           // Update the selection in the model
    	           // and Databinding Draw2D -> Angular
    	           var changeCallback = function(emitter, attribute){
    	        	   $timeout(function(){
    	        		   if(scope.editor.selection.attr!==null){
    	        			   scope.editor.selection.attr[attribute]= emitter.attr(attribute);
    	        		   }
    	               },0);
    	           };
    	           canvas.on("select", function(canvas,figure){
    	               $timeout(function(){
    	            	   if(figure!==null){
    	            		   scope.editor.selection.className = figure.NAME;
    	            		   scope.editor.selection.attr = figure.attr();
    	            	   }
    	            	   else {
    	            		   scope.editor.selection.className = null;
    	            		   scope.editor.selection.attr = null;
    	            	   }
    	            	   
    	            	   // unregister and register the attr listener to the new figure
    	            	   //
    	            	   if(scope.editor.selection.figure!==null){scope.editor.selection.figure.off("change",changeCallback);}
    	            	   scope.editor.selection.figure = figure;
    	            	   if(scope.editor.selection.figure!==null){scope.editor.selection.figure.on("change",changeCallback);}
    	               },0);
    	           });

    	           // Databinding: Angular UI -> Draw2D
    	           // it is neccessary to call the related setter of the draw2d object. "Normal" Angular 
    	           // Databinding didn't work for draw2d yet
    	           //
	               scope.$watchCollection("editor.selection.attr", function(newValues, oldValues){
    	        	   
    	               if(oldValues !== null && scope.editor.selection.figure!=null){
    	            	   // for performance reason we post only changed attributes to the draw2d figure
    	            	   //
    	            	   var changes = draw2d.util.JSON.diff(newValues, oldValues);
   	            		   scope.editor.selection.figure.attr(changes); 
    	               }
    	           });
    	           
	               // push the canvas function to the scope for ng-action access
	               //
    	           scope.editor.undo = $.proxy(stack.undo,stack);
    	           scope.editor.redo = $.proxy(stack.redo,stack);
    	           scope.editor["delete"] = $.proxy(function(){
    	   			  var node = this.getCurrentSelection();
    				  var command= new draw2d.command.CommandDelete(node);
    				  this.getCommandStack().execute(command);
    	           },canvas);
                   scope.editor.load = $.proxy(function(json){
                       canvas.clear();
                       var reader = new draw2d.io.json.Reader();
                       reader.unmarshal(canvas, json);
                   },canvas);
    	       }
      };
}]);

  