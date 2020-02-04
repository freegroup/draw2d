/**
 * @class draw2d.InputPort
 * @classdesc A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Andreas Herz
 * @extend draw2d.Port
 */

import draw2d from 'packages'

draw2d.InputPort = draw2d.Port.extend(
  /** @lends draw2d.InputPort.prototype */
  {

  NAME: "draw2d.InputPort",

  /**
   * @constructs
   * Create a new InputPort element
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    // responsive for the arrangement of the port
    // calculates the x/y coordinates in relation to the parent node
    this.locator = new draw2d.layout.locator.InputPortLocator()
  },


  /**
   * @inheritdoc
   */
  createCommand: function (request) {
    // Connect request between two ports
    //
    if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
      return new draw2d.command.CommandConnect(request.source, request.target, request.source)
    }

    // ...else call the base class
    return this._super(request)
  }
})
