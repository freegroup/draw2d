import draw2d from '../../packages'


/**
 * @class
 *
 * Paint a dotted pattern in the background of the canvas.
 *
 *
 * @example
 *
 *    canvas.installEditPolicy(new draw2d.policy.canvas.ShowDotEditPolicy());
 *    let shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with dotted background."});
 *
 *    canvas.add(shape,40,10);
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.DecorationPolicy
 * @since 4.0.1
 */

draw2d.policy.canvas.ShowDotEditPolicy = draw2d.policy.canvas.DecorationPolicy.extend(
  /** @lends draw2d.policy.canvas.ShowDotEditPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.ShowDotEditPolicy",

  BG_COLOR: "#FFFFFF",
  DOT_COLOR: "#999999",
  DOT_RADIUS: 1,
  DOT_DISTANCE: 20,

  /**
   * show a dot grid in the canvas for decoration.
   *
   * @param {Number} [dotDistance] the distance or grid width between the dots.
   * @param {Number} [dotRadius] the radius of the dots.
   * @param {draw2d.util.Color|String} [dotColor] the color for the dots.
   * @param {draw2d.util.Color|String} [bgColor] the background color of the canvas.
   */
  init: function (dotDistance, dotRadius, dotColor, bgColor) {
    this._super()
    this.dotDistance = dotDistance ?? this.DOT_DISTANCE
    this.dotRadius = dotRadius ?? this.DOT_RADIUS
    this.dotColor = new draw2d.util.Color(dotColor ?? this.DOT_COLOR)
    this.bgColor = new draw2d.util.Color(bgColor ?? this.BG_COLOR)
    this.onZoomCallback = (emitterFigure, zoomData) => this.setGrid(1/zoomData.value)
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
      const bgColor = this.bgColor.rgba()
      const dotColor = this.dotColor.rgba()
      canvasStyle.background = 
        `linear-gradient(90deg, ${bgColor} ${(this.dotDistance - this.dotRadius)*zoom}px, transparent 1%) center, 
         linear-gradient(${bgColor} ${(this.dotDistance - this.dotRadius)*zoom}px, transparent 1%) center, ${dotColor}`
      canvasStyle.backgroundSize = `${this.dotDistance*zoom}px ${this.dotDistance*zoom}px`
    }
  }
})
