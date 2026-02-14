import draw2d from '../packages'


/**
 * @class
 * Geometric utils functions used in ray, point and some routers.
 *
 * @author Andreas Herz
 */
draw2d.geo.Util = {

  /**
   * Calculates a point along a line at a specified distance from the start.
   *
   * @param {draw2d.geo.Point} start start point of a line
   * @param {draw2d.geo.Point} end end point of a line
   * @param {Number} distanceFromStart distance from the start point to extrapolate a new point
   * @returns {Object} Point-like object {x, y} - returns start point if start equals end
   */
    insetPoint: function (start, end, distanceFromStart) {
      if (start.equals(end)) {
        return start
      }
      let vx = start.x - end.x
      let vy = start.y - end.y
      let length = Math.sqrt(vx * vx + vy * vy)
      // t = ratio along line from start (0.0) to end (1.0)
      // We want point at distanceFromStart from start, clamped to half the line length
      let t = Math.min(distanceFromStart, length * 0.5) / length
      return {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
      }
    }
}
