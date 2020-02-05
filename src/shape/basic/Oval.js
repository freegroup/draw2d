import draw2d from '../../packages'
import extend from '../../util/extend'


/**
 * @class draw2d.shape.basic.Oval
 * Oval figure.
 *
 *
 *
 * @example
 *
 *     let oval =  new draw2d.shape.basic.Oval({width:150, height:100, x:50, y:10});
 *
 *     canvas.add(oval);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Oval = draw2d.VectorFigure.extend(
  /** @lends draw2d.shape.basic.Oval.prototype */
  {

    NAME: "draw2d.shape.basic.Oval",

    /**
     *
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
      this._super(
        extend({
          bgColor: "#C02B1D",
          color: "#1B1B1B"
        }, attr),
        extend({
          center: this.setCenter
        }, setter),
        getter)
    },


    /**
     * @template
     **/
    createShapeElement: function () {
      let halfW = this.getWidth() / 2
      let halfH = this.getHeight() / 2

      return this.canvas.paper.ellipse(this.getAbsoluteX() + halfW, this.getAbsoluteY() + halfH, halfW, halfH)
    },


    /**
     *
     * Get the center of the figure
     *
     */
    getCenter: function () {
      let w2 = this.getWidth() / 2
      let h2 = this.getHeight() / 2

      return this.getPosition().translate(w2, h2)
    },

    /**
     *
     * Set the center of the figure.
     *
     * @param {Number|draw2d.geo.Point} x the new x coordinate of the center or a draw2d.geo.Point object with the center
     * @param {Number} [y] the y coordinate of the new center of the first argument isn't a draw2d.geo.Point object
     */
    setCenter: function (x, y) {
      let pos = new draw2d.geo.Point(x, y)
      let w2 = this.getWidth() / 2
      let h2 = this.getHeight() / 2

      pos.translate(-w2, -h2)
      this.setPosition(pos)

      this.fireEvent("change:center", {value: {x: x, y: y}})

      return this
    },


    /**
     * @inheritdoc
     *
     * @template
     **/
    repaint: function (attributes) {
      if (this.repaintBlocked === true || this.shape === null) {
        return
      }

      attributes = attributes || {}


      // don't override cx/cy if inherited class has set the center already.
      if (typeof attributes.rx === "undefined") {
        attributes.rx = this.width / 2
        attributes.ry = this.height / 2
      }

      // don't override cx/cy if inherited class has set the center already.
      if (typeof attributes.cx === "undefined") {
        attributes.cx = this.getAbsoluteX() + attributes.rx
        attributes.cy = this.getAbsoluteY() + attributes.ry
      }

      this._super(attributes)
    },

    /**
     *
     *
     *   NOTE: Rotation will need to be added to this function
     *
     **/
    intersectionWithLine: function (a1, a2) {
      let rx = this.getWidth() / 2
      let ry = this.getHeight() / 2

      let result = new draw2d.util.ArrayList()

      let origin = new draw2d.geo.Point(a1.x, a1.y)
      let dir = a2.subtract(a1)
      let center = new draw2d.geo.Point(this.getAbsoluteX() + rx, this.getAbsoluteY() + ry)
      let diff = origin.subtract(center)
      let mDir = new draw2d.geo.Point(dir.x / (rx * rx), dir.y / (ry * ry))
      let mDiff = new draw2d.geo.Point(diff.x / (rx * rx), diff.y / (ry * ry))

      let a = dir.dot(mDir)
      let b = dir.dot(mDiff)
      let c = diff.dot(mDiff) - 1.0
      let d = b * b - a * c

      if (d < 0) {
        // "Outside"
      } else if (d > 0) {
        let root = Math.sqrt(d)
        let t_a = (-b - root) / a
        let t_b = (-b + root) / a

        if ((t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b)) {
          if ((t_a < 0 && t_b < 0) || (t_a > 1 && t_b > 1)) {
            //"Outside";
          } else {
            //"Inside";
          }
        } else {
          if (0 <= t_a && t_a <= 1)
            result.add(a1.lerp(a2, t_a))
          if (0 <= t_b && t_b <= 1)
            result.add(a1.lerp(a2, t_b))
        }
      } else {
        let t = -b / a
        if (0 <= t && t <= 1) {
          result.add(a1.lerp(a2, t))
        } else {
          //"Outside";
        }
      }

      return result
    }

  })

