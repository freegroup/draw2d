/**
 * @class draw2d.layout.locator.OutputPortLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 */
import draw2d from '../../packages'

draw2d.layout.locator.OutputPortLocator = draw2d.layout.locator.PortLocator.extend(
  /** @lends draw2d.layout.locator.OutputPortLocator.prototype */
  {
  
  NAME: "draw2d.layout.locator.OutputPortLocator",

  /**
   * Default constructor for a Locator which can layout a port in context of a
   * {@link draw2d.shape.node.Node}
   *
   * @constructs
   */
  init: function () {
    this._super()
  },

  /**
   *
   * Controls the location of an I{@link draw2d.Figure}
   *
   * @param {Number} index child index of the figure
   * @param {draw2d.Figure} figure the figure to control
   *
   * @template
   **/
  relocate: function (index, figure) {
    let node = figure.getParent()
    let dividerFactor = 1
    let thisNAME = this.NAME
    let portIndex = 1
    node.getPorts().each((i, p) => {
      portIndex = (p === figure) ? dividerFactor : portIndex
      dividerFactor += p.getLocator().NAME === thisNAME ? 1 : 0
    })
    this.applyConsiderRotation(figure, node.getWidth(), (node.getHeight() / dividerFactor) * portIndex)
  }

})



