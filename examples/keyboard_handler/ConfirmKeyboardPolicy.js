

var ConfirmKeyboardPolicy = draw2d.policy.canvas.DefaultKeyboardPolicy.extend({

    NAME : "ConfirmKeyboardPolicy",
    
    /**
     * @constructor 
     */
    init: function(){
        this._super();
    },
    
    /**
     * @inheritdoc
     **/
    onKeyDown:function(canvas, keyCode, shiftKey, ctrlKey){
        //
        
        if(keyCode===46 && canvas.getPrimarySelection()!==null){
            var count = canvas.getSelection().getSize();
            if(count>0 && confirm("Delete the "+count+" shape(s)?")){
                this._super(canvas, keyCode, shiftKey, ctrlKey);
            }
        }
        else{
            this._super(canvas, keyCode, shiftKey, ctrlKey);
         }
        
    }


});
