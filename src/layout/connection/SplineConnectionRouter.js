/**
 * @class draw2d.layout.connection.SplineConnectionRouter
 *
 * A ManhattanConnectionRouter with an spline interpolation between the bend points.
 *
 *     @example preview small frame
 *
 *     var createConnection=function(){
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.SplineConnectionRouter());
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
 *     var f1 = new draw2d.shape.analog.OpAmp({x:10, y:10});
 *     var f2 = new draw2d.shape.analog.ResistorVertical({angle:90, height:20, x:300, y:150});
 *
 *     // ...add it to the canvas
 *     //
 *     canvas.add( f1);
 *     canvas.add( f2);
 *
 *     // first Connection
 *     //
 *     var c = createConnection();
 *     c.setSource(f1.getOutputPort(0));
 *     c.setTarget(f2.getHybridPort(0));
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.connection.ManhattanConnectionRouter
 */
import draw2d from '../../packages';

draw2d.layout.connection.SplineConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({

	NAME : "draw2d.layout.connection.SplineConnectionRouter",

    /**
     * @constructor Creates a new Router object
     */
    init: function()
    {
        this._super();

//        this.spline = new draw2d.util.spline.CatmullRomSpline();
        this.spline = new draw2d.util.spline.CubicSpline();
//        this.spline = new draw2d.util.spline.BezierSpline();

        this.MINDIST = 50;
        this.cheapRouter = null;
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function(connection)
    {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());
    },

    /**
     * @inheritdoc
     */
    route: function(conn, routingHints)
    {
    	var i;
		var fromPt  = conn.getStartPoint();
		var fromDir = conn.getSource().getConnectionDirection( conn.getTarget());

		var toPt  = conn.getEndPoint();
		var toDir = conn.getTarget().getConnectionDirection( conn.getSource());

		// calculate the manhatten bend points between start/end.
		//
		this._route(conn, toPt, toDir, fromPt, fromDir);

        var ps = conn.getVertices();

        conn.oldPoint=null;
        conn.lineSegments = new draw2d.util.ArrayList();
        conn.vertices     = new draw2d.util.ArrayList();

        var splinePoints = this.spline.generate(ps,8);
        splinePoints.each(function(i,e){
            conn.addPoint(e);
        });

        // calculate the path string for the SVG rendering
        //
        var ps = conn.getVertices();
        var length = ps.getSize();
        var p = ps.get(0);
        var path = ["M",p.x," ",p.y];
        for( i=1;i<length;i++){
              p = ps.get(i);
              path.push("L", p.x, " ", p.y);
        }
        conn.svgPathString = path.join("");
    }
});
