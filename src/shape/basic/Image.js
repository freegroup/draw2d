/**
 * @class draw2d.shape.basic.Image
 * Simple Image shape.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.node.Node
 */
import draw2d from '../../packages'
import extend from '../../util/extend'


draw2d.shape.basic.Image = draw2d.shape.node.Node.extend(
  /** @lends draw2d.shape.basic.Image.prototype */
  {

  NAME: "draw2d.shape.basic.Image",

  /**
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(attr,
      extend({
        // @attr {String} path the image path (absolute or relative) of the shape */
        path: this.setPath
      }, setter),
      extend({
        path: this.getPath
      }, getter))
  },


  /**
   * 
   * Set the image path attribute of the Image shape and repaint them.
   * The path can be relative or absolute
   *
   * @param path
   * @since 2.8.0
   */
  setPath: function (path) {
    this.path = path

    if (this.shape !== null) {
      this.shape.attr({src: this.path})
    }
    this.fireEvent("change:path", {value: this.path})

    return this
  },

  /**
   * 
   * Return the image path attribute of the shape.
   *
   * @returns {String}
   * @since 2.8.0
   */
  getPath: function () {
    return this.path
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return this
    }

    attributes = attributes || {}

    attributes.x = this.getAbsoluteX()
    attributes.y = this.getAbsoluteY()
    attributes.width = this.getWidth()
    attributes.height = this.getHeight()
    attributes.src = this.path

    // propagate the width/height and the display:inline-block as CSS attribute as well because Chrome
    // did some "flickering" in some versions and sometimes the image disappear complete
    $(this.shape.node).css({display: "inline-block", "width": attributes.width, "height": attributes.height})

    this._super(attributes)

    return this
  },

  /**
   * @inheritdoc
   */
  createShapeElement: function () {
    return this.canvas.paper.image(this.path, this.getX(), this.getY(), this.getWidth(), this.getHeight())
  },


  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    return extend(this._super(), {
      path: this.path
    })
  },

  /**
   * @inheritdoc
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)
    if (typeof memento.path !== "undefined") {
      this.setPath(memento.path)
    }
  }

})

