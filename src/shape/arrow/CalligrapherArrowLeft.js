/**
 * @class draw2d.shape.arrow.CalligrapherArrowLeft
 * Hand drawn arrow to the left.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     let figure =  new draw2d.shape.arrow.CalligrapherArrowLeft({x:10, y:10, color:"#3d3d3d"});
 *
 *     canvas.add(figure);
 *
 * @extends draw2d.SVGFigure
 */
import draw2d from '../../packages'

draw2d.shape.arrow.CalligrapherArrowLeft = draw2d.SVGFigure.extend({

  NAME: "draw2d.shape.arrow.CalligrapherArrowLeft",

  /**
   * @constructor
   * Creates a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(attr)
  },


  getSVG: function () {
    return '<svg width="230" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
      '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3024" d="m 218.87943,27.464763 c -1.21088,-0.0563 -2.42064,-0.14616 -3.63262,-0.16893 c -5.82495,-0.10948 -18.61676,-0.0226 -22.97385,0.0122 c -7.12848,0.057 -14.25673,0.14021 -21.38495,0.22333 c -9.03765,0.10539 -18.07511,0.22813 -27.11266,0.3422 c -10.2269,0.11878 -20.4538,0.23756 -30.6807,0.35634 c -35.488759,0.4089 -70.975849,0.82793 -106.4669238,0.95195 c 0,0 7.9718628,-5.70244 7.9718628,-5.70244 l 0,0 c 6.374241,0.28694 12.745594,0.64561 19.122722,0.86083 c 28.09499,0.94816 56.21338,0.92473 84.315959,0.32205 c 10.51273,-0.32805 21.0288,-0.56402 31.53819,-0.98412 c 27.47361,-1.09824 54.91405,-2.91665 82.28177,-5.53697 c 0,0 -12.9788,9.32351 -12.9788,9.32351 z" inkscape:connector-curvature="0" />' +
      '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3026" d="m 100.75066,1.6309831 c -7.165239,3.9571 -14.284929,7.47866 -22.036659,10.2707299 c -5.00195,1.80163 -10.10374,3.31886 -15.2402,4.79424 c -8.25878,2.37815 -16.55626,4.65805 -24.9012,6.79479 c -2.89107,0.71593 -5.74687,1.56407 -8.66266,2.20424 c -3.211679,0.70512 -6.49468,1.17333 -9.752959,1.6747 c -5.447101,0.92112 -10.9044008,1.81762 -16.3983488,2.50082 c -1.608931,0.0814 -0.850754,0.10697 -2.275834,-0.0365 C 20.004071,21.041553 19.256899,21.517873 32.515691,19.216243 c 6.21537,-1.05913 12.34875,-2.37668 18.3945,-4.03234 c 8.12719,-2.02803 16.23765,-4.1157 24.26421,-6.4321199 c 5.23574,-1.55053 10.41682,-3.15473 15.46857,-5.12875 c 1.38953,-0.54295 2.7579,-1.12682 4.12253,-1.71603 c 0.98421,-0.42496 3.86537,-1.81801999 2.92296,-1.32600999 C 93.642191,2.6934931 89.529511,4.7073031 85.450031,6.7704531 l 15.300629,-5.1394 z" inkscape:connector-curvature="0" sodipodi:nodetypes="csccsccccccsssccc" />' +
      '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3028" d="m 80.764281,58.068863 c -2.45498,-3.50762 -6.58178,-6.10525 -10.40324,-8.66732 c -4.30614,-2.72676 -7.93958,-6.28283 -12.6021,-8.28702 c -7.39912,-4.50257 -11.70055,-7.85592 -20.85866,-9.23429 c -4.9257,-0.85706 -17.294247,-1.32043 -22.226462,-2.15427 c -3.445882,-0.42869 -6.2035918,0.70541 -9.6845138,0.57715 c -1.496337,-0.0586 -2.99355,-0.0965 -4.491229,-0.12472 l 13.9525278,-6.24562 l 3.25,-1.17153 c 1.441459,0.0813 -1.116338,0.15309 0.325505,0.23016 c 3.574557,0.17902 7.211864,0.0695 10.712655,0.73822 c 4.723107,1.08097 9.443947,2.1624 14.234177,3.05317 c 2.76739,0.64203 3.92627,0.87082 6.64127,1.66289 c 4.42146,1.28993 8.60075,3.01513 12.86503,4.58129 c 1.90199,0.73446 5.05193,1.93181 6.89302,2.7216 c 4.92005,2.11061 9.5916,4.57045 13.9716,7.31023 c 4.16708,2.62011 8.48023,5.20033 11.72012,8.56863 z" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccccccccscsccc" />' +
      '</svg>'
  },

  /**
   * @method
   * propagate all attributes like color, stroke,... to the shape element
   **/
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }


    if (this.svgNodes !== null) {
      this.svgNodes.attr({fill: this.color.hash()})
    }

    this._super(attributes)
  }

})
