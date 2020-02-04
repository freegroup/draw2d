/**
 * @class draw2d.policy.canvas.ZoomPolicy
 * Generic zoom policy installable into a canvas object.
 * This is the legacy implementation of the very first zooming in
 * Draw2D. You can use this implementation if you want backward compatible.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 5.8.0
 */
import draw2d from '../../packages'
import {Tweenable} from "shifty"

draw2d.policy.canvas.ZoomPolicy = draw2d.policy.canvas.CanvasPolicy.extend(
  /** @lends draw2d.policy.canvas.ZoomPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.ZoomPolicy",

  /**
   * @constructs
   */
  init: function () {
    this._super()
  },

  onInstall: function (canvas) {
    this._super(canvas)
    canvas.setZoom(1)
  },

  onUninstall: function (canvas) {
    this._super(canvas)
  },

  /** 
   * Set the new zoom factor for the canvas. The value must be between [0.01..10]
   *
   *      // you can register an eventhandler to listen to the zoom factor of the canvas.
   *     //
   *      canvas.on("zoom", function(emitterFigure, zoomData){
   *          alert("canvas zoomed to:"+zoomData.factor);
   *      });
   *
   * @param {Number} zoomFactor new zoom factor.
   * @param {Boolean} [animated] set it to true for smooth zoom in/out
   **/
  setZoom: function (zoomFactor, animated) {
    let canvas = this.canvas

    let _zoom = function (z) {
      canvas.zoomFactor = Math.min(Math.max(0.01, z), 10)

      let viewBoxWidth = (canvas.initialWidth * (canvas.zoomFactor)) | 0
      let viewBoxHeight = (canvas.initialHeight * (canvas.zoomFactor)) | 0

      canvas.paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight)

      canvas.fireEvent("zoom", {value: canvas.zoomFactor})
    }

    if (animated) {
      let myTweenable = new Tweenable()
      myTweenable.tween({
        from: {'x': canvas.zoomFactor},
        to: {'x': zoomFactor},
        duration: 300,
        easing: "easeOutSine",
        step: params => _zoom(params.x),
        finish: state => canvas.fireEvent("zoomed", {value: canvas.zoomFactor})
      })
    }
    else {
      _zoom(zoomFactor)
      canvas.fireEvent("zoomed", {value: canvas.zoomFactor})
    }
  }
})
