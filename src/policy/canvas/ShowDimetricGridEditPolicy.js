/**
 * @class draw2d.policy.canvas.ShowDimetricGridEditPolicy
 *
 * A canvas decoration which paints a dimetric in the background.
 * <br>
 * <br>
 * See the example:
 *
 *     @example preview small frame
 *
 *     canvas.installEditPolicy(new draw2d.policy.canvas.ShowDimetricGridEditPolicy());
 *     let shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with grid background."});
 *
 *     canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
import draw2d from '../../packages'

draw2d.policy.canvas.ShowDimetricGridEditPolicy = draw2d.policy.canvas.DecorationPolicy.extend(
  /** @lends draw2d.policy.canvas.ShowDimetricGridEditPolicy.prototype */
  {
  
  NAME: "draw2d.policy.canvas.ShowDimetricGridEditPolicy",

  GRID_COLOR: "#f0f0f0",
  GRID_WIDTH: 30,

  /**
   * Creates a new constraint policy for snap to grid
   *
   * @constructs
   * @param {Number} [grid] the grid width of the canvas
   */
  init: function (grid) {
    this.color = new draw2d.util.Color(this.GRID_COLOR)
    this.zoom = 1
    this.shapes = null

    this._super()

    if (typeof grid === "number") {
      this.grid = grid
    }
    else {
      this.grid = this.GRID_WIDTH
    }
  },

  onInstall: function (canvas) {
    this._super(canvas)
    this.zoom = canvas.getZoom()
    this.setGrid(this.grid)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
    if (this.shapes !== null) {
      this.shapes.remove()
    }
  },

  /**
   * 
   * Set the grid color
   *
   * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
   * @since 5.0.3
   */
  setGridColor: function (color) {
    this.color = new draw2d.util.Color(color)
    this.setGrid(this.grid)
  },

  /**
   * 
   * Set a new grid width/height
   *
   * @param {Number} grid
   * @since 5.0.3
   */
  setGrid: function (grid) {
    this.grid = grid

    if (this.canvas != null) {
      if (this.shapes !== null) {
        this.shapes.remove()
      }

      let r = this.canvas.paper
      let d = this.grid, i
      let w = r.width
      let h = r.height
      let props = {stroke: this.color.rgba()}

      let max = Math.sqrt(w * w + h * h)
      let angle26 = Math.atan(.5)
      let angle153 = Math.PI - angle26
      let cos30 = Math.cos(angle26)
      let sin30 = Math.sin(angle26)
      let cos150 = Math.cos(angle153)
      let sin150 = Math.sin(angle153)

      r.setStart()
      // horizontal
      for (i = 0; i <= w; i += d * 2) {
        r.path([["M", i, 0], ["L", i + cos30 * max, sin30 * max]]).attr(props)
        r.path([["M", i, 0], ["L", i + cos150 * max, sin150 * max]]).attr(props)
      }
      for (i = d; i <= h; i += d) {
        r.path([["M", 0, i], ["L", cos30 * max, i + sin30 * max]]).attr(props)
        r.path([["M", w, i], ["L", w + cos150 * max, i + sin150 * max]]).attr(props)
      }
      // vertical
      this.shapes = r.setFinish()

      this.shapes.toBack()
    }
  }

})
