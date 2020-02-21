import draw2d from '../../packages'

/**
 * @class
 * Raft figures are shapes, which aggregate multiple figures. It works like a real raft. Aboard figures are
 * moved if the raft figures moves.
 *
 *
 * @example
 *
 *    let rect1 =  new draw2d.shape.composite.Raft({width:200, height:100});
 *    let rect2 =  new draw2d.shape.basic.Rectangle({width:50, height:50});
 *
 *    canvas.add(rect1,10,10);
 *    canvas.add(rect2,20,20);
 *
 *    rect2.attr({bgColor:"#f0f000", width:50, height:50, radius:10});
 *
 *    canvas.setCurrentSelection(rect1);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.WeakComposite
 * @since 4.7.0
 */
draw2d.shape.composite.Raft = draw2d.shape.composite.WeakComposite.extend(
  /** @lends draw2d.shape.composite.Raft.prototype */
  {

  NAME: "draw2d.shape.composite.Raft",

  /**
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {

    this.aboardFigures = new draw2d.util.ArrayList()

    this._super(extend({bgColor: "#f0f0f0", color: "#1B1B1B"}, attr), setter, getter)
  },


  /**
   *
   * Will be called if the drag and drop action begins. You can return [false] if you
   * want avoid that the figure can be move.
   *
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @returns {Boolean} true if the figure accepts dragging
   **/
  onDragStart: function (x, y, shiftKey, ctrlKey) {
    this._super(x, y, shiftKey, ctrlKey)

    this.aboardFigures = new draw2d.util.ArrayList()
    // force the recalculation of the aboard figures if the shape is in a drag&drop operation
    this.getAboardFigures(this.isInDragDrop)

    return true
  },

  /**
   *
   * Set the position of the object.
   *
   * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
   * @param {Number} [y] The new y coordinate of the figure
   * @param {boolean} [dontApplyToChildren] don't move the children if this flag is set.
   **/
  setPosition: function (x, y, dontApplyToChildren) {
    let oldX = this.x
    let oldY = this.y

    // we need the figures before the composite has moved. Otherwise some figures are fall out of the raft
    //
    let aboardedFigures = (dontApplyToChildren) ? draw2d.util.ArrayList.EMPTY_LIST : this.getAboardFigures(this.isInDragDrop === false)

    this._super(x, y)

    let dx = this.x - oldX
    let dy = this.y - oldY

    if (dx === 0 && dy === 0) {
      return this
    }

    // we must move circuits with "user routed" elements as well if the start/target is withing
    // the raft. Some segments stay still because some coordinates has a fixed position
    //
    if (this.canvas !== null) {
      aboardedFigures = aboardedFigures.clone()
      this.canvas.getLines().each(function (i, line) {
        if (line instanceof draw2d.Connection) {
          if (aboardedFigures.contains(line.getSource().getRoot()) && aboardedFigures.contains(line.getTarget().getRoot())) {
            aboardedFigures.add(line)
          }
        }
      })
    }

    aboardedFigures.each(function (i, figure) {
      figure.translate(dx, dy)
    })

    return this
  },


  onDrag: function (dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    let _this = this

    // apply all EditPolicy for DragDrop Operations
    //
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        let newPos = e.adjustPosition(_this, _this.ox + dx, _this.oy + dy)
        if (newPos) {
          dx = newPos.x - _this.ox
          dy = newPos.y - _this.oy
        }
      }
    })

    let newPos = new draw2d.geo.Point(this.ox + dx, this.oy + dy)

    // Adjust the new location if the object can snap to a helper
    // like grid, geometry, ruler,...
    //
    if (this.getCanSnapToHelper()) {
      newPos = this.getCanvas().snapToHelper(this, newPos)
    }


    // push the shiftKey to the setPosition method and avoid to move the children objects
    // if the user press the shift key
    this.setPosition(newPos.x, newPos.y, shiftKey)

    // notify all installed policies
    //
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        e.onDrag(_this.canvas, _this)
      }
    })


    // fire an event
    // @since 5.3.3
    this.fireEvent("drag", {dx: dx, dy: dy, dx2: dx2, dy2: dy2, shiftKey: shiftKey, ctrlKey: ctrlKey})
  },

  /**
   *
   * Return all figures which are aboard of this shape. These shapes are moved as well if the raft
   * is moving.
   *
   * @returns {draw2d.util.ArrayList}
   */
  getAboardFigures: function (recalculate) {
    if (recalculate === true && this.canvas !== null) {
      let raftBoundingBox = this.getBoundingBox()
      let zIndex = this.getZOrder()
      this.aboardFigures = new draw2d.util.ArrayList()

      let _this = this
      this.getCanvas().getFigures().each(function (i, figure) {
        if (figure !== _this && figure.isSelectable() === true && figure.getBoundingBox().isInside(raftBoundingBox)) {
          // Don't add the figure if it is already catched by another composite with a higher z-index
          //
          if (_this.getNextComposite(figure) !== _this) {
            return
          }
          // only add the shape if it is in front of the raft
          if (figure.getZOrder() > zIndex) {
            _this.aboardFigures.add(figure)
          }
        }
      })
    }
    return this.aboardFigures
  },

  /**
   *
   * return the next potential composite parent figure
   *
   * @param {draw2d.Figure} figureToTest
   * @returns {draw2d.Figure}
   */
  getNextComposite: function (figureToTest) {
    let nextComposite = null
    this.getCanvas().getFigures().each(function (i, figure) {
      if (figureToTest === figure) {
        return
      }
      if (figure instanceof draw2d.shape.composite.Composite) {
        if (nextComposite !== null && nextComposite.getZOrder() > figure.getZOrder()) {
          return
        }

        if (figure.getBoundingBox().contains(figureToTest.getBoundingBox())) {
          nextComposite = figure
        }
      }
    })

    return nextComposite
  }
})






