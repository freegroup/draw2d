
/**
 * @class draw2d.shape.dimetric.Rectangle
 * A Rectangle Figure in a dimetric perspective.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let d1 =  new draw2d.shape.dimetric.Rectangle({x:10,y:10});
 *     let d2 =  new draw2d.shape.dimetric.Rectangle({x:100,y:10, bgColor:"#f0f000", alpha:0.7, width:100, height:60});
 *
 *     canvas.add(d1);
 *     canvas.add(d2);
 *
 *     canvas.setCurrentSelection(d2);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Polygon
 */ import draw2d from '../../packages';
draw2d.shape.dimetric.Rectangle = draw2d.shape.basic.Polygon.extend({
    NAME : "draw2d.shape.dimetric.Rectangle",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) {
      this._super(extend({bgColor:"#00a3f6",color:"#1B1B1B"},attr), setter, getter);

      let pos = this.getPosition()

      this.resetVertices()

      let angle26 = Math.atan(.5);
      let cos30 = Math.cos(angle26);
      let sin30 = Math.sin(angle26);

      let box = this.getBoundingBox();
      let w  = box.w
      let h = box.h

      this.addVertex( 0                  , 0                ); // topLeft
      this.addVertex(  cos30*w           , sin30*w          ); // topRight
      this.addVertex(  cos30*w-cos30*h   , sin30*w + sin30*h); // bottomRight
      this.addVertex( -cos30*h           ,           sin30*h); // bottomLeft

      // override the selection handler from the polygon. Because the vertices of
      // the diamond are not selectable and modifiable
      //
      this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

      this.setPosition(pos);
    }
});
