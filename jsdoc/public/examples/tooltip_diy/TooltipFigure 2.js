TooltipFigure = draw2d.shape.basic.Rectangle.extend({

  NAME: "TooltipFigure",

  /**
   * @constructor
   * Creates a new figure element which is not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr) {
    this.tooltip = null
    this.tooltipTimer = -1
    this._super($.extend({
      width: 50,
      height: 50,
      radius: 2
    }, attr))

    this.createPort("input")
    this.createPort("output")
    this.zoomCallback = $.proxy(this.positionTooltip, this)

    this.on("dragstart", () => {
      this.hideTooltip(true)
    })
    this.on("mouseenter", () => {
      this.tooltipTimer = window.setTimeout(() => {
        this.tooltipTimer = -1
        this.showTooltip()
      }, 500)
    })
    this.on("mouseleave", () => {
      this.hideTooltip()
    })
    this.on("move", () => {
      this.positionTooltip()
    })
  },

  setCanvas: function (canvas) {
    if (this.canvas !== null) this.canvas.off(this.zoomCallback)
    this._super(canvas)
    if (this.canvas !== null) this.canvas.on("zoom", this.zoomCallback)
  },


  hideTooltip: function (fast) {
    if (this.tooltipTimer !== -1) {
      window.clearTimeout(this.tooltipTimer)
      this.tooltipTimer = -1
    }
    else if(this.tooltip!==null){
      if(fast) {
        this.tooltip.remove()
      }
      else{
        this.tooltip.fadeOut(500, function () {
          $(this).remove()
        })
      }
      this.tooltip = null
    }
  },

  showTooltip: function () {
    this.tooltip = $('<div class="tooltip">Tooltip</div>')
      .appendTo('body')
      .hide()
      .fadeIn(1000)
    this.positionTooltip()
  },

  positionTooltip: function () {
    if (this.tooltip === null) {
      return
    }

    var width = this.tooltip.outerWidth(true)
    var pos = this.canvas.fromCanvasToDocumentCoordinate(
      this.getAbsoluteX() + this.getWidth() / 2 - width / 2 + 8,
      this.getAbsoluteY() + this.getHeight() + 10)

    // remove the scrolling part from the tooltip because the tooltip is placed
    // inside the scrolling container
    pos.x += this.canvas.getScrollLeft()
    pos.y += this.canvas.getScrollTop()

    this.tooltip.css({'top': pos.y, 'left': pos.x})
  }
})
