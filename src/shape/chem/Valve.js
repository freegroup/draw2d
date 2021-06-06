import draw2d from '../../packages'
	

/**
 * @class
 *
 *
 * @example
 *
 *    let figure =  new draw2d.shape.chem.Valve({x:10, y:10});
 *
 *    canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.chem.Valve = draw2d.SVGFigure.extend(
  /** @lends draw2d.shape.chem.Valve.prototype */
  {

  NAME: "draw2d.shape.chem.Valve",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 41, height: 50, keepAspectRatio: true}, attr), setter, getter)

    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:0.0, y:75.0})) // left
    this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator({x:100.0, y:75.0})) // right
  },


  /**
   * @inheritdoc
   */
  getSVG: function () {
    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="41" height="50">'
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:evenodd;fill-opacity:0.75;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:1.34916258;fill:none" d="M7.9986049 34.013518C7.9986049 34.013518 0.0 34.013518 0.0 34.013518" />'
+ '<path style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:3.34792185;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M 7.84625,21.176352 33.055633,45.671077 V 21.176352 L 7.8778303,45.671077 Z"/>'
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:evenodd;fill-opacity:0.75;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:3.34792185;fill:none" d="M20.473567 34.854834C20.473567 34.854834 20.473567 8.9371439 20.473567 8.9371439"/>'
+ '<path style="opacity:0.9;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1;stroke-dashoffset:0;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:3.34792185;fill:none" d="M20.431712 1.673961C27.122252 1.673961 32.546007 5.2332974 32.546007 9.6239665C32.546007 9.6239665 8.3174169 9.6239665 8.3174169 9.6239665C8.3174169 5.2332974 13.741174 1.673961 20.431712 1.673961C20.431712 1.673961 20.431712 1.673961 20.431712 1.673961"/>'
+ '<path style="stroke-linejoin:miter;stroke-opacity:1;fill-rule:evenodd;fill-opacity:0.75;stroke:#000000;stroke-linecap:butt;stroke-miterlimit:4;stroke-dasharray:none;stroke-width:1.34916258;fill:none" d="M41.427793 33.98901C41.427793 33.98901 33.429185 33.98901 33.429185 33.98901"/>'
+ '</svg>'
 }
})
