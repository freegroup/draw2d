import draw2d from '../../packages'

/**
 * @class
 * 
 * @deprecated Use {@link draw2d.shape.box.HBox} instead. The layout package will be removed in a future version.
 * 
 * The HorizontalLayout class arranges the layout elements in a horizontal sequence,
 * left to right, with optional gaps between the elements.
 *
 * During the execution of the setDimension() method, the minimum width of the container is calculated
 * by accumulating the minimum sizes of the elements, including stroke, gaps and padding.
 *
 *
 * See the example below with and without gap and border settings
 *
 *
 * @example
 *
 *    // first container without any gap and a border of the parent
 *    // container
 *    let label1 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *    let label2 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *    let label3 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *    let container1 = new draw2d.shape.layout.HorizontalLayout();
 *
 *    container1.add(label1);
 *    container1.add(label2);
 *    container1.add(label3);
 *    container1.setGap(10);
 *    container1.setStroke(2);
 *    canvas.add(container1,50,10);
 *
 *    // second container without any gab or border
 *    //
 *    let label11 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *    let label12 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *    let label13 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *    let container2 = new draw2d.shape.layout.HorizontalLayout();
 *
 *    container2.add(label11);
 *    container2.add(label12);
 *    container2.add(label13);
 *
 *    canvas.add(container2,50,90);
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 * @since 2.5.1
 */
draw2d.shape.layout.HorizontalLayout = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.layout.HorizontalLayout.prototype */
  {

    NAME: "draw2d.shape.layout.HorizontalLayout",

    /**
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
      this.gap = 0
      let _this = this
      this.locator = {
        translate: function (figure, diff) {
          figure.setPosition(figure.x + diff.x, figure.y + diff.y)
        },
        bind: function () {
        },
        unbind: function () {
        },
        relocate: function (index, target) {
          let stroke = _this.getStroke()
          let yPos = stroke + _this.padding.top
          let xPos = stroke + _this.padding.left // respect the border and padding of the parent
          for (let i = 0; i < index; i++) {
            let child = _this.children.get(i).figure
            if (child.isVisible()) {
              xPos += child.getWidth() + _this.gap
            }
          }

          target.setPosition(xPos, yPos)
        }
      }

      this._super(
        {width: 1, height: 1, gap: 0, ...attr},
        {
          // @attr {Number} gap the gap between the children shapes */
          gap: this.setGap,
          ...setter},
        {
          gap: this.getGap,
          ...getter}
      )

    },


    /**
     * @inheritdoc
     */
    add: function (child, locator, index) {
      this._super(child, this.locator, index)

      this.setDimension(1, 1)

      return this
    },

    /**
     *
     * Set the gap width between child components within this layout.
     * This will only affect the space between components, not the space around all the components in the layout.
     *
     * @param {Number} gap The space, in pixels, between items.
     * @since 2.5.1
     */
    setGap: function (gap) {
      this.gap = gap
      // this forces a relayout of the element
      this.setDimension(1, 1)

      return this
    },

    /**
     *
     * Return the gap between the children shapes
     *
     * @since 5.0.0
     *
     */
    getGap: function () {
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
        if (e.figure.isVisible()) {
          width += (e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth() + gap)
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
      let height = 0

      this.children.each(function (i, e) {
        height = Math.max(height, (e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight()))
      })

      return height + markup
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
      this._super(w, h)

      let diff = this.width - this.getMinWidth()
      if (diff > 0) {
        diff = (diff / this.children.getSize()) | 0
        this.children.each(function (i, e) {
          if (e.figure.isResizeable() === true) {
            e.figure.setDimension(e.figure.getMinWidth() + diff, e.figure.getHeight())
          }
        })
      } else {
        let minHeight = this.getMinHeight()
        this.children.each(function (i, e) {
          // The layout respect the "resizeable" flag because a layout is a kind of layouter and
          // any kind of autolayouter must respect this flag
          if (e.figure.isResizeable() === true) {
            // reset the shape to the minimum width/height. see setMinWidth/setMinHeight
            e.figure.setDimension(1, minHeight)
          }
        })
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



