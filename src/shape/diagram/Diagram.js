import draw2d from '../../packages'

/**
 * @class
 *
 * Base class for all diagrams.
 *
 * @param {Object} [attr] the configuration of the shape
 * @extends draw2d.SetFigure
 */
draw2d.shape.diagram.Diagram = draw2d.SetFigure.extend(
  /** @lends draw2d.shape.diagram.Diagram */
  {

  init: function (attr, setter, getter) {
    this.data = []
    this.cache = {}

    this._super(
      {
        data: [], 
        bgColor: "#8dabf2", 
        stroke: 1, 
        color: "#f0f0f0", 
        radius: 2, 
        resizeable: true,
        ...attr},
      {
        // @attr {Array} data the data to display in the diagram */
        data: this.setData,
        ...setter
      },
      {
        data: this.getData,
        ...getter
      }
    )
  },

  /**
   * 
   * Set the data for the chart/diagram element
   *
   * @param {Array} data
   *
   */
  setData: function (data) {
    this.data = data
    this.cache = {}


    if (this.svgNodes !== null) {
      this.svgNodes.remove()
      this.svgNodes = this.createSet()
    }

    this.repaint()
    this.fireEvent("change:data", {value: data})

  },

  /**
   * 
   * Return the data of the diagram
   *
   * @since 5.0.0
   */
  getData: function () {
    return this.data
  },


  /**
   * 
   * Set the dimension of the diagram and reset the cached calculation
   *
   * @since 5.0.0
   */
  setDimension: function (w, h) {
    this.cache = {}
    this._super(w, h)

    return this
  },


  /**
   * 
   * Return the calculate width of the set. This calculates the bounding box of all elements.
   *
   * @returns {Number} the calculated width of the label
   **/
  getWidth: function () {
    return this.width
  },

  /**
   * 
   * Return the calculated height of the set. This calculates the bounding box of all elements.
   *
   * @returns {Number} the calculated height of the label
   */
  getHeight: function () {
    return this.height
  },

  /**
   *
   * @param attributes
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape == null) {
      return this
    }

    attributes ??= {}

    attributes.fill ??= "none"

    return this._super(attributes)
  },

  applyTransformation: function () {
    if (this.isResizeable() === true) {
      this.svgNodes.transform("S" + this.scaleX + "," + this.scaleY + "," + this.getAbsoluteX() + "," + this.getAbsoluteY() + "t" + this.getAbsoluteX() + "," + this.getAbsoluteY())
    }
    else {
      this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY())
    }

    return this
  }


})
