import draw2d from '../packages'


/**
 * @class
 *
 * Represents a Rectangle(x, y, width, height).
 *
 * @author Andreas Herz
 * @extends draw2d.geo.Point
 */
draw2d.geo.Rectangle = draw2d.geo.Point.extend(
  /** @lends draw2d.geo.Rectangle.prototype */
  {

    NAME: "draw2d.geo.Rectangle",

    /**
     * Creates a new Point object with the hands over coordinates.
     * <br>
     * The constructor consumes almost any kind of rectangel definitions
     * like:
     *      let rect0 = new draw2d.geo.Rectangle({x:0,y:0,width:20,height:20});
     *      let rect1 = new draw2d.geo.Rectangle({x:0,y:0,w:20,h:20});
     *      let rect2 = new draw2d.geo.Rectangle($("#divid")[0].getBoundingClientRect());
     *      let rect3 = new draw2d.geo.Rectangle(rect1);
     *
     * The rectangle class is usefull for any kind of intersection, hitTest, contains,...calculation
     * or to set the bounding box of any shape.
     *
     * @param {Number|draw2d.geo.Rectangle} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    init: function (x, y, w, h) {
      // try to consume any kind rectangle definitions
      //
      if (x instanceof draw2d.geo.Rectangle) {
        y = x.y;
        w = x.w;
        h = x.h;
        x = x.x;
      } else if (typeof x.x === "number" && typeof x.y === "number") {
        y = x.y;
        w = x.w | x.width;
        h = x.h | x.height;
        x = x.x;
      } else if (typeof x.top === "number" && typeof x.left === "number") {
        y = x.top;
        w = x.w | x.width;
        h = x.h | x.height;
        x = x.left;
      }
      this._super(x, y);
      this.w = w;
      this.h = h;
    },


    /**
     *
     * @private
     */
    adjustBoundary: function () {
      if (this.bx === null) {
        return;
      }
      this.x = Math.min(Math.max(this.bx, this.x), this.bw - this.w);
      this.y = Math.min(Math.max(this.by, this.y), this.bh - this.h);
      this.w = Math.min(this.w, this.bw);
      this.h = Math.min(this.h, this.bh);
    },

    /**
     *
     * Resizes this Rectangle by the values supplied as input and returns this for
     * convenience. This Rectangle's width will become this.width + dw. This
     * Rectangle's height will become this.height + dh.
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     *
     * @param {Number} dw  Amount by which width is to be resized
     * @param {Number} dh  Amount by which height is to be resized
     * @returns  {this}
     **/
    resize: function (dw, dh) {
      this.w += dw;
      this.h += dh;
      this.adjustBoundary();

      return this;
    },

    /**
     * Adds the specified padding to the rectangle's bounds. This Rectangle's width
     * will become this.width + dw. The Rectangle's height will become this.height + dh.
     * The top left corner moves -dw/2, -dh/2
     *
     * @param {Number} dw  Amount by which width is to be resized
     * @param {Number} dh  Amount by which height is to be resized
     * @returns  {this}
     **/
    scale: function (dw, dh) {
      this.w += (dw);
      this.h += (dh);
      this.x -= (dw / 2);
      this.y -= (dh / 2);
      this.adjustBoundary();

      return this;
    },

    /**
     * Translate the rectangle with the given x/y coordiante.
     *
     * @param {draw2d.geo.Point|Number} x the x translation or the complete point to translate
     * @param {Number} [y] the y translation. Required if x is a simple number instead of a draw2d.geo.Point
     *
     *
     * @since 5.6.0
     * @returns  {this}
     */
    translate: function (x, y) {
      let other = new draw2d.geo.Point(x, y);
      this.x += other.x;
      this.y += other.y;
      this.adjustBoundary();

      return this;
    },


    /**
     *
     * Returns a copy of the translated rectangle
     *
     * @param {draw2d.geo.Point|Number} x the x translation or the complete point to translate
     * @param {Number} [y] the y translation. Required if x is a simple number instead of a draw2d.geo.Point
     *
     * @returns {draw2d.geo.Rectangle} The new translated rectangle.
     * @since 5.6.0
     */
    translated: function (x, y) {
      let other = new draw2d.geo.Point(x, y);
      return new draw2d.geo.Rectangle(this.x + other.x, this.y + other.y, this.w, this.h);
    },


    /**
     * Sets the parameters of this Rectangle from the Rectangle passed in and
     * returns this for convenience.<br>
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     * @param {draw2d.geo.Rectangle} Rectangle providing the bounding values
     * @returns  {this}
     */
    setBounds: function (rect) {
      this.setPosition(rect.x, rect.y);

      this.w = rect.w;
      this.h = rect.h;

      return this;
    },

    /**
     *
     * Returns <code>true</code> if this Rectangle's width or height is less than or
     * equal to 0.
     *
     * @returns {Boolean}
     */
    isEmpty: function () {
      return this.w <= 0 || this.h <= 0;
    },

    /**
     *
     * The width of the dimension element.
     *
     * @returns {Number}
     **/
    getWidth: function () {
      return this.w;
    },

    /**
     *
     * Set the new width of the rectangle.
     *
     * @param {Number} w the new width of the rectangle
     * @returns  {this}
     */
    setWidth: function (w) {
      this.w = w;
      this.adjustBoundary();

      return this;
    },

    /**
     *
     * The height of the dimension element.
     *
     * @returns {Number}
     **/
    getHeight: function () {
      return this.h;
    },

    /**
     *
     * Set the new height of the rectangle.
     *
     * @param {Number} h the new height of the rectangle
     * @returns  {this}
     */
    setHeight: function (h) {
      this.h = h;
      this.adjustBoundary();

      return this;
    },

    /**
     *
     * The x coordinate of the left corner.
     *
     * @returns {Number}
     **/
    getLeft: function () {
      return this.x;
    },

    /**
     *
     * The x coordinate of the right corner.
     *
     * @returns {Number}
     **/
    getRight: function () {
      return this.x + this.w;
    },

    /**
     *
     * The y coordinate of the top.
     *
     *@return {Number}
     **/
    getTop: function () {
      return this.y;
    },

    /**
     *
     * The y coordinate of the bottom.
     *
     *@return {Number}
     **/
    getBottom: function () {
      return this.y + this.h;
    },

    /**
     *
     * The top left corner of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopLeft: function () {
      return new draw2d.geo.Point(this.x, this.y);
    },

    /**
     *
     * The top center coordinate of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopCenter: function () {
      return new draw2d.geo.Point(this.x + (this.w / 2), this.y);
    },

    /**
     *
     * The top right corner of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopRight: function () {
      return new draw2d.geo.Point(this.x + this.w, this.y);
    },

    /**
     *
     * The center left  of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getCenterLeft: function () {
      return new draw2d.geo.Point(this.x, this.y + (this.h / 2));
    },

    /**
     *
     * The center right  of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getCenterRight: function () {
      return new draw2d.geo.Point(this.x+ this.w, this.y + (this.h / 2));
    },


    /**
     *
     * The bottom left corner of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getBottomLeft: function () {
      return new draw2d.geo.Point(this.x, this.y + this.h);
    },

    /**
     *
     * The bottom center coordinate of the dimension object.
     *
     * @returns {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getBottomCenter: function () {
      return new draw2d.geo.Point(this.x + (this.w / 2), this.y + this.h);
    },

    /**
     *
     * The center of the dimension object
     *
     * @returns {draw2d.geo.Point} a new point which holds the center of the object
     **/
    getCenter: function () {
      return new draw2d.geo.Point(this.x + this.w / 2, this.y + this.h / 2);
    },


    /**
     *
     * Bottom right corner of the object
     *
     * @returns {draw2d.geo.Point} a new point which holds the bottom right corner
     **/
    getBottomRight: function () {
      return new draw2d.geo.Point(this.x + this.w, this.y + this.h);
    },

    /**
     *
     * Return all points of the rectangle as array. Starting at topLeft and the
     * clockwise.
     *
     * @returns {draw2d.util.ArrayList} the points starting at top/left and the clockwise
     */
    getVertices: function () {
      let result = new draw2d.util.ArrayList();
      // don't change the order. We expect always that the top left corner has index[0]
      // and goes clock wise
      //
      result.add(this.getTopLeft());
      result.add(this.getTopRight());
      result.add(this.getBottomRight());
      result.add(this.getBottomLeft());

      return result;
    },

    /**
     *
     * Return a new rectangle which fits into this rectangle. <b>ONLY</b> the x/y coordinates
     * will be changed. Not the dimension of the given rectangle.
     *
     * @param {draw2d.geo.Rectangle} rect the rectangle to adjust
     * @returns the new shifted rectangle
     */
    moveInside: function (rect) {
      let newRect = new draw2d.geo.Rectangle(rect.x, rect.y, rect.w, rect.h);
      // shift the coordinate right/down if coordinate not inside the rect
      //
      newRect.x = Math.max(newRect.x, this.x);
      newRect.y = Math.max(newRect.y, this.y);

      // ensure that the right border is inside this rect (if possible). 
      //
      if (newRect.w < this.w) {
        newRect.x = Math.min(newRect.x + newRect.w, this.x + this.w) - newRect.w;
      } else {
        newRect.x = this.x;
      }

      // ensure that the bottom is inside this rectangle
      //
      if (newRect.h < this.h) {
        newRect.y = Math.min(newRect.y + newRect.h, this.y + this.h) - newRect.h;
      } else {
        newRect.y = this.y;
      }

      return newRect;
    },

    /**
     *
     * Return the minimum distance of this rectangle to the given {@link draw2d.geo.Point} or
     * {link draw2d.geo.Rectangle}.
     *
     * @param {draw2d.geo.Point|draw2d.geo.Rectangle} pointOrRectangle the reference point/rectangle for the distance calculation
     */
    getDistance: function (pointOrRectangle) {
      let cx = this.x;
      let cy = this.y;
      let cw = this.w;
      let ch = this.h;

      let ox = pointOrRectangle.getX();
      let oy = pointOrRectangle.getY();
      let ow = 1;
      let oh = 1;

      if (pointOrRectangle instanceof draw2d.geo.Rectangle) {
        ow = pointOrRectangle.getWidth();
        oh = pointOrRectangle.getHeight();
      }
      let oct = 9;

      // Determin Octant
      //
      // 0 | 1 | 2
      // __|___|__
      // 7 | 9 | 3
      // __|___|__
      // 6 | 5 | 4

      if (cx + cw <= ox) {
        if ((cy + ch) <= oy) {
          oct = 0;
        } else if (cy >= (oy + oh)) {
          oct = 6;
        } else {
          oct = 7;
        }
      } else if (cx >= ox + ow) {
        if (cy + ch <= oy) {
          oct = 2;
        } else if (cy >= oy + oh) {
          oct = 4;
        } else {
          oct = 3;
        }
      } else if (cy + ch <= oy) {
        oct = 1;
      } else if (cy >= oy + oh) {
        oct = 5;
      } else {
        return 0;
      }


      // Determine Distance based on Quad
      //
      switch (oct) {
        case 0:
          cx = (cx + cw) - ox;
          cy = (cy + ch) - oy;
          return -(cx + cy);
        case 1:
          return -((cy + ch) - oy);
        case 2:
          cx = (ox + ow) - cx;
          cy = (cy + ch) - oy;
          return -(cx + cy);
        case 3:
          return -((ox + ow) - cx);
        case 4:
          cx = (ox + ow) - cx;
          cy = (oy + oh) - cy;
          return -(cx + cy);
        case 5:
          return -((oy + oh) - cy);
        case 6:
          cx = (cx + cw) - ox;
          cy = (oy + oh) - cy;
          return -(cx + cy);
        case 7:
          return -((cx + cw) - ox);
      }

      throw "Unknown data type of parameter for distance calculation in draw2d.geo.Rectangle.getDistance(..)";
    },


    /**
     *
     * Determin the octant of r2 in relation to this rectangle.
     * <pre>
     *
     *    0 | 1 | 2
     *    __|___|__
     *    7 | 8 | 3
     *    __|___|__
     *    6 | 5 | 4
     * </pre>
     *
     * @param {draw2d.geo.Rectangle} r2
     *
     */
    determineOctant: function (r2) {
      let HISTERESE = 3; // Toleranz um diese vermieden wird, dass der Octant "8" zurückgegeben wird

      let ox = this.x + HISTERESE;
      let oy = this.y + HISTERESE;
      let ow = this.w - (HISTERESE * 2);
      let oh = this.h - (HISTERESE * 2);

      let cx = r2.x;
      let cy = r2.y;
      let cw = 2;
      let ch = 2;
      if (r2 instanceof draw2d.geo.Rectangle) {
        cw = r2.w;
        ch = r2.h;
      }

      let oct = 0;

      if (cx + cw <= ox) {
        if ((cy + ch) <= oy) {
          oct = 0;
        } else if (cy >= (oy + oh)) {
          oct = 6;
        } else {
          oct = 7;
        }
      } else if (cx >= ox + ow) {
        if (cy + ch <= oy) {
          oct = 2;
        } else if (cy >= oy + oh) {
          oct = 4;
        } else {
          oct = 3;
        }
      } else if (cy + ch <= oy) {
        oct = 1;
      } else if (cy >= oy + oh) {
        oct = 5;
      } else {
        oct = 8;
      }

      return oct;
    },


    /**
     *
     * Returns the direction the point <i>p</i> is in relation to the given rectangle.
     * Util method for inherit router implementations.
     *
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     *
     * @param {draw2d.geo.Point} other the point in relation to the given rectangle
     *
     * @returns {Number} the direction from <i>r</i> to <i>p</i>
     */
    getDirection: function (other) {
      let current = this.getTopLeft();
      switch (this.determineOctant(other)) {
        case 0:
          if ((current.x - other.x) < (current.y - other.y))
            return draw2d.geo.Rectangle.DIRECTION_UP;
          return draw2d.geo.Rectangle.DIRECTION_LEFT;
        case 1:
          return draw2d.geo.Rectangle.DIRECTION_UP;
        case 2:
          current = this.getTopRight();
          if ((other.x - current.x) < (current.y - other.y))
            return draw2d.geo.Rectangle.DIRECTION_UP;
          return draw2d.geo.Rectangle.DIRECTION_RIGHT;
        case 3:
          return draw2d.geo.Rectangle.DIRECTION_RIGHT;
        case 4:
          current = this.getBottomRight();
          if ((other.x - current.x) < (other.y - current.y))
            return draw2d.geo.Rectangle.DIRECTION_DOWN;
          return draw2d.geo.Rectangle.DIRECTION_RIGHT;
        case 5:
          return draw2d.geo.Rectangle.DIRECTION_DOWN;
        case 6:
          current = this.getBottomLeft();
          if ((current.x - other.x) < (other.y - current.y))
            return draw2d.geo.Rectangle.DIRECTION_DOWN;
          return draw2d.geo.Rectangle.DIRECTION_LEFT;
        case 7:
          return draw2d.geo.Rectangle.DIRECTION_LEFT;
        case 8:
          if (other.y > this.y) {
            return draw2d.geo.Rectangle.DIRECTION_DOWN;
          }
          return draw2d.geo.Rectangle.DIRECTION_UP;

      }
      return draw2d.geo.Rectangle.DIRECTION_UP;
    },


    /**
     *
     * Compares two rectangle objects
     *
     * @param {draw2d.geo.Rectangle} o
     *
     * @returns {Boolean}
     **/
    equals: function (o) {
      return this.x == o.x && this.y == o.y && this.w == o.w && this.h == o.h;
    },

    /**
     *
     * Detect whenever the hands over coordinate is inside the rectangle.
     *
     * @param {Number/draw2d.geo.Point} iX
     * @param {Number} iY
     * @returns {Boolean}
     */
    hitTest: function (iX, iY) {
      if (iX instanceof draw2d.geo.Point) {
        iY = iX.y;
        iX = iX.x;
      }
      let iX2 = this.x + this.getWidth();
      let iY2 = this.y + this.getHeight();
      return (iX >= this.x && iX <= iX2 && iY >= this.y && iY <= iY2);
    },

    /**
     *
     * return true if this rectangle inside the hand over rectangle
     *
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     */
    isInside: function (rect) {
      return rect.hitTest(this.getTopLeft())
        && rect.hitTest(this.getTopRight())
        && rect.hitTest(this.getBottomLeft())
        && rect.hitTest(this.getBottomRight());
    },

    /**
     *
     * return true if this rectangle contains the hand over rectangle.
     *
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     * @since 4.7.2
     */
    contains: function (rect) {
      return this.hitTest(rect.getTopLeft())
        && this.hitTest(rect.getTopRight())
        && this.hitTest(rect.getBottomLeft())
        && this.hitTest(rect.getBottomRight());
    },

    /**
     *
     * checks whenever the rectangles has an intersection.
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     */
    intersects: function (rect) {
      let x11 = rect.x,
        y11 = rect.y,
        x12 = rect.x + rect.w,
        y12 = rect.y + rect.h,
        x21 = this.x,
        y21 = this.y,
        x22 = this.x + this.w,
        y22 = this.y + this.h;

      let x_overlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21));
      let y_overlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21));

      return x_overlap * y_overlap !== 0;
    },

    /**
     *
     * Checks whenever the rectangles intersect or touch each other.
     * Unlike intersects(), this method returns true even if the rectangles
     * only share a common edge or corner point.
     *
     * This is useful for line intersection detection where lines can intersect
     * even if their bounding boxes only touch.
     *
     * A small tolerance is applied to handle floating-point precision issues
     * and to detect near-misses.
     *
     * @param {draw2d.geo.Rectangle} rect
     * @param {Number} [tolerance=0.5] tolerance in pixels for near-touch detection
     * @returns {Boolean} true if rectangles intersect or touch (within tolerance)
     * @since 6.x.x
     */
    intersectsOrTouches: function (rect, tolerance) {
      tolerance = tolerance ?? 0.5;

      let x11 = rect.x,
        y11 = rect.y,
        x12 = rect.x + rect.w,
        y12 = rect.y + rect.h,
        x21 = this.x,
        y21 = this.y,
        x22 = this.x + this.w,
        y22 = this.y + this.h;

      // Check if rectangles are completely separate (no intersection or touch)
      // They are separate if one is completely to the left, right, above, or below the other
      // Apply tolerance to catch near-misses due to floating-point precision
      if (x12 < x21 - tolerance || x11 > x22 + tolerance || 
          y12 < y21 - tolerance || y11 > y22 + tolerance) {
        return false;
      }

      // If not completely separate, they either intersect or touch (within tolerance)
      return true;
    },

    /**
     * Merge this rectangle with the given one.
     *
     * @param {draw2d.geo.Rectangle} rect
     * @since 4.8.0
     * @returns  {this}
     */
    merge: function (rect) {
      let r = Math.max(rect.getRight(), this.getRight());
      let b = Math.max(rect.getBottom(), this.getBottom());

      this.setPosition(Math.min(this.x, rect.x), Math.min(this.y, rect.y));

      this.w = r - this.x;
      this.h = b - this.y;

      return this;
    },

    /**
     *
     * returns the intersection points with the given line if any exists
     *
     * @param {draw2d.geo.Point} start
     * @param {draw2d.geo.Point} end
     */
    intersectionWithLine: function (start, end) {
      let result = new draw2d.util.ArrayList();
      let v = this.getVertices();
      v.add(v.first());
      let p1 = v.first();
      let p2 = null;
      for (let i = 1; i < 5; i++) {
        p2 = v.get(i);
        p1 = draw2d.shape.basic.Line.intersection(start, end, p1, p2);
        if (p1 !== null) {
          result.add(p1);
        }
        p1 = p2;
      }
      return result;
    },

    /**
     *
     * Returns a copy of this rectangle
     *
     *
     * @returns {draw2d.geo.Rectangle}
     * @since 5.6.0
     */
    clone: function () {
      return new draw2d.geo.Rectangle(this.x, this.y, this.w, this.h);
    },

    /**
     *
     * Returns a new rectangle with the same dimensions but with origin at (0,0).
     * This is useful for converting absolute positioned rectangles to local coordinates.
     *
     * @returns {draw2d.geo.Rectangle} Rectangle with same width/height but positioned at (0,0)
     * @since 6.x.x
     */
    getDimension: function () {
      return new draw2d.geo.Rectangle(0, 0, this.w, this.h);
    },

    /**
     *
     * converts the rectangle to JSON representation. required for the draw2d.io.Writer
     *
     * @returns {Object}
     */
    toJSON: function () {
      return {
        width: this.w,
        height: this.h,
        x: this.x,
        y: this.y
      };
    }

  });

