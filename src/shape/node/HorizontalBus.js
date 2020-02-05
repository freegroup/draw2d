/**
 * @class draw2d.shape.node.HorizontalBus
 *
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 *
 *
 * @example
 *
 *     let figure =  new draw2d.shape.node.HorizontalBus({width:300, height:20, text:"Horizontal Bus"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.node.Hub
 */
import draw2d from '../../packages'

draw2d.shape.node.HorizontalBus = draw2d.shape.node.Hub.extend(
  /** @lends draw2d.shape.node.HorizontalBus.prototype */
  {

  NAME: "draw2d.shape.node.HorizontalBus",

  /**
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.setConnectionDirStrategy(1)

    this.installEditPolicy(new draw2d.policy.figure.HBusSelectionFeedbackPolicy())
  }

})
