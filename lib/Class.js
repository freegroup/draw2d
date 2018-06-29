/* 
 * Simple JavaScript Inheritance 
 * By John Resig http://ejohn.org/ 
 * MIT Licensed. 
 * 
 ****************************************************** 
 * Example Usage 
 ****************************************************** 
 var Person = Class.extend({ 
  init: function(isDancing){ 
    this.dancing = isDancing; 
  }, 
  dance: function(){ 
    return this.dancing; 
  } 
}); 

var Ninja = Person.extend({ 
  init: function(){ 
    this._super( false ); 
  }, 
  dance: function(){ 
    // Call the inherited version of dance() 
    return this._super(); 
  }, 
  swingSword: function(){ 
    return true; 
  } 
}); 

var p = new Person(true); 
p.dance(); // => true 

var n = new Ninja(); 
n.dance(); // => false 
n.swingSword(); // => true 

// Should all be true 
p instanceof Person && p instanceof Class && 
n instanceof Ninja && n instanceof Person && n instanceof Class 

 ****************************************************** 
 */ 
  
// Inspired by base2 and Prototype 
(function(){ 
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/; 

  // The base Class implementation (does nothing) 
  this.Class = function(){}; 
  

  // Create a new Class that inherits from this class 
  Class.extend = function(prop) { 
    var _super = this.prototype; 
    
    // Instantiate a base class (but only create the instance, 
    // don't run the init constructor) 
    initializing = true; 
    var prototype = new this(); 
    initializing = false; 
    
     
    // Copy the properties over onto the new prototype 
    for (var name in prop) { 
      // Check if we're overwriting an existing function 
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ? 
        (function(name, fn){ 
          return function() { 
            var tmp = this._super; 
            
            // Add a new ._super() method that is the same method 
            // but on the super-class 
            this._super = _super[name]; 
            
            // The method only need to be bound temporarily, so we 
            // remove it when we're done executing 
            var ret = fn.apply(this, arguments);        
            this._super = tmp; 
            
            return ret; 
          }; 
        })(name, prop[name]) : 
        prop[name]; 
    } 
    
    // The dummy class constructor 
    function Class() { 
      // All construction is actually done in the init method 
      if ( !initializing && this.init ) 
        this.init.apply(this, arguments); 
    } 
    
    // Populate our constructed prototype object 
    Class.prototype = prototype; 
    
    // Enforce the constructor to be what we expect 
    Class.prototype.constructor = Class; 

    // And make this class extendable 
    Class.extend = arguments.callee; 
    
    // EXTENSION BY Draw2D.org to inject methods into an existing class to provide plugins or 
    // bugfixes for further releases 
    // 
    Class.inject = function (prop) { 
        var proto = this.prototype; 
        var parent = {}; 
        for (var name in prop) { 
            if (typeof (prop[name]) == "function" && typeof (proto[name]) == "function" && fnTest.test(prop[name])) { 
                parent[name] = proto[name]; 
                proto[name] = (function (name, fn) { 
                    return function () { 
                        var tmp = this.parent; 
                        this.parent = parent[name]; 
                        var ret = fn.apply(this, arguments); 
                        this.parent = tmp; 
                        return ret; 
                    }; 
                })(name, prop[name]); 
            } else { 
                proto[name] = prop[name]; 
            } 
        } 
    }; 
     
    return Class; 
  }; 
})();
 
 