import draw2d from '../../packages'


/**
 * @class
 *
 * a state shape for a state diagram
 *
 * @example
 *
 *    // create and add two nodes which contains Ports (In and OUT)
 *    //
 *    let start = new draw2d.shape.state.Start();
 *    let state   = new draw2d.shape.state.State();

 *    // ...add it to the canvas
 *    canvas.add( start, 50,50);
 *    canvas.add( state, 230,180);
 *
 *    // Create a Connection and connect the Start and End node
 *    //
 *    let c = new draw2d.shape.state.Connection({
 *    		source : start.getOutputPort(0),
 *         target : state.getInputPort(0)
 *    });
 *
 *
 *    // and finally add the connection to the canvas
 *    canvas.add(c);
 *
 * @extends draw2d.shape.layout.VerticalLayout
 */
draw2d.shape.state.State = draw2d.shape.layout.VerticalLayout.extend(
  /** @lends draw2d.shape.state.State.prototype */
  {

  NAME: "draw2d.shape.state.State",

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.port = this.createPort("hybrid", new draw2d.layout.locator.BottomLocator())
    this.port.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.port))


    this.setBackgroundColor("#f3f3f3")

    // UI representation
    this.setStroke(1)
    this.setColor("#e0e0e0")
    this.setRadius(5)

    // Compose the top row of the shape
    //
    let top = this.createLabel("State").setStroke(0)
    this.label = top

    // the middle part of the shape
    // This part contains the ports for the connection
    //
    let center = new draw2d.shape.basic.Rectangle()
    center.getHeight = function () {
      return 1
    }
    center.setMinWidth(90)
    center.setColor("#e0e0e0")

    // the bottom of the activity shape
    //
    let bottom = new draw2d.shape.basic.Rectangle()
    bottom.setMinHeight(30)
    bottom.setStroke(0)
    bottom.setBackgroundColor(null)

    // finally compose the shape with top/middle/bottom in VerticalLayout
    //
    this.add(top)
    this.add(center)
    this.add(bottom)
  },

  /**
   *
   * Set the text to show if the state shape
   *
   * @param {String} text
   */
  setLabel: function (text) {
    this.label.setText(text)
    this.fireEvent("change:label", {value: text})

    return this
  },


  /**
   *
   * Return the label of the shape
   *
   */
  getLabel: function () {
    return this.label.getText()
  },


  /**
   *
   * helper method to create some labels
   *
   * @param {String} txt the label to display
   * @returns {draw2d.shape.basic.Label}
   * @private
   */
  createLabel: function (txt) {
    let label = new draw2d.shape.basic.Label(txt)
    label.setStroke(1)
    label.setColor(this.darkerBgColor)
    label.setRadius(0)
    label.setBackgroundColor(null)
    label.setPadding(5)
    label.setColor(this.bgColor.darker(0.2))
    label.onDoubleClick = function (angle) {/* ignore them for the layout elements*/
    }

    return label
  },


  /**
   * @inheritdoc
   */
  getPersistentAttributes: function () {
    return extend(this._super(), {
      label: this.getLabel()
    })
  },

  /**
   * @inheritdoc
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.label !== "undefined") {
      this.setLabel(memento.label)
    }

  }
})