/**
 * ENUM for Direction
 */
draw2d.geo.Rectangle.DIRECTION_UP = 0;
draw2d.geo.Rectangle.DIRECTION_RIGHT = 1;
draw2d.geo.Rectangle.DIRECTION_DOWN = 2;
draw2d.geo.Rectangle.DIRECTION_LEFT = 3;

/**
 * Creates a bounding box Rectangle from a collection of points.
 *
 * @param {draw2d.util.ArrayList|Array} points Collection of draw2d.geo.Point objects
 * @returns {draw2d.geo.Rectangle} The bounding box containing all points
 * @static
 * @since 6.2.0
 */
draw2d.geo.Rectangle.boundingBox = function(points) {
  let _points = (points instanceof draw2d.util.ArrayList) ? points.asArray() : points

  if (_points.length === 0) {
    return new draw2d.geo.Rectangle(0, 0, 0, 0)
  }

  let minX = _points[0].x
  let maxX = minX
  let minY = _points[0].y
  let maxY = minY

  for (let i = 1; i < _points.length; i++) {
    let p = _points[i]
    if (p.x < minX) minX = p.x
    else if (p.x > maxX) maxX = p.x
    if (p.y < minY) minY = p.y
    else if (p.y > maxY) maxY = p.y
  }

  return new draw2d.geo.Rectangle(minX, minY, maxX - minX, maxY - minY)
}

