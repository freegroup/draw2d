import draw2d from '../../packages'
	

/**
 * @class
 *
 *
 * @example
 *
 *    let figure =  new draw2d.shape.chem.HeatExchanger({x:10, y:10});
 *
 *    canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.chem.HeatExchanger = draw2d.SVGFigure.extend(
  /** @lends draw2d.shape.chem.HeatExchanger.prototype */
  {

  NAME: "draw2d.shape.chem.HeatExchanger",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 51, height: 52, keepAspectRatio: true}, attr), setter, getter)

    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:0.0, y:50.0})) // left
    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:100.0, y:50.0})) // right
    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:50.0, y:0.0})) // top
    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:50.0, y:100.0})) // bottom
  },


  /**
   * @inheritdoc
   */
  getSVG: function () {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="51" height="52">'
+ '<path d="M 5.327608,24.758183 C 5.854097,12.931926 15.21399,3.7745679 26.288374,4.2509589 37.362758,4.7273499 46.003018,14.659024 45.637581,26.492232 45.272292,38.32544 36.037995,47.62725 24.958287,47.322966 13.878579,47.018682 5.103998,37.222328 5.308272,25.384683" style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:3.3499999;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>'
+ '<path d="m 5.393678,25.875335 c 0,0 -5.393678,0 -5.393678,0" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="m 25.221256,4.0811779 c 0,0 0,9.4679711 0,9.4679711 0,0 -13.38562,8.62602 -13.38562,8.62602 0,0 26.66953,9.49547 26.66953,9.49547 0,0 -13.28391,7.8341 -13.28391,7.8341 0,0 0,8.145228 0,8.145228" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.3499999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="m 25.221256,4.0811779 c 0,0 0,-4.0811779 0,-4.0811779" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="m 25.221256,51.731145 c 0,0 0,-4.081178 0,-4.081178" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '<path d="m 51.134339,25.875335 c 0,0 -5.393677,0 -5.393677,0" style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:1.35000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>'
+ '</svg>'
 
 }
})
