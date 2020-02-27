import draw2d from '../../packages'


/**
 * @class
 *
 * Just to paint a grid in the background of a canvas.
 *
 *
 * @example
 *
 *    canvas.installEditPolicy(new draw2d.policy.canvas.ShowChessboardEditPolicy());
 *    let shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with chessboard background."});
 *
 *    canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.ShowChessboardEditPolicy = draw2d.policy.canvas.DecorationPolicy.extend(
  /** @lends draw2d.policy.canvas.ShowChessboardEditPolicy.prototype */
  {
    NAME: "draw2d.policy.canvas.ShowChessboardEditPolicy",

    GRID_COLOR: "#e0e0e0",
    GRID_WIDTH: 20,

    /**
     * Creates a new constraint policy for snap to grid
     *
     * @param {Number} grid the grid width of the canvas
     */
    init: function (grid) {
      this._super()
      if (grid) {
        this.grid = grid
      } else {
        this.grid = this.GRID_WIDTH
      }
    },


    onInstall: function (canvas) {
      this._super(canvas)

      this.oldBg = this.canvas.html.css("background")
      this.setGrid(1/canvas.getZoom())
      this.onZoomCallback =(emitterFigure, zoomData) => {
        this.setGrid(1/zoomData.value)
      }
      canvas.on("zoom", this.onZoomCallback)
    },

    onUninstall: function (canvas) {
      this._super(canvas)
      $(canvas.paper.canvas).css({"background": this.oldBg})
      canvas.off(this.onZoomCallback)
    },

    /**
     * Activate the grid and set the CSS properties for the SVG canvas
     * @private
     */
    setGrid: function(zoom){

      let gridColor = this.GRID_COLOR

      let background =
        `linear-gradient(45deg, ${gridColor} 25%, transparent 25%, transparent 75%, ${gridColor} 75%, ${gridColor} 100%),\n` +
        `linear-gradient(45deg, ${gridColor} 25%, transparent 25%, transparent 75%, ${gridColor} 75%, ${gridColor} 100%)`
      let backgroundSize = `${(this.grid*2*zoom)}px ${(this.grid*2*zoom)}px`
      let backgroundPosition = `0 0, ${(this.grid*zoom)}px ${(this.grid*zoom)}px`

      $(this.canvas.paper.canvas).css({
        "background": background,
        "background-size": backgroundSize,
        "background-position": backgroundPosition
      })
    }
  })
