import draw2d from '../../packages'
import extend from '../../util/extend'
/**
 * @class
 *
 * Small data line diagram.
 *
 *
 * @example
 *
 *     let testData = [];
 *     for(let i=0;i<100;i++) {
 *       testData.push(Math.floor(Math.random() * 100));
 *     }
 *
 *     let sparkline = new draw2d.shape.diagram.Sparkline({
 *     	data: testData,
 *      width:150,
 *      height:50,
 *      x:100,
 *      y:60
 *     });
 *
 *     canvas.add( sparkline);
 *
 * @param {Object} [attr] the configuration of the shape
 * @extends draw2d.shape.diagram.Diagram
 */
draw2d.shape.diagram.Sparkline = draw2d.shape.diagram.Diagram.extend(
  /** @lends draw2d.shape.diagram.Sparkline */
  {

  NAME : "draw2d.shape.diagram.Sparkline",

  init: function (attr, setter, getter) {
    this.min = 0
    this.max = 10
    this.padding = 4

    this._super(extend({width: 180, height: 50}, attr), setter, getter)
  },

  /**
   * @inheritdoc
   */
  setData: function (data) {
    if (data.length > 0) {
      // get the min/max from an array and not only from two elements..
      this.min = Math.min(...data)
      this.max = Math.max(...data)
    }
    else {
      this.min = 0
      this.max = 1
    }

    if (this.max == this.min) {
      this.max = this.min + 1
    }

    this._super(data)
    this.fireEvent("change:data", {value: data})

    return this
  },

  /**
   * @inheritdoc
   */
  createSet: function () {
    return this.canvas.paper.path("M0 0 l0 0")
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes = attributes || {}

    attributes.fill = "90-#000:5-#4d4d4d:95"

    let padding = this.padding
    let width = this.getWidth() - 2 * padding
    let height = this.getHeight() - 2 * padding
    let length = this.data.length
    let min = this.min
    let max = this.max
    let toCoords = function (value, idx) {
      let step = 1
      // avoid divisionByZero
      if (length > 1) {
        step = (width / (length - 1))
      }

      return {
        y: -((value - min) / (max - min) * height) + height + padding,
        x: padding + idx * step
      }
    }

    if (this.svgNodes !== null && (typeof this.cache.pathString === "undefined")) {
      let prev_pt = null
      this.data.forEach((item, idx) => {
        let pt = toCoords(item, idx)
        if (prev_pt === null) {
          this.cache.pathString = ["M", pt.x, pt.y].join(" ")
        }
        else {
          this.cache.pathString = [this.cache.pathString, "L", pt.x, pt.y].join(" ")
        }
        prev_pt = pt
      })

      this.svgNodes.attr({path: this.cache.pathString, stroke: "#f0f0f0"})

    }
    this._super(attributes)

    return this
  }
})
