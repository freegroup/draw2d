// Databinding: The backbone view with callback method to sync the Draw2D model with the
//              backbone world.
//
var OpAmpBackboneView = Backbone.View.extend({
    _modelBinder: undefined,
    
    initialize:function () {
        this._modelBinder = new Backbone.ModelBinder();

        // We create a faked Backbone.Model object for the ModelBinder
        // Now we behaves like a Backbone.Model but we aren't a Backbone.Model
        //
        this.model.get = this.model.attr;
        this.model.set = $.proxy(function(model,changes){
                this.model.attr(model);
        },this);
        this.model.changedAttributes=function(){return {x:0,y:0};};
        
    },
    
    close: function(){
        this._modelBinder.unbind();

        delete this.model.get;
        delete this.model.set;
        delete this.model.changedAttributes;
    },
    
   render:function () {
        var html = 
            '<div id="property_position_container" class="panel panel-default">'+
            ' <div class="panel-heading" >'+
            '     Position'+
            '</div>'+
            ' <div class="panel-body" id="position_panel">'+
            '   <div class="form-group">'+
            '       x <input id="property_position_x" type="text" class="form-control" name="x" /><br>'+
            '       y <input id="property_position_y" type="text" class="form-control" name="y" />'+
            '   </div>'+
            ' </div>'+
            '</div>'+
            
            '<div id="property_position_container" class="panel panel-default">'+
            ' <div class="panel-heading" >'+
            '     User Property'+
            '</div>'+
            ' <div class="panel-body" id="userdata_panel">'+
            '   <div class="form-group">'+
            '       <div class="input-group" ></div> '+ 
            '       Type <input id="property_name" type="text" class="form-control" name="userData.name"/>'+
            '   </div>'+
            ' </div>'+
            '</div>';
        this.$el.html(html);
        this._modelBinder.bind(this.model, this.el);
        return this;
     }
});