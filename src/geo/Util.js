import draw2d from '../packages'


/**
 * @class
 * Geometric utils functions used in ray, point and some routers.
 *
 * @author Andreas Herz
 */
draw2d.geo.Util = {

  /**
   *
   * @param start {draw2d.geo.Point} start point of a line
   * @param end  {draw2d.geo.Point} end point of a line
   * @param distanceFromStart {Number} distance from the start point to extrapolate a new point
   * @returns {{x: *, y: *}|*} a new point with the distance *distanceFromStart* from the start point
   */
    insetPoint: function (start, end, distanceFromStart) {
      if (start.equals(end)) {
        return start
      }
      let vx = start.x - end.x
      let vy = start.y - end.y
      let length = Math.sqrt(vx * vx + vy * vy)
      let localDistance = Math.min(length / 2, distanceFromStart)
      return {
        x: end.x + vx / length * (length - localDistance),
        y: end.y + vy / length * (length - localDistance)
      }
    }
}
