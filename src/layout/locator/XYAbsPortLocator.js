import draw2d from '../../packages'
import extend from "../../util/extend";


/**
 * @class
 *
 * Create a locator for fixed x/y coordinate position. The port in the example below is
 * always 20px below of the top border.
 *
 *
 * @example
 *
 *    var figure =  new draw2d.shape.basic.Rectangle({x:130,y:30,width:100,height:60});
 *    figure.createPort("input", new draw2d.layout.locator.XYAbsPortLocator(0,20));
 *
 *    canvas.add(figure);
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 * @since 4.0.0
 */
draw2d.layout.locator.XYAbsPortLocator = draw2d.layout.locator.PortLocator.extend(
  /** @lends draw2d.layout.locator.XYAbsPortLocator.prototype */
  {

    NAME: "draw2d.layout.locator.XYAbsPortLocator",

    /**
     *
     * {@link draw2d.shape.node.Node}
     *
     * @param {Number} x the x coordinate of the port relative to the left of the parent
     * @param {Number} y the y coordinate of the port relative to the top of the parent
     */
    init: function (attr, setter, getter) {
      this.x = 0
      this.y = 0

      this._super(attr,
        extend({
          x: this.setX,
          y: this.setY
        }, setter),
        extend({
          x: this.getX,
          y: this.getY
        }, getter))

    },

    /**
     * Set the X Offset for the Locator
     * @param {Number} x
     */
    setX: function (x) {
      this.x = x
    },

    /**
     * Set the y-offset of the locator
     *
     * @param {Number} y
     */
    setY: function (y) {
      this.y = y
    },

    /**
     * Get the X-Offset of the Locator
     *
     * @returns {Number}
     */
    getX: function(){
      return this.x
    },

    /**
     * Returns the Y-Offset of the Locator
     *
     * @returns {Number}
     */
    getY: function(){
      return this.y
    },

    /**
     *
     * Controls the location of an {@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
      this.applyConsiderRotation(figure, this.x, this.y)
  }

  })



