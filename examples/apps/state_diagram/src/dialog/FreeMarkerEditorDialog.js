

example.dialog.FreeMarkerEditorDialog = example.dialog.TemplateEditorDialog.extend({
    

    init:function(figure, data){
        this._super(data.value);
        this.reg =  new RegExp("[$]{(.*?)}","g");
        this.figure = figure;
        this.data = data;
        this.header = "Message Template Editor";
    },
    

    _autosuggestTrigger: function(){
        return "${";
    },
    
    _wrapVariableForTemplateLanguage: function(variable){
        return "${"+variable+"}";
    },
    
    _updateHighlight:function(){
        var val = this.editor.val();

        // update highlighting of the keywords
        //
        var newText = val;
        var result;
        while ((result = this.reg.exec(val)) !== null) {
           var match = result[1];
           if($.inArray(match, this.variables)!=-1){
               newText = newText.replace(result[0],"<b class='g1'>"+result[0]+"</b>");
           }
           else{
              newText = newText.replace(result[0],"<b class='err'>"+result[0]+"</b>");
           }
        }
        this.highlight.html(newText);
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
    
    _onOk: function(value ){
        var cmd = new example.command.CommandSetJSON(this.figure, this.data, {value:value});
        app.executeCommand(cmd);

        $("#suggest").hide();
        this.container.modal('hide');
    }
    
    
});