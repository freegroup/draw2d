/**
 * @class draw2d.shape.basic.Circle
 * A circle figure with basic background and stroke API. <br>
 * A circle can not be streched. <strong>The aspect ration is always 1:1</strong>.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let shape =  new draw2d.shape.basic.Circle({x:40,y:10, stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});
 *
 *     canvas.add(shape);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Oval
 */
import draw2d from '../../packages'
import extend from '../../util/extend'

draw2d.shape.basic.Circle = draw2d.shape.basic.Oval.extend({

  NAME: "draw2d.shape.basic.Circle",

  /**
   * @constructor
   * Create a new circle figure.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(
      attr,
      extend({
        /** @attr {Number} diameter the diameter of the circle */
        diameter: this.setDiameter,
        /** @attr {Number} radius the radius of the circle */
        radius: this.setRadius
      }, setter),
      extend({
        diameter: this.getDiameter,
        radius: this.getRadius
      }, getter))

    this.setKeepAspectRatio(true)
  },

  /**
   * @method
   * Set the diameter of the circle. The center of the circle will be retained.
   *
   * @param {Number} d The new diameter of the circle.
   * @since 4.0.0
   **/
  setDiameter: function (d) {
    let center = this.getCenter()
    this.setDimension(d, d)
    this.setCenter(center)
    this.fireEvent("change:diameter", {value: d})

    return this
  },

  /**
   * @method
   * Get the diameter of the circle.
   *
   * @since 4.0.0
   **/
  getDiameter: function () {
    return this.getWidth()
  },


  /**
   * @method
   * Set the radius of the circle. The center of the circle will be retained.
   *
   * @param {Number} d The new radius of the circle.
   * @since 4.0.0
   **/
  setRadius: function (r) {
    this.setDiameter(r * 2)
    this.fireEvent("change:radius", {value: r})

    return this
  },

  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    let memento = this._super()
    // delete the radius attribute of the parent. Because the "radius" is the corner radius
    // of the shape and not the "radius" of the circle. Design flaw.  :-/
    delete memento.radius

    return memento
  }

})
