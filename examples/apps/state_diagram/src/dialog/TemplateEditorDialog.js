

example.dialog.TemplateEditorDialog = Class.extend({
    

    init:function( currentValue){
      if(typeof currentValue ==="undefined"){
          currentValue = "";
      }
      this.currentValue = currentValue;  
      this.suggestIsVisible = false;
      this.header = "Edit action input parameter";
    },
    
    show: function(){
        this._getSuggestions($.proxy(function(suggestions){

            this.suggestions = suggestions;
            
            this.container = $('#myModal');
            var container = this.container;
            container.on('shown', $.proxy(function () {
                $("#suggest").hide();
                this._updateEditor();
                this.editor.focus();
//                this.editor.caretPosition(this.editor.val().length);
                this.editor.on('click',   $.proxy(this._updateEditor,this));
                this.editor.on('keydown', $.proxy(this._updateEditor,this));
                this.editor.on('keyup',   $.proxy(this._updateEditor,this));
                
            },this));

            container.on('hidden', $.proxy(function () {
                $("#suggest").remove();
                container.find('.modal-footer').html("");
                container.find('.modal-body').html("");
            },this));
            
            $("#myModalLabel").text(this.header);

            // Regular expression editor with syntax highlighter.
            //
            var template ='<div>Editor</div>'+
                          '<div class="variable_container">'+
                          '   <pre      class="variable_color regex"></pre>'+
                          '   <pre      class="variable_cursor regex"></pre>'+
                          '   <textarea class="variable_editor" spellcheck="false">{{value}}</textarea>'+
                          '</div>';

            var compiled = Hogan.compile(template);
            var output   = $(compiled.render({value:this.currentValue}));
            container.find('.modal-body').html(output);
            this.editor = container.find('.variable_editor');
            this.highlight    = container.find('.variable_color');
            this.cursor   = container.find('.variable_cursor');

            var suggest=$('<ul id="suggest" class="dropdown-menu" style="display:none"></ul>');
            container.append(suggest);
           
            // Button Bar with SAVE / CANCEL buttons
            //
            template = '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button><button class="btn btn-primary">Save</button>';
            container.find('.modal-footer').html(template);
            
            container.find('.btn-primary').on('click', $.proxy(function(e) {
                e.preventDefault();
                this._onOk(this.editor.val());
            },this));
            
            container.modal();

        },this));
    },
    
    _getSuggestions: function(callback){
        app.getBackend().getPrerequisitVariables($.proxy(function(variables){
    
            this.variables = $.merge([],variables); // simple copy
            app.getView().getLines().each($.proxy(function(i,line){
                this.variables = $.merge(this.variables,line.getVariables().asArray());
            },this));
    
            var suggestions = [];
            $.each(this.variables, $.proxy(function(i,e){
                suggestions.push(this._wrapVariableForTemplateLanguage(e));
            },this));
            
            callback(suggestions);
        },this));
    },
    
    _wrapVariableForTemplateLanguage: function(variable){
        return variable;
    },
    
    _onOk: function(value){
        alert("inherit classes must implement the Method 'example.dialog.TemplateEditorDialog#_onOk'");
    },
    
    _updateEditor: function(){
        try{
            var val = this.editor.val();
            var pos = this.editor.caretPosition();

            // update cursor
            //
            var substring = val.substring(0,pos);
            this.cursor.html(substring+"<span id='cursorPos' style='color: black;font-weight: 200;'>&#124;</span>");
            $("#cursorPos").pulse({color : 'white'}, {duration:1500, pulses : -1 });
            
            // update highlighting of the keywords
            //
            this._updateHighlight();
            
            // decide to open a autocomplete dialog
            //
            var firstPart = val.substring(0,pos);
            var secondPart = val.substring(pos);
            var lastWord = this._autosuggestTrigger()+firstPart.split(this._autosuggestTrigger()).pop();
            var menu =$("#suggest");
            if(lastWord.length>1 && (secondPart.length===0 || new RegExp("^ .*").test(secondPart))){
                var showList = $.grep(this.suggestions, function(e){return e.indexOf(lastWord)===0;});
                menu.html("");
                if(showList.length>0){
                    var cursor = $("#cursorPos");
                    var dialogPos = $("#myModal").offset();
                    var cursorPos = cursor.offset();    
                    $.each(showList, $.proxy(function(i,e){
                        var item = $("<li><a href='#'>"+e+"</a></li>");
                        item.on("click",$.proxy(function(){
                            firstPart = firstPart.substring(0,firstPart.length-lastWord.length);
                            this.editor.val(firstPart+e+secondPart);
                            menu.hide();
                            this.editor.focus();
                            this.editor.caretPosition((firstPart+e).length);
                            this._updateEditor();
                        },this));
                        menu.append(item);
                    },this));

                    //get the position of the placeholder element  
                    var eWidth  = cursor.outerWidth();
                    var eHeight = cursor.outerHeight();
                    var left = (cursorPos.left + eWidth - dialogPos.left -menu.outerWidth()/2) + "px";
                    var top  = (3+cursorPos.top - dialogPos.top + eHeight) + "px";
                    //show the menu directly over the placeholder  
                    menu.css( { 
                        position: 'absolute',
                        zIndex: 5000,
                        left: left, 
                        top: top
                    } );
                    if(this.suggestIsVisible === false){
                        menu.fadeIn();
                        this.suggestIsVisible = true;
                    }
                }
                else{
                    menu.hide();
                    this.suggestIsVisible = false;
                }
            }
            else{
                menu.hide();
                this.suggestIsVisible = false;
            }
 
        }
        catch(exc){
            console.log(exc);
        }
    },
    
    _updateHighlight:function(){
        var val = this.editor.val();

        // update highlighting of the keywords
        //
        var newText = val;
        reg = new RegExp("{{(.*?)}}","g");
        var result;
        while ((result = reg.exec(val)) !== null) {
           var match = result[1];
           if($.inArray(match, this.variables)!=-1){
               newText = newText.replace(new RegExp(result[0], 'g'),"<b class='g1'>"+result[0]+"</b>");
           }
           else{
              newText = newText.replace(new RegExp(result[0], 'g'),"<b class='err'>"+result[0]+"</b>");
           }
        }
        this.highlight.html(newText);
    }
});
