/**
 * @class draw2d.shape.layout.VerticalLayout
 * The VerticalLayout class arranges the layout elements in a vertical sequence,
 * left to right, with optional gaps between the elements.
 *
 * During the execution of the setDimension() method, the minimum height of the container is calculated
 * by accumulating the minimum sizes of the elements, including stroke, gaps and padding.
 *
 * See the example below with and without gap and border settings
 *
 *
 *     @example preview small frame
 *
 *     // first container without any gap and a border of the parent
 *     // container
 *     let label1 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     let label2 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     let label3 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     let container1 = new draw2d.shape.layout.VerticalLayout();
 *
 *     container1.add(label1);
 *     container1.add(label2);
 *     container1.add(label3);
 *     container1.setGap(10);
 *     container1.setStroke(2);
 *     canvas.add(container1,50,10);
 *
 *     // second container without any gab or border
 *     //
 *     let label11 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     let label12 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     let label13 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     let container2 = new draw2d.shape.layout.VerticalLayout();
 *
 *     container2.add(label11);
 *     container2.add(label12);
 *     container2.add(label13);
 *
 *     canvas.add(container2,150,10);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
import draw2d from '../../packages'

draw2d.shape.layout.VerticalLayout = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.layout.VerticalLayout.prototype */
  {

  NAME: "draw2d.shape.layout.VerticalLayout",

  /**
   * Create a new instance
   *
   * @constructs
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // some layout parameter
    //
    this.gap = 0

    // "this" shortcut to avoid $.proxy
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
        let yPos = stroke + _this.padding.top // respect the border and padding of the shape
        let xPos = _this.padding.left

        for (let i = 0; i < index; i++) {
          let child = _this.children.get(i).figure
          if (child.isVisible()) {
            yPos += child.getHeight() + _this.gap
          }
        }

        target.setPosition(xPos, yPos)
      }
    }

    this._super(
      extend({width: 10, height: 10}, attr),
      extend({
        /** @attr {Number} gap the gap between the children shapes */
        gap: this.setGap
      }, setter),
      extend({
        gap: this.getGap
      }, getter))

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
   */
  setGap: function (gap) {
    this.gap = gap
    // this forces a relayout of the element
    this.setDimension(1, 1)
  },

  /**
   * @inheritdoc
   */
  getMinWidth: function () {
    let markup = (this.stroke * 2) + this.padding.left + this.padding.right
    let width = 10
    this.children.each(function (i, e) {
      if (e.figure.isVisible())
        width = Math.max(width, e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth())
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
      if (e.figure.isVisible()) {
        height += ((e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight()) + gap)
        // first element is iterated. Now we must add the gap to all next elements
        gap = _this.gap
      }
    })

    return height + markup
  },

  /**
   * @inheritdoc
   */
  setDimension: function (w, h) {
    this._super(w, h)

    let width = this.width - this.padding.left - this.padding.right
    if (width === this._recursiveWidth) {
      return this
    }
    this._recursiveWidth = width

    this.children.each(function (i, e) {
      if (e.figure.isResizeable() && e.figure.isVisible()) {
        e.figure.setDimension(width, e.figure.getMinHeight())
      }
    })

    delete this._recursiveWidth

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



