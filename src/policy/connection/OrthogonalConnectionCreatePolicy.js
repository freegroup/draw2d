
/**
 * @class draw2d.policy.connection.OrthogonalConnectionCreatePolicy
 *
 * The OrthogonalConnectionCreatePolicy can be installed into the canvas to override the
 * default connection crate behaviour. Normaly you can create connections by drag&drop a port.
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
 * <b>The generated connection has always perpendicular segments.</b>
 * <br>
 * <br>
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection creation.
 *     //
 *     canvas.installEditPolicy( new draw2d.policy.connection.OrthogonalConnectionCreatePolicy());
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
 * @author Andreas Herz
 *
 * @extends draw2d.policy.connection.ConnectionCreatePolicy
 */
import draw2d from '../../packages';

draw2d.policy.connection.OrthogonalConnectionCreatePolicy = draw2d.policy.connection.ConnectionCreatePolicy.extend({

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

        this.vertices = new draw2d.util.ArrayList();
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
     *
     * @template
     */
    onClick: function(figure, x, y, shiftKey, ctrlKey)
    {
        var UP   = draw2d.geo.Rectangle.DIRECTION_UP;
        var RIGHT= draw2d.geo.Rectangle.DIRECTION_RIGHT;
        var DOWN = draw2d.geo.Rectangle.DIRECTION_DOWN;
        var LEFT = draw2d.geo.Rectangle.DIRECTION_LEFT;

        var _this = this;
        var port = figure;// .getCanvas().getBestFigure(x, y);

        // nothing to do
        if(port === null && this.port1 === null){
            return;
        }

        // nothing found at all
        //
        if(port===null){
            var canvas = this.port1.getCanvas();
            var newPos = this.beeline.getEndPosition();
            this.vertices.add(newPos);
            this.beeline.setStartPosition(this.beeline.getEndPosition());
            this.tempConnection.setVertices(this.vertices);
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }
            this.ripple(newPos.x, newPos.y, 0);
            return;
        }

        // we just considering ports
        //
        if(!(port instanceof draw2d.Port)){
            return;
        }

        // start connection create by selection the start port
        //
        if(this.port1===null){
            var canvas = port.getCanvas();
            this.port1 = port;
            this.vertices.add(port.getAbsolutePosition());
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

            canvas.paper.setStart();

            // delete the previews puls if the user press twice on the starting port
            //
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }

            var pos = port.getAbsolutePosition();
            this.ripple(pos.x, pos.y, 1);
            this.pulse = canvas.paper.setFinish();
        }
        else {
            var possibleTarget = port.delegateTarget(this.port1);

            if (!(possibleTarget instanceof draw2d.Port)) {
                return; // silently
            }

            // check whenever the target port allows a connection
            //
            var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
            request.source = this.port1;
            request.target = port;
            var command = null;
            if (this.port1 instanceof draw2d.InputPort) {
                command = this.port1.createCommand(request);
            }
            else {
                command = port.createCommand(request);
            }

            if (command !== null) {
                var connection = this.createConnection();
                command.setConnection(connection);
                port.getCanvas().getCommandStack().execute(command);


                this.beeline.hide();
                this.tempConnection.hide();
                if (this.pulse !== null) {
                    this.pulse.remove();
                    this.pulse = null;
                }
                this.beeline = null;
                this.port1 = null;

                // use the default routing if the user didn't add some
                // vertices
                if(this.vertices.getSize()<=2){
                    return;
                }

                var MINDIST = command.getConnection().getRouter().MINDIST;
                var beforeVertex = this.vertices.get(this.vertices.getSize()-2);
                var lastVertex   = this.vertices.last();
                var portPos      = port.getAbsolutePosition();
                var lastSegmentDir = UP;
                if(lastVertex.x === beforeVertex.x){
                    lastSegmentDir = lastVertex.y< beforeVertex.y ? UP : DOWN;
                }
                else{
                    lastSegmentDir = lastVertex.x< beforeVertex.x ? LEFT : RIGHT;
                }

                // CALCULATE THE LAST MILE OF THE CONNECTION
                //
                // ensure that we have a valid "manhattan style" connection.
                // We must add or adjust some points or segments.
                //
                // The code below creates and adjust the points in that way that the
                // DOTTED line is the calculated part to the user defined vertices.
                // ==================================
                //
                switch(port.getConnectionDirection(this.port1)){
                    case UP:
                        switch(lastSegmentDir){
                            case UP:
                                //       o..................o lastVertex
                                //       |         .        |
                                //       |         .        |
                                //       |    +----O----+   |
                                // ------o    | portPos |   o------------
                                //            |         |      beforeVertex
                                //            +---------+
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)) {
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                //        ...................
                                //        .        .        .
                                //        .   +----O----+   .
                                //        o   | portPos |   o lastVertex
                                //        |   |         |   |
                                //        |   +---------+   |
                                // -------o                 o------------
                                //                            beforeVertex
                                //
                                else{
                                    lastVertex.y = portPos.y-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //  ..............................
                                //  .                   .        .
                                //  .                   .        .
                                //  o------->o     +----O----+   o---------------->O
                                //  |              | portPos |   | beforeVertex    lastVertex
                                //  |              |         |   |
                                //  |              +---------+
                                if(lastVertex.y>(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //
                                //                                beforeVertex   lastVertex
                                // o---------->o..................o------------->O
                                // |                     .        |
                                // |                +----O----+   |
                                // |                | portPos |   |
                                // |                |         |   |
                                //                  +---------+
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //                           beforeVertex
                                // ------o..................o------------
                                //       |         .        |
                                //       |         .        |
                                //       V    +----O----+   V
                                //       o    | portPos |   o lastVertex
                                //            |         |
                                //            +---------+
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)) {
                                    beforeVertex.x = portPos.x;
                                    lastVertex.setPosition(portPos);
                                }
                                //        ...................
                                //        .        .        .
                                //        .   +----O----+   . beforeVertex
                                // -------o   | portPos |   o------------
                                //        |   |         |   |
                                //        V   +---------+   V
                                //        o                 o
                                //                            lastVertex
                                //
                                else{
                                    lastVertex.y = portPos.y-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //           ..................................
                                //           .         .                       .
                                //           .         .                       .
                                // o<--------o    +----O----+   o<-------------O beforeVertex
                                //           |    | portPos |    lastVertex    |
                                //           |    |         |                  |
                                //                +---------+
                                if(lastVertex.y>(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //             |                               |
                                //             |                               |
                                //   o<--------o................o<-------------O
                                //                      .        lastVertex     beforeVertex
                                //                 +----O----+
                                //                 | portPos |
                                //                 |         |
                                //                 +---------+
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case RIGHT:
                        switch(lastSegmentDir){
                            case UP:
                                //                    o lastVertex
                                //                    |
                                //                    |
                                //  ------------------o beforeVertex
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    o lastVertex
                                //                    |
                                //                    |
                                //   -----------------o beforeVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //        lastVertex
                                //      o...............
                                //      |              .
                                //      |              .
                                //  ----o beforeVertex .
                                //                     .
                                //  +----------+       .
                                //  |          |       .
                                //  |  portPos O........
                                //  |          |       .
                                //  +----------+       .
                                //      o...............
                                //      | lastVertex
                                //      |
                                //------o
                                //        beforeVertex
                                //
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //    beforeVertex     lastVertex
                                //    o-------------->o
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                //    o-------------->o
                                //    beforeVertex     lastVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // beforeVertex  lastVertex
                                // o------------>o.........
                                //                         .
                                //       +----------+      .
                                //       |          |      .
                                //       |  portPos O.......
                                //       |          |      .
                                //       +----------+      .
                                //                         .
                                //  o----------->o..........
                                // beforeVertex  lastVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //    ----------------o beforeVertex
                                //                    |
                                //                    |
                                //                    o lastVertex
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                //      --------------o beforeVertex
                                //                    |
                                //                    |
                                //                    o lastVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //    -----o beforeVertex
                                //         |
                                //         | lastVertex
                                //         o...........
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                // ----o beforeVertex .
                                //     |              .
                                //     | lastVertex   .
                                //     o...............
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //                lastVertex      beforeVertex
                                //               o<--------------o
                                //               .
                                //  +----------+ .
                                //  |          | .
                                //  |  portPos O..
                                //  |          | .
                                //  +----------+ .
                                //               .
                                //               o<--------------o
                                //                lastVertex      beforeVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // lastVertex                beforeVertex
                                // o<-----------------------o
                                //                      .
                                //       +----------+   .
                                //       |          |   .
                                //       |  portPos O....
                                //       |          |   .
                                //       +----------+   .
                                //                      .
                                //  o<----------------------o
                                //  lastVertex               beforeVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case DOWN:
                        switch(lastSegmentDir){
                            case UP:
                                //       o                  o lastVertex
                                //       |                  |
                                //       |                  |
                                //       |    +---------+   |
                                // ------o    |         |   o------------
                                //       .    | portPos |   . beforeVertex
                                //       .    +----O----+   .
                                //       .         .        .
                                //       ....................
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)) {
                                    lastVertex.y = portPos.y+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                //            +---------+
                                //            |         |
                                //            | portPos |
                                //            +----O----+
                                //                 .
                                //        o.................o lastVertex
                                //        |                 |
                                //        |                 |
                                // -------o                 o------------
                                //                            beforeVertex
                                //
                                else{
                                    lastVertex.x   = portPos.x;
                                    lastVertex.y   = portPos.y;
                                    beforeVertex.x = portPos.x;
                                }
                                break;
                            case RIGHT:
                                //                 +---------+
                                //                 |         |
                                //                 | portPos |
                                //  o------->o     +----O----+    o--------------->O
                                //  |        .          .         | beforeVertex   . lastVertex
                                //  |        .....................|.................
                                //  |
                                //
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y+MINDIST));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, portPos.y+MINDIST));
                                    this.vertices.add(portPos);
                                }
                                //                  +---------+
                                //                  |         |
                                //                  | portPos |
                                //                  +----O----+
                                //                       .
                                //             ...................................
                                //             .                    beforeVertex . lastVertex
                                // o---------->o                  o------------->O
                                // |                              |
                                // |                              |
                                //
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //                           beforeVertex
                                // ------o                  o------------
                                //       |                  |
                                //       |                  |
                                //       V    +---------+   V
                                //       o    |         |   o lastVertex
                                //       .    | portPos |   .
                                //       .    +----O----+   .
                                //       .         .        .
                                //       ....................
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)) {
                                    lastVertex.y = portPos.y+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                //
                                //            +---------+     beforeVertex
                                // -------o   | portPos |   o------------
                                //        |   |         |   |
                                //        V   +----O----+   V
                                //        o        .        o
                                //        ..................  lastVertex
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //
                                // o<--------o    +---------+   o<-------------O beforeVertex
                                // .         |    |         |   . lastVertex   |
                                // .         |    | portPos |   .              |
                                // .              +----O----+   .
                                // .                   .        .
                                // ..............................
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //
                                //                +---------+
                                //           |    |         |               |
                                //           |    | portPos |               |
                                //           |    +----O----+               |
                                //           |         .                    |
                                // o<--------o...................o<---------o
                                //
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case LEFT:
                        switch(lastSegmentDir){
                            case UP:
                                //    ................o lastVertex
                                //    .               |
                                //    .               |
                                //  --.---------------o beforeVertex
                                //    .
                                //    .   +----------+
                                //    .   |          |
                                //    ....o  portPos |
                                //    .   |          |
                                //    .   +----------+
                                //    .
                                //    ................o lastVertex
                                //                    |
                                //                    |
                                //   -----------------o beforeVertex
                                //
                                if(lastVertex.x >= (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                               //
                                //            +----------+
                                //            |          |
                                //      ......o  portPos |
                                //      .     |          |
                                //      .     +----------+
                                //      o
                                //      | lastVertex
                                //      |
                                //------o
                                //        beforeVertex
                                //
                                //
                                else if(lastVertex.y > portPos.y && lastVertex.x < (portPos.x-MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //          lastVertex
                                //      o..
                                //      | .
                                //      | .
                                //  ----o .   beforeVertex
                                //        .
                                //        .   +----------+
                                //        .   |          |
                                //        ....o  portPos |
                                //            |          |
                                //            +----------+
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //    beforeVertex     lastVertex
                                //    o-------------->o
                                //                    .
                                // ....................
                                // .
                                // .      +----------+
                                // .      |          |
                                // .......o  portPos |
                                //        |          |
                                //        +----------+
                                //
                                if(lastVertex.y<portPos.y && lastVertex.x > (portPos.x-MINDIST)){
                                    var center = portPos.y-(portPos.y-lastVertex.y)/2;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //        +----------+
                                //        |          |
                                // .......o  portPos |
                                // .      |          |
                                // .      +----------+
                                // .
                                // ....................
                                //                    .
                                //    o-------------->o
                                //    beforeVertex     lastVertex
                                //
                                else if(lastVertex.y>portPos.y && lastVertex.x > (portPos.x-MINDIST)){
                                    var center = portPos.y+(lastVertex.y-portPos.y)/2;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // beforeVertex  lastVertex
                                // o------------>o
                                //               .
                                //               .   +----------+
                                //               .   |          |
                                //               ....o  portPos |
                                //               .   |          |
                                //               .   +----------+
                                //               .
                                //  o----------->o
                                // beforeVertex  lastVertex
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //         -----------o beforeVertex
                                //                    |
                                //                    |
                                //                    V
                                //    ................o lastVertex
                                //    .
                                //    .       +----------+
                                //    .       |          |
                                //    ........o portPos  |
                                //    .       |          |
                                //    .       +----------+
                                //    .
                                //    .        --------o beforeVertex
                                //    .                |
                                //    .                |
                                //    .                V
                                //    .................o lastVertex
                                //
                                if(lastVertex.x >= (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //    -----o beforeVertex
                                //         |
                                //         |
                                //         o lastVertex
                                //         .
                                //         .       +----------+
                                //         .       |          |
                                //         ........o portPos  |
                                //             .   |          |
                                //             .   +----------+
                                // beforeVertex.
                                // ------------o
                                //             |
                                //             |
                                // lastVertex  o
                                //
                                else{
                                    lastVertex.y=portPos.y;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //   lastVertex      beforeVertex
                                //    o<--------------o
                                //    .
                                //    .       +----------+
                                //    .       |          |
                                //    ....... o portPos  |
                                //    .       |          |
                                //    .       +----------+
                                //    .
                                //    o<--------------o
                                //    lastVertex      beforeVertex
                                //
                                if(lastVertex.x < (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //         lastVertex                beforeVertex
                                //  .......o<-----------------------o
                                //  .
                                //  .    +----------+
                                //  .    |          |
                                //  .....o portPos  |
                                //  .    |          |
                                //  .    +----------+
                                //  .
                                //  ........o<----------------------o
                                //         lastVertex               beforeVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                            break;
                        }
                    break;
                }

                if(this.vertices.getSize()>3) {
                    connection._routingMetaData.routedByUserInteraction = true;
                    connection.setVertices(this.vertices);
                }
                this.vertices.clear();
            }
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
     * @template
     */
    onMouseMove: function(canvas, x, y, shiftKey, ctrlKey)
    {
        if(this.beeline!==null){
            this.beeline.setEndPosition(this.orthogonal(this.vertices.last(), {x:x,y:y}));
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
     * @private
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
            this.vertices.clear();
            if(this.pulse!=null) {
                this.pulse.remove();
                this.pulse=null;
            }
        }
    },

    orthogonal: function(anchor, p)
    {
        // calculate vertical line distance
        //
        var xDiff = Math.abs(anchor.x- p.x)+10;
        var xDist = draw2d.geo.Line.distance(anchor.x-xDiff, anchor.y, anchor.x+xDiff, anchor.y, p.x, p.y);

        // calculate horizontal line distance
        //
        var yDiff = Math.abs(anchor.y- p.y)+10;
        var yDist = draw2d.geo.Line.distance(anchor.x, anchor.y-yDiff, anchor.x, anchor.y+yDiff, p.x, p.y);

        return yDist>xDist? {x: p.x, y:anchor.y}:{x: anchor.x, y: p.y};
    },

    createConnection: function()
    {
        var connection = this._super();
        connection.attr({radius:7, stroke:3});
        connection.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
        return connection;
    }

});

