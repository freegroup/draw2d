import draw2d from '../../packages'


/**
 * @class
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.ConnectionLocator = draw2d.layout.locator.Locator.extend(
  /** @lends draw2d.layout.locator.ConnectionLocator.prototype */
  {
  
  NAME: "draw2d.layout.locator.ConnectionLocator",

  /**
   * Default constructor for a Locator which can layout a figure in context of a
   * {@link draw2d.Connector}
   *
   */
  init: function () {
    this._super()
  }

})
