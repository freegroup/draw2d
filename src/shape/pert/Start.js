import draw2d from '../../packages'


/**
 * @class
 *
 * NOT FOR PRODUCTIVE
 *
 * Checkout [Wikipedia PERT][1] for more information.
 *
 * Double click on the Task name or the top middle number to change the value.
 *
 *
 * @example
 *
 *    canvas.add( new draw2d.shape.pert.Start(),10,10);
 *    canvas.add( new draw2d.shape.pert.Activity(),80,130);
 *    canvas.add( new draw2d.shape.pert.Activity(),180,50);
 *
 * [1] http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 *
 * @extends draw2d.shape.layout.VerticalLayout
 */
draw2d.shape.pert.Start = draw2d.shape.layout.VerticalLayout.extend(
  /** @lends draw2d.shape.pert.Start.prototype */
  {

  NAME: "draw2d.shape.pert.Start",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // shortcut for some callback methods to avoid $.proxy wrapper
    let _this = this

    // persistence values for the activity
    // will be stored/read in the JSON
    this.mementoValues = {
      duration: null
    }

    // just some color attributes for the rendering/gradient
    this.bgColor = new draw2d.util.Color("#f3f3f3")
    this.lighterBgColor = this.bgColor.lighter(0.2).rgba()
    this.darkerBgColor = this.bgColor.darker(0.2).rgba()


    this._super(extend({bgColor: this.bgColor, stroke: 2, radius: 2, color: this.darkerBgColor}, attr), setter, getter)

    // Compose the top row of the shape
    //
    let top = new draw2d.shape.layout.HorizontalLayout({stroke: 0})


    this.durationLabel = new draw2d.shape.basic.Label({
      text: "Duration",
      stroke: 1,
      color: this.darkerBgColor,
      radius: 0,
      bgColor: null,
      padding: 5
    })
    // duration label has a inplaceEditor for the value
    this.durationLabel.installEditor(new draw2d.ui.LabelEditor({
      text: "Enter new duration",
      onCommit: function (value) {
        _this.setDuration(parseFloat(value))
      }
    }))

    this.earlyEndLabel = this.createLabel({text: "Early End", stroke: 0})

    top.add(this.durationLabel)
    top.add(this.earlyEndLabel)


    // the middle part of the shape
    // This part contains the ports for the connection
    //
    this.activityLabel = new draw2d.shape.basic.Label({
      text: "Start",
      radius: 0,
      padding: 10,
      color: this.darkerBgColor,
      bgColor: null
    })
    // direct editor for the label
    this.activityLabel.installEditor(new draw2d.ui.LabelInplaceEditor())

    this.outputPort = this.activityLabel.createPort("output")
    this.outputPort.getActivity = function () {
      return _this
    }
    this.outputPort.onConnect = function () {
      _this.setDuration(_this.mementoValues.duration)
    }
    this.outputPort.onDisconnect = function () {
      _this.setDuration(_this.mementoValues.duration)
    }


    // the bottom of the activity shape
    //
    let bottom = this.createLabel(" ")
    bottom.setPadding(10)
    bottom.setStroke(0)
    this.lateEndLabel = bottom

    // finally compose the shape with top/middle/bottom in VerticalLayout
    //
    this.add(top)
    this.add(this.activityLabel)
    this.add(bottom)

    // set some good default value for the activity
    //
    this.setDuration(1)
  },

  /**
   * 
   * Set the duration for the activity. This triggers a complete recalculation of the complete
   * diagram. No further calls are required
   *
   * @param {Number} duration the new Duration for the activity
   */
  setDuration: function (duration) {

    if (this.mementoValues.duration !== duration) {
      // store the new value
      this.mementoValues.duration = duration

      // update the labels for duration
      this.durationLabel.setText(this.mementoValues.duration)
    }

    this.earlyEndLabel.setText(this.mementoValues.duration)

    // notify all children that a parent value has been changed
    // Just knock on the inputPort...
    //
    let connections = this.outputPort.getConnections()
    connections.each(function (i, conn) {
      let targetPort = conn.getTarget()
      targetPort.setValue()
    })

    // propagate the lateFinish up to all parent nodes if we are a leaf
    //
    if (connections.getSize() === 0) {
      let lateFinish = parseFloat(this.earlyEndLabel.getText())
      this.setLateFinish(lateFinish)
    }
  },

  getEarlyEnd: function () {
    return this.mementoValues.duration
  },


  setLateFinish: function (value) {
    let lateStart = value - this.mementoValues.duration

    this.lateEndLabel.setText(value)

  },

  /**
   * 
   * help method to create some labels
   *
   * @param {String} txt the label to display
   * @returns {draw2d.shape.basic.Label}
   */
  createLabel: function (txt) {
    let label = new draw2d.shape.basic.Label({text: txt})
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
  setBackgroundColor: function (color) {
    this._super(color)

    // calculate the new lighter and darker colors for the gradient
    //
    this.lighterBgColor = this.bgColor.lighter(0.2).rgba()
    this.darkerBgColor = this.bgColor.darker(0.2).rgba()
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {

    // repaint can be blocked during deserialization and if the shape
    // not part of any canvas.
    //
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }


    attributes = attributes || {}

    if (this.getAlpha() < 0.9) {
      attributes.fill = this.bgColor.rgba()
    }
    else {
      attributes.fill = ["90", this.bgColor.hash(), this.lighterBgColor].join("-")
    }

    this._super(attributes)
  }
})
