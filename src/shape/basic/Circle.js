import draw2d from '../../packages'
import extend from '../../util/extend'

/**
 * @class
 * A circle figure with basic background and stroke API. <br>
 * A circle can not be streched. <strong>The aspect ration is always 1:1</strong>.
 *
 *
 * @example
 *
 * let shape =  new draw2d.shape.basic.Circle({x:40,y:10, stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});
 *
 * canvas.add(shape);
 *
 *
 * @author Andreas Herz
 * @param {Object} [attr] the configuration of the shape
 * @param {Object} [setter] add or replace setter methods
 * @param {Object} [getter] add or replace getter methods
 * @extends draw2d.shape.basic.Oval
 */
draw2d.shape.basic.Circle = draw2d.shape.basic.Oval.extend(
  /** @lends draw2d.shape.basic.Circle.prototype */
  {

    NAME: "draw2d.shape.basic.Circle",

    init: function (attr, setter, getter) {
      this._super(
        attr,
        extend({
          // @attr {Number} diameter the diameter of the circle */
          diameter: this.setDiameter,
          // @attr {Number} radius the radius of the circle */
          radius: this.setRadius
        }, setter),
        extend({
          diameter: this.getDiameter,
          radius: this.getRadius
        }, getter))

      this.setKeepAspectRatio(true)
    },

    /**
     *
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
     *
     * Get the diameter of the circle.
     *
     * @since 4.0.0
     **/
    getDiameter: function () {
      return this.getWidth()
    },


    /**
     *
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
