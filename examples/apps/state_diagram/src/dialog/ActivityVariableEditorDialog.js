

example.dialog.ActivityVariableEditorDialog = example.dialog.TemplateEditorDialog.extend({
    

    init:function(figure, data){
        this._super(data.value);
        
        this.figure = figure;
        this.data = data;
        this.header = "Edit Activity Parameter";
    },
    

    _autosuggestTrigger: function(){
        return "{{";
    },
    
    _wrapVariableForTemplateLanguage: function(variable){
        return "{{"+variable+"}}";
    },
    
 
    _onOk: function(value ){
        var cmd = new example.command.CommandSetJSON(this.figure, this.data, {value:value});
        app.executeCommand(cmd);

        $("#suggest").hide();
        this.container.modal('hide');
    }
    
});