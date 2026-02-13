import draw2d from '../../packages'

/**
 * @class
 * Base class for layout containers (VBox, HBox, etc.).
 * 
 * Gen2 Layout System - Uses deferred layout like Clay:
 * - Layout calculations are deferred to the next animation frame
 * - Multiple add() calls result in ONE layout pass
 * - No recursive layout calls
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
draw2d.shape.box.Box = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.box.Box.prototype */
  {

  NAME: "draw2d.shape.box.Box",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // Gen2: Deferred layout state
    this._layoutPending = false
    this._layoutRequestId = null
    
    this._super({width: 10, height: 10, ...attr}, setter, getter)
    
    // Override the resize listener from Layout to use deferred layout
    this.resizeListener = figure => {
      this.scheduleLayout()
      
      // Still propagate resize event up
      if (this.getParent() instanceof draw2d.shape.layout.Layout) {
        this.fireEvent("resize")
      }
    }
  },

  /**
   * Schedule a layout pass for the next animation frame.
   * Multiple calls will only result in ONE layout pass.
   * @returns {this}
   */
  scheduleLayout: function() {
    if (this._layoutPending) {
      return this // Already scheduled
    }
    
    this._layoutPending = true
    
    this._layoutRequestId = requestAnimationFrame(() => {
      this._layoutPending = false
      this._layoutRequestId = null
      this._renderLayout()
    })
    
    return this
  },

  /**
   * Cancel any pending layout.
   * Call this when the element is removed from the canvas.
   * @returns {this}
   */
  cancelLayout: function() {
    if (this._layoutRequestId !== null) {
      cancelAnimationFrame(this._layoutRequestId)
      this._layoutRequestId = null
      this._layoutPending = false
    }
    return this
  },

  /**
   * Execute the deferred layout.
   * Override in subclasses to implement actual layout logic.
   * @protected
   */
  _renderLayout: function() {
    // Subclasses implement this
    this.setDimension(1, 1)
    this.fireEvent("resize")
  },

  /**
   * Execute layout immediately, bypassing the deferred mechanism.
   * Use sparingly - prefer scheduleLayout() for better performance.
   * @returns {this}
   */
  forceLayout: function() {
    this.cancelLayout()
    this._renderLayout()
    return this
  },

  /**
   * @inheritdoc
   */
  createCommand: function (request) {
    if (request.getPolicy() === draw2d.command.CommandType.ROTATE) {
      return null
    }
    return this._super(request)
  }
})