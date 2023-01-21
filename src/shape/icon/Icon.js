import draw2d from '../../packages'


/**
 * @class
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.SetFigure
 */
draw2d.shape.icon.Icon = draw2d.SetFigure.extend(
  /** @lends draw2d.shape.icon.Icon.prototype */
  {

  NAME: "draw2d.shape.icon.Icon",

  /**
   *
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({
      width: 50,
      height: 50,
      color:"#333333",
      bgColor:null
    }, attr), setter, getter)
    this.keepAspectRatio = false
  },

  /**
   * 
   * propagate all attributes like color, stroke,... to the shape element
   **/
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes ??= {}

    this.svgNodes?.attr({fill: this.color.rgba(), stroke: "none"})

    this._super(attributes)
  },

  applyTransformation: function () {
    let trans = []

    if (this.rotationAngle !== 0) {
      trans.push("R" + this.rotationAngle)
    }

    if (this.getRotationAngle() === 90 || this.getRotationAngle() === 270) {
      let ratio = this.getHeight() / this.getWidth()
      trans.push("T" + (-this.offsetY) + "," + (-this.offsetX))
      trans.push("S" + ratio + "," + 1 / ratio + ",0,0")
    }
    else {
      trans.push("T" + (-this.offsetX) + "," + (-this.offsetY))

    }
    if (this.isResizeable() === true) {
      trans.push(
        "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
        "S" + this.scaleX + "," + this.scaleY + "," + this.getAbsoluteX() + "," + this.getAbsoluteY()
      )
    }
    else {
      trans.push("T" + this.getAbsoluteX() + "," + this.getAbsoluteY())
    }

    this.svgNodes.transform(trans.join(" "))

    return this
  },

  /**
   * @private
   */
  createShapeElement: function () {
    let shape = this._super()

    let bb = this.svgNodes.getBBox()

    this.offsetX = bb.x
    this.offsetY = bb.y

    return shape
  }
})

