/**
 * @class draw2d.policy.canvas.SnapToGeometryEditPolicy
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
import draw2d from '../../packages'

draw2d.policy.canvas.SnapToGeometryEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend({

  NAME: "draw2d.policy.canvas.SnapToGeometryEditPolicy",

  SNAP_THRESHOLD: 3,
  FADEOUT_DURATION: 300,

  /**
   * @constructor
   * Creates a new constraint policy for snap to geometry
   *
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    this.rows = null
    this.cols = null
    this.vline = null
    this.hline = null
  },


  /**
   * @method
   *
   * @param {draw2d.Figure} figure the shape below the mouse or null
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
    this.rows = null
    this.cols = null
    this.hideVerticalLine()
    this.hideHorizontalLine()
  },

  /**
   * @method
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
    // do nothing for lines
    if (figure instanceof draw2d.shape.basic.Line) {
      return modifiedPos
    }

    let result
    let allowXChanges = modifiedPos.x === originalPos.x
    let allowYChanges = modifiedPos.y === originalPos.y

    // Coordinates already snapped to an x/y coordinate.
    // Don't change them and in this case no further calculation is requried.
    //
    if (!allowXChanges && !allowYChanges) {
      return modifiedPos
    }

    if (figure instanceof draw2d.ResizeHandle) {
      let snapPoint = figure.getSnapToGridAnchor()
      modifiedPos.x += snapPoint.x
      modifiedPos.y += snapPoint.y

      let snapDirections = figure.getSnapToDirection()
      result = this.snapPoint(snapDirections, modifiedPos)

      // Show a vertical line if the snapper has modified the inputPoint
      //
      if (allowXChanges && (snapDirections & draw2d.SnapToHelper.EAST_WEST) && !(result.edge & draw2d.SnapToHelper.EAST_WEST)) {
        this.showVerticalLine(figure, draw2d.SnapToHelper.WEST, result.point.x)
      }
      else {
        this.hideVerticalLine()
      }

      // Show a horizontal line if the snapper has modified the inputPoint
      //
      if (allowYChanges && (snapDirections & draw2d.SnapToHelper.NORTH_SOUTH) && !(result.edge & draw2d.SnapToHelper.NORTH_SOUTH)) {
        this.showHorizontalLine(figure, draw2d.SnapToHelper.NORTH, result.point.y)
      }
      else {
        this.hideHorizontalLine()
      }

      // restore the original pos coordinate if x or y coordinate already snapped to any axis
      // or subtract the added snapOffset
      //
      result.point.x = allowXChanges ? result.point.x - snapPoint.x : modifiedPos.x
      result.point.y = allowYChanges ? result.point.y - snapPoint.y : modifiedPos.y

      return result.point
    }

    // The user drag&drop a normal figure
    let inputBounds = new draw2d.geo.Rectangle(modifiedPos.x, modifiedPos.y, figure.getWidth(), figure.getHeight())

    result = this.snapRectangle(inputBounds)

    if (!allowXChanges) {
      result.bounds.x = modifiedPos.x
    }

    if (!allowYChanges) {
      result.bounds.y = modifiedPos.y
    }

    // Show a vertical line if the snapper has modified the inputPoint
    //
    if (allowXChanges && !(result.edge & draw2d.SnapToHelper.WEST)) {
      this.showVerticalLine(figure, draw2d.SnapToHelper.WEST, result.bounds.x)
    }
    else if (allowXChanges && !(result.edge & draw2d.SnapToHelper.EAST)) {
      this.showVerticalLine(figure, draw2d.SnapToHelper.EAST, result.bounds.x + result.bounds.getWidth())
    }
    else {
      this.hideVerticalLine()
    }


    // Show a horizontal line if the snapper has modified the inputPoint
    //
    if (allowYChanges && !(result.edge & draw2d.SnapToHelper.NORTH)) {
      this.showHorizontalLine(figure, draw2d.SnapToHelper.NORTH, result.bounds.y)
    }
    else if (allowYChanges && !(result.edge & draw2d.SnapToHelper.SOUTH)) {
      this.showHorizontalLine(figure, draw2d.SnapToHelper.SOUTH, result.bounds.y + result.bounds.getHeight())
    }
    else {
      this.hideHorizontalLine()
    }

    return result.bounds.getTopLeft()
  },

  /**
   * @method
   * calculates the snapped position of the rectangle.
   *
   * @param {draw2d.geo.Rectangle} inputBounds
   *
   * @returns {Object}
   */
  snapRectangle: function (inputBounds) {
    let resultBounds = inputBounds.clone()

    let topLeft = this.snapPoint(draw2d.SnapToHelper.NORTH_WEST, inputBounds.getTopLeft())
    resultBounds.x = topLeft.point.x
    resultBounds.y = topLeft.point.y

    let bottomRight = this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST, inputBounds.getBottomRight())

    // The first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
    //
    if (topLeft.edge & draw2d.SnapToHelper.WEST) {
      resultBounds.x = bottomRight.point.x - inputBounds.getWidth()
    }

    // The first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
    //
    if (topLeft.edge & draw2d.SnapToHelper.NORTH) {
      resultBounds.y = bottomRight.point.y - inputBounds.getHeight()
    }

    return {edge: topLeft.edge | bottomRight.edge, bounds: resultBounds}
  },

  snapPoint: function (/*:int*/ snapOrientation, /*:draw2d.Point*/ inputPoint) {
    let resultPoint = inputPoint.clone()

    if (this.rows === null || this.cols === null)
      this.populateRowsAndCols()

    if ((snapOrientation & draw2d.SnapToHelper.EAST) !== 0) {
      let rightCorrection = this.getCorrectionFor(this.cols, inputPoint.x + 1, 1)
      if (rightCorrection !== this.SNAP_THRESHOLD) {
        snapOrientation &= ~draw2d.SnapToHelper.EAST
        resultPoint.x += rightCorrection
      }
    }

    if ((snapOrientation & draw2d.SnapToHelper.WEST) !== 0) {
      let leftCorrection = this.getCorrectionFor(this.cols, inputPoint.x, -1)
      if (leftCorrection !== this.SNAP_THRESHOLD) {
        snapOrientation &= ~draw2d.SnapToHelper.WEST
        resultPoint.x += leftCorrection
      }
    }

    if ((snapOrientation & draw2d.SnapToHelper.SOUTH) !== 0) {
      let bottomCorrection = this.getCorrectionFor(this.rows, inputPoint.y + 1, 1)
      if (bottomCorrection !== this.SNAP_THRESHOLD) {
        snapOrientation &= ~draw2d.SnapToHelper.SOUTH
        resultPoint.y += bottomCorrection
      }
    }

    if ((snapOrientation & draw2d.SnapToHelper.NORTH) !== 0) {
      let topCorrection = this.getCorrectionFor(this.rows, inputPoint.y, -1)
      if (topCorrection !== this.SNAP_THRESHOLD) {
        snapOrientation &= ~draw2d.SnapToHelper.NORTH
        resultPoint.y += topCorrection
      }
    }

    return {edge: snapOrientation, point: resultPoint}
  },

  populateRowsAndCols: function () {
    let selection = this.canvas.getSelection()
    this.rows = []
    this.cols = []

    let figures = this.canvas.getFigures()
    for (let i = 0; i < figures.getSize(); i++) {
      let figure = figures.get(i)
      if (!selection.contains(figure, true)) {
        let bounds = figure.getBoundingBox()
        this.cols.push({type: -1, location: bounds.x})
        this.cols.push({type: 0, location: bounds.x + (bounds.w - 1) / 2})
        this.cols.push({type: 1, location: bounds.getRight() + 1})
        this.rows.push({type: -1, location: bounds.y})
        this.rows.push({type: 0, location: bounds.y + (bounds.h - 1) / 2})
        this.rows.push({type: 1, location: bounds.getBottom() + 1})
      }
    }

    // TODO: remove duplicate entries in the rows/cols array

  },

  getCorrectionFor: function (/*:Array*/ entries, /*:double*/ value, /*:int*/ side) {
    let resultMag = this.SNAP_THRESHOLD
    let result = this.SNAP_THRESHOLD

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]
      let magnitude

      if (entry.type === -1 && side !== 0) {
        magnitude = Math.abs(value - entry.location)
        if (magnitude < resultMag) {
          resultMag = magnitude
          result = entry.location - value
        }
      }
      else if (entry.type === 0 && side === 0) {
        magnitude = Math.abs(value - entry.location)
        if (magnitude < resultMag) {
          resultMag = magnitude
          result = entry.location - value
        }
      }
      else if (entry.type === 1 && side !== 0) {
        magnitude = Math.abs(value - entry.location)
        if (magnitude < resultMag) {
          resultMag = magnitude
          result = entry.location - value
        }
      }
    }
    return result
  },

  showVerticalLine: function (causedFigure, edge, x) {
    if (this.vline != null) {
      this.vline.stop()
      this.vline.remove()
    }

    let figures = this.canvas.getFigures().clone()
    figures.removeAll(this.canvas.getSelection().getAll(true))
    figures.map(function (figure) {
      return figure.getBoundingBox()
    })
    figures.grep(function (bbox) {
      return (Math.abs(bbox.x - x) <= 1) || (Math.abs(bbox.getRight() - x) <= 1)
    })

    // return silently if no figure bounding box is left
    //
    if (figures.getSize() === 0) {
      return
    }

    // figure to align is above the current shape
    //
    let causedBox = causedFigure.getBoundingBox()
    let causedCenter = causedBox.getCenter()
    figures.sort(function (a, b) {
      let d_a = a.getCenter().distance(causedCenter)
      let d_b = b.getCenter().distance(causedCenter)
      return d_a - d_b
    })
    let fromY = 0
    let maxLength = this.canvas.getHeight() * Math.max(1, this.canvas.getZoom())
    let yLength = maxLength
    let snappedBox = figures.get(0)
    if (causedBox.y < snappedBox.y) {
      fromY = causedBox.y
      yLength = snappedBox.getBottom() - causedBox.y
    }
    else {
      fromY = snappedBox.y
      yLength = causedBox.getBottom() - snappedBox.y
    }

    x = (x | 0) + 0.5 // force a .5 number to avoid subpixel rendering. Blurry lines...
    this.canvas.paper.setStart()
    this.canvas.paper.path("M " + x + " 0 l 0 " + maxLength)
      .attr({"stroke": this.lineColor.hash(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + x + " " + fromY + " l 0 " + yLength)
      .attr({"stroke": this.lineColor.hash(), "stroke-width": 1})

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

  showHorizontalLine: function (causedFigure, edge, y) {
    if (this.hline != null) {
      this.hline.stop()
      this.hline.remove()
    }

    let figures = this.canvas.getFigures().clone()
    figures.removeAll(this.canvas.getSelection().getAll(true))
    figures.map(function (figure) {
      return figure.getBoundingBox()
    })
    figures.grep(function (bbox) {
      return (Math.abs(bbox.y - y) <= 1) || (Math.abs(bbox.getBottom() - y) <= 1)
    })

    // return silently if no figure bounding box is left
    //
    if (figures.getSize() === 0) {
      return
    }

    // figure to align is above the current shape
    //
    let causedBox = causedFigure.getBoundingBox()
    let causedCenter = causedBox.getCenter()
    figures.sort(function (a, b) {
      let d_a = a.getCenter().distance(causedCenter)
      let d_b = b.getCenter().distance(causedCenter)
      return d_a - d_b
    })
    let fromX = 0
    let maxLength
    let xLength = maxLength = this.canvas.getWidth() * Math.max(1, this.canvas.getZoom())
    let snappedBox = figures.get(0)
    if (causedBox.x < snappedBox.x) {
      fromX = causedBox.x
      xLength = snappedBox.getRight() - causedBox.x
    }
    else {
      fromX = snappedBox.x
      xLength = causedBox.getRight() - snappedBox.x
    }


    y = (y | 0) + 0.5 // force a .5 number to avoid subpixel rendering. Blurry lines...

    this.canvas.paper.setStart()
    this.canvas.paper.path("M 0 " + y + " l " + maxLength + " 0")
      .attr({"stroke": this.lineColor.hash(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + fromX + " " + y + " l " + xLength + " 0")
      .attr({"stroke": this.lineColor.hash(), "stroke-width": 1})

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
