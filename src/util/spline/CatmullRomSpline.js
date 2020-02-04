/**
 * @class draw2d.util.spline.CatmullRomSpline
 *
 * A catmull-rom spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.CubicSpline
 */
import draw2d from '../../packages';

draw2d.util.spline.CatmullRomSpline = draw2d.util.spline.CubicSpline.extend(

    /** @lends draw2d.util.spline.CatmullRomSpline.prototype */
    {
    
    NAME: "draw2d.util.spline.CatmullRomSpline",

    /**
     */
    init: function()
    {
        this._super();
    },


    blend: function(i, t) {
        if (i == -2)
            return ((-t + 2) * t - 1) * t / 2;
        else if (i == -1)
            return (((3 * t - 5) * t) * t + 2) / 2;
        else if (i == 0)
            return ((-3 * t + 4) * t + 1) * t / 2;
        else
            return ((t - 1) * t * t) / 2;
    }

});
