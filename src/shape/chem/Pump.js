import draw2d from '../../packages'
	

/**
 * @class
 *
 *
 * @example
 *
 *    let figure =  new draw2d.shape.chem.Pump({x:10, y:10});
 *
 *    canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.chem.Pump = draw2d.SVGFigure.extend(
  /** @lends draw2d.shape.chem.Pump.prototype */
  {

  NAME: "draw2d.shape.chem.Pump",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 51, height: 43, keepAspectRatio: true}, attr), setter, getter)

    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:0.0, y:50.0})) // left
    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:100.0, y:50.0})) // right
  },


  /**
   * @inheritdoc
   */
  getSVG: function () {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="51" height="46">'
+ '<path d="M5.327608 22.199992C5.854097 10.373735 15.21399 1.2163771 26.288374 1.6927681C37.362758 2.1691591 46.003018 12.100833 45.637581 23.934041C45.272292 35.767249 36.037995 45.069059 24.958287 44.764775C13.878579 44.460491 5.103998 34.664137 5.308272 22.826492" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:3.3499999;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>'
+ '<path d="M5.393678 23.317144C5.393678 23.317144 0.0 23.317144 0.0 23.317144" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="M51.134339 23.317144C51.134339 23.317144 45.740662 23.317144 45.740662 23.317144" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="M15.729903 4.6942584C15.729903 4.6942584 42.813289 23.680166 42.813289 23.680166C42.813289 23.680166 15.729903 41.903419 15.729903 41.903419" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.3499999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '</svg>'
 }
})
