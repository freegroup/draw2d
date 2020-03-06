import draw2d from '../../packages'


/**
 * @class
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 */
draw2d.layout.locator.InputPortLocator = draw2d.layout.locator.PortLocator.extend(
  /** @lends draw2d.layout.locator.InputPortLocator.prototype */
  {

  NAME: "draw2d.layout.locator.InputPortLocator",

  /**
   * Default constructor for a Locator which can layout a port in context of a
   * {@link draw2d.shape.node.Node}
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  },

  /**
   *
   * Controls the location of an {@link draw2d.Figure}
   *
   * @param {Number} index port index of the figure
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
    this.applyConsiderRotation(figure, 0, (node.getHeight() / dividerFactor) * portIndex)
  }

})



