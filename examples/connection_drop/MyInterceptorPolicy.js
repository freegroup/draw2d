
var MyInterceptorPolicy = draw2d.policy.canvas.DropInterceptorPolicy.extend({

    init : function(attr, getter, setter)
    {
        this._super(attr, getter, setter);
    },

  
    /**
     * @method
     * Called if the user want drop a port over any draw2d.Figure.<br>
     * Return a non <b>null</b> value if the interceptor accept the drop event.<br>
     * <br>
     * It is possible to delegate the drop event to another figure if the policy
     * returns another figure. This is useful if a figure want to accept a port 
     * drop event and delegates this drop event to another port.<br>
     * 
     *
     * @param {draw2d.Figure} requestingFigure the figure who wants connect
     * @param {draw2d.Figure} connectTarget the potential connect target determined by the framework
     */
    delegateTarget: function(requestingFigure, connectTarget)
    {
        // we allow that a figure with a special class is droppable to a connection
        //
        if(requestingFigure instanceof BetweenFigure && connectTarget instanceof draw2d.Connection){
            return connectTarget;
        }
        
        return this._super(requestingFigure, connectTarget);
    }

});

