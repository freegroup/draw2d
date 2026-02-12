import draw2d from '../../packages'


/**
 * @class
 *
 * A cubic spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.Spline
 */
draw2d.util.spline.CubicSpline = draw2d.util.spline.Spline.extend(

    /** @lends draw2d.util.spline.CubicSpline.prototype */
    {
    
    NAME: "draw2d.util.spline.CubicSpline",

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
      // This implementation of an cubic spline needs at least 3 control points. Return the 
      // original point if they do not meet them
      if(n<3) {
        return controlPoints.clone(true)
      }

      // Endpoints are added twice to get them include in the
      // generated array
      let cp = new draw2d.util.ArrayList();
      cp.add(controlPoints.get(0));
      cp.addAll(controlPoints);
      cp.add(controlPoints.get(controlPoints.getSize()-1));

      let n = cp.getSize();
      let spline = new draw2d.util.ArrayList();
      spline.add(controlPoints.get(0));
      spline.add( this.p(1, 0, cp) );

      for (let i = 1; i < n - 2; i++) {
        for (let j = 1; j <= parts; j++) {
          spline.add( this.p(i, j / parts, cp));
        }
      }
      spline.add(controlPoints.get(controlPoints.getSize()-1));

      return spline;
    },


    p: function( i,  t,  cp)
    {
      let x = 0.0;
      let y = 0.0;

      let k = i-1;
      for (let j = -2; j <= 1; j++) {
        let b = this.blend (j, t);
        let p = cp.get(k++);
        if(!p){
          console.log("error")
        }
        x += b * p.x;
        y += b * p.y;
      }

      return new draw2d.geo.Point(x, y);
    },

    blend: function(i, t)
    {
      if (i === -2)
          return (((-t + 3) * t - 3) * t + 1) / 6;
      else if (i === -1)
          return (((3 * t - 6) * t) * t + 4) / 6;
      else if (i === 0)
          return (((-3 * t + 3) * t + 3) * t + 1) / 6;

      return (t * t * t) / 6;
    }

});
