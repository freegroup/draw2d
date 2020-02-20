import draw2d from '../../packages'


/**
 * @class draw2d.shape.analog.OpAmp
 * Hand drawn arrow which points down left
 *
 *
 * @example
 *    let figure =  new draw2d.shape.analog.OpAmp({x:10, y:10});
 *
 *    canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.OpAmp = draw2d.SVGFigure.extend(
  /** @lends draw2d.shape.analog.OpAmp.prototype */
  {

  NAME: "draw2d.shape.analog.OpAmp",

  // custom locator for the special design of the OpAmp Input area
  MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
    init: function () {
      this._super()
    },
    relocate: function (index, port) {
      let parent = port.getParent()
      let calcY = (8 + 18.5 * index) * parent.scaleY
      this.applyConsiderRotation(port, 1, calcY)
    }
  }),

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({stroke: 0, bgColor: "#f0f0ff"}, attr), setter, getter)

    this.inputLocator = new this.MyInputPortLocator()

    this.createPort("input", this.inputLocator)
    this.createPort("input", this.inputLocator)

    this.createPort("output")

  },


  /**
   * @inheritdoc
   */
  getSVG: function () {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50"  height="50">' +
      '<path d="m8.2627,0l0,35.36035l31.23926,-17.76025l-31.23926,-17.60011l0,0l0,0.00001zm2.27832,27.36719l4.08105,0m-2.10449,-2.20703l0,4.27979m2.26367,-21.35938l-4.15918,0"  stroke="#1B1B1B" fill="none"/>' +
      '<line x1="0.53516"  y1="8"  x2="8.21191"  y2="8"  stroke="#010101"/>' +
      '<line x1="39.14941" y1="18" x2="45.81055" y2="18" stroke="#010101" />' +
      '<line x1="0.53516"  y1="27" x2="8.21191"  y2="27" stroke="#010101" />' +
      '</svg>'
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes = attributes || {}

    // redirect the backgroundColor to an internal SVG node.
    // In this case only a small part of the shape are filled with the background color
    // and not the complete rectangle/bounding box
    //
    attributes["fill"] = "none"
    if (this.bgColor != null) {
      this.svgNodes[0].attr({fill: this.bgColor.rgba()})
    }

    this._super(attributes)

    return this
  }

})
