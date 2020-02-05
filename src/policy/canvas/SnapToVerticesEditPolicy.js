import draw2d from '../../packages'


/**
 * @class draw2d.policy.canvas.SnapToVerticesEditPolicy
 *
 * Snapping is based on the existing children of a container. When snapping a shape,
 * the edges of the bounding box will snap to edges of other rectangles generated
 * from the children of the given canvas.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 */
draw2d.policy.canvas.SnapToVerticesEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend(
  /** @lends draw2d.policy.canvas.SnapToVerticesEditPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.SnapToVerticesEditPolicy",

  SNAP_THRESHOLD: 3,
  FADEOUT_DURATION: 300,

  /**
   * Creates a new constraint policy for snap to geometry
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.constraints = null
    this.vline = null
    this.hline = null
  },


  /**
   * 
   *
   * @param {draw2d.Figure} figure the shape below the mouse or null
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
    this.constraints = null
    this.hideVerticalLine()
    this.hideHorizontalLine()
  },

  /**
   * 
   * Adjust the coordinates to the canvas neighbours
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the figure to snap
   * @param {draw2d.geo.Point} modifiedPos the already modified position of the figure (e.g. from an another Policy)
   * @param {draw2d.geo.Point} originalPos the original requested position of the figure
   *
   * @returns {draw2d.geo.Point} the constraint position of the figure
   */
  snap: function (canvas, figure, modifiedPos, originalPos) {
    // can only handle PolyLies at the moment
    //
    if (!(figure instanceof draw2d.shape.basic.VertexResizeHandle)) {
      return modifiedPos
    }

    var allowXChanges = modifiedPos.x === originalPos.x
    var allowYChanges = modifiedPos.y === originalPos.y

    // Coordinates already snapped to an x/y coordinate.
    // Don't change them and in this case no further calculation is required.
    //
    if (!allowXChanges && !allowYChanges) {
      return modifiedPos
    }

    var result = modifiedPos.clone()
    var correction = this.getCorrectionFor(figure, originalPos)

    if (allowXChanges && (correction.vertical.x !== Number.MAX_SAFE_INTEGER)) {
      result.x = correction.vertical.x
      this.showVerticalLine(originalPos, correction.vertical)
    }
    else {
      this.hideVerticalLine()
    }

    if (allowYChanges && (correction.horizontal.y !== Number.MAX_SAFE_INTEGER)) {
      result.y = correction.horizontal.y
      this.showHorizontalLine(originalPos, correction.horizontal)
    }
    else {
      this.hideHorizontalLine()
    }


    return result
  },


  getCorrectionFor: function (vertexResizeHandle, point) {
    var _this = this
    if (this.constraints === null) {
      this.constraints = []

      var lines = this.canvas.getLines()
      lines.each(function (i, line) {
        line.getVertices().each(function (ii, vertex) {
          if (vertexResizeHandle.index !== ii || vertexResizeHandle.owner !== line)
            _this.constraints.push(vertex)
        })
      })
    }

    var SNAP = this.SNAP_THRESHOLD
    var vertical = {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, diffy: Number.MAX_SAFE_INTEGER}
    var horizontal = {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, diffx: Number.MAX_SAFE_INTEGER}
    var diffx, diffy


    for (var i = 0; i < this.constraints.length; i++) {
      var entry = this.constraints[i]

      diffx = Math.abs(point.x - entry.x)
      diffy = Math.abs(point.y - entry.y)
      // we found a possible candidate for the vertical snap line
      //
      if (diffx < SNAP) {
        if (diffy < vertical.diffy) {
          vertical = {x: entry.x, y: entry.y, diffy: diffy}
        }
      }


      if (diffy < SNAP) {
        if (diffx < horizontal.diffx) {
          horizontal = {x: entry.x, y: entry.y, diffx: diffx}
        }
      }

    }
    return {vertical: vertical, horizontal: horizontal}
  },

  showVerticalLine: function (originalPos, snappedPos) {
    if (this.vline != null) {
      this.vline.stop()
      this.vline.remove()
    }


    var maxLength = this.canvas.getHeight()
    var x = (snappedPos.x | 0) + 0.5 // force a .5 number to avoid subpixel rendering. Blurry lines...
    this.canvas.paper.setStart()
    this.canvas.paper.path("M " + x + " 0 l 0 " + maxLength)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + x + " " + originalPos.y + " L " + x + " " + snappedPos.y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.vline = this.canvas.paper.setFinish()
    this.vline.toBack()
  },

  hideVerticalLine: function () {
    if (this.vline == null) {
      return
    }
    this.vline.animate(
      {opacity: 0.1},
      this.FADEOUT_DURATION,
      () => {
        if (this.vline !== null) {
          this.vline.remove()
          this.vline = null
        }
      }
    )
  },

  showHorizontalLine: function (originalPos, snappedPos) {
    if (this.hline != null) {
      this.hline.stop()
      this.hline.remove()
    }

    var maxLength = this.canvas.getWidth()
    var y = (snappedPos.y | 0) + 0.5 // force a .5 number to avoid subpixel rendering. Blurry lines...

    this.canvas.paper.setStart()
    this.canvas.paper.path("M 0 " + y + " l " + maxLength + " 0")
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + originalPos.x + " " + y + " L " + snappedPos.x + " " + y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.hline = this.canvas.paper.setFinish()
    this.hline.toBack()

  },

  hideHorizontalLine: function () {
    if (this.hline === null) {
      return //silently
    }
    this.hline.animate(
      {opacity: 0.1},
      this.FADEOUT_DURATION,
      () => {
        if (this.hline !== null) {
          this.hline.remove()
          this.hline = null
        }
      }
    )
  }

})
