/**
 * @class draw2d.policy.canvas.SnapToInBetweenEditPolicy
 *
 * Snapping is based on the existing children of a container. When snapping a shape,
 * the edges of the bounding box will snap to edges of other rectangles generated
 * from the children of the given canvas.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 * @since 5.6.4
 */
import draw2d from '../../packages'

draw2d.policy.canvas.SnapToInBetweenEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend(
  /** @lends draw2d.policy.canvas.SnapToInBetweenEditPolicy.prototype */
  {
  
  NAME: "draw2d.policy.canvas.SnapToInBetweenEditPolicy",

  SNAP_THRESHOLD: 5,
  FADEOUT_DURATION: 500,

  /**
   * Creates a new constraint policy for snap to geometry
   *
   * @constructs
   */
  init: function (attr, setter, getter) {

    this._super(attr, setter, getter)

    this.bounds = null

    this.horizontalGuideLines = null
    this.verticalGuideLines = null
  },


  /**
   *
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @template
   */
  onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
    this.bounds = null
    this.hideHorizontalGuides(false)
    this.hideVerticalGuides(false)
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
    // do nothing for resize handles
    if (figure instanceof draw2d.ResizeHandle) {
      return modifiedPos
    }
    // do nothing for lines
    if (figure instanceof draw2d.shape.basic.Line) {
      return modifiedPos
    }


    var allowXChanges = modifiedPos.x === originalPos.x
    var allowYChanges = modifiedPos.y === originalPos.y

    var inputBounds = new draw2d.geo.Rectangle(modifiedPos.x, modifiedPos.y, figure.getWidth(), figure.getHeight())

    modifiedPos = modifiedPos.clone()

    if (allowXChanges === true) {
      var horizontal = this.snapHorizontal(inputBounds)

      // Show a horizontal line if the snapper has modified the inputPoint
      //
      if (horizontal.snapped) {
        // show the snap lines..
        this.showHorizontalGuides(figure, horizontal)

        // and snap the x coordinate
        modifiedPos.x += horizontal.diff
      }
      else {
        this.hideHorizontalGuides(true)
      }
    }
    else {
      this.hideHorizontalGuides(true)
    }

    if (allowYChanges === true) {
      var vertical = this.snapVertical(inputBounds)

      // Show a vertical guides if the snapper has modified the inputPoint
      //
      if (vertical.snapped) {
        // show the snap lines..
        this.showVerticalGuides(figure, vertical)

        // and snap the x coordinate
        modifiedPos.y += vertical.diff
      }
      else {
        this.hideVerticalGuides(true)
      }
    }
    else {
      this.hideVerticalGuides(true)
    }

    return modifiedPos
  },


  snapHorizontal: function (boundingBox) {
    var center = boundingBox.getCenter()
    if (this.bounds === null)
      this.populateBounds()

    var result = {
      point: center,
      snapped: false,
      snappedBox: boundingBox.clone()
    }


    var intersectionPoint = null

    // Calculate the intersections points p(i) of all left side edges of the bounding boxes
    // and the ray from the center of the drag&drop object to the left edge of the canva
    //
    // BBox of          Drag&Drop
    // any Figure       Figure
    //
    // ....+           ........
    //     |           .      .
    // .   |p(i)       .      .
    // .   X<------------->+  .
    // .   |           .      .
    // ....+           .      .
    //                 ........
    //
    //
    var leftIntersections = []
    var leftInputPoint = center.clone()
    leftInputPoint.x = 0
    this.bounds.forEach(function (bbox, index) {
      intersectionPoint = draw2d.shape.basic.Line.intersection(bbox.getTopRight(), bbox.getBottomRight(), center, leftInputPoint)
      if (intersectionPoint !== null) {
        intersectionPoint.causedBBox = bbox
        leftIntersections.push(intersectionPoint)
      }
    })
    // we can abort if we didn't find an intersection on the left hand side
    if (leftIntersections.length === 0) {
      return result
    }

    // sort the intersection point and get the closest point to the tested inputPoint
    // In this case it is the point with the greates X coordinate
    //
    leftIntersections.sort(function (a, b) {
      return b.x - a.x
    })


    // Calculate the intersections points p(i) of all right hand side edges of the
    // bounding boxes and the ray from the center of the drag&drop object to the
    // left edge of the canvas
    //
    //                 Drag&Drop             bbox of any
    //                 Figure                figure
    //
    //                 ........
    //                 .      .
    //                 .      .             ...........
    //                 .   +<-------------->X         |
    //                 .      .         p(i)|         |
    //                 .      .             |         |
    //                 ........             |         |
    //                                      ...........
    //
    var rightIntersections = []
    var rightInputPoint = center.clone()
    rightInputPoint.x = Number.MAX_SAFE_INTEGER
    this.bounds.forEach(function (bbox, index) {
      intersectionPoint = draw2d.shape.basic.Line.intersection(bbox.getTopLeft(), bbox.getBottomLeft(), center, rightInputPoint)
      if (intersectionPoint !== null) {
        intersectionPoint.causedBBox = bbox
        rightIntersections.push(intersectionPoint)
      }
    })
    // we can abort if we didn't find an intersection on the right hand side
    if (rightIntersections.length === 0) {
      return result
    }

    // sort the intersection point and get the closest point to the tested inputPoint
    // In this case it is the point with the greates X coordinate
    //
    rightIntersections.sort(function (a, b) {
      return a.x - b.x
    })


    // Snap the point (S) between the two founded intersections
    // p(i1) and p(i2)
    //
    // BBox FigureA     Drag&Drop           BBox of FigureB
    //                  Figure
    //
    // ....+           ........
    //     |           .      .
    // .   |p(i1)      .   S  .             ...........
    // .   X<------------->X<-------------->X         |
    // .   |           .      .        p(i2)|         |
    // ....+           .      .             |         |
    //                 ........             |         |
    //                                      ...........
    //
    var snappedRect = boundingBox.clone()
    var diff = ((leftIntersections[0].x + rightIntersections[0].x) / 2) - center.x

    snappedRect.x += diff

    return {
      snapped: Math.abs(diff) < this.SNAP_THRESHOLD,
      snappedRect: snappedRect,
      diff: diff,
      leftSide: leftIntersections[0],
      rightSide: rightIntersections[0]
    }
  },


  snapVertical: function (boundingBox) {
    var center = boundingBox.getCenter()

    if (this.bounds === null) {
      this.populateBounds()
    }

    var result = {
      point: center,
      snapped: false,
      snappedBox: boundingBox.clone()
    }


    var intersectionPoint = null

    // Calculate the intersections points p(i) of all left side edges of the bounding boxes
    // and the ray from the center of the drag&drop object to the left edge of the canva
    //
    // BBox of          Drag&Drop
    // any Figure       Figure
    //
    // ....+           ........
    //     |           .      .
    // .   |p(i)       .      .
    // .   X<------------->+  .
    // .   |           .      .
    // ....+           .      .
    //                 ........
    //
    //
    var topIntersections = []
    var topInputPoint = center.clone()
    topInputPoint.y = 0
    this.bounds.forEach(function (bbox) {
      intersectionPoint = draw2d.shape.basic.Line.intersection(bbox.getBottomLeft(), bbox.getBottomRight(), center, topInputPoint)
      if (intersectionPoint !== null) {
        intersectionPoint.causedBBox = bbox
        topIntersections.push(intersectionPoint)
      }
    })
    // we can abort if we didn't find an intersection on the left hand side
    if (topIntersections.length === 0) {
      return result
    }

    // sort the intersection point and get the closest point to the tested inputPoint
    // In this case it is the point with the greates X coordinate
    //
    topIntersections.sort(function (a, b) {
      return b.y - a.y
    })


    // Calculate the intersections points p(i) of all right hand side edges of the
    // bounding boxes and the ray from the center of the drag&drop object to the
    // left edge of the canvas
    //
    //                 Drag&Drop             bbox of any
    //                 Figure                figure
    //
    //                 ........
    //                 .      .
    //                 .      .             ...........
    //                 .   +<-------------->X         |
    //                 .      .         p(i)|         |
    //                 .      .             |         |
    //                 ........             |         |
    //                                      ...........
    //
    var bottomIntersections = []
    var bottomInputPoint = center.clone()
    bottomInputPoint.y = Number.MAX_SAFE_INTEGER
    this.bounds.forEach(function (bbox) {
      intersectionPoint = draw2d.shape.basic.Line.intersection(bbox.getTopLeft(), bbox.getTopRight(), center, bottomInputPoint)
      if (intersectionPoint !== null) {
        intersectionPoint.causedBBox = bbox
        bottomIntersections.push(intersectionPoint)
      }
    })
    // we can abort if we didn't find an intersection on the right hand side
    if (bottomIntersections.length === 0) {
      return result
    }

    // sort the intersection point and get the closest point to the tested inputPoint
    // In this case it is the point with the greates X coordinate
    //
    bottomIntersections.sort(function (a, b) {
      return a.y - b.y
    })


    // Snap the point (S) between the two founded intersections
    // p(i1) and p(i2)
    //
    // BBox FigureA     Drag&Drop           BBox of FigureB
    //                  Figure
    //
    // ....+           ........
    //     |           .      .
    // .   |p(i1)      .   S  .             ...........
    // .   X<------------->X<-------------->X         |
    // .   |           .      .        p(i2)|         |
    // ....+           .      .             |         |
    //                 ........             |         |
    //                                      ...........
    //
    var snappedRect = boundingBox.clone()
    var diff = ((topIntersections[0].y + bottomIntersections[0].y) / 2) - center.y

    snappedRect.y += diff

    return {
      snapped: Math.abs(diff) < this.SNAP_THRESHOLD,
      snappedRect: snappedRect,
      diff: diff,
      topSide: topIntersections[0],
      bottomSide: bottomIntersections[0]
    }
  },

  populateBounds: function () {
    var selection = this.canvas.getSelection().getAll(true)
    var bounds = this.bounds = []

    var figures = this.canvas.getFigures()
    figures.each(function (index, figure) {
      if (!selection.contains(figure)) {
        bounds.push(figure.getBoundingBox())
      }
    })
  },

  showHorizontalGuides: function (causedFigure, constraint) {
    if (this.horizontalGuideLines != null) {
      this.horizontalGuideLines.stop()
      this.horizontalGuideLines.remove()
    }

    var snapTopLeft = constraint.snappedRect.getTopLeft()
    var snapTopRight = constraint.snappedRect.getTopRight()
    var y = ((Math.min(constraint.leftSide.causedBBox.getTopRight().y, Math.min(constraint.rightSide.causedBBox.y, causedFigure.getY())) - 50) | 0) + 0.5

    this.canvas.paper.setStart()

    // Vertical lines from left to the right order
    //
    this.canvas.paper.path("M " + ((constraint.leftSide.x | 0) + 0.5) + " " + y + " L " + ((constraint.leftSide.x | 0) + 0.5) + " " + constraint.leftSide.y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})

    this.canvas.paper.path("M " + ((snapTopLeft.x | 0) + 0.5) + " " + y + " L " + ((snapTopLeft.x | 0) + 0.5) + " " + snapTopLeft.y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})

    this.canvas.paper.path("M " + ((snapTopRight.x | 0) + 0.5) + " " + y + " L " + ((snapTopRight.x | 0) + 0.5) + " " + snapTopRight.y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})

    this.canvas.paper.path("M " + ((constraint.rightSide.x | 0) + 0.5) + " " + y + " L " + ((constraint.rightSide.x | 0) + 0.5) + " " + constraint.rightSide.y)
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})


    // horizontal lines
    //
    this.canvas.paper.path("M " + (constraint.leftSide.x) + " " + (y + 5) + " L " + (snapTopLeft.x) + " " + (y + 5)).attr({
      "stroke": this.lineColor.rgba(),
      "stroke-width": 1
    })
    this.canvas.paper.path("M " + (constraint.rightSide.x) + " " + (y + 5) + " L " + (snapTopRight.x) + " " + (y + 5)).attr({
      "stroke": this.lineColor.rgba(),
      "stroke-width": 1
    })

    // 4 arrow heads starting on the left side and add one by one
    //
    this.canvas.paper.path(
      " M " + (constraint.leftSide.x + 5) + " " + (y)
      + " L " + (constraint.leftSide.x) + " " + (y + 5)
      + " L " + (constraint.leftSide.x + 5) + " " + (y + 10))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.canvas.paper.path(
      " M " + (snapTopLeft.x - 5) + " " + (y)
      + " L " + (snapTopLeft.x) + " " + (y + 5)
      + " L " + (snapTopLeft.x - 5) + " " + (y + 10))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})


    this.canvas.paper.path(
      " M " + (snapTopRight.x + 5) + " " + (y)
      + " L " + (snapTopRight.x) + " " + (y + 5)
      + " L " + (snapTopRight.x + 5) + " " + (y + 10))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})


    this.canvas.paper.path(
      " M " + (constraint.rightSide.x - 5) + " " + (y)
      + " L " + (constraint.rightSide.x) + " " + (y + 5)
      + " L " + (constraint.rightSide.x - 5) + " " + (y + 10))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})


    this.horizontalGuideLines = this.canvas.paper.setFinish()
    this.horizontalGuideLines.toFront()
  },

  /**
   *
   * Hide the horizontal snaping guides
   *
   * @param {Boolean} fast
   */
  hideHorizontalGuides: function (fast) {
    if (this.horizontalGuideLines == null) {
      return
    }

    if (fast === true) {
      if (this.horizontalGuideLines !== null) {
        this.horizontalGuideLines.remove()
        this.horizontalGuideLines = null
      }
    }
    else {
      this.horizontalGuideLines.animate(
        {opacity: 0.1},
        this.FADEOUT_DURATION,
        () => {
          if (this.horizontalGuideLines !== null) {
            this.horizontalGuideLines.remove()
            this.horizontalGuideLines = null
          }
        }
      )
    }
  },

  showVerticalGuides: function (causedFigure, constraint) {
    if (this.verticalGuideLines != null) {
      this.verticalGuideLines.stop()
      this.verticalGuideLines.remove()
    }

    var snapTopRight = constraint.snappedRect.getTopRight()
    var snapBottomRight = constraint.snappedRect.getBottomRight()
    var x = ((Math.max(constraint.topSide.causedBBox.getRight(), Math.max(constraint.bottomSide.causedBBox.getRight(), causedFigure.getX())) + 40) | 0) + 0.5

    this.canvas.paper.setStart()

    // Vertical lines from left to the right order
    //
    this.canvas.paper.path("M " + x + " " + ((constraint.topSide.y | 0) + 0.5) + " L " + ((constraint.topSide.x | 0) + 0.5) + " " + ((constraint.topSide.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + x + " " + ((snapTopRight.y | 0) + 0.5) + " L " + ((snapTopRight.x | 0) + 0.5) + " " + ((snapTopRight.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + x + " " + ((snapBottomRight.y | 0) + 0.5) + " L " + ((snapBottomRight.x | 0) + 0.5) + " " + ((snapBottomRight.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})
    this.canvas.paper.path("M " + x + " " + ((constraint.bottomSide.y | 0) + 0.5) + " L " + ((constraint.bottomSide.x | 0) + 0.5) + " " + ((constraint.bottomSide.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1, "stroke-dasharray": ". "})

    // horizontal lines
    //
    this.canvas.paper.path("M " + (x - 5) + " " + (((constraint.topSide.y | 0) + 0.5)) + " L " + (x - 5) + " " + ((snapTopRight.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})
    this.canvas.paper.path("M " + (x - 5) + " " + (((constraint.bottomSide.y | 0) + 0.5)) + " L " + (x - 5) + " " + ((snapBottomRight.y | 0) + 0.5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})


    // 4 arrow heads starting on the left side and add one by one
    //
    this.canvas.paper.path(
      " M " + (x - 10) + " " + (constraint.topSide.y + 5)
      + " L " + (x - 5) + " " + (constraint.topSide.y)
      + " L " + (x) + " " + (constraint.topSide.y + 5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.canvas.paper.path(
      " M " + (x - 10) + " " + (snapTopRight.y - 5)
      + " L " + (x - 5) + " " + (snapTopRight.y)
      + " L " + (x) + " " + (snapTopRight.y - 5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.canvas.paper.path(
      " M " + (x - 10) + " " + (snapBottomRight.y + 5)
      + " L " + (x - 5) + " " + (snapBottomRight.y)
      + " L " + (x) + " " + (snapBottomRight.y + 5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.canvas.paper.path(
      " M " + (x - 10) + " " + (constraint.bottomSide.y - 5)
      + " L " + (x - 5) + " " + (constraint.bottomSide.y)
      + " L " + (x) + " " + (constraint.bottomSide.y - 5))
      .attr({"stroke": this.lineColor.rgba(), "stroke-width": 1})

    this.verticalGuideLines = this.canvas.paper.setFinish()
    this.verticalGuideLines.toFront()
  },

  hideVerticalGuides: function () {
    if (this.verticalGuideLines == null) {
      return //silently
    }

    this.verticalGuideLines.animate(
      {opacity: 0.1},
      this.FADEOUT_DURATION,
      () => {
        if (this.verticalGuideLines !== null) {
          this.verticalGuideLines.remove()
          this.verticalGuideLines = null
        }
      }
    )
  }

})
