

/**
 * @class draw2d.geo.Ray
 * A ray is a line starting in [0,0,] with some additional
 * helper functions required for some router.
 * 
 * @inheritable
 * @extends draw2d.geo.Point
 * @author Andreas Herz
 */
import draw2d from '../packages';


draw2d.geo.Util=
{

    insetPoint: function(start, end, distanceFromStart){
        if(start.equals(end)){
            return start;
        }
        var vx = start.x-end.x;
        var vy = start.y-end.y;
        var length = Math.sqrt(vx*vx + vy*vy);
        var localDistance = Math.min(length/2,distanceFromStart);
        return {x: end.x + vx/length * (length - localDistance),
                y: end.y + vy/length * (length - localDistance)};

    }

};
