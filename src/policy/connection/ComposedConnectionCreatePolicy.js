
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
     * @constructs
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
        let _arg = arguments;
        this.policies.forEach((p)=>{
            p.onMouseDown.apply(p,_arg);
        });
    },
    onMouseDrag: function()
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onMouseDrag.apply(p,_arg);
        });
    },

    onMouseUp: function()
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onMouseUp.apply(p,_arg);
        });
    },

    onClick: function()
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onClick.apply(p,_arg);
        });
    },
    onMouseMove: function()
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onMouseMove.apply(p,_arg);
        });
    },

    /**
     * @inheritDoc
     **/
    onKeyUp: function(canvas, keyCode, shiftKey, ctrlKey)
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onKeyUp.apply(p,_arg);
        });
    },

    /**
     * @inheritDoc
     **/
    onKeyDown: function(canvas, keyCode, shiftKey, ctrlKey)
    {
      let _arg = arguments;
      this.policies.forEach((p)=>{
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
      let _arg = arguments;
      this.policies.forEach((p)=>{
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
      let _arg = arguments;
      this.policies.forEach((p)=>{
            p.onUninstall.apply(p,_arg);
        });
    }

});

