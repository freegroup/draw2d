// declare the namespace for this example
var example = {};

/**
 * 
 *
 * @author Andreas Herz
 */
example.Application = Class.extend({
    NAME : "example.Application",

    /**
     * @constructor
     * 
     */
    init : function() 
    {
        this.view = new example.Canvas("canvas");
        this.toolbar = new example.Toolbar("toolbar", this.view);
        this.properties = new example.PropertyPane("properties", this.view);
        
        // Databinding: create an adapter for the rivetsJS<-->draw2d model
        //
        rivets.adapters[':'] = {
                  observe: function(obj, keypath, callback) {
                    obj.on('change:'+keypath, callback);
                  },
                  unobserve: function(obj, keypath, callback) {
                    obj.off( callback);
                  },
                  get: function(obj, keypath) {
                    return obj.attr(keypath);
                  },
                  set: function(obj, keypath, value) {
                    obj.attr(keypath, value);
                  }
                };
                
    }

});
