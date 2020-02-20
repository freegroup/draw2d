import draw2d from '../../packages'


/**
 * @class
 *
 * Controls the location of an IFigure.
 *
 * @author Andreas Herz
 */
draw2d.layout.locator.Locator = Class.extend(
  /** @lends draw2d.layout.locator.Locator.prototype */
  {

  NAME: "draw2d.layout.locator.Locator",

  /**
   * Initial Constructor
   *
   */
  init: function () {
  },


  /**
   *
   * Callback method if a child is bounded to a parent. This is
   * the perfect moment to prepare the child node with some basic
   * behaviour which are forced by the <code>Locator</code>
   *
   * @param {draw2d.Figure} figure
   * @param {draw2d.Figure} child
   */
  bind: function (figure, child) {
    // default behaviour of an Locator. The child isn't draggable and
    // the locator defines the position of the child.
    //
    child.setDraggable(false)
    child.setSelectable(false)
  },

  /**
   *
   * Callback method if a child is unbounded to the locator.
   *
   * @param {draw2d.Figure} figure
   * @param {draw2d.Figure} child
   */
  unbind: function (figure, child) {
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
    // just repaint the child to update the SVG related to the new location
    // of the parent.
    figure.repaint()
  },

  /**
   *
   * Return a clone of the locator object
   *
   * @returns
   */
  clone: function () {
    return eval("new " + this.NAME + "()")
  }
})
