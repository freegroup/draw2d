import draw2d from 'packages'

/**
 * @class
 * The Resizehandles for Figures.

 * <pre>
 * Possible Type:
 *
 *   1             2               3
 *    O-----------O-------------O
 *    |                         |
 *    |                         |
 *   8 O           + 9           O 4
 *    |                         |
 *    |                         |
 *    O-----------O-------------O
 *   7             6               5
 * </pre>
 *
 * @author Andreas Herz
 * @extends draw2d.ResizeHandle
 */
draw2d.shape.composite.RaftResizeHandle = draw2d.ResizeHandle.extend(
  /** @lends draw2d.shape.composite.RaftResizeHandle.prototype */
  {

  NAME: "draw2d.shape.composite.RaftResizeHandle",

  /**
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {draw2d.Figure} the owner if the resize handle
   * @param {Number} type the type of the ResizeHandle.
   */
  init: function (attr, setter, getter) {
    this._super(attr,setter,getter)
  },


  /**
   *
   * Called by the framework if the figure is moved by user interaction.
   *
   * @param {Number} dx the move x offset
   * @param {Number} dy the move y offset
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   */
  onDrag: function (dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    if (this.isDraggable() === false) {
      return
    }

    let oldX = this.getAbsoluteX()
    let oldY = this.getAbsoluteY()

    // call the super.drag method with all snapTo### handler and adjustments
    draw2d.shape.basic.Rectangle.prototype.onDrag.call(this,dx, dy, dx2, dy2); //DON'T call the super implementation!!!

    let diffX = this.getAbsoluteX() - oldX
    let diffY = this.getAbsoluteY() - oldY

    let obj = this.owner
    let objPosX = obj.getAbsoluteX()
    let objPosY = obj.getAbsoluteY()
    let objWidth = obj.getWidth()
    let objHeight = obj.getHeight()

    let newX = null
    let newY = null
    let corrPos = null
    // declare new let just to make the semantic behind the flag more clear
    let dontMoveChildren = shiftKey===true

    /*
    *   1             2               3
    *    O-----------O-------------O
    *    |                         |
    *    |                         |
    *   8 O           + 9           O 4
    *    |                         |
    *    |                         |
    *    O-----------O-------------O
    *   7             6               5
    */
    switch (this.type) {
      case 1:
        obj.setDimension(objWidth - diffX, objHeight - diffY)
        newX = objPosX + (objWidth - obj.getWidth())
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY,dontMoveChildren)
        break
      case 2:
        obj.setDimension(objWidth, objHeight - diffY)
        newX = objPosX
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY,dontMoveChildren)
        break
      case 3:
        obj.setDimension(objWidth + diffX, objHeight - diffY)
        newX = objPosX
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY,dontMoveChildren)
        break
      case 4:
        obj.setDimension(objWidth + diffX, objHeight)
        break
      case 5:
        obj.setDimension(objWidth + diffX, objHeight + diffY)
        break
      case 6:
        obj.setDimension(objWidth, objHeight + diffY)
        break
      case 7:
        obj.setDimension(objWidth - diffX, objHeight + diffY)
        newX = objPosX + (objWidth - obj.getWidth())
        newY = objPosY
        obj.setPosition(newX, newY,dontMoveChildren)
        break
      case 8:
        obj.setDimension(objWidth - diffX, objHeight)
        newX = objPosX + (objWidth - obj.getWidth())
        newY = objPosY
        debugger
        obj.setPosition(newX, newY,dontMoveChildren)
        break
    }

    if (newX !== null) {
      // may the setPosition has changed regarding any constraint or edit policies. In this case
      // we must adjust the dimension with the related correction
      //
      corrPos = obj.getPosition()
      if (corrPos.x !== newX || corrPos.y !== newY) {
        obj.setDimension(obj.getWidth() - (corrPos.x - newX), obj.getHeight() - (corrPos.y - newY))
      }
    }
  }
})

