import draw2d from '../packages'


/**
 * Static util function to determine the minimal distance of point(px,py) on the line(x1,y1,x2,y2)
 *
 *
 * @returns {Number}
 * @static
 * @private
 * @param {Number} X1 x coordinate of the start point of the line
 * @param {Number} Y1 y coordinate of the start point of the line
 * @param {Number} X2 x coordinate of the end point of the line
 * @param {Number} Y2 y coordinate of the end point of the line
 * @param {Number} px x coordinate of the point to test
 * @param {Number} py y coordinate of the point to test
 **/
draw2d.geo.Line = {

  /**
   * Returns the relative position of the point on the line between [0..1]
   * The point "p" must be part of the line!!
   *
   * 0 => given point is on the start location
   * ..=> given point is in between
   * 1 => given point is at the end
   *
   * @returns {Number}
   */
  inverseLerp: function (X1, Y1, X2, Y2, px, py) {
    let nenner = Math.abs(X2 - X1)
    let zaehler = Math.abs(X2 - px)
    if (nenner === 0) {
      nenner = Math.abs(Y2 - Y1)
      zaehler = Math.abs(Y2 - py)
      if (nenner === 0) {
        return 1
      }
    }

    return zaehler / nenner
  },


  /**
   *
   * Returns the projection of the point onto the line.
   *
   * @param {Number} px the x coordinate of the test point
   * @param {Number} py the y coordinate of the test point
   * @returns {draw2d.geo.Point}
   **/
  pointProjection: function (X1, Y1, X2, Y2, px, py) {
    let r = new draw2d.geo.Point(0, 0)
    if (X1 === X2 && Y1 === Y2) X1 -= 0.00001

    let U = ((px - X1) * (X2 - X1)) + ((py - Y1) * (Y2 - Y1))

    let Udenom = Math.pow(X2 - X1, 2) + Math.pow(Y2 - Y1, 2)

    U /= Udenom

    r.x = X1 + (U * (X2 - X1))
    r.y = Y1 + (U * (Y2 - Y1))

    let minx, maxx, miny, maxy

    minx = Math.min(X1, X2)
    maxx = Math.max(X1, X2)

    miny = Math.min(Y1, Y2)
    maxy = Math.max(Y1, Y2)

    let isValid = (r.x >= minx && r.x <= maxx) && (r.y >= miny && r.y <= maxy)

    return isValid ? r : null
  },

  distance: function (X1, Y1, X2, Y2, px, py) {
    // Adjust vectors relative to X1,Y1
    // X2,Y2 becomes relative vector from X1,Y1 to end of segment
    X2 -= X1
    Y2 -= Y1
    // px,py becomes relative vector from X1,Y1 to test point
    px -= X1
    py -= Y1
    let dotprod = px * X2 + py * Y2
    let projlenSq
    if (dotprod <= 0.0) {
      // px,py is on the side of X1,Y1 away from X2,Y2
      // distance to segment is length of px,py vector
      // "length of its (clipped) projection" is now 0.0
      projlenSq = 0.0
    } else {
      // switch to backwards vectors relative to X2,Y2
      // X2,Y2 are already the negative of X1,Y1=>X2,Y2
      // to get px,py to be the negative of px,py=>X2,Y2
      // the dot product of two negated vectors is the same
      // as the dot product of the two normal vectors
      px = X2 - px
      py = Y2 - py
      dotprod = px * X2 + py * Y2
      if (dotprod <= 0.0) {
        // px,py is on the side of X2,Y2 away from X1,Y1
        // distance to segment is length of (backwards) px,py vector
        // "length of its (clipped) projection" is now 0.0
        projlenSq = 0.0
      } else {
        // px,py is between X1,Y1 and X2,Y2
        // dotprod is the length of the px,py vector
        // projected on the X2,Y2=>X1,Y1 vector times the
        // length of the X2,Y2=>X1,Y1 vector
        projlenSq = dotprod * dotprod / (X2 * X2 + Y2 * Y2)
      }
    }
    // Distance to line is now the length of the relative point
    // vector minus the length of its projection onto the line
    // (which is zero if the projection falls outside the range
    //  of the line segment).
    let lenSq = px * px + py * py - projlenSq
    if (lenSq < 0) {
      lenSq = 0
    }
    return Math.sqrt(lenSq)
  }
}

