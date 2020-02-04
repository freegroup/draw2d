/**
 * @class draw2d.shape.diagram.Diagram
 *
 * Base class for all diagrams.
 *
 * @extends draw2d.SetFigure
 */

import draw2d from '../../packages'
import extend from '../../util/extend'
import jsonUtil from '../../util/JSONUtil'

draw2d.shape.diagram.Diagram = draw2d.SetFigure.extend({

  /**
   * @constructs
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.data = []
    this.cache = {}

    this._super(
      extend({data: [], bgColor: "#8dabf2", stroke: 1, color: "#f0f0f0", radius: 2, resizeable: true}, attr),
      extend({}, {
        /** @attr {Array} data the data to display in the diagram */
        data: this.setData
      }, setter),
      extend({}, {
        data: this.getData
      }, getter)
    )
  },

  /**
   * @method
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
   * @method
   * Return the data of the diagram
   *
   * @since 5.0.0
   */
  getData: function () {
    return this.data
  },


  /**
   * @method
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
   * @method
   * Return the calculate width of the set. This calculates the bounding box of all elements.
   *
   * @return {Number} the calculated width of the label
   **/
  getWidth: function () {
    return this.width
  },

  /**
   * @method
   * Return the calculated height of the set. This calculates the bounding box of all elements.
   *
   * @return {Number} the calculated height of the label
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

    attributes = attributes || {}

    jsonUtil.ensureDefault(attributes, "fill", "none")

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
