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
        // Endpoints are added twice to get them include in the
        // generated array
        var cp = new draw2d.util.ArrayList();
        cp.add(controlPoints.get(0));
        cp.addAll(controlPoints);
        cp.add(controlPoints.get(controlPoints.getSize()-1));

      var n = cp.getSize();
      var spline = new draw2d.util.ArrayList();
      spline.add(controlPoints.get(0));
      spline.add( this.p(1, 0, cp) );

      for (var i = 1; i < n - 2; i++) {
        for (var j = 1; j <= parts; j++) {
          spline.add( this.p(i, j / parts, cp));
        }
      }
      spline.add(controlPoints.get(controlPoints.getSize()-1));

      return spline;
    },


      p: function( i,  t,  cp)
      {
        var x = 0.0;
        var y = 0.0;

        var k = i-1;
        for (var j = -2; j <= 1; j++) {
          var b = this.blend (j, t);
          var p = cp.get(k++);
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
