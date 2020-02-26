var DraggableDividerFigure = draw2d.shape.layout.HorizontalLayout.extend(
  /** @lends draw2d.shape.widget.Slider.prototype */
  {
    NAME: "DraggableDividerFigure",

    DEFAULT_COLOR_THUMB: new draw2d.util.Color("#bddf69"),
    DEFAULT_COLOR_BG: new draw2d.util.Color("#d3d3d3"),

    init: function (attr, setter, getter) {
      this.slideBoundingBox = new draw2d.geo.Rectangle(0, 0, 10, 20)

      this._super(extend({
          bgColor: "#FFFFFF",
          stroke: 2,
          resizeable:true
        }, attr),
        setter,
        getter)

      this.add(new draw2d.shape.basic.Text({text:"Label 1"}))
      this.add(new draw2d.shape.basic.Text({text:"Label 2"}))

      this.setDimension(120, 80);
      // install default selection handler. Can be overridden or replaced
      this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())

      this.currentValue = 50
    },

    /**
     *
     * Create the additional elements for the figure
     *
     */
    createSet: function () {
      let result = this.canvas.paper.set()
      let thumb = this.canvas.paper.rect(0, 0, 10, 20)
      thumb.node.style.cursor = "col-resize"
      result.push(thumb)

      return result
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
      this._super(w, h)
      this.slideBoundingBox.setBoundary(0, 0, this.getWidth(), this.getHeight())
      this.slideBoundingBox.setHeight(this.getHeight())

      // TODO: and repaint again.....two repaints for one "setDimension"....BAD
      //
      this.repaint()
    },

    /**
     *
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @returns {Boolean} true if the figure accepts dragging
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
      // check if the use has been clicked on the thumb.
      // Return "false" to prevent drag&drop operation.
      //
      if (this.slideBoundingBox.hitTest(x, y)) {
        this.panningX = x
        this.panningY = y
        return false
      }

      return this._super(x, y, shiftKey, ctrlKey)
    },

    /**
     *
     * Called by the framework if the figure returns false for the drag operation. In this
     * case we send a "panning" event - mouseDown + mouseMove. This is very useful for
     * UI-Widget like slider, spinner,...
     *
     * @param {Number} dx the x difference between the mouse down operation and now
     * @param {Number} dy the y difference between the mouse down operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     */
    onPanning: function (dx, dy, dx2, dy2) {
      // calculate the current position of the mouse pos
      //
      let thumbW2 = this.slideBoundingBox.w / 2
      let width = this.getWidth()

      let figurePos = Math.min(width, Math.max(0, this.panningX + dx))
      let sliderPos = Math.min(width, figurePos) - thumbW2

      this.currentValue = (100 / width * sliderPos)
      this.repaint()
    },

    /**
     *
     * @param attributes
     */
    repaint: function (attributes) {
      if (this.repaintBlocked === true || this.shape === null) {
        return
      }

      attributes = attributes || {}

      // adjust the slider to the current value and the new dimension of the widget
      //
      let thumbX = (this.getWidth() / 100 * this.currentValue) | 0
      this.slideBoundingBox.setX(thumbX)


      // update slider
      //
      /*
      if (this.svgNodes !== null) {
        let attr = this.slideBoundingBox.toJSON()
        attr.fill = this.getColor().rgba()
        // attr.stroke = this.getColor().darker(0.2).rgba()
        this.svgNodes.attr(attr)
      }

       */

      this._super(attributes)
    },


    applyTransformation: function () {
     // this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY())

      return this
    }

  })
