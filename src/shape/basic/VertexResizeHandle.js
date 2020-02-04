/**
 * @class draw2d.shape.basic.VertexResizeHandle
 *
 * Selection handle for polyline vertices.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.ResizeHandle
 */
import draw2d from '../../packages'

draw2d.shape.basic.VertexResizeHandle = draw2d.ResizeHandle.extend(
  /** @lends draw2d.shape.basic.VertexResizeHandle.prototype */
  {

  NAME: "draw2d.shape.basic.VertexResizeHandle",

  SNAP_THRESHOLD: 3,
  LINE_COLOR: "#1387E6",
  FADEOUT_DURATION: 300,

  init: function (owner, index) {
    this._super({owner})
    this.index = index
    this.isDead = false
  },


  /**
   *
   * Called when a user double clicks on the element
   *
   * @template
   */
  onDoubleClick: function () {
    let cmd = new draw2d.command.CommandRemoveVertex(this.owner, this.index)
    this.getCanvas().getCommandStack().execute(cmd)

    this.isDead = true
  },


  /**
   *
   * Called if a drag&drop operation starts.<br>
   *
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onDragStart: function (x, y, shiftKey, ctrlKey) {
    if (this.isDead === true) {
      return
    }

    this._super()
    this.command = this.getCanvas().getPrimarySelection().createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_VERTEX))
    if (this.command != null) {
      this.command.setIndex(this.index)
      this.setAlpha(0.2)
      this.shape.attr({"cursor": "crosshair"})
    }

    // Vertex is a reference and not a copy of the point
    this.vertex = this.owner.getVertex(this.index).clone()

    // fire an event
    // @since 5.3.3
    this.fireEvent("dragstart", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})

    return true
  },

  /**
   *
   * Called from the framework during a drag&drop operation
   *
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   **/
  onDrag: function (dx, dy, dx2, dy2) {
    if (this.isDead === true || this.command == null) {
      return
    }

    this.setPosition(this.x + dx2, this.y + dy2)

    // update the polyline for immediately  drag&drop feedback
    //
    this.vertex.translate(dx2, dy2)
    let newPos = this.vertex.clone()
    // Adjust the new location if the object can snap to a helper
    // like grid, geometry, ruler,...
    //
    if (this.getCanSnapToHelper()) {
      newPos = this.getCanvas().snapToHelper(this, newPos)
    }

    this.owner.setVertex(this.index, newPos.x, newPos.y)

    // update the command for the undo/redo stuff
    //
    this.command.updatePosition(this.vertex.x, this.vertex.y)
  },

  /**
   *  Called after a drag and drop action.<br>
   *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
   *
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   */
  onDragEnd: function (x, y, shiftKey, ctrlKey) {
    if (this.isDead === true || this.command === null) {
      return
    }

    this.shape.attr({"cursor": "move"})

    let stack = this.getCanvas().getCommandStack()

    let transactionCommand = new draw2d.command.CommandCollection()

    try {
      transactionCommand.add(this.command)
      this.command = null
      if (this.getEnclosingAngle() > 178) {
        transactionCommand.add(new draw2d.command.CommandRemoveVertex(this.owner, this.index))
      }
    }
    finally {
      stack.execute(transactionCommand)
    }

    this.setAlpha(1)

    // fire an event
    // @since 5.3.3
    this.fireEvent("dragend", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})
  },


  /**
   *
   * Controls the location of the resize handle
   *
   * @template
   **/
  relocate: function () {
    let resizeWidthHalf = this.getWidth() / 2
    let resizeHeightHalf = this.getHeight() / 2

    let anchor = this.owner.getVertex(this.index)

    this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf)
  },

  /**
   *
   * Calculates the angle between the siblings
   *
   * @returns {Number}
   */
  getEnclosingAngle: function () {
    // calculate the angle between the siblings
    let points = this.owner.getVertices()
    let trans = this.vertex.getScaled(-1)
    let size = points.getSize()
    let left = points.get((this.index - 1 + size) % size).translated(trans) // % is just to ensure the [0, size] interval
    let right = points.get((this.index + 1) % size).translated(trans)       // % is just to ensure the [0, size] interval

    let dot = left.dot(right)

    let acos = Math.acos(dot / (left.length() * right.length()))
    return acos * 180 / Math.PI
  }

})
