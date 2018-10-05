/**
 * @class draw2d.layout.locator.ParallelMidpointLocator
 *
 * A ParallelMidpointLocator that is used to place label at the midpoint of a  routed
 * connection. The midpoint is always in the center of an edge.
 * The label is aligned to the connection angle at the calculated conection segment.
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ConnectionLocator
 * @since 4.4.4
 */
import draw2d from '../../packages'

draw2d.layout.locator.ParallelMidpointLocator = draw2d.layout.locator.ConnectionLocator.extend({
  NAME: "draw2d.layout.locator.ParallelMidpointLocator",

  /**
   * @constructor
   * Constructs a ParallelMidpointLocator with optional padding to the connection.
   *
   * if the parameter <b>distanceFromConnection</b> is less than zero the label is
   * placed above of the connection. Else the label is below the connection.
   *
   * @param {Number} distanceFromConnection the distance of the label to the connection.
   */
  init: function (distanceFromConnection) {
    this._super()

    if (typeof distanceFromConnection !== "undefined") {
      this.distanceFromConnection = parseFloat(distanceFromConnection)
    }
    else {
      this.distanceFromConnection = -5
    }
  },


  /**
   * @method
   * Relocates the given Figure always in the center of an edge.
   *
   * @param {Number} index child index of the target
   * @param {draw2d.Figure} target The figure to relocate
   **/
  relocate: function (index, target) {
    var conn = target.getParent()
    var points = conn.getVertices()

    var segmentIndex = Math.floor((points.getSize() - 2) / 2)
    if (points.getSize() <= segmentIndex + 1) {
      return
    }

    var p1 = points.get(segmentIndex)
    var p2 = points.get(segmentIndex + 1)

    // calculate the distance of the label (above or below the connection)
    var distance = this.distanceFromConnection <= 0 ? this.distanceFromConnection - target.getHeight() : this.distanceFromConnection

    // get the angle of the segment
    var nx = p1.x - p2.x
    var ny = p1.y - p2.y
    var length = Math.sqrt(nx * nx + ny * ny)
    var radian = -Math.asin(ny / length)
    var angle = (180 / Math.PI) * radian
    if (radian < 0) {
      if (p2.x < p1.x) {
        radian = Math.abs(radian) + Math.PI
        angle = 360 - angle
        distance = -distance - target.getHeight()
      }
      else {
        radian = Math.PI * 2 - Math.abs(radian)
        angle = 360 + angle
      }
    }
    else {
      if (p2.x < p1.x) {
        radian = Math.PI - radian
        angle = 360 - angle
        distance = -distance - target.getHeight()
      }
    }

    var rotAnchor = this.rotate(length / 2 - target.getWidth() / 2, distance, 0, 0, radian)

    // rotate the x/y coordinate with the calculated angle around "p1"
    //
    var rotCenterOfLabel = this.rotate(0, 0, target.getWidth() / 2, target.getHeight() / 2, radian)

    target.setRotationAngle(angle)
    target.setPosition(rotAnchor.x - rotCenterOfLabel.x + p1.x, rotAnchor.y - rotCenterOfLabel.y + p1.y)
  },

  rotate: function (x, y, xm, ym, radian) {
    var cos = Math.cos,
      sin = Math.sin

    // Subtract midpoints, so that midpoint is translated to origin
    // and add it in the end again
    return {
      x: (x - xm) * cos(radian) - (y - ym) * sin(radian) + xm,
      y: (x - xm) * sin(radian) + (y - ym) * cos(radian) + ym
    }
  }

})
