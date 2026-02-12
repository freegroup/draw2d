

/**
 * @class
 *
 * A bezier spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.Spline
 */
import draw2d from '../../packages'

draw2d.util.spline.BezierSpline = draw2d.util.spline.Spline.extend(

    /** @lends draw2d.util.spline.BezierSpline.prototype */
    {
    
    NAME: "draw2d.util.spline.BezierSpline",

    /**
     */
    init: function()
    {
        this._super();
    },



    /**
     * Create a spline based on the given control points.
     * The generated curve starts in the first control point and ends
     * in the last control point.
     *
     * @param {Array} controlPoints  Control points of spline (x0,y0,z0,x1,y1,z1,...).
     * @param {Number} parts Number of parts to divide each leg into.
     *
     * @returns {Array} the new generated array with new draw2d.geo.Point
     */
    generate: function(controlPoints, parts)
    {
      let n = controlPoints.getSize();
      // This implementation of an bezier Spline needs at least 4 control points. Return the 
      // original point if they do not meet them
      if(n<4) {
        return controlPoints.clone(true)
      }

      let spline = new draw2d.util.ArrayList();

      spline.add(this.p(0, 0, controlPoints));

      for (let i = 0; i < n - 3; i += 3) {
        for (let j = 1; j <= parts; j++) {
           spline.add(this.p (i, j /  parts, controlPoints));
        }
      }
      return spline;
    },

    p: function( i,  t,  cp)
    {
      let x = 0.0;
      let y = 0.0;

      let k = i;
      for (let j = 0; j <= 3; j++) {
        let b = this.blend (j, t);
        let p = cp.get(k++);
        x += b * p.x;
        y += b * p.y;
     }

      return new draw2d.geo.Point( x, y);
    },

    blend: function ( i,  t)
    {
      if      (i == 0) return (1 - t) * (1 - t) * (1 - t);
      else if (i == 1) return 3 * t * (1 - t) * (1 - t);
      else if (i == 2) return 3 * t * t * (1 - t);
      else             return t * t * t;
    }
});
