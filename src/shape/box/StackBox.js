import draw2d from '../../packages'

/**
 * @class
 * Stack Layout - Children are placed on top of one another.
 * Only one child is visible at a time.
 * 
 * Based on draw2d.shape.layout.StackLayout but using the Box base class.
 * 
 * @example
 *    let stack = new draw2d.shape.box.StackBox();
 *    stack.add(new draw2d.shape.basic.Rectangle({bgColor: "red"}));
 *    stack.add(new draw2d.shape.basic.Rectangle({bgColor: "blue"}));
 *    stack.setVisibleLayer(0); // Show first child
 *    canvas.add(stack, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
draw2d.shape.box.StackBox = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.box.StackBox.prototype */
  {

  NAME: "draw2d.shape.box.StackBox",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.visibleLayer = 0
    this.locator = new draw2d.layout.locator.XYAbsPortLocator(0, 0)

    this._super(
      {resizeable: true, width: 10, height: 10, ...attr},
      {...setter},
      {...getter}
    )

    this.resizeListener = () => {}

    // Use default selection policy
    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
  },

  /**
   * Set the visible layer index.
   * 
   * @param {Number} index - Layer index (0-based), or -1 to hide all
   * @param {Number} [duration] - Animation duration in ms
   * @returns {this}
   */
  setVisibleLayer: function(visibleLayer, duration) {
    if (this.visibleLayer >= 0) {
      this.getChildren().get(this.visibleLayer).setVisible(false, duration)
    }
    this.visibleLayer = Math.min(this.getChildren().getSize() - 1, Math.max(-1, visibleLayer))

    if (this.visibleLayer >= 0) {
      this.getChildren().get(this.visibleLayer).setVisible(true, duration)
    }
    return this
  },

  /**
   * Get the current visible layer index.
   * @returns {Number}
   */
  getVisibleLayer: function() {
    return this.visibleLayer
  },

  /**
   * Add a child to the stack.
   * New child becomes the visible layer.
   * 
   * @param {draw2d.Figure} child
   * @param {draw2d.layout.locator.Locator} [locator] - Ignored (stack manages position)
   * @param {Number} [index]
   * @returns {this}
   */
  add: function(child, locator, index) {
    // Stack children don't receive hit events
    child.hitTest = () => false

    // Hide all existing children
    this.getChildren().each((i, c) => {
      c.setVisible(false)
    })
    this.visibleLayer = this.getChildren().getSize()

    // Ignore the parameter "locator" and use the locator for the stack layout instead
    return this._super(child, this.locator, index)
  },

  /**
   * Override setVisible to NOT propagate to children.
   * Stack manages child visibility itself.
   */
  setVisible: function(flag) {
    draw2d.shape.basic.Rectangle.prototype.setVisible.call(this, flag)
    return this
  },

  /**
   * @inheritdoc
   */
  getMinWidth: function() {
    let markup = (this.stroke * 2) + this.padding.left + this.padding.right
    let width = 10
    this.children.each((i, e) => {
      width = Math.max(width, e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth())
    })
    return width + markup
  },

  /**
   * @inheritdoc
   */
  getMinHeight: function() {
    let markup = (this.stroke * 2) + this.padding.top + this.padding.bottom
    let height = 10
    this.children.each((i, e) => {
      height = Math.max(height, e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight())
    })
    return height + markup
  },

  /**
   * @inheritdoc
   */
  setDimension: function(w, h) {
    this._super(w, h)

    let width = this.width - this.padding.left - this.padding.right
    let height = this.height - this.padding.top - this.padding.bottom
    if (width === this._recursiveWidth && height === this._recursiveHeight) {
      return this
    }
    this._recursiveHeight = height
    this._recursiveWidth = width

    this.children.each((i, e) => {
      if (e.figure.isResizeable()) {
        e.figure.setDimension(width, height)
      }
    })

    delete this._recursiveHeight
    delete this._recursiveWidth

    return this
  }
})