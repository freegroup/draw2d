import draw2d from '../../packages'


/**
 * @class
 *
 * A cavas decoration which paints a grid in the background.
 * <br>
 * <br>
 *
 * @example
 *
 *    canvas.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
 *    let shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with grid background."});
 *
 *    canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.ShowGridEditPolicy = draw2d.policy.canvas.DecorationPolicy.extend(
  /** @lends draw2d.policy.canvas.ShowGridEditPolicy.prototype */
  {
  
  NAME: "draw2d.policy.canvas.ShowGridEditPolicy",

  DEFAULTS: {
    width: 20,
    stroke: 1,
    color: "#f0f0f0",
    bgColor: "#FFFFFF"
  },

  /**
   * Creates a new constraint policy for snap to grid
   *
   * @param {Number} [grid] the grid width of the canvas
   */
  init: function (attr) {
 
    // Merge defaults with the provided attr object
    const config = { ...this.DEFAULTS, ...attr };

    this.gridWidth = config.width;
    this.gridStroke = config.stroke;
    this.gridColor = new draw2d.util.Color(config.color);
    this.bgColor = config.bgColor;

    this._super()
    this.onZoomCallback = (emitterFigure, zoomData) => this.setGrid(1/zoomData.value)
  },

  /**
   *
   * Set the grid color
   *
   * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
   * @since 5.0.3
   */
  setGridColor: function (color) {
    this.gridColor = new draw2d.util.Color(color)
    this.setGrid(1/this.canvas.getZoom())
  },

  onInstall: function (canvas) {
    this._super(canvas)

    this.oldBg = this.canvas.html.css("background")
    this.setGrid(1/canvas.getZoom())
    canvas.on("zoom", this.onZoomCallback)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
    
    if (canvas?.paper?.canvas) {
      canvas.paper.canvas.style.background = this.oldBg
    }
    canvas.off(this.onZoomCallback)
  },

  /**
   * @private
   * @param {Number} zoom 
   */
  setGrid: function (zoom) {
    const canvasStyle = this.canvas?.paper?.canvas?.style
    if (canvasStyle) {
      const color = this.gridColor.rgba()
      canvasStyle.background = 
        `linear-gradient(to right,  ${color} ${this.gridStroke}px, transparent ${this.gridStroke}px),
         linear-gradient(to bottom, ${color} ${this.gridStroke}px, ${this.bgColor}  ${this.gridStroke}px)`
      canvasStyle.backgroundSize = `${this.gridWidth*zoom}px ${this.gridWidth*zoom}px`
    }
  }
})
