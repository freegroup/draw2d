import draw2d from '../../packages'

/**
 * @class
 * Base class for any kind of Connection end/start decorations like arrows, bullets, circles, bars,...
 *
 * @author Andreas Herz
 */
draw2d.decoration.connection.Decorator = Class.extend(
  /** @lends draw2d.decoration.connection.Decorator */
  {

    NAME: "draw2d.decoration.connection.Decorator",

    init: function (width, height) {

      if (typeof width === "undefined" || width < 1) {
        this.width = 20
      } else {
        this.width = width
      }

      if (typeof height === "undefined" || height < 1) {
        this.height = 15
      } else {
        this.height = height
      }
      this.parent = null
      this.color = null // null => use the color of the connection
      this.backgroundColor = new draw2d.util.Color(250, 250, 250)
    },

    /**
     *
     * Paint the decoration for a connector. The Connector starts always in
     * [0,0] and ends in [x,0].
     * It is not necessary to consider any rotation of the connection. This will be done by the
     * framework.
     *
     * <pre>
     *               | -Y
     *               |
     *               |
     *  --------------+-----------------------------&gt; +X
     *               |
     *               |
     *               |
     *               V +Y
     *
     *
     * </pre>
     *
     * See in ArrowConnectionDecorator for example implementation.
     * @param {RaphaelPaper} paper
     * @private
     */
    paint: function (paper) {
      // do nothing per default
    },

    /**
     *
     * @param {draw2d.Connection} parent
     * @private
     */
    setParent: function(parent){
      this.parent = parent
      return this
    },

    /**
     *
     * Set the stroke color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     * @returns {this}
     */
    setColor: function (c) {
      this.color = new draw2d.util.Color(c);

      this.parent?.repaint()
      return this
    },

    /**
     * Get the line color of the decoration
     *
     * @returns {drawd.util.Color} the current line color of null if the Decoration should use the color of the host connection
     */
    getColor: function(){
      return this.color
    },

    /**
     *
     * Set the background color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     * @returns {this}
     */
    setBackgroundColor: function (c) {
      this.backgroundColor = new draw2d.util.Color(c)
      
      this.parent?.repaint()

      return this
    },

    /**
     * Returns the fill color
     *
     * @returns {draw2d.util.Color}
     */
    getBackgroundColor: function(){
      return this.backgroundColor
    },

  /**
   *
   * Change the dimension of the decoration shape
   *
   * @param {Number} width  The new width of the decoration
   * @param {Number} height The new height of the decoration
   * @returns {this}
   **/
  setDimension: function (width, height) {
    this.width = width
    this.height = height

    // Trigger repaint of the parent connection to redraw the decorator
    this.parent?.repaint()

    return this
  }
  })
