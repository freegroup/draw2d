/**
 * @class draw2d.geo.Point Util class for geometrie handling.
 */
import draw2d from '../packages'


draw2d.geo.Point = Class.extend({

  NAME: "draw2d.geo.Point",

  /**
   * @constructor
   * Creates a new Point object with the hands over coordinates.
   * @param {Number|draw2d.geo.Point} x
   * @param {Number} y
   */
  init: function (x, y) {
    if (x instanceof draw2d.geo.Point) {
      this.x = x.x
      this.y = x.y
    }
    else if (!isNaN(parseFloat(x.x)) && !isNaN(parseFloat(x.y))) {
      this.x = x.x
      this.y = x.y
    }
    else {
      this.x = x
      this.y = y
    }


    // limit for the maxi/minimum boundary of this rectangle
    // It is not possible that the rect leave the boundary if set.
    this.bx = null
    this.by = null
    this.bw = null
    this.bh = null
  },


  /**
   * @method
   * Set the boundary of the rectangle. If set, the rectangle is always inside
   * the boundary. A setX or setY will always be adjusted.
   *
   */
  setBoundary: function (bx, by, bw, bh) {
    if (bx instanceof draw2d.geo.Rectangle) {
      this.bx = bx.x
      this.by = bx.y
      this.bw = bx.w
      this.bh = bx.h
    } else {
      this.bx = bx
      this.by = by
      this.bw = bw
      this.bh = bh
    }
    this.adjustBoundary()

    return this
  },


  /**
   * @method
   * @private
   */
  adjustBoundary: function () {
    if (this.bx === null) {
      return
    }
    this.x = Math.min(Math.max(this.bx, this.x), this.bw)
    this.y = Math.min(Math.max(this.by, this.y), this.bh)

    return this
  },

  /**
   * @method
   * Moves this Rectangle horizontally by dx and vertically by dy, then returns
   * this Rectangle for convenience.<br>
   * <br>
   * The method return the object itself. This allows you to do command chaining, where
   * you can perform multiple methods on the same elements.
   *
   * @param {Number} dx  Shift along X axis
   * @param {Number} dy  Shift along Y axis
   *
   **/
  translate: function (dx, dy) {
    this.x += dx
    this.y += dy
    this.adjustBoundary()

    return this
  },

  /**
   * @method
   * The X value of the point
   * @since 0.1
   * @return {Number}
   */
  getX: function () {
    return this.x
  },

  /**
   * @method
   * The y value of the point
   *
   * @return {Number}
   */
  getY: function () {
    return this.y
  },

  /**
   * @method
   * Set the new X value of the point
   *
   * @param {Number} x the new value
   */
  setX: function (x) {
    this.x = x
    this.adjustBoundary()

    return this
  },

  /**
   * @method
   * Set the new Y value of the point
   *
   * @param {Number} y the new value
   */
  setY: function (y) {
    this.y = y
    this.adjustBoundary()

    return this
  },

  /**
   * @method
   * Set the new x/y coordinates of this point
   *
   * @param {Number|draw2d.geo.Point} x
   * @param {Number} [y]
   */
  setPosition: function (x, y) {
    if (x instanceof draw2d.geo.Point) {
      this.x = x.x
      this.y = x.y
    }
    else {
      this.x = x
      this.y = y
    }
    this.adjustBoundary()

    return this
  },

  /**
   * @method
   * Calculates the relative position of the specified Point to this Point.
   *
   * @param {draw2d.geo.Point} p The reference Point
   * @return {Number} NORTH, SOUTH, EAST, or WEST, as defined in {@link draw2d.geo.PositionConstants}
   */
  getPosition: function (p) {
    let dx = p.x - this.x
    let dy = p.y - this.y
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0)
        return draw2d.geo.PositionConstants.WEST
      return draw2d.geo.PositionConstants.EAST
    }
    if (dy < 0)
      return draw2d.geo.PositionConstants.NORTH
    return draw2d.geo.PositionConstants.SOUTH
  },

  /**
   * @method
   * Compares two points and return [true] if x and y are equals.
   *
   * @param {draw2d.geo.Point} p the point to compare with
   *
   * @return {Boolean}
   */
  equals: function (p) {
    return this.x === p.x && this.y === p.y
  },

  /**
   * @method
   * Return the distance between this point and the hands over.
   *
   * @param {draw2d.geo.Point} other the point to use
   * @return {Number}
   */
  distance: function (other) {
    return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y))
  },
  /* @deprecated */
  getDistance: function (other) {
    return this.distance(other)
  },


  /**
   * @method
   * Return the th of the vector from [0,0]
   *
   * @return {Number}
   * @since 2.10.0
   */
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },

  /**
   * @method
   * Return a new Point translated with the x/y values of the hands over point.
   *
   * @param {draw2d.geo.Point|Number} x the x translation or the complete point to translate
   * @param {Number} [y] the y translation. Required if x is a simple number instead of a draw2d.geo.Point
   * @return {draw2d.geo.Point} The new translated point.
   */
  translated: function (x, y) {
    let other = new draw2d.geo.Point(x, y)
    return new draw2d.geo.Point(this.x + other.x, this.y + other.y)
  },

  /**
   * @method
   * Return a new Point scaled with the x/y values of the hands over point.
   *
   * @param {Number} factor the factor to scaled the new point.
   * @return {draw2d.geo.Point} The new translated point.
   */
  scale: function (factor) {
    this.x *= factor
    this.y *= factor
    this.adjustBoundary()
    return this
  },

  /**
   * @method
   * Return a new Point scaled with the x/y values of the hands over point.
   *
   * @param {Number} factor the factor to scaled the new point.
   * @return {draw2d.geo.Point} The new translated point.
   */
  scaled: function (factor) {
    return new draw2d.geo.Point(this.x * factor, this.y * factor)
  },

  /* @deprecated */
  getScaled: function (factor) {
    return this.scaled(factor)
  },

  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    return {
      x: this.x,
      y: this.y
    }
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    this.x = memento.x
    this.y = memento.y
  },

  /**
   * @method
   * substract the given point and return the new point.
   *
   * @param that
   * @returns {draw2d.geo.Point}
   */
  subtract: function (that) {
    return new draw2d.geo.Point(this.x - that.x, this.y - that.y)
  },


  dot: function (that) {
    return this.x * that.x + this.y * that.y
  },

  cross: function (that) {
    return this.x * that.y - this.y * that.x
  },


  lerp: function (that, t) {
    return new draw2d.geo.Point(this.x + (that.x - this.x) * t, this.y + (that.y - this.y) * t)
  },


  /**
   * @method
   * Clone the Point and return them
   *
   * @returns
   */
  clone: function () {
    return new draw2d.geo.Point(this.x, this.y)
  }

})
