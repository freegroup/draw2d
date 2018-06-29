

example.dialog.SaveAsDialog = Class.extend({
    
    init:function(){
      
    },
    
    show: function(){
        app.getBackend().getDefinitions($.proxy(function(data){
            this.container = $('#myModal');
            var container = this.container;
            var _this = this;
            
            container.modal();
            $("#myModalLabel").text("Create new definition");

            // Form part
            //
            var template =
                        '<form>'+
                        '  <label>Save As..</label>'+
                        '  <input type="text" value="{{name}}">'+
                        '</form>';
            var compiled = Hogan.compile(template);
            var output = $(compiled.render(data));
            container.find('.modal-body').html(output);
            var input = output.find("input");
            input.on("keyup", function(){
                container.find('.btn-primary').attr("disabled",input.val().length===0);
            });
            output.submit(function(e){
                return false;
            });
            
            // button bar
            //
            template = '<button class="btn" data-dismiss="modal" aria-hidden="true">Abort</button><button class="btn btn-primary">Save</button>';
            compiled = Hogan.compile(template);
            output = compiled.render(data);
            container.find('.modal-footer').html(output);
            container.find('.btn-primary').on('click', $.proxy(function(e) {
                e.preventDefault();
                var row = $(container.find("tr.success"));
                var id = input.val();
                _this._onOk(id);
            },this)).attr("disabled",true);
            

        },this));
    },
    
    _onOk: function(id){
        this.container.modal('hide');
        app.saveAsDefinition(id);
    }
});