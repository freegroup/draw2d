/**
 * @class draw2d.SetFigure
 *
 * A SetFigure is a composition of different SVG elements.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */

import draw2d from 'packages'
import extend from 'util/extend'

draw2d.SetFigure = draw2d.shape.basic.Rectangle.extend({

  NAME: "draw2d.SetFigure",

  /**
   * @constructor
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // collection of SVG DOM nodes
    this.svgNodes = null

    this.originalWidth = null
    this.originalHeight = null

    this.scaleX = 1
    this.scaleY = 1

    this.strokeScale = true // scale the stroke width of the children nodes if the parent resize

    this._super(extend({stroke: 0, bgColor: null}, attr), setter, getter)
  },

  /**
   * @method
   * Set/Reset the canvas for the element.
   *
   * @param {draw2d.Canvas} canvas the canvas to use
   */
  setCanvas: function (canvas) {
    // remove the shape if we reset the canvas and the element
    // was already drawn
    if (canvas === null && this.svgNodes !== null) {
      this.svgNodes.remove()
      this.svgNodes = null
    }

    this._super(canvas)
  },


  /**
   * @method
   * Set the css class if the node.
   *
   * @param {String} cssClass the new css class name of the node
   * @since 2.9.0
   */
  setCssClass: function (cssClass) {
    this._super(cssClass)

    if (this.svgNodes === null) {
      return this
    }

    if (this.cssClass === null) {
      this.svgNodes.forEach(function (e) {
        e.node.removeAttribute("class")
      })
    }
    else {
      this.svgNodes.forEach(function (e) {
        e.node.setAttribute("class", cssClass)
      })
    }

    return this
  },


  /**
   * @method
   * propagate all attributes like color, stroke,... to the shape element and
   * repaint them.
   *
   * @protected
   **/
  repaint: function (attributes) {
    // repaint can be blocked during deserialization and if the shape
    // not part of any canvas.
    //
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    if (this.originalWidth !== null) {
      this.scaleX = this.width / this.originalWidth
      this.scaleY = this.height / this.originalHeight
    }

    attributes = attributes || {}

    this.applyAlpha()

    this._super(attributes)
  },

  /**
   * @inheritdoc
   */
  setVisible: function (flag, duration) {
    this._super(flag, duration)

    if (this.svgNodes !== null) {
      if (duration) {
        if (this.visible === true) {
          this.svgNodes.forEach( (shape) =>{
            $(shape.node).fadeIn(duration, ()=>shape.show())
          })
        }
        else {
          this.svgNodes.forEach( (shape) =>{
            $(shape.node).fadeOut(duration, () => shape.hide())
          })
        }
      }
      else {
        if (this.visible === true) {
          this.svgNodes.show()
        }
        else {
          this.svgNodes.hide()
        }
      }
    }
  },

  /**
   * @method
   * Apply the opacity to all child set elements. Override this if you want to avoid opacity changes.
   * @private
   *
   */
  applyAlpha: function () {
    this.svgNodes.attr({opacity: this.alpha})
  },

  /**
   * @private
   */
  applyTransformation: function () {
    let s =
      "S" + this.scaleX + "," + this.scaleY + ",0,0 " +
      "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
      "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
      ""
    this.svgNodes.transform(s)
    if (this.rotationAngle === 90 || this.rotationAngle === 270) {
      let before = this.svgNodes.getBBox(true)
      let ratio = before.height / before.width
      let reverseRatio = before.width / before.height
      let rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2)
      this.svgNodes.transform(rs)
    }

    return this
  },

  /**
   * @method
   * Moves the element so it is the closest to the viewer’s eyes, on top of other elements. Additional
   * the internal model changed as well.
   *
   * Optional: Inserts current object in front of the given one.
   *
   * @param {draw2d.Figure} [figure] move current object in front of the given one.
   * @since 3.0.0
   */
  toFront: function (figure) {
    ////////////////////////////////////////////////////////////////////
    // NOTE: the code has a complete different order of draw2d.Figure.
    //       we must respect the svgNodes here
    ////////////////////////////////////////////////////////////////////

    // ensure that the z-oder is still correct if the figure is assigned
    // to a StrongComposite
    //
    if (this.composite instanceof draw2d.shape.composite.StrongComposite && (typeof figure !== "undefined")) {
      let indexFigure = figure.getZOrder()
      let indexComposite = this.composite.getZOrder()
      if (indexFigure < indexComposite) {
        figure = this.composite
      }
    }

    if (typeof figure === "undefined") {
      // bring the outer frame in front...
      this.getShapeElement().toFront()

      // and all inner children
      //
      if (this.svgNodes !== null) {
        this.svgNodes.toFront()
      }

      if (this.canvas !== null) {
        let figures = this.canvas.getFigures()
        let lines = this.canvas.getLines()
        if (figures.remove(this) !== null) {
          figures.add(this)
        } else if (lines.remove(this) !== null) {
          lines.add(this)
        }
      }
    }
    else {
      // Bring the SVG shapes between the "figure" and the container of this shape
      //
      if (this.svgNodes !== null) {
        this.svgNodes.insertAfter(figure.getTopLevelShapeElement())
      }
      this.getShapeElement().insertAfter(figure.getTopLevelShapeElement())

      if (this.canvas !== null) {
        let figures = this.canvas.getFigures()
        let lines = this.canvas.getLines()
        if (figures.remove(this) !== null) {
          let index = figures.indexOf(figure)
          figures.insertElementAt(this, index + 1)
        } else if (lines.remove(this) !== null) {
          lines.add(this)
        }
      }
    }


    // bring all children in front of the parent
    //
    this.children.each(function (i, child) {
      child.figure.toFront(figure)
    })

    // the ports are always on top
    //
    let _this = this
    this.getPorts().each(function (i, port) {
      port.getConnections().each(function (i, connection) {
        connection.toFront(figure)
      })
      // a port should always be in front of the shape doesn't matter what the
      // "figure" parameter says.
      //
      port.toFront(_this)
    })

    // and last but not lease the ResizeHandles if any present
    //
    this.selectionHandles.each(function (i, handle) {
      handle.toFront()
    })

    return this
  },

  /**
   * @method
   * Moves the element to the background. Additional
   * the internal model changed as well.
   *
   * Optional: Inserts current object in front of the given one.
   *
   * @param {draw2d.Figure} [figure] move current object in front of the given one.
   * @since 4.7.2
   */
  toBack: function (figure) {
    // it is not allowed that a figure is behind the assigned composite
    //
    if (this.composite instanceof draw2d.shape.composite.StrongComposite) {
      this.toFront(this.composite)
      return
    }

    // sort the JSON Doc
    //
    if (this.canvas !== null) {
      let figures = this.canvas.getFigures()
      let lines = this.canvas.getLines()
      if (figures.remove(this) !== null) {
        figures.insertElementAt(this, 0)
      }
      else if (lines.remove(this) !== null) {
        lines.insertElementAt(this, 0)
      }
    }

    // bring all children figures in front of the parent
    // run reverse to the collection to care about the z-order of the children)
    this.children.each(function (i, child) {
      child.figure.toBack(figure)
    }, true)

    if (this.svgNodes !== null) {
      if (typeof figure !== "undefined") {
        this.svgNodes.insertBefore(figure.getShapeElement())
      }
      else {
        this.svgNodes.toBack()
      }
    }


    if (this.canvas !== null) {
      if (typeof figure !== "undefined") {
        this.getShapeElement().insertBefore(figure.getShapeElement())
      }
      else {
        this.getShapeElement().toBack()
      }
    }

    // and last but not least - the ports are always on top
    //
    let _this = this
    this.getPorts().each(function (i, port) {
      port.getConnections().each(function (i, connection) {
        connection.toFront(_this)
      })
      // a port should always be in front of the shape doesn't matter what the
      // "figure" parameter says.
      //
      port.toFront(_this)
    })

    return this
  },


  /**
   * @inheritdoc
   */
  getTopLevelShapeElement: function () {
    if (this.svgNodes.length === 0) {
      return this.shape
    }
    return this.svgNodes
  },

  /**
   * @private
   */
  createShapeElement: function () {
    // NOTE: don't change the order of the two calls. This defines the z-oder in the canvas.
    // The "set" must always be on top.
    let shape = this.canvas.paper.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
    this.svgNodes = this.createSet()

    // check if the element is a "set" or a simple raphael shape. otherwise we wrap them into a set
    //
    if (typeof this.svgNodes.forEach === "undefined") {
      let set = this.canvas.paper.set()
      set.push(this.svgNodes)
      this.svgNodes = set
    }

    this.svgNodes.attr({"stroke-scale": this.strokeScale})

    // update the visibility of the children
    this.setVisible(this.visible)

    // propagate the CSS style to all set elements
    this.setCssClass(this.cssClass)

    let bb = this.svgNodes.getBBox()
    this.originalWidth = bb.width
    this.originalHeight = bb.height

    return shape
  },

  /**
   * @method
   * Override this method to add your own SVG elements. See {@link draw2d.shape.basic.Label} as example.
   *
   * @template
   */
  createSet: function () {
    return this.canvas.paper.set() // return empty set as default;
  }

})
