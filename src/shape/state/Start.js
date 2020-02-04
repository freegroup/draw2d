/**
 * @class draw2d.shape.state.Start
 *
 * The start node for a state diagram
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let figure =  new draw2d.shape.state.Start({color:"#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
import draw2d from '../../packages'

draw2d.shape.state.Start = draw2d.shape.basic.Circle.extend(
  /** @lends draw2d.shape.state.Start.prototype */
  {

  NAME: "draw2d.shape.state.Start",

  DEFAULT_COLOR: new draw2d.util.Color("#3369E8"),

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.port = this.createPort("output", new draw2d.layout.locator.BottomLocator())
    this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port))

    this.setDimension(50, 50)
    this.setBackgroundColor(this.DEFAULT_COLOR)
    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())

    this.setStroke(0)
    //this.setColor(this.DEFAULT_COLOR.darker());

    let label = new draw2d.shape.basic.Label({text: "START"})
    label.setStroke(0)
    label.setFontColor("#ffffff")
    label.setFontFamily('"Open Sans",sans-serif')
    this.add(label, new draw2d.layout.locator.CenterLocator())
  }
})
