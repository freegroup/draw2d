
/**
 * @class draw2d.policy.EditPolicy
 *
 * A plugable contribution implementing a portion of an behavior.
 *
 *
 * EditPolicies should determine an Canvas or figure editing capabilities. It is possible to implement
 * an figure such that it handles all editing responsibility. However, it is much more flexible
 * and object-oriented to use EditPolicies. Using policies, you can pick and choose the editing
 * behavior for an figure/canvas without being bound to its class hierarchy. Code management is easier.
 *
 *
 * This interface is not intended to be implemented by clients. Clients should inherit from {@link draw2d.policy.figure.SelectionFeedbackPolicy}
 * or {@link draw2d.policy.canvas.SelectionPolicy}.
 *
 * @author Andreas Herz
 */
import draw2d from '../packages';
import extend from '../util/extend';
import isPlainObject from '../util/isPlainObject';

draw2d.policy.EditPolicy = Class.extend({

    NAME : "draw2d.policy.EditPolicy",

    /**
     * @constructor
     *
     */
    init: function( attr, setter, getter){
        this.setterWhitelist = extend({
        },setter);

        this.getterWhitelist = extend({
        },getter);

        this.attr(attr);
    },

    /**
     * @method
     * Read or set object attributes.<br>
     * When no value is given, reads specified attribute from the element.<br>
     * When value is given, sets the attribute to that value.
     * Multiple attributes can be set by passing an object with name-value pairs.
     *
     * @param {String/Object} name
     * @param {Object} [value]
     * @since 5.3.2
     * @returns
     **/
    attr: function(name, value)
    {
        // call of attr as setter method with {name1:val1, name2:val2 }  argument list
        //
        if(isPlainObject(name)){
            for(let key in name){
                let func=this.setterWhitelist[key];
                // call the assigned method if given
                if(func){
                    func.call(this,name[key]);
                }
                // maby the ussser adds a function as property to the attr call
                // e.g.:
                // {
                //     doIt: function(){}
                // }
                //
                // in this case we assign the method to this object and wrap it with "this" as context
                // a very, very simple method to replace default implemenations of the object
                else if(typeof name[key]==="function"){
                    this[key] = name[key].bind(this);
                }
            }
        }
        else if(typeof name === "string"){
            // call attr as getter
            //
            if(typeof value ==="undefined"){
                var getter = this.getterWhitelist[name];
                if(typeof getter ==="function"){
                    return getter.call(this);
                }
                return; // undefined
            }
            // call attr as simple setter with (key , value)
            //

            // the value can be a function. In this case we must call the value().
            if(typeof value ==="function"){
                value = value();
            }
            var setter = this.setterWhitelist[name];
            if (setter){setter.call(this,value);}
        }
        // generic getter of all registered attributes
        else if(typeof name === "undefined"){
        	var result = {};
        	for(key in this.getterWhitelist){
         		result[key] = this.getterWhitelist[key].call(this);
        	}
        	return result;
        }

        return this;
    },

    /**
     * @method
     * Called by the host if the policy has been installed.
     *
     * @param {draw2d.Canvas|draw2d.Figure} host
     */
    onInstall: function( host)
    {
    },

    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     *
     * @param {draw2d.Canvas|draw2d.Figure} host
     */
    onUninstall: function( host)
    {
    }
});
