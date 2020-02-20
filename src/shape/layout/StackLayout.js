import draw2d from '../../packages'
import extend from '../../util/extend'


/**
 * @class
 * Using the StackLayout as their layout shape have their children placed on top of one another.
 * Order of placement is determined by the order in which the children were added, first child
 * added placed on the bottom. Only one child is visible at once.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
draw2d.shape.layout.StackLayout = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.layout.StackLayout.prototype */
  {
  
  NAME: "draw2d.shape.layout.StackLayout",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.visibleLayer = 0
    this.locator = new draw2d.layout.locator.XYAbsPortLocator(0, 0)

    this._super(
      extend({resizeable: true, width: 10, height: 10}, attr),
      extend({}, setter),
      extend({}, getter))

    this.resizeListener = function (figure) {
    }
    // install default selection handler. Can be overridden or replaced
    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
  },

  /**
   *
   * Set the current visible layer of the stack layout
   *
   * @param {Number} visibleLayer
   */
  setVisibleLayer: function (visibleLayer, duration) {
    this.getChildren().get(this.visibleLayer).setVisible(false, duration)
    this.visibleLayer = Math.min(this.getChildren().getSize() - 1, Math.max(0, visibleLayer))

    this.getChildren().get(this.visibleLayer).setVisible(true, duration)
    return this
  },

  /**
   *
   * Returns the current visible layer
   *
   * @returns {Number}
   */
  getVisibleLayer: function () {
    return this.visibleLayer
  },

  /**
   * @inheritdoc
   */
  add: function (child, locator, index) {
    // the child didn'T care about events...at the moment
    //
    child.hitTest = function () {
      return false
    }

    // make all existing shapes invisible
    //
    this.getChildren().each(function (i, c) {
      c.setVisible(false)
    })
    this.visibleLayer = this.getChildren().getSize()

    // ignore the parameter "locator" and use the locator for the stack layout instead
    return this._super(child, this.locator, index)
  },

  /**
   * @inheritdoc
   */
  setVisible: function (flag) {
    draw2d.shape.basic.Rectangle.prototype.setVisible.call(this, flag)


    return this
  },


  /**
   * @inheritdoc
   */
  getMinWidth: function () {
    let markup = (this.stroke * 2) + this.padding.left + this.padding.right
    let width = 10
    this.children.each(function (i, e) {
      width = Math.max(width, e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth())
    })
    return width + markup
  },

  /**
   * @inheritdoc
   */
  getMinHeight: function () {
    let markup = (this.stroke * 2) + this.padding.top + this.padding.bottom
    let height = 10
    this.children.each(function (i, e) {
      height = Math.max(height, e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight())
    })
    return height + markup
  },

  /**
   * @inheritdoc
   */
  setDimension: function (w, h) {
    this._super(w, h)

    let width = this.width - this.padding.left - this.padding.right
    let height = this.height - this.padding.top - this.padding.bottom
    if (width === this._recursiveWidth && height === this._recursiveHeight) {
      return this
    }
    this._recursiveHeight = height
    this._recursiveWidth = width

    this.children.each(function (i, e) {
      if (e.figure.isResizeable()) {
        e.figure.setDimension(width, height)
      }
    })

    delete this._recursiveHeight
    delete this._recursiveWidth

    return this
  }

})



