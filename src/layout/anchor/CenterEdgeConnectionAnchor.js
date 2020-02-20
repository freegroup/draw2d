import draw2d from '../../packages'


/**
 * @class
 *
 * The CenterEdgeConnectionAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. A Connection using the
 * ChopBoxAnchor will be oriented such that they point to their port owner's
 * center.
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */

draw2d.layout.anchor.CenterEdgeConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend(
  /** @lends draw2d.layout.anchor.CenterEdgeConnectionAnchor.prototype */
  {

  NAME: "draw2d.layout.anchor.CenterEdgeConnectionAnchor",

  /**
   *
   * @param {draw2d.Figure} [owner] the figure to use for the anchor calculation
   */
  init: function (owner) {
    this._super(owner)
  },

  /**
   * 
   *
   * Returns the location where the Connection should be anchored in
   * absolute coordinates. The anchor may use the given reference
   * Point to calculate this location.
   *
   * @param {draw2d.geo.Point} ref The reference Point in absolute coordinates
   * @param {draw2d.Connection} [inquiringConnection] the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The anchor's location
   */
  getLocation: function (ref, inquiringConnection) {
    let r = this.getOwner().getParent().getBoundingBox()

    let dir = r.getDirection(ref)
    let center = r.getCenter()

    switch (dir) {
      case 0:
        center.y = r.y
        break
      case 1:
        center.x = r.x + r.w
        break
      case 2:
        center.y = r.y + r.h
        break
      case 3:
        center.x = r.x
    }

    return center
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
   * Returns the bounds of this Anchor's owner. Subclasses can
   * override this method to adjust the box. Maybe you return the box
   * of the port parent (the parent figure)
   *
   * @param {draw2d.Connection} [inquiringConnection] the connection who ask for the location.
   *
   * @return {draw2d.geo.Point} The bounds of this Anchor's owner
   */
  getReferencePoint: function (inquiringConnection) {
    return this.getBox().getCenter()
  }
})
