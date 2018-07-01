
/**
 * @class draw2d.layout.connection.InteractiveManhattanConnectionRouter
 * Route the connection in an Manhattan style and add resize handles to all vertex for interactive alignment of the
 * routing.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var createConnection=function(){
 *        // return my special kind of connection
 *        var con = new draw2d.Connection({
 *          radius: 4,
 *          router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
 *        });
 *        return con;
 *     };
 *
 *     // install a custom connection create policy
 *     //
 *     canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
 *            createConnection: createConnection
 *     }));
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     var c = createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // select the connection to show the selection handles
 *     //
 *     c.select();
 *
 *
 * @author Andreas Herz
 * @since 4.0.2
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
import draw2d from '../../packages';
import extend from '../../util/extend';


draw2d.layout.connection.InteractiveManhattanConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME : "draw2d.layout.connection.InteractiveManhattanConnectionRouter",


    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function()
    {
        this._super();
    },

    onInstall: function(conn)
    {
        conn.installEditPolicy(new draw2d.policy.line.OrthogonalSelectionFeedbackPolicy());
        if(!conn._routingMetaData){
            conn._routingMetaData = {
                routedByUserInteraction:false,
                fromDir:-1,
                toDir:-1
            };
        }
    },

    onUninstall: function(conn)
    {
        delete conn._routingMetaData;
    },

    /**
     * @inheritDoc
     */
    route: function(conn, routingHints)
    {
        if (!routingHints.oldVertices) {
            debugger
        }
        if(routingHints.oldVertices.getSize()===0 || conn._routingMetaData.routedByUserInteraction===false){
            this._super(conn, routingHints);
            conn._routingMetaData.fromDir = conn.getSource().getConnectionDirection( conn.getTarget());
            conn._routingMetaData.toDir   = conn.getTarget().getConnectionDirection( conn.getSource());
        }
        else{
            this.halfRoute(conn, routingHints);
            this._paint(conn);
        }
    },

    /**
     * @method
     * The routing algorithm if the user has changed at least on of the vertices manually.
     * This kind of routing just align the start and end vertices to the new source/target port
     * location.
     * The vertices between keep untouched. Modification of this vertices are done by the
     * draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
     *
     * @param {draw2d.Connection} conn the connection to route
     * @param {draw2d.util.ArrayList} oldVertices the vertices of the routing before
     * @param {Object} routingHints some helper attributes for the router
     * @param {Boolean} routingHints.startMoved is true if just the start location has moved
     * @param {Boolean} routingHints.endMoved is true if the destination location has changed
     */
    halfRoute: function(conn, routingHints)
    {
        var MINDIST = this.MINDIST;
        var max = Math.max;
        var min = Math.min;

        routingHints = routingHints||{};
        var oldVertices = routingHints.oldVertices;
        var vertexCount  = oldVertices.getSize();

        var fromPt  = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection( conn.getTarget());

        var toPt    = conn.getEndPoint();
        var toDir   = conn.getTarget().getConnectionDirection( conn.getSource());


        // the port orientation has been changed. This can happen if the node rotates. In this case
        // we must recalculate the routing.
        if(conn._routingMetaData.fromDir !== fromDir || conn._routingMetaData.toDir !== toDir){
            conn._routingMetaData.routedByUserInteraction = false;
            this.route(conn, oldVertices);
        }

        // TODO: detection for switch back to autoroute isn'T good enough.
        //       Add more logic. e.g. if the fromDir!==1. This happens if
        //       The ports are at bottom and top.
        //       The code below covers only the classic workflow configuration left->right
        //
        //  go back to the default if no routing is possible anymore
        //
        if(    (fromDir===draw2d.geo.Rectangle.DIRECTION_RIGHT ) && (toDir === draw2d.geo.Rectangle.DIRECTION_LEFT)
            && (fromPt.x > toPt.x) && (vertexCount<=4)){

            conn._routingMetaData.routedByUserInteraction = false;
            this.route(conn, {oldVertices:oldVertices});
        }

        // transfer the old vertices into the connection
        //
        oldVertices.each(function(i,vertex){
            conn.addPoint(vertex);
        });


        // all points are adjusted with the drag&drop operation. There is no need to move
        // start/end points twice
        if(conn.isInDragDrop){
            return;
        }

        // The SOURCE port (labeled with p0) has been moved/changed.
        //
        if(routingHints.startMoved || !fromPt.equals(oldVertices.get(0))){
            var p1 = oldVertices.get(1);
            var p2 = oldVertices.get(2);
            conn.setVertex(0,fromPt);
            switch(fromDir){
                //          .
                //   p0     . p1
                //   x------+
                //          .
                //          .
                //
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                    conn.setVertex(1,max(fromPt.x+MINDIST,p1.x),fromPt.y);// p1
                    conn.setVertex(2,max(fromPt.x+MINDIST,p1.x),p2.y);    // p2
                    break;
                //   .
                //   . p1     p0
                //   +------x
                //   .
                //   .
                //
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                    conn.setVertex(1,min(fromPt.x-MINDIST,p1.x),fromPt.y);// p1
                    conn.setVertex(2,min(fromPt.x-MINDIST,p1.x),p2.y);    // p2
                    break;
                //     ...+....
                //     p1 |
                //        |
                //        |
                //     p0 x
                //
                case draw2d.geo.Rectangle.DIRECTION_UP:
                    conn.setVertex(1,fromPt.x, min(fromPt.y-MINDIST,p1.y)); // p1
                    conn.setVertex(2,p2.x    , min(fromPt.y-MINDIST,p1.y)); // p2
                    break;
                //        x
                //     p0 |
                //        |
                //     p1 |
                //    ....+....
                //
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                    conn.setVertex(1,fromPt.x, max(fromPt.y+MINDIST,p1.y)); // p1
                    conn.setVertex(2,p2.x    , max(fromPt.y+MINDIST,p1.y));     // p2
                    break;
            }
        }
        //////////////////////////////////////////////////////////////////
        // the TARGET port (labeled with p0) has moved
        //
        if(routingHints.endMoved || !toPt.equals(oldVertices.get(vertexCount-1))){
            var p1 = oldVertices.get(vertexCount-2);
            var p2 = oldVertices.get(vertexCount-3);
            conn.setVertex(vertexCount-1,toPt);                        // p0

            switch(toDir){
                //               .
                //      p0       . p1
                //    x----------+
                //               .
                //               .
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                    conn.setVertex(vertexCount-2,max(toPt.x+MINDIST,p1.x),toPt.y);  // p1
                    conn.setVertex(vertexCount-3,max(toPt.x+MINDIST,p1.x),p2.y);    // p2
                    break;

                //    .
                //    .
                //    . p1         p0
                //    +----------x
                //    .
                //    .
                //
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                    conn.setVertex(vertexCount-2,min(toPt.x-MINDIST,p1.x),toPt.y);  // p1
                    conn.setVertex(vertexCount-3,min(toPt.x-MINDIST,p1.x),p2.y);    // p2
                    break;

                //     ...+....
                //     p1 |
                //        |
                //        |
                //     p0 x
                //
                case draw2d.geo.Rectangle.DIRECTION_UP:
                    conn.setVertex(vertexCount-2, toPt.x,min(toPt.y-MINDIST,p1.y));  // p1
                    conn.setVertex(vertexCount-3, p2.x  ,min(toPt.y-MINDIST,p1.y));  // p2
                    break;

                //        +
                //     p0 |
                //        |
                //     p1 |
                //     ...+...
                //
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                    conn.setVertex(vertexCount-2,toPt.x,max(toPt.y+MINDIST,p1.y));  // p1
                    conn.setVertex(vertexCount-3,p2.x  ,max(toPt.y+MINDIST,p1.y));  // p2
                    break;
            }
        }
    },

    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     * @param {draw2d.Connection} conn
     * @param {Number} index
     *
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function(conn, index){

        var segmentCount= conn.getVertices().getSize()-1; // segmentCount is one less than vertex count

        // The first and last segment isn't deletable
        //
        if( (index<=0) || ((index+1)>= segmentCount)){
            return false;
        }

        // a connection need at least three strokes
        //
        if(segmentCount<4){
            return false;
        }

        var fromPt  = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection( conn.getTarget());

        var toPt    = conn.getEndPoint();
        var toDir   = conn.getTarget().getConnectionDirection( conn.getSource());

        if(segmentCount<=5){
            //     ___
            //    |   |      From
            //    | 1 |-----+
            //    |___|     |
            //              |
            //   +----------+
            //   |
            //   |    ___
            //   |   |   |
            //   +---| 2 |    To
            //       |___|
            // the connection needs at least 5 segments if the routing is like this
            //
            if( (fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) && ( toDir === draw2d.geo.Rectangle.DIRECTION_LEFT) && (fromPt.x >= toPt.x)){
                return false;
            }


            //     ___
            //    |   |        To
            //    | 2 |-----+
            //    |___|     |
            //              |
            //   +----------+
            //   |
            //   |    ___
            //   |   |   |
            //   +---| 1 |    From
            //       |___|
            // the connection needs at least 5 segments if the routing is like this
            //
            if( (fromDir == draw2d.geo.Rectangle.DIRECTION_LEFT) & ( toDir == draw2d.geo.Rectangle.DIRECTION_RIGHT) && (fromPt.x <= toPt.x)){
                return false;
            }

            //                          ___
            //      +_______           |   |
            //      | from  |          | 2 |
            //     _+_      |          |___|
            //    |   |     |       To   +
            //    | 1 |     |____________|
            //    |___|
            // the connection needs at least 5 segments if the routing is like this
            //
            if( (fromDir == draw2d.geo.Rectangle.DIRECTION_UP) & ( toDir == draw2d.geo.Rectangle.DIRECTION_DOWN) && (fromPt.y <= toPt.y)){
                return false;
            }

            //                          ___
            //      +_______           |   |
            //      | to    |          | 1 |
            //     _+_      |          |___|
            //    |   |     |     from   +
            //    | 2 |     |____________|
            //    |___|
            // the connection needs at least 5 segments if the routing is like this
            //
            if( (fromDir == draw2d.geo.Rectangle.DIRECTION_DOWN) & ( toDir == draw2d.geo.Rectangle.DIRECTION_UP) && (fromPt.y >= toPt.y)){
                return false;
            }

            // unable to make the decision on the easy way. calculate the route again with an
            // temporary connection and check if the segment count of the new routed connection
            // allows a removal
            //
            var tmpConn = new draw2d.Connection();
            tmpConn.lineSegments = new draw2d.util.ArrayList();
            tmpConn.vertices   = new draw2d.util.ArrayList();
            tmpConn.sourcePort = conn.sourcePort;
            tmpConn.targetPort = conn.targetPort;
            tmpConn._routingMetaData = {routedByUserInteraction:false,fromDir:-1,toDir:-1};
            this.route(tmpConn, {oldVertices:new draw2d.util.ArrayList()});
            var curSegmentCount = conn.getVertices().getSize()-1;
            var minSegmentCount = tmpConn.getVertices().getSize()-1;
            if(curSegmentCount<=minSegmentCount){
                return false;
            }
        }

        return true;
    },

    /**
     * @method
     *
     * The draw2d.Connection delegates the drag operation to the router. The router can
     * handle the different constraints of the connection and just drag&drop a single segment
     * instead of the complete connection.
     *
     * @param {draw2d.shape.basic.Line} line the related line to handle
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     *
     * @since 6.1.0
     */
    onDrag: function(line, dx, dy, dx2, dy2)
    {
        var i=0;
        // Connection is dragged by source and origin port movement
        // or MultiSelection in this case we drag the complete
        // connection
        if(line.draggedSegment===null){
            var count = line.getVertices().getSize()-1;
            for( i=1; i<count;i++){
                line.getVertex(i).translate(dx2, dy2);
            }
            return;
        }

        // don't drag start/end segments. This segments are bounded to the related
        // ports.
        if(line.draggedSegment.index===0 || line.draggedSegment.index === (line.getSegments().getSize()-1)){
            return;
        }

        line._routingMetaData.routedByUserInteraction = true;

        var p0  = line.draggedSegment.start;
        var p1  = line.draggedSegment.end;
            i   = line.draggedSegment.index;
        var lp0 = line.getVertices().first();
        var lp1 = line.getVertices().last();

        // horizontal segment movement
        //                              x Py
        //                              .
        //  P0                          .
        //  +---------------------------+ P1
        //  .
        //  .
        //  x Px
        //
        var distance=0;
        if(p0.y === p1.y) {
            // ensure that the segment is the min distance away from the source/target port
            // (Px is endpoints of the connection and bounded to a port)
            if(i === 1) distance =p0.y - lp0.y;
            // (Py is endpoints of the connection and bounded to a port)
            if(i === line.getSegments().getSize()-2)  distance =p1.y - lp1.y;


            if(distance<0 && dy2>0) {
                dy2 = Math.min(dy2, (-distance)-this.MINDIST);
            }
            else if(distance>0 && dy2<0) {
                dy2 = -Math.min(-dy2, (distance)-this.MINDIST);
            }

            line.getVertex(i).translate(0, dy2);
            line.getVertex(i+1).translate(0, dy2);
        }
        // vertical segment movement
        //
        else if(p0.x === p1.x){
            // ensure that the segment is the min distance away from the source/target port
            //
            if (i === 1) {
                distance =p0.x - lp0.x;
                if(distance<0 && dx2>0) {
                    dx2 = Math.min(dx2, (-distance)-this.MINDIST);
                }
                else if(distance>0 && dx2<0) {
                    dx2 = -Math.min(-dx2, (distance)-this.MINDIST);
                }
            }

            // we need this additional test too. No "else if" because the special
            // case of "index===1". In this case the segment can be the last AND first
            // segment if the connection has only three segments at all.
            //
            if(i === line.getSegments().getSize()-2)  {
                distance =p1.x - lp1.x;
                if(distance<0 && dx2>0) {
                    dx2 = Math.min(dx2, (-distance)-this.MINDIST);
                }
                else if(distance>0 && dx2<0) {
                    dx2 = -Math.min(-dx2, (distance)-this.MINDIST);
                }
            }

            line.getVertex(i).translate(dx2, 0);
            line.getVertex(i+1).translate(dx2, 0);
        }
    },

    /**
     * @method
     * Called by the connection if the vertices set outside.
     * This enforce the router to avoid full autoroute. E.g. InteractiveManhattanRouter
     *
     * @protected
     */
    verticesSet: function(conn)
    {
        conn._routingMetaData.routedByUserInteraction = true;
        if(conn.getSource()!==null && conn.getTarget()!==null) {
            conn._routingMetaData.fromDir = conn.getSource().getConnectionDirection(conn.getTarget());
            conn._routingMetaData.toDir = conn.getTarget().getConnectionDirection(conn.getSource());
        }
    },

    /**
     * @method
     * Tweak or enrich the polyline persistence data with routing information
     *
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     *
     * @returns {Object}
     */
    getPersistentAttributes: function(line, memento)
    {
        memento.vertex = [];

        line.getVertices().each(function(i,e){
            memento.vertex.push({x:e.x, y:e.y});
        });
        memento.routingMetaData = extend({},line._routingMetaData);

        return memento;
    },

    /**
     * @method
     * set the attributes for the polyline with routing information of the interactive manhattan router.
     *
     * @since 4..0.0
     * @param {Object} memento
     */
    setPersistentAttributes: function(line, memento)
    {
        // restore the points from the JSON data and add them to the polyline
        //
        if(Array.isArray(memento.vertex)){

            line.oldPoint=null;
            line.lineSegments = new draw2d.util.ArrayList();

            line.setVertices(memento.vertex);

            /*
             line.vertices     = new draw2d.util.ArrayList();
             $.each(memento.vertex, function(i,e){
             line.addPoint(e.x, e.y);
             });
             */
        }

        if(typeof memento.routingMetaData !== "undefined"){
            line._routingMetaData = extend({},memento.routingMetaData);
        }
    }

});
