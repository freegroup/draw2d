/**
 * @class draw2d.ui.LabelInplaceEditor
 *
 * Inplace editor for draw2d.shape.base.Label
 *
 *     @example preview small frame
 *
 *     var label =  new draw2d.shape.basic.Label({text:"Double Click on me"});
 *
 *     label.installEditor(new draw2d.ui.LabelInplaceEditor({
 *        // called after the value has been set to the LabelFigure
 *        onCommit: $.proxy(function(value){
 *            alert("new value set to:"+value);
 *        },this),
 *        // called if the user abort the operation
 *        onCancel: function(){
 *        }
 *     }));
 *
 *     canvas.add(label,50,10);
 *
 * @author Andreas Herz
 * @extends draw2d.ui.LabelEditor
*/
import draw2d from '../packages';


import r from "lib/jquery.autoresize";

draw2d.ui.LabelInplaceEditor =  draw2d.ui.LabelEditor.extend({

    NAME: "draw2d.ui.LabelInplaceEditor",

    /**
     * @constructor
     * @private
     */
    init: function(listener)
    {
        this._super();

        // register some default listener and override this with the handover one
        this.listener = extend({
          onCommit: function(){},
          onCancel: function(){},
          onStart: function(){}
          },listener);
    },

    /**
     * @method
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function( label)
    {
        this.label = label;

        this.commitCallback = this.commit.bind(this);

        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click",this.commitCallback);

        // append the input field to the document and register
        // the ENTER and ESC key to commit /cancel the operation
        //
        this.html = $('<input id="inplaceeditor">');
        this.html.val(label.getText());
        this.html.hide();

        $("body").append(this.html);

        this.html.autoResize();

        this.html.bind("keyup",function(e){
            switch (e.which) {
            case 13:
                 this.commit();
                 break;
            case 27:
                this.cancel();
                 break;
           }
         }.bind(this));

         this.html.bind("blur",this.commitCallback);

         // avoid commit of the operation if we click inside the editor
         //
         this.html.bind("click",function(e){
             e.stopPropagation();
             e.preventDefault();
         });

        // Position the INPUT and init the autoresize of the element
        //
        var canvas = this.label.getCanvas();
        var bb = this.label.getBoundingBox();

        bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x,bb.y));

        // remove the scroll from the body if we add the canvas directly into the body
        var scrollDiv = canvas.getScrollArea();
        if(scrollDiv.is($("body"))){
           bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
        }

        bb.translate(-1,-1);
        bb.resize(2,2);

        this.html.css({position:"absolute","top": bb.y, "left":bb.x, "min-width":bb.w*(1/canvas.getZoom()), "height":Math.max(25,bb.h*(1/canvas.getZoom()))});
        this.html.fadeIn(()=>{
            this.html.focus();
            this.listener.onStart()
        });
    },

    /**
     * @method
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     *
     * @private
     */
    commit: function()
    {
        this.html.unbind("blur",this.commitCallback);
        $("body").unbind("click",this.commitCallback);
        var label = this.html.val();
        var cmd =new draw2d.command.CommandAttr(this.label, {text:label});
        this.label.getCanvas().getCommandStack().execute(cmd);
        this.html.fadeOut(()=>{
            this.html.remove();
            this.html = null;
            this.listener.onCommit(this.label.getText());
        });
    },

    /**
     * @method
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     * @private
     */
    cancel: function()
    {
        this.html.unbind("blur",this.commitCallback);
        $("body").unbind("click",this.commitCallback);
        this.html.fadeOut(()=>{
            this.html.remove();
            this.html = null;
            this.listener.onCancel();
        });

    }
});

