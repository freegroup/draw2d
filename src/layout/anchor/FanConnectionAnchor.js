/**
 * @class draw2d.layout.anchor.FanConnectionAnchor
 *
 * The FanConnectionAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box.
 * Additional the anchor resolves conflicts by spread the anchor if more than one
 * connection has the same reference point. <br>
 * In a case of a DirectRouter parallel connections are the result.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @since 4.6.0
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
import draw2d from '../../packages'


draw2d.layout.anchor.FanConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend(
  /** @lends draw2d.layout.anchor.FanConnectionAnchor.prototype */
  {

  NAME: "draw2d.layout.anchor.FanConnectionAnchor",

  /**
   *
   * @param {draw2d.Figure} owner the figure to use for the anchor calculation
   * @param {Number} [separation] the separation or fan distance between the concurrent/conflicting anchors
   */
  init: function (owner, separation) {
    this._super(owner)

    if (separation) {
      this.separation = parseInt(separation)
    }
    else {
      this.separation = 10
    }
  },

  /**
   * 
   *
   * Returns the location where the Connection should be anchored in
   * absolute coordinates. The anchor may use the given reference
   * Point to calculate this location.
   *
   * @param {draw2d.geo.Point} reference The reference Point in absolute coordinates
   * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The anchor's location
   */
  getLocation: function (reference, inquiringConnection) {

    let r = new draw2d.geo.Rectangle(0, 0)
    r.setBounds(this.getBox())
    r.translate(-1, -1)
    r.resize(1, 1)

    let center = r.getCenter()

    if (r.isEmpty() || (reference.x === center.x && reference.y === center.y)) {
      return center // This avoids divide-by-zero
    }

    // translate the center if required
    //
    let s = inquiringConnection.getSource()
    let t = inquiringConnection.getTarget()
    let lines = this.getOwner().getConnections().clone()
    lines.grep(function (other) {
      return (other.getTarget() === t && other.getSource() === s) || (other.getTarget() === s && other.getSource() === t)
    })
    let index = lines.indexOf(inquiringConnection) + 1
    let position = center.getPosition(reference)
    let ray
    if (position === draw2d.geo.PositionConstants.SOUTH || position === draw2d.geo.PositionConstants.EAST) {
      ray = new draw2d.geo.Point(reference.x - center.x, reference.y - center.y)
    }
    else {
      ray = new draw2d.geo.Point(center.x - reference.x, center.y - reference.y)
    }
    let length = Math.sqrt(ray.x * ray.x + ray.y * ray.y)
    if (index <= 2) {
      length *= 1.5
    }
    let xSeparation = this.separation * ray.x / length
    let ySeparation = this.separation * ray.y / length
    if (index % 2 === 0) {
      center = new draw2d.geo.Point(center.x + (index / 2) * (-1 * ySeparation), center.y + (index / 2) * xSeparation)
    }
    else {
      center = new draw2d.geo.Point(center.x + (index / 2) * ySeparation, center.y + (index / 2) * (-1 * xSeparation))
    }

    let intersections = this.getBox().intersectionWithLine(center, reference)
    // perfect - one intersection mean that the shifted center point is inside the bounding box and has only one intersection with it.
    //
    switch (intersections.getSize()) {
      case 0:
        // calculate the edge of the bounding box which is nearest to the reference point
        //
        let v = this.getBox().getVertices()
        let first = v.first()
        first.distance = reference.distance(first)
        return v.asArray().reduce(function (previous, current) {
          current.distance = reference.distance(current)
          return current.distance < previous.distance ? current : previous
        })
      case 1:
        return intersections.get(0)
      case 2:
        // get the nearest of these points
        let p0 = intersections.get(0)
        let p1 = intersections.get(1)
        let p0diff = reference.distance(p0)
        let p1diff = reference.distance(p1)
        if (p0diff < p1diff) {
          return p0
        }
        return p1
    }

    // we have 0 or 2 intersections with the bounding box. This means the shifted
    // calculate the intersection if the new "center" with the bounding box of the
    // shape (if any exists)

  },

  /**
   * Returns the bounds of this Anchor's owner. Subclasses can
   * override this method to adjust the box. Maybe you return the box
   * of the port parent (the parent figure)
   *
   * @return {draw2d.geo.Rectangle} The bounds of this Anchor's owner
   */
  getBox: function () {
    return this.getOwner().getParent().getBoundingBox()
  },

  /**
   * 
   *
   * Returns the reference point for this anchor in absolute coordinates. This might be used
   * by another anchor to determine its own location.
   *
   * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The bounds of this Anchor's owner
   */
  getReferencePoint: function (inquiringConnection) {
    return this.getBox().getCenter()
  }
})
