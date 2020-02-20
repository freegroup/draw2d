import draw2d from '../../packages'


/**
 * @class
 *
 * A generic Node which has an OutputPort. Mainly used for demos and examples.
 *
 *
 * @example
 *
 *    let figure =  new draw2d.shape.node.Start({color: "#3d3d3d"});
 *
 *    canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.Start = draw2d.shape.basic.Rectangle.extend(
  /** @lends draw2d.shape.node.Start.prototype */
  {

  NAME: "draw2d.shape.node.Start",
  DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

  /**
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({
      bgColor: this.DEFAULT_COLOR,
      color: this.DEFAULT_COLOR.darker(),
      width: 50,
      height: 50
    }, attr), setter, getter)
    this.createPort("output")
  }

})
