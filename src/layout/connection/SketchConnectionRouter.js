/**
 * @class draw2d.layout.connection.SketchConnectionRouter
 *
 * Provide a router which routes the connection in a hand drawn manner.
 *
 *     @example preview small frame
 *
 *     let createConnection=function(){
 *        let con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.SketchConnectionRouter());
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
 *     let f1 = new draw2d.shape.analog.OpAmp({x:10, y:10});
 *     let f2 = new draw2d.shape.analog.ResistorVertical({angle:90, height:20, x:300, y:150});
 *
 *     // ...add it to the canvas
 *     //
 *     canvas.add( f1);
 *     canvas.add( f2);
 *
 *     // first Connection
 *     //
 *     let c = createConnection();
 *     c.setSource(f1.getOutputPort(0));
 *     c.setTarget(f2.getHybridPort(0));
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 * @since 2.7.2
 * @extends  draw2d.layout.connection.MazeConnectionRouter
 */
import draw2d from '../../packages'

draw2d.layout.connection.SketchConnectionRouter = draw2d.layout.connection.MazeConnectionRouter.extend({
  NAME: "draw2d.layout.connection.SketchConnectionRouter",


  /**
   * @constructor
   * Creates a new Router object.
   *
   */
  init: function () {
    this._super()

    this.useSpline = true
    this.useShift = 5
    this.useSimplifyValue = 0.2
    this.finder = new PF.JumpPointFinder({allowDiagonal: false, dontCrossCorners: true})
  },

  /**
   * @method
   * Callback method if the router has been assigned to a connection.
   *
   * @param {draw2d.Connection} connection The assigned connection
   * @since 2.7.2
   */
  onInstall: function (connection) {
    connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy())

  }

})
