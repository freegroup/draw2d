import draw2d from '../../packages'

/**
 * @class
 * Stack Layout - Flutter's Stack equivalent.
 * 
 * Children are placed on top of each other, with only one visible at a time.
 * Use setVisibleLayer() to switch between children.
 * 
 * Flutter Equivalent: IndexedStack
 * - Shows only one child at a time
 * - Size is max of all children
 * 
 * @example
 *    let stack = new draw2d.shape.box.StackBox();
 *    stack.add(new draw2d.shape.basic.Rectangle({bgColor: "red"}));
 *    stack.add(new draw2d.shape.basic.Rectangle({bgColor: "blue"}));
 *    stack.setVisibleLayer(0); // Show first child
 *    canvas.add(stack, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.box.Box
 */
draw2d.shape.box.StackBox = draw2d.shape.box.Box.extend(
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

    this._super(
      {width: 10, height: 10, resizeable: true, ...attr},
      {...setter},
      {...getter}
    )

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
  setVisibleLayer: function(index, duration) {
    const childCount = this.children.getSize()
    
    // Hide current layer
    if (this.visibleLayer >= 0 && this.visibleLayer < childCount) {
      this.children.get(this.visibleLayer).figure.setVisible(false, duration)
    }
    
    // Update index (clamp to valid range)
    this.visibleLayer = Math.min(childCount - 1, Math.max(-1, index))
    
    // Show new layer
    if (this.visibleLayer >= 0) {
      this.children.get(this.visibleLayer).figure.setVisible(true, duration)
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
    this.children.each((i, entry) => {
      entry.figure.setVisible(false)
    })
    
    // New child becomes visible layer
    this.visibleLayer = this.children.getSize()
    
    // Call parent (locator is ignored - stack handles positioning)
    this._super(child, locator, index)
    
    return this
  },

  /**
   * Override setVisible to NOT propagate to children.
   * Stack manages child visibility itself.
   */
  setVisible: function(flag) {
    // Only set our own visibility, not children
    draw2d.shape.basic.Rectangle.prototype.setVisible.call(this, flag)
    return this
  },

  // ============================================================
  // INTRINSIC DIMENSIONS
  // ============================================================

  /**
   * Compute minimum width.
   * Width = max child width + padding + stroke
   * 
   * @protected
   * @returns {Number}
   */
  computeMinIntrinsicWidth: function() {
    const stroke = this.stroke * 2
    let maxWidth = 10
    
    this.children.each((i, entry) => {
      const child = entry.figure
      const childWidth = child.isResizeable() 
        ? child.getMinWidth() 
        : child.getWidth()
      maxWidth = Math.max(maxWidth, childWidth)
    })
    
    return stroke + this.padding.left + this.padding.right + maxWidth
  },

  /**
   * Compute minimum height.
   * Height = max child height + padding + stroke
   * 
   * @protected
   * @returns {Number}
   */
  computeMinIntrinsicHeight: function() {
    const stroke = this.stroke * 2
    let maxHeight = 10
    
    this.children.each((i, entry) => {
      const child = entry.figure
      const childHeight = child.isResizeable() 
        ? child.getMinHeight() 
        : child.getHeight()
      maxHeight = Math.max(maxHeight, childHeight)
    })
    
    return stroke + this.padding.top + this.padding.bottom + maxHeight
  },

  // ============================================================
  // LAYOUT
  // ============================================================

  /**
   * Perform the layout.
   * All children are positioned at (0,0) and sized to fill the container.
   */
  performLayout: function() {
    // 1. Calculate our size
    const minWidth = this.getMinIntrinsicWidth()
    const minHeight = this.getMinIntrinsicHeight()
    
    const width = Math.max(minWidth, this.width)
    const height = Math.max(minHeight, this.height)
    
    // 2. Set our size
    draw2d.shape.basic.Rectangle.prototype.setDimension.call(this, width, height)
    
    // 3. Layout all children to fill container
    const contentWidth = width - this.padding.left - this.padding.right - (this.stroke * 2)
    const contentHeight = height - this.padding.top - this.padding.bottom - (this.stroke * 2)
    const xOffset = this.stroke + this.padding.left
    const yOffset = this.stroke + this.padding.top
    
    this.children.each((i, entry) => {
      const child = entry.figure
      
      // Position at top-left of content area
      child.setPosition(xOffset, yOffset)
      
      // Resize to fill (if resizeable)
      if (child.isResizeable()) {
        child.setDimension(contentWidth, contentHeight)
      }
    })
  }
})