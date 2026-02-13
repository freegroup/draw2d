import draw2d from '../../packages'

/**
 * @class
 * Horizontal Box Layout - Gen2 optimized version.
 * 
 * Uses deferred layout for better performance:
 * - Multiple add() calls result in ONE layout pass
 * - Layout is deferred to next animation frame
 * - Use forceLayout() if you need immediate layout
 * 
 * @example
 *    let hbox = new draw2d.shape.box.HBox({gap: 5});
 *    hbox.add(new draw2d.shape.basic.Label({text: "Col 1"}));
 *    hbox.add(new draw2d.shape.basic.Label({text: "Col 2"}));
 *    hbox.add(new draw2d.shape.basic.Label({text: "Col 3"}));
 *    // Layout happens once at next animation frame!
 *    canvas.add(hbox, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.box.Box
 */
draw2d.shape.box.HBox = draw2d.shape.box.Box.extend(
  /** @lends draw2d.shape.box.HBox.prototype */
  {

  NAME: "draw2d.shape.box.HBox",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this.gap = 0
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

        // Calculate xPos based on visible children before this index
        for (let i = 0; i < index; i++) {
          let child = _this.children.get(i).figure
          if (child.isVisible() && child._hboxManaged === true) {
            xPos += child.getWidth() + _this.gap
          }
        }

        target.setPosition(xPos, yPos)
      }
    }

    this._super(
      {width: 10, height: 10, ...attr},
      {
        gap: this.setGap,
        ...setter
      },
      {
        gap: this.getGap,
        ...getter
      }
    )
  },

  /**
   * @inheritdoc
   */
  add: function (child, locator, index) {
    child._hboxManaged = (locator == null)
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
   * @inheritdoc
   */
  getMinWidth: function () {
    let _this = this
    let width = this.stroke * 2 + this.padding.left + this.padding.right
    let gap = 0

    this.children.each(function (i, e) {
      if (e.figure.isVisible() && e.figure._hboxManaged === true) {
        let childWidth = e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth()
        width += childWidth + gap
        gap = _this.gap
      }
    })

    return width
  },

  /**
   * @inheritdoc
   */
  getMinHeight: function () {
    let markup = (this.stroke * 2) + this.padding.top + this.padding.bottom
    let height = 10

    this.children.each(function (i, e) {
      if (e.figure.isVisible() && e.figure._hboxManaged === true) {
        let childHeight = e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight()
        if (childHeight > height) {
          height = childHeight
        }
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

    let diff = this.width - this.getMinWidth()
    
    // Prevent recursive calls
    if (this._recursiveLayout) {
      return this
    }
    this._recursiveLayout = true

    if (diff > 0) {
      // Distribute extra width evenly
      let childCount = 0
      this.children.each(function (i, e) {
        if (e.figure._hboxManaged === true) childCount++
      })
      let extraWidth = childCount > 0 ? (diff / childCount) | 0 : 0
      
      this.children.each(function (i, e) {
        if (e.figure.isResizeable() === true && e.figure._hboxManaged === true) {
          e.figure.setDimension(e.figure.getMinWidth() + extraWidth, e.figure.getHeight())
        }
      })
    } else {
      // Available height for children = total height - stroke (both sides) - padding
      let childHeight = this.height - (this.stroke * 2) - this.padding.top - this.padding.bottom
      this.children.each(function (i, e) {
        if (e.figure.isResizeable() === true && e.figure._hboxManaged === true) {
          e.figure.setDimension(e.figure.getMinWidth(), childHeight)
        }
      })
    }

    delete this._recursiveLayout

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
    return this
  }
})