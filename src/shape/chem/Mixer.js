import draw2d from '../../packages'
	

/**
 * @class
 *
 *
 * @example
 *
 *    let figure =  new draw2d.shape.chem.Mixer({x:10, y:10});
 *
 *    canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.chem.Mixer = draw2d.SVGFigure.extend(
  /** @lends draw2d.shape.chem.Mixer.prototype */
  {

  NAME: "draw2d.shape.chem.Mixer",

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
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:nonzero;fill-opacity:1;stroke-dashoffset:0;stroke:#000000;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:3.3499999;fill:none" d="M5.327608 22.199992C5.854097 10.373735 15.21399 1.2163771 26.288374 1.6927681C37.362758 2.1691591 46.003018 12.100833 45.637581 23.934041C45.272292 35.767249 36.037995 45.069059 24.958287 44.764775C13.878579 44.460491 5.103998 34.664137 5.308272 22.826492" />'
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:evenodd;fill-opacity:0.75;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:1.35000002;fill:none" d="M5.393678 23.317144C5.393678 23.317144 0.0 23.317144 0.0 23.317144" />'
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:evenodd;fill-opacity:0.75;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:1.35000002;fill:none" d="M51.134339 23.317144C51.134339 23.317144 45.740662 23.317144 45.740662 23.317144" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.35000014;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M 49.906255,-0.5218053 C 24.639388,24.670266 24.680775,24.711808 24.680775,24.711808" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.35000014;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 25.240184,23.795558 c 3.271594,0.740884 6.541849,0.938144 9.121436,3.891231 1.607512,1.840271 1.620924,4.741064 0.603985,5.620867" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.35000014;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 25.592093,23.889437 c 0.728619,3.274348 0.82523,6.188908 3.768629,8.779543 1.834235,1.614398 4.734957,1.638681 5.618565,0.625046" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.35000014;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 25.594145,23.909565 c -0.728618,-3.274348 -1.136357,-6.501203 -4.079756,-9.091839 -1.834234,-1.614398 -4.734957,-1.63868 -5.618564,-0.625045" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.35000014;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M 25.545534,23.869106 C 22.27394,23.128222 19.093079,22.753004 16.513492,19.799918 14.905979,17.959646 14.892567,15.058853 15.909506,14.179051" />'
+ '</svg>'
 }
})
