/**
 * @class draw2d.layout.anchor.ShortesPathConnectionAnchor
 *
 * The ChopboxAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. A Connection using the
 * ChopBoxAnchor will be oriented such that they point to their port owner's
 * center.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
import draw2d from '../../packages'


draw2d.layout.anchor.ShortesPathConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend({

  NAME: "draw2d.layout.anchor.ShortesPathConnectionAnchor",

  /**
   * @constructs
   *
   * @param {draw2d.Figure} [owner] the figure to use for the anchor calculation
   */
  init: function (owner) {
    this._super(owner)
  },

  /**
   * @method
   *
   * Returns the location where the Connection should be anchored in
   * absolute coordinates. The anchor may use the given reference
   * Point to calculate this location.
   *
   * @param {draw2d.geo.Point} ref The reference Point in absolute coordinates
   * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The anchor's location
   */
  getLocation: function (ref, inquiringConnection) {
    let r = this.getOwner().getParent().getBoundingBox()
    let center = r.getCenter()

    // check if we can calculate with a circle/line intersection
    //
    if (this.getOwner().getParent() instanceof draw2d.shape.basic.Oval) {
      let result = this.getOwner().getParent().intersectionWithLine(ref, center)
      if (result.getSize() === 1) {
        return result.get(0)
      }
    }

    /*    0 | 1 | 2
     *    __|___|__
     *    7 | 8 | 3
     *    __|___|__
     *    6 | 5 | 4
     */
    let octant = r.determineOctant(new draw2d.geo.Rectangle(ref.x, ref.y, 2, 2))

    switch (octant) {
      case 0:
        return r.getTopLeft()
      case 1:
        return new draw2d.geo.Point(ref.x, r.getTop())
      case 2:
        return r.getTopRight()
      case 3:
        return new draw2d.geo.Point(r.getRight(), ref.y)
      case 4:
        return r.getBottomRight()
      case 5:
        return new draw2d.geo.Point(ref.x, r.getBottom())
      case 6:
        return r.getBottomLeft()
      case 7:
        return new draw2d.geo.Point(r.getLeft(), ref.y)
    }

    return r.getTopLeft()
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
   * @method
   *
   * Returns the bounds of this Anchor's owner. Subclasses can
   * override this method to adjust the box. Maybe you return the box
   * of the port parent (the parent figure)
   *
   * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The bounds of this Anchor's owner
   */
  getReferencePoint: function (inquiringConnection) {
    return this.getBox().getCenter()
  }
})
