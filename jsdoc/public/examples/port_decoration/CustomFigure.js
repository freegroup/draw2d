
var CustomFigure = draw2d.shape.basic.Rectangle.extend({

    init : function(attr, setter, getter)
    {
        this._super(
            $.extend({
                width:50,
                height:100,
                x:100,
                y:100},attr),
            setter,
            getter);

        this.addPort(new DecoratedInputPort());
        this.addPort(new DecoratedInputPort());

        this.createPort("output");
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function( request)
    {
        // this node didn't support rotation on doubleClick
        if(request.getPolicy() === draw2d.command.CommandType.ROTATE){
            return null;
        }


        return this._super(request);
    }


});
