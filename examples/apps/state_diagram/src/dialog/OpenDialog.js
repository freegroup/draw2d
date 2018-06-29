

example.dialog.OpenDialog = Class.extend({
    
    init:function(){
      
    },
    
    show: function(){
        app.getBackend().getDefinitions($.proxy(function(data){
            this.container = $('#myModal');
            var container = this.container;
            var _this = this;
            
            container.modal();
            $("#myModalLabel").text("Open Definition");

            var template ='<table class="table table-bordered  table-hover">{{#definitions}}<tr data-id="{{id}}"><td style="cursor:pointer">{{id}}</td></tr>{{/definitions}}</table>';
            var compiled = Hogan.compile(template);
            var output = compiled.render(data);
            container.find('.modal-body').html(output);
            
            template = '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button><button class="btn btn-primary">Load</button>';
            compiled = Hogan.compile(template);
            output = compiled.render(data);
            container.find('.modal-footer').html(output);
            
            container.find('.btn-primary').on('click', $.proxy(function(e) {
                e.preventDefault();
                var row = $(container.find("tr.success"));
                var id = row.data("id");
                _this._onOk(id);
            },this)).attr("disabled",true);
            
            container.find("tr").dblclick(function(){
                var row = $(this);
                var id = row.data("id");
                _this._onOk(id);
            });
            container.find("tr").click(function(){
                $this = $(this);
                $this.addClass('success').siblings().removeClass('success');
                container.find('.btn-primary').attr("disabled",false);
             });

        },this));
    },
    
    _onOk: function(id){
        this.container.modal('hide');
        app.loadDefinition(id);
    }
});