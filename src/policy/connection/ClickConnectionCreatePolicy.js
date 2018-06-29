
/**
 * @class draw2d.policy.connection.ClickConnectionCreatePolicy
 *
 * The ClickConnectionCreatePolicy can be installed into the canvas to override the
 * default connection crate behaviour. Normally you can create connections by drag&drop a port.
 *
 * With this policy you can route the connection during creation.
 *
 * Creates a connection by clicking on a port.
 * <ul>
 *  <li> click on the first port</li>
 *  <li> click within the canvas to add additional vertices</li>
 *  <li> click on the target port to draw the connection</li>
 *  <li> press ESC to abort the operation (didn't work within this JSDoc)</li>
 * </ul>
 * <br>
 * <br>
 * <b>The generated connections didn't have any orthogonal constraints nor any other restrictions or guidance.</b>
 * <br>
 * <br>
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection creation.
 *     //
 *     canvas.installEditPolicy( new draw2d.policy.connection.ClickConnectionCreatePolicy());
 *
 *     // create and add two Node which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start({x:50, y:50});
 *     var endNode   = new draw2d.shape.node.End({x:200, y:70});
 *
 *     // add the two nodes to the canvas
 *     //
 *     canvas.add( start);
 *     canvas.add( endNode);
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.connection.ConnectionCreatePolicy
 * @since 6.1.0
 */
import draw2d from '../../packages';

draw2d.policy.connection.ClickConnectionCreatePolicy = draw2d.policy.connection.ConnectionCreatePolicy.extend({

    NAME : "draw2d.policy.connection.ClickConnectionCreatePolicy",
    
    /**
     * @constructor
     *
     * Creates a new connection create policy instance
     */
    init: function(attr, setter, getter)
    {
        this._super( attr, setter, getter);

        this.port1 = null;
        this.beeline = null;
        this.pulse= null;
        this.tempConnection = null;

        this.vertices = [];
    },

    /**
     * @method
     * Called by the canvas if the user click on a figure.
     *
     * @param {draw2d.Figure} the figure under the click event. Can be null
     * @param {Number} x the x coordinate of the mouse during the click event
     * @param {Number} y the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 6.1.0
     */
    onClick: function(figure, x, y, shiftKey, ctrlKey)
    {
        var _this = this;
        var port = figure;

        if(port === null && this.port1 === null){
            return;
        }

        // nothing found at all
        //
        if(port===null){
            this.vertices.push(new draw2d.geo.Point(x,y));
            this.beeline.setStartPosition(x,y);
            this.tempConnection.setVertices(this.vertices);
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }
            this.ripple(x,y,0);
            return;
        }

        //just consider ports
        //
        if(!(port instanceof draw2d.Port)){
            return;
        }

        // start connection create by selection the start port
        //
        if(this.port1===null){
            var canvas = port.getCanvas();
            this.port1 = port;
            this.vertices.push(port.getAbsolutePosition());
            this.beeline = new draw2d.shape.basic.Line({
                start: this.port1.getAbsolutePosition(),
                end: this.port1.getAbsolutePosition(),
                dasharray:"- ",
                color:"#2C70FF"
            });

            this.beeline.hide= function(){
                _this.beeline.setCanvas(null);
            };

            this.beeline.show= function(canvas){
                _this.beeline.setCanvas(canvas);
                _this.beeline.shape.toFront();
            };
            this.beeline.show(canvas);

            this.tempConnection = new draw2d.shape.basic.PolyLine({
                start: this.port1.getAbsolutePosition(),
                end: this.port1.getAbsolutePosition(),
                stroke:2,
                color:"#2C70FF"
            });

            this.tempConnection.hide= function(){
                _this.tempConnection.setCanvas(null);
            };

            this.tempConnection.show= function(canvas){
                _this.tempConnection.setCanvas(canvas);
                _this.tempConnection.shape.toFront();
            };
            this.tempConnection.show(canvas);
            this.tempConnection.setVertices([this.port1.getAbsolutePosition(),this.port1.getAbsolutePosition()]);

            var a= function() {
                _this.tempConnection.shape.animate({"stroke-width" : 2}, 800, b);
            };
            var b=function() {
                _this.tempConnection.shape.animate({"stroke-width":1}, 800, a);
            };
            a();

            var pos = port.getAbsolutePosition();
            this.pulse =this.ripple(pos.x, pos.y, 1);
            return;
        }


        var possibleTarget = port.delegateTarget(this.port1);

        if(!(possibleTarget instanceof draw2d.Port)){
            return; // silently
        }

        var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
        request.source = this.port1;
        request.target = port;

        var command = null;
        if(this.port1 instanceof draw2d.InputPort) {
             command = this.port1.createCommand(request);
        }
        else{
             command = port.createCommand(request);
        }

        if(command!==null){
            this.vertices.push(port.getPosition());
            command.setConnection( this.createConnection());
            figure.getCanvas().getCommandStack().execute(command);
            this.beeline.hide();
            this.tempConnection.hide();
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }
            this.beeline = null;
            this.port1=null;
            this.vertices = [];
        }

    },


    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseMove: function(canvas, x, y, shiftKey, ctrlKey)
    {
        if(this.beeline!==null){
            this.beeline.setEndPosition(x,y);
        }
    },

    /**
     * @method
     * Callback if the user press a key down
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     **/
    onKeyDown: function(canvas, keyCode, shiftKey, ctrlKey)
    {
        var KEYCODE_ENTER = 13;
        var KEYCODE_ESC = 27;
        if (keyCode === KEYCODE_ESC && this.beeline!==null){
            this.beeline.hide();
            this.tempConnection.hide();
            this.beeline = null;
            this.port1=null;
            this.vertices = [];
            if(this.pulse!=null) {
                this.pulse.remove();
                this.pulse=null;
            }
        }
    },


    createConnection: function()
    {
        var connection = this._super();
        if(this.vertices.length===2){
            connection.setRouter(new draw2d.layout.connection.DirectRouter());
        }
        else {
            connection.setRouter(new draw2d.layout.connection.VertexRouter());
            connection.setVertices(this.vertices);
        }
        connection.setRadius(10);
        return connection;
    }



});

