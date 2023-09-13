import draw2d from '../../packages'


/**
 * @class
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
draw2d.layout.locator.ParallelMidpointLocator = draw2d.layout.locator.ConnectionLocator.extend(
  /** @lends draw2d.layout.locator.ParallelMidpointLocator.prototype */
  {

    NAME: "draw2d.layout.locator.ParallelMidpointLocator",

    /**
     * Constructs a ParallelMidpointLocator with optional padding to the connection.
     *
     * if the parameter <b>distance</b> is less than zero the label is
     * placed above of the connection. Else the label is below the connection.
     *
     * @param {Object} attr object with {distance: <NUMBER>>} distance of the label to the connection.
     */
    init: function (attr, setter, getter) {
      this.distance = 0

      this._super(
        {distance: -5, ...attr},
        {x: this.setDistance,...setter},
        {distance: this.getDistance,...getter}
      )
    },

    /**
     * Set the distance to the connection
     *
     * @param {Number} distance the distance to the connection
     * @returns {this}
     */
    setDistance: function (distance) {
      this.distance = distance
      return this
    },

    /**
     * Returns the distance to the connection
     *
     * @returns {Number}
     */
    getDistance: function () {
      return this.distance
    },

    /**
     *
     * Relocates the given Figure always in the center of an edge.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
      let conn = target.getParent()
      let points = conn.getVertices()

      let segmentIndex = Math.floor((points.getSize() - 2) / 2)
      if (points.getSize() <= segmentIndex + 1) {
        return
      }

      let p1 = points.get(segmentIndex)
      let p2 = points.get(segmentIndex + 1)

      // calculate the distance of the label (above or below the connection)
      let distance = this.distance <= 0 ? this.distance - target.getHeight() : this.distance

      // get the angle of the segment
      let nx = p1.x - p2.x
      let ny = p1.y - p2.y
      let length = Math.sqrt(nx * nx + ny * ny)
      let radian = -Math.asin(ny / length)
      let angle = (180 / Math.PI) * radian
      if (radian < 0) {
        if (p2.x < p1.x) {
          radian = Math.abs(radian) + Math.PI
          angle = 360 - angle
          distance = -distance - target.getHeight()
        } else {
          radian = Math.PI * 2 - Math.abs(radian)
          angle = 360 + angle
        }
      } else {
        if (p2.x < p1.x) {
          radian = Math.PI - radian
          angle = 360 - angle
          distance = -distance - target.getHeight()
        }
      }

      let rotAnchor = this.rotate(length / 2 - target.getWidth() / 2, distance, 0, 0, radian)

      // rotate the x/y coordinate with the calculated angle around "p1"
      //
      let rotCenterOfLabel = this.rotate(0, 0, target.getWidth() / 2, target.getHeight() / 2, radian)

      target.setRotationAngle(angle)
      target.setPosition(rotAnchor.x - rotCenterOfLabel.x + p1.x, rotAnchor.y - rotCenterOfLabel.y + p1.y)
    },

    rotate: function (x, y, xm, ym, radian) {
      let cos = Math.cos,
        sin = Math.sin

      // Subtract midpoints, so that midpoint is translated to origin
      // and add it in the end again
      return {
        x: (x - xm) * cos(radian) - (y - ym) * sin(radian) + xm,
        y: (x - xm) * sin(radian) + (y - ym) * cos(radian) + ym
      }
    }

  })
