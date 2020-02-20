import draw2d from '../packages'


/**
 * @class
 *
 * Base class for all draw2d.shape.basic.Label editors. The default implementation is to open
 * a simple javascript prompt dialog.<br>
 * Use LabelInplaceEditor or your own implementation if you need more comfort.
 *
 * @example
 *
 *    var label =  new draw2d.shape.basic.Label({text:"Double Click on me"});
 *
 *    label.installEditor(new draw2d.ui.LabelEditor({
 *       // called after the value has been set to the LabelFigure
 *       onCommit: $.proxy(function(value){
 *           alert("new value set to:"+value);
 *       },this),
 *       // called if the user abort the operation
 *       onCancel: function(){
 *       }
 *    }));
 *
 *    canvas.add(label,50,10);
 *
 *
 * @author Andreas Herz
 */
draw2d.ui.LabelEditor = Class.extend(
    /** @lends draw2d.ui.LabelEditor.prototype */
    {
    
    NAME: "draw2d.ui.LabelEditor",

    init: function(listener)
    {
        // register some default listener and override this with the handover one
        this.configuration = extend({
            onCommit: function(){},
            onCancel: function(){},
            onStart: function(){},
            text:"Value"
          },
          listener);
     },

    /**
     * 
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function( label)
    {
        this.configuration.onStart()
        var newText = prompt(this.configuration.text, label.getText());
        if(newText){
            var cmd =new draw2d.command.CommandAttr(label, {text:newText});
            label.getCanvas().getCommandStack().execute(cmd);

            this.configuration.onCommit(label.getText());
        }
        else{
            this.configuration.onCancel();
        }
    }

});
