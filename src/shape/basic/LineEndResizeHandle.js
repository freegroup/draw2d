/**
 * @class draw2d.shape.basic.LineEndResizeHandle
 *
 * Selection handle for connections and normal lines.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle
 */
import draw2d from '../../packages'

draw2d.shape.basic.LineEndResizeHandle = draw2d.shape.basic.LineResizeHandle.extend(
  /** @lends draw2d.shape.basic.LineEndResizeHandle.prototype */
  {

  NAME: "draw2d.shape.basic.LineEndResizeHandle",

  init: function (figure) {
    this._super({owner: figure, index: figure.getVertices().getSize() - 1})
  },


  /**
   *
   * Return the Port assigned to this ResizeHandle if the line is an instance of draw2d.Connection
   *
   * @return {draw2d.Port}
   */
  getRelatedPort: function () {
    if (this.owner instanceof draw2d.Connection) {
      return this.owner.getTarget()
    }

    return null
  },

  /**
   *
   * Return the peer Port assigned to this ResizeHandle if the line is an instance of draw2d.Connection
   *
   * @returns {draw2d.Port}
   */
  getOppositePort: function () {
    if (this.owner instanceof draw2d.Connection) {
      return this.owner.getSource()
    }

    return null
  },


  /**
   *
   * Called from the framework during a drag&drop operation
   *
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @return {Boolean}
   * @private
   **/
  onDrag: function (dx, dy, dx2, dy2) {
    this._super(dx, dy, dx2, dy2)

    let objPos = this.owner.getEndPoint().clone()
    objPos.translate(dx2, dy2)

    if (this.command !== null) {
      this.command.updatePosition(objPos)
    }

    this.owner.setEndPoint(objPos)

    this.owner.isMoving = true

    return true
  },

  /**
   *
   * Resizehandle has been drop on a InputPort/OutputPort.
   *
   * @param {draw2d.Figure} dropTarget
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    this.owner.isMoving = false

    if (this.owner instanceof draw2d.Connection && this.command !== null) {
      this.command.setNewPorts(this.owner.getSource(), dropTarget)
      this.getCanvas().getCommandStack().execute(this.command)
    }
    this.command = null
  },

  /**
   *
   * Controls the location of the resize handle
   *
   **/
  relocate: function () {

    let resizeWidthHalf = this.getWidth() / 2
    let resizeHeightHalf = this.getHeight() / 2

    let anchor = this.owner.getEndPoint()

    this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf)

    return this
  }
})
