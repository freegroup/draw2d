
/**
 * @class draw2d.layout.connection.CircuitConnectionRouter
 *
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors.
 * <br>
 * Additional a <b>bridge</b> is added to each connection which didn't have a common source or target
 * port.<br>
 * A <b>dot</b> is added at the crossing if the two connections have a common spurce or target port.
 *
 * <br>
 *
 *     @example preview small frame
 *
 *     var createConnection=function(){
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
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
 *     var f3 = new draw2d.shape.analog.ResistorVertical({x:250, y:70});
 *     var f4 = new draw2d.shape.analog.ResistorVertical({x:10, y:90});
 *
 *     // ...add it to the canvas
 *     //
 *     canvas.add( f1);
 *     canvas.add( f2);
 *     canvas.add( f3);
 *     canvas.add( f4);
 *
 *     // first Connection
 *     //
 *     var c = createConnection();
 *     c.setSource(f1.getOutputPort(0));
 *     c.setTarget(f2.getHybridPort(0));
 *     canvas.add(c);
 *
 *     // second Connection between the other resistors
 *     //
 *     c = createConnection();
 *     c.setSource(f3.getHybridPort(1));
 *     c.setTarget(f4.getHybridPort(0));
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
import draw2d from '../../packages';


draw2d.layout.connection.CircuitConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME : "draw2d.layout.connection.CircuitConnectionRouter",

	/**
	 * @constructor
	 * Creates a new Router object.
	 *
	 */
    init: function()
    {
        this._super();

        this.setBridgeRadius(4);
        this.setVertexRadius(2);

        // experimental
        this.abortRoutingOnFirstVertexNode=false;
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
     * @method
     * Callback method if the router has been removed from the connection. In the case of the CircuitRouter
     * all vertex nodes will be removed from the canvas.
     *
     * @param {draw2d.Connection} connection The related connection
     * @template
     * @since 2.7.2
     */
    onUninstall: function(connection)
    {
        if(typeof connection.vertexNodes!=="undefined" && connection.vertexNodes!==null){
            connection.vertexNodes.remove();
            connection.vertexNodes = null;
        }
    },

    /**
     * @method
     * Set the radius of the vertex circle.
     *
     * @param {Number} radius
     */
    setVertexRadius: function(radius)
    {
        this.vertexRadius=radius;

        return this;
    },
    /** deprecated
     * @private
     * **/
    setJunctionRadius: function(radius){ this.vertexRadius=radius;},

    /**
     * @method
     * Set the radius or span of the bridge. A bridge will be drawn if two connections are crossing and didn't have any
     * common port.
     *
     * @param {Number} radius
     */
    setBridgeRadius: function(radius)
    {
        this.bridgeRadius=radius;
        this.bridge_LR = [" r", 0.5, -0.5, radius-(radius/2), -(radius-radius/4), radius, -radius,radius+(radius/2), -(radius-radius/4), radius*2, "0 "].join(" ");
        this.bridge_RL = [" r", -0.5, -0.5, -(radius-(radius/2)), -(radius-radius/4), -radius, -radius,-(radius+(radius/2)), -(radius-radius/4), -radius*2, "0 "].join(" ");

        return this;
    },

	/**
	 * @inheritdoc
	 */
	route: function(conn, routingHints)
    {
		var fromPt  = conn.getStartPoint();
		var fromDir = conn.getSource().getConnectionDirection( conn.getTarget());

		var toPt  = conn.getEndPoint();
		var toDir = conn.getTarget().getConnectionDirection( conn.getSource());

		// calculate the lines between the two points with the standard ManhattanRouter.
		//
		this._route(conn, toPt, toDir, fromPt, fromDir);

        // get the intersections to the other connections
        //
        var intersectionsASC = conn.getCanvas().getIntersection(conn).sort("x");
        var intersectionsDESC= intersectionsASC.clone().reverse();

        var intersectionForCalc = intersectionsASC;
        var i = 0;

        // add a ArrayList of all added vertex nodes to the connection
        //
        if(typeof conn.vertexNodes!=="undefined" && conn.vertexNodes!==null){
            conn.vertexNodes.remove();
        }
        conn.vertexNodes = conn.canvas.paper.set();

        // ATTENTION: we cast all x/y coordinates to integer and add 0.5 to avoid subpixel rendering of
		//            the connection. The 1px or 2px lines look much clearer than before.
		//
		var ps = conn.getVertices();
		var p = ps.get(0);
        var path = [ "M", (p.x|0)+0.5, " ", (p.y|0)+0.5 ];

        var oldP = p;
        var bridgeWidth = null;
        var bridgeCode  = null;

        var lastVertexNode=null;

        for (i = 1; i < ps.getSize(); i++) {
			p = ps.get(i);

			// line goes from right->left.
            if (oldP.x > p.x) {
                intersectionForCalc=intersectionsDESC;
                bridgeCode = this.bridge_RL;
                bridgeWidth = -this.bridgeRadius;
            }
            // line goes from left->right
            else{
                intersectionForCalc=intersectionsASC;
                bridgeCode = this.bridge_LR;
                bridgeWidth = this.bridgeRadius;
            }

            // add a bridge or a vertex node depending to the intersection connection
            //
            // bridge   => the connections didn't have a common port
            // vertex => the connections did have a common source or target port
            //
            intersectionForCalc.each((ii, interP)=> {
               if (draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {

                    // It is a vertex node..
                    //
    			     if(conn.sharingPorts(interP.other)){
    			        let other = interP.other;
                  let otherZ = other.getZOrder();
                  let connZ = conn.getZOrder();
                  if(connZ<otherZ){
                    var vertexNode=conn.canvas.paper.ellipse(interP.x,interP.y, this.vertexRadius, this.vertexRadius).attr({fill:conn.lineColor.hash()});
                    conn.vertexNodes.push(vertexNode);
        				    // we found a vertex node. In this case an already existing connection did draw the connection.
        				    //
        			        if(this.abortRoutingOnFirstVertexNode===true){
            				    if(conn.getSource()==other.getSource()|| conn.getSource()==other.getTarget()){
            				        path = [ "M", (interP.x|0)+0.5, " ", (interP.y|0)+0.5 ];
            				        if(lastVertexNode!==null){
                                        lastVertexNode.remove();
            				            conn.vertexNodes.exclude(lastVerteNode);
            				        }
            				    }
                                lastVertexNode = vertexNode;
        			        }
                        }
    			    }
                    // ..or a bridge. We draw only horizontal bridges. Just a design decision
                    //
    			    else if (p.y === interP.y) {
                        path.push(" L", ((interP.x - bridgeWidth)|0)+0.5, " ", (interP.y|0)+0.5);
                        path.push(bridgeCode);
    			    }
                }
			});

			path.push(" L", (p.x|0)+0.5, " ", (p.y|0)+0.5);
			oldP = p;
		}
		conn.svgPathString = path.join("");
	}
});
