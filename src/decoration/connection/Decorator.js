import draw2d from '../../packages'
import Color from '../../util/Color'

/**
 * @class
 *
 *
 * @inheritable
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

      this.color = new Color(0, 0, 0)
      this.backgroundColor = new Color(250, 250, 250)
    },

    /**
     *
     * Paint the decoration for a connector. The Connector starts always in
     * [0,0] and ends in [x,0].
     * It is not necessary to consider any rotation of the connection. This will be done by the
     * framework.
     *
     * <pre>
     *                | -Y
     *                |
     *                |
     *  --------------+-----------------------------&gt; +X
     *                |
     *                |
     *                |
     *                V +Y
     *
     *
     * </pre>
     *
     * See in ArrowConnectionDecorator for example implementation.
     * @param {Raphael} paper
     */
    paint: function (paper) {
      // do nothing per default
    },

    /**
     *
     * Set the stroke color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     */
    setColor: function (c) {
      this.color = new Color(c);

      return this
    },

    /**
     *
     * Set the background color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     */
    setBackgroundColor: function (c) {
      this.backgroundColor = new Color(c)

      return this
    },

    /**
     *
     * Change the dimension of the decoration shape
     *
     * @param {Number} width  The new width of the decoration
     * @param {Number} height The new height of the decoration
     **/
    setDimension: function (width, height) {
      this.width = width
      this.height = height

      return this
    }
  })
