import draw2d from '../../packages'

/**
 * @class
 * Vertical Box Layout - Gen2 optimized version.
 * 
 * Uses deferred layout for better performance:
 * - Multiple add() calls result in ONE layout pass
 * - Layout is deferred to next animation frame
 * - Use forceLayout() if you need immediate layout
 * 
 * @example
 *    let vbox = new draw2d.shape.box.VBox({gap: 5});
 *    vbox.add(new draw2d.shape.basic.Label({text: "Row 1"}));
 *    vbox.add(new draw2d.shape.basic.Label({text: "Row 2"}));
 *    vbox.add(new draw2d.shape.basic.Label({text: "Row 3"}));
 *    // Layout happens once at next animation frame!
 *    canvas.add(vbox, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.box.Box
 */
draw2d.shape.box.VBox = draw2d.shape.box.Box.extend(
  /** @lends draw2d.shape.box.VBox.prototype */
  {

  NAME: "draw2d.shape.box.VBox",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.gap = 0
    this.align = 'left' // 'left', 'center', 'right'
    let _this = this

    // Locator for child positioning and drag translation
    this.locator = {
      translate: function (figure, diff) {
        figure.setPosition(figure.x + diff.x, figure.y + diff.y)
      },
      bind: function () {},
      unbind: function () {},
      relocate: function (index, target) {
        let stroke = _this.getStroke()
        let yPos = stroke + _this.padding.top
        let xPos = stroke + _this.padding.left
        
        // Calculate available width for alignment
        let availableWidth = _this.width - (stroke * 2) - _this.padding.left - _this.padding.right

        // Calculate yPos based on visible children before this index
        for (let i = 0; i < index; i++) {
          let child = _this.children.get(i).figure
          if (child.isVisible() && child._vboxManaged === true) {
            yPos += child.getHeight() + _this.gap
          }
        }

        // Apply horizontal alignment for non-resizable children
        if (!target.isResizeable() && target._vboxManaged === true) {
          let childWidth = target.getWidth()
          if (_this.align === 'center') {
            xPos += (availableWidth - childWidth) / 2
          } else if (_this.align === 'right') {
            xPos += availableWidth - childWidth
          }
        }

        target.setPosition(xPos, yPos)
      }
    }

    this._super(
      {width: 10, height: 10, ...attr},
      {
        gap: this.setGap,
        align: this.setAlign,
        ...setter
      },
      {
        gap: this.getGap,
        align: this.getAlign,
        ...getter
      }
    )
  },

  /**
   * @inheritdoc
   */
  add: function (child, locator, index) {
    child._vboxManaged = (locator == null)
    this._super(child, locator || this.locator, index)
    
    // Schedule deferred layout instead of immediate
    this.scheduleLayout()
    
    return this
  },

  /**
   * @inheritdoc
   */
  remove: function(child) {
    let result = this._super(child)
    this.scheduleLayout()
    return result
  },

  /**
   * Set gap between children
   * @param {Number} gap
   * @returns {this}
   */
  setGap: function(gap) {
    this.gap = gap
    this.scheduleLayout()
    return this
  },

  /**
   * Get gap between children
   * @returns {Number}
   */
  getGap: function() {
    return this.gap
  },

  /**
   * Set horizontal alignment for non-resizable children
   * @param {String} align - 'left', 'center', or 'right'
   * @returns {this}
   */
  setAlign: function(align) {
    this.align = align
    this.scheduleLayout()
    return this
  },

  /**
   * Get horizontal alignment
   * @returns {String}
   */
  getAlign: function() {
    return this.align
  },

  /**
   * @inheritdoc
   */
  getMinWidth: function () {
    let markup = (this.stroke * 2) + this.padding.left + this.padding.right
    let width = 10

    this.children.each(function (i, e) {
      if (e.figure.isVisible() && e.figure._vboxManaged === true) {
        let childWidth = e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth()
        if (childWidth > width) {
          width = childWidth
        }
      }
    })

    return width + markup
  },

  /**
   * @inheritdoc
   */
  getMinHeight: function () {
    let _this = this
    let gap = 0
    let markup = (this.stroke * 2) + this.padding.top + this.padding.bottom
    let height = 0

    this.children.each(function (i, e) {
      if (e.figure.isVisible() && e.figure._vboxManaged === true) {
        let childHeight = e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight()
        height += childHeight + gap
        gap = _this.gap
      }
    })

    return height + markup
  },

  /**
   * Execute the deferred layout.
   * @protected
   * @override
   */
  _renderLayout: function() {
    this.setDimension(1, 1)
    this.fireEvent("resize")
  },

  /**
   * @inheritdoc
   */
  setDimension: function (w, h) {
    this._super(w, h)

    // Available width for children = total width - stroke (both sides) - padding
    let width = this.width - (this.stroke * 2) - this.padding.left - this.padding.right
    
    // Prevent recursive calls
    if (width === this._recursiveWidth) {
      return this
    }
    this._recursiveWidth = width

    // Single pass: resize all children
    this.children.each(function (i, e) {
      if (e.figure.isResizeable() && e.figure.isVisible() && e.figure._vboxManaged === true) {
        e.figure.setDimension(width, e.figure.getMinHeight())
      }
    })

    delete this._recursiveWidth

    return this
  },

  /**
   * Override setVisible to schedule layout
   * @inheritdoc
   */
  setVisible: function(flag) {
    this._super(flag)
    if (this.getParent() && this.getParent().scheduleLayout) {
      this.getParent().scheduleLayout()
    } else if (this.getParent() && this.getParent().setDimension) {
      this.getParent().setDimension(1, 1)
    }
    return this
  },

  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    let memento = this._super()
    memento.gap = this.gap
    memento.align = this.align
    return memento
  },

  /**
   * @inheritdoc
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)
    if (typeof memento.gap === "number") {
      this.gap = memento.gap
    }
    if (typeof memento.align === "string") {
      this.align = memento.align
    }
    return this
  }
})