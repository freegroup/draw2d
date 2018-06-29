

example.dialog.AutoConnectDefaultEditorDialog = example.dialog.TemplateEditorDialog.extend({
    

    init:function(figure){
        this._super(figure.getUserData().defaultAnswer);
        
        this.figure = figure;
        this.header = "Edit Default Answer";
    },
    

    _autosuggestTrigger: function(){
        return "{{";
    },
    
    _wrapVariableForTemplateLanguage: function(variable){
        return "{{"+variable+"}}";
    },
    
 
    _onOk: function(value ){
        var existingData =this.figure.getUserData();
        var newData = {defaultAnswer: value};
        app.executeCommand( new example.command.CommandSetJSON(this.figure, existingData,  newData));

        $("#suggest").hide();
        this.container.modal('hide');
    }
    
});