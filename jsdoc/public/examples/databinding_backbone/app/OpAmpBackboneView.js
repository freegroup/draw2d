// Databinding: The backbone view with callback method to sync the Draw2D model with the
//              backbone world.
//
var OpAmpBackboneView = Backbone.View.extend({
    initialize:function () {
        this.model.on('change:x', $.proxy(this.renderX,this));
        this.model.on('change:y', $.proxy(this.renderY,this));
    },
    events:{
        'keyup #property_position_x': 'updateX',
        'keyup #property_position_y': 'updateY',
        'keyup #property_name':       'updateName'
    },
    close: function(){
        this.model.off(this.renderX);
        this.model.off(this.renderY);
    },
    
    renderX: function() {
       this.$('#property_position_x').val(this.model.attr('x'));
    },
    updateX: function(newX) {
        this.model.attr("x",parseFloat(this.$('#property_position_x').val()));
    },
    
    renderY: function() {
        this.$('#property_position_y').val(this.model.attr('y'));
    },
    updateY: function(newX) {
         this.model.attr("y",parseFloat(this.$('#property_position_y').val()));
    },
   
    updateName: function(newX) {
        this.model.getUserData().name=this.$('#property_name').val();
    },
   
   render:function () {
        var html = _.template(
            '<div id="property_position_container" class="panel panel-default">'+
            ' <div class="panel-heading " >'+
            '     Position'+
            '</div>'+
            ' <div class="panel-body" id="position_panel">'+
            '   <div class="form-group">'+
            '       x <input id="property_position_x" type="text" class="form-control" value="<%= figure.attr("x") %>"/><br>'+
            '       y <input id="property_position_y" type="text" class="form-control" value="<%= figure.attr("y") %>"/>'+
            '   </div>'+
            ' </div>'+
            '</div>'+
            
            '<div id="property_position_container" class="panel panel-default">'+
            ' <div class="panel-heading " >'+
            '     User Property'+
            '</div>'+
            ' <div class="panel-body" id="userdata_panel">'+
            '   <div class="form-group">'+
            '       <div class="input-group" ></div> '+ 
            '       Type <input id="property_name" type="text" class="form-control" value="<%= figure.getUserData().name %>"/>'+
            '   </div>'+
            ' </div>'+
            '</div>', 
            {figure:this.model});
        this.$el.html(html);
        return this;
     }
});