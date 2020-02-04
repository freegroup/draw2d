import draw2d from '../../packages'
import extend from '../../util/extend'

/**
 * @class
 * A Rectangle Figure.
 *
 * See the example:
 *
 * @example
 *
 *     let rect1 =  new draw2d.shape.basic.Rectangle({
 *     	x:10,
 *      y:10
 *     });
 *
 *     let rect2 =  new draw2d.shape.basic.Rectangle({
 *       x: 100,
 *       y: 10,
 *       bgColor: "#f0f000",
 *       alpha  : 0.7,
 *       width: 100,
 *       height: 60,
 *       radius: 10
 *     });
 *
 *     canvas.add(rect1);
 *     canvas.add(rect2);
 *
 *     canvas.setCurrentSelection(rect2);
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Rectangle = draw2d.VectorFigure.extend(
  /** @lends draw2d.shape.basic.Rectangle.prototype */
  {

  NAME: "draw2d.shape.basic.Rectangle",

  /**
   * Creates a new figure element which are not assigned to any canvas.
   * @constructor
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.dasharray = null

    this._super(
      extend({bgColor: "#a0a0a0", color: "#1B1B1B"}, attr),
      extend({}, {
        /** @attr {String} dash The dot/dash pattern for the line style. Valid values: ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]*/
        dash: this.setDashArray,
        /** @attr {String} dasharray The dot/dash pattern for the line style. Valid values: ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]*/
        dasharray: this.setDashArray
      }, setter),
      extend({}, {
        dash: this.getDashArray,
        dasharray: this.getDashArray
      }, getter)
    )
  },

  /**
   * @inheritdoc
   **/
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes = extend({}, {
      width: this.getWidth(),
      height: this.getHeight(),
      r: this.getRadius()
    }, attributes)

    if (this.dasharray !== null) {
      attributes["stroke-dasharray"] = this.dasharray
    }

    this._super(attributes)

    return this
  },

  /**
   * @inheritdoc
   */
  applyTransformation: function () {
    let ts = "R" + this.rotationAngle

    if (this.getRotationAngle() === 90 || this.getRotationAngle() === 270) {
      let ratio = this.getHeight() / this.getWidth()
      ts = ts + "S" + ratio + "," + 1 / ratio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
    }

    this.shape.transform(ts)

    return this
  },

  /**
   * @inheritdoc
   */
  createShapeElement: function () {
    return this.canvas.paper.rect(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight())
  },


  /**
   *
   * Set the line style for dot/dash styling. Possible values are
   * ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
   *
   *      // Alternatively you can use the attr method:
   *      figure.attr({
   *        dash: pattern
   *      });
   *
   * @param {String} pattern the string with the dot/dash pattern. valid values: ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
   */
  setDashArray: function (pattern) {
    this.dasharray = pattern
    this.repaint()
    this.fireEvent("change:dashArray", {value: this.dasharray})

    return this
  },

  /**
   *
   * Get the line style for this object.
   *
   *      // Alternatively you can use the attr method:
   *      figure.attr("dash");
   *
   * @since 5.1.0
   */
  getDashArray: function () {
    return this.dasharray
  },

  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    let memento = this._super()

    if (this.dasharray !== null) {
      memento.dasharray = this.dasharray
    }

    return memento
  },


  /**
   * @inheritdoc
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.dasharray === "string") {
      this.dasharray = memento.dasharray
    }

    return this
  }

})
