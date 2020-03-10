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

  DOT_COLOR: "#999999",
  DOT_RADIUS: 1,
  DOT_DISTANCE: 20,

  /**
   * show a dot grid in the canvas for decoration.
   *
   * @param {Number} [dotDistance] the distance or grid width between the dots.
   * @param {Number} [dotRadius] the radius of the dots.
   * @param {draw2d.util.Color|String} [dotColor] the color for the dots.
   */
  init: function (dotDistance, dotRadius, dotColor) {
    this._super()

    this.dotDistance = dotDistance ? dotDistance : this.DOT_DISTANCE
    this.dotRadius = dotRadius ? dotRadius : this.DOT_RADIUS
    this.dotColor = new draw2d.util.Color(dotColor ? dotColor : this.DOT_COLOR)
    this.onZoomCallback =(emitterFigure, zoomData) => {
      this.setGrid(1/zoomData.value)
    }
  },

  onInstall: function (canvas) {
    this._super(canvas)

    this.oldBg = this.canvas.html.css("background")
    this.setGrid(1/canvas.getZoom())
    canvas.on("zoom", this.onZoomCallback)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
    $(canvas.paper.canvas).css({"background": this.oldBg})
    canvas.off(this.onZoomCallback)
  },

  /**
   * @private
   * @param {Number} zoom 
   */
  setGrid: function (zoom) {
    let bgColor = "#FFFFFF"
    let dotColor = this.dotColor.rgba()

    let background = `linear-gradient(90deg, ${bgColor} ${(this.dotDistance - this.dotRadius)*zoom}px, transparent 1%) center, linear-gradient(${bgColor} ${(this.dotDistance - this.dotRadius)*zoom}px, transparent 1%) center, ${dotColor}`
    let backgroundSize = `${this.dotDistance*zoom}px ${this.dotDistance*zoom}px`

    $(this.canvas.paper.canvas).css({
      "background": background,
      "background-size": backgroundSize
    })
  }
})
