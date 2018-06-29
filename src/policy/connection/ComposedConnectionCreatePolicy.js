
/**
 * @class draw2d.policy.connection.ComposedConnectionCreatePolicy
 * A composed connection create policy. Use this to install more than one
 * ConnectionCreatePolicy into the canvas. Normally it is not allowed to install
 * more than one policy from the same type.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.connection.ConnectionCreatePolicy
 */
import draw2d from '../../packages';

draw2d.policy.connection.ComposedConnectionCreatePolicy = draw2d.policy.connection.ConnectionCreatePolicy.extend({

    NAME : "draw2d.policy.connection.ComposedConnectionCreatePolicy",

    /**
     * @constructor
     *
     * Creates a new connection create policy instance
     *
     * @param {array} policies the policies to use
     */
    init: function( policies )
    {
        this.policies = policies;
        this._super();
    },

    onMouseDown: function()
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onMouseDown.apply(p,_arg);
        });
    },
    onMouseDrag: function()
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onMouseDrag.apply(p,_arg);
        });
    },

    onMouseUp: function()
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onMouseUp.apply(p,_arg);
        });
    },

    onClick: function()
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onClick.apply(p,_arg);
        });
    },
    onMouseMove: function()
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onMouseMove.apply(p,_arg);
        });
    },

    /**
     * @inheritDoc
     **/
    onKeyUp: function(canvas, keyCode, shiftKey, ctrlKey)
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onKeyUp.apply(p,_arg);
        });
    },

    /**
     * @inheritDoc
     **/
    onKeyDown: function(canvas, keyCode, shiftKey, ctrlKey)
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onKeyDown.apply(p,_arg);
        });
    },

    /**
     * @method
     * Called if the policy is installed into the canvas.
     *
     * @param {draw2d.Canvas} canvas
     */
    onInstall: function(canvas)
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onInstall.apply(p,_arg);
        });
    },

    /**
     * @method
     * Called if the policy is deinstalled from the canvas
     *
     * @param {draw2d.Canvas} canvas
     */
    onUninstall: function(canvas)
    {
        var _arg = arguments;
        $.each(this.policies, function(i,p){
            p.onUninstall.apply(p,_arg);
        });
    }

});

