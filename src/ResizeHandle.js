/**
 * @class draw2d.ResizeHandle
 * @classdesc The Resizehandles for Figures.

 * <pre>
 * Possible Type:
 *
 *   1             2               3
 *     O-----------O-------------O
 *     |                         |
 *     |                         |
 *   8 O           + 9           O 4
 *     |                         |
 *     |                         |
 *     O-----------O-------------O
 *   7             6               5
 * </pre>
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */

import draw2d from 'packages'
import extend from './util/extend'

draw2d.ResizeHandle = draw2d.shape.basic.Rectangle.extend(
  /** @lends draw2d.ResizeHandle.prototype */
  {

  NAME: "draw2d.ResizeHandle",

  /**
   * @constructs
   * Creates a new figure element which are not assigned to any canvas.
   *
   * @param {draw2d.Figure} the owner if the resize handle
   * @param {Number} type the type of the ResizeHandle.
   */
  init: function (attr, setter, getter) {

    this.zoomCallback = ()=> {
      this.attr({
          width:  this.origWidth*this.getCanvas().getZoom(),
          height: this.origHeight*this.getCanvas().getZoom(),
          radius: this.origRadius*this.getCanvas().getZoom(),
          stroke: this.origStroke*this.getCanvas().getZoom()
      })

      // size of the ResizeHandle has changed. Force a reposition of handle
      //
      if(!this.blockEvent)
        this.owner.fireEvent("move",{})
    }

    this._super(
      extend({
        // set some good defaults
        bgColor: "#FDFDFD",
        stroke: 0.5,
        width:10,
        height:10,
        minWidth:0.3,
        minHeight:0.3,
        color: "#a0a0a0",
        radius: 1,
        selectable:false
        // and allow to override them
      }, attr),
      extend({
        owner : this.setOwner,
        type : this.setType
      },setter),
      extend({
        owner : this.getOwner,
        type : this.getType
      },getter))

    // required in the SelectionEditPolicy to indicate the type of figure
    // which the user clicks
    this.isResizeHandle = true

    this.command = null
    this.commandMove = null
    this.commandResize = null
    this.useGradient = true


    this.origRadius = this.radius
    this.origWidth = this.width
    this.origHeight = this.height
    this.origStroke = this.stroke
  },


  /**
   *
   * The edge of the rectangle for the snapTo mechanism.
   *
   * @return
   */
  getSnapToDirection: function () {
    switch (this.type) {
      case 1:
        return draw2d.SnapToHelper.NORTH_WEST
      case 2:
        return draw2d.SnapToHelper.NORTH
      case 3:
        return draw2d.SnapToHelper.NORTH_EAST
      case 4:
        return draw2d.SnapToHelper.EAST
      case 5:
        return draw2d.SnapToHelper.SOUTH_EAST
      case 6:
        return draw2d.SnapToHelper.SOUTH
      case 7:
        return draw2d.SnapToHelper.SOUTH_WEST
      case 8:
        return draw2d.SnapToHelper.WEST
      case 9:
        return draw2d.SnapToHelper.NSEW
      default:
        return draw2d.SnapToHelper.EAST
    }
  },

  /**
   * @inheritdoc
   */
  createShapeElement: function () {
    this.shape = this._super()

    this.shape.node.setAttribute("type", this.type)
    this.updateCursor(this.shape)

    return this.shape
  },


  /**
   *
   * Returns the current used SVG as string
   *
   * @returns {String}
   */
  getOwner: function()
  {
    return this.owner;
  },

  setOwner: function( owner){
    this.owner = owner

    return this
  },


  /**
   *
   * Returns the current used SVG as string
   *
   * @returns {String}
   */
  getType: function()
  {
    return this.type;
  },

  setType: function( type){
    this.type = type

    return this
  },

  /**
   *
   * calculate and set the cursor of the reize handle
   * @private
   */
  updateCursor: function (shape) {
    if (shape === null) {
      return this
    }

    if (this.isDraggable() === false) {
      shape.attr({"cursor": "default"})
      return this
    }

    switch (this.type) {
      case 1:
        shape.attr({"cursor": "nw-resize"})
        break
      case 2:
        shape.attr({"cursor": "n-resize"})
        break
      case 3:
        shape.attr({"cursor": "ne-resize"})
        break
      case 4:
        shape.attr({"cursor": "e-resize"})
        break
      case 5:
        shape.attr({"cursor": "se-resize"})
        break
      case 6:
        shape.attr({"cursor": "s-resize"})
        break
      case 7:
        shape.attr({"cursor": "sw-resize"})
        break
      case 8:
        shape.attr({"cursor": "w-resize"})
        break
      default:
        shape.attr({"cursor": "move"})
        break
    }
    return this
  },

  /**
   *
   * Adjust the draggable flag of the resize handle and update the cursor of the shape in relation
   * to the type of resize handle. north, south,west,..
   *
   * @param flag
   * @returns
   */
  setDraggable: function (flag) {
    this._super(flag)
    this.updateCursor(this.shape)

    return this
  },

  /**
   *
   * Will be called if the drag and drop action beginns. You can return [false] if you
   * want avoid that the figure can be move.
   *
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @return {Boolean} true whenever the drag drop operation is allowed.
   **/
  onDragStart: function (x, y, shiftKey, ctrlKey) {
    // This happens if the selected figure has set the "nonResizeable" flag
    // In this case the ResizeHandle can't be dragged. => no resize
    //
    if (!this.isDraggable()) {
      return false
    }

    this.ox = this.getAbsoluteX()
    this.oy = this.getAbsoluteY()

    this.commandMove = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE))
    this.commandResize = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.RESIZE))

    return true
  },


  /**
   *
   * Called by the framework if the figure is moved by user interaction.
   *
   * @param {Number} dx the move x offset
   * @param {Number} dy the move y offset
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   *
   */
  onDrag: function (dx, dy, dx2, dy2) {
    if (this.isDraggable() === false) {
      return
    }

    let oldX = this.getAbsoluteX()
    let oldY = this.getAbsoluteY()

    // call the super.drag method with all snapTo### handler and adjustments
    this._super(dx, dy, dx2, dy2)

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
    switch (this.type) {
      case 1:
        obj.setDimension(objWidth - diffX, objHeight - diffY)
        newX = objPosX + (objWidth - obj.getWidth())
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY)
        break
      case 2:
        obj.setDimension(objWidth, objHeight - diffY)
        newX = objPosX
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY)
        break
      case 3:
        obj.setDimension(objWidth + diffX, objHeight - diffY)
        newX = objPosX
        newY = objPosY + (objHeight - obj.getHeight())
        obj.setPosition(newX, newY)
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
        obj.setPosition(newX, newY)
        break
      case 8:
        obj.setDimension(objWidth - diffX, objHeight)
        newX = objPosX + (objWidth - obj.getWidth())
        newY = objPosY
        obj.setPosition(newX, newY)
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
  },

  /**
   *
   * Will be called after a drag and drop action.<br>
   *
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onDragEnd: function (x, y, shiftKey, ctrlKey) {
    if (!this.isDraggable()) {
      return
    }

    // An non draggable resizeHandle doesn't create a move/resize command.
    // This happens if the selected figure has set the "nonResizeable" flag.
    //
    if (this.commandMove !== null) {
      this.commandMove.setPosition(this.owner.getX(), this.owner.getY())
      this.canvas.getCommandStack().execute(this.commandMove)
      this.commandMove = null
    }

    if (this.commandResize !== null) {
      this.commandResize.setDimension(this.owner.getWidth(), this.owner.getHeight())
      this.canvas.getCommandStack().execute(this.commandResize)
      this.commandResize = null
    }
  },

  /**
   * Set the position of the object.<br>
   * The ResizeHandle overrides the Figure.setPosition method. The base
   * class updates the resize handles during the update of the Dimension/Position. This
   * is not neccessary for the ResizeHandles. Performance issue.
   *
   * @param {Number|draw2d.geo.Point} x The new x coordinate of the figure
   * @param {Number} y The new y coordinate of the figure
   **/
  setPosition: function (x, y) {
    // don't call base implementation. Base implementation will show
    // ResizeHandles...but I'm the ResizeHandle
    if (x instanceof draw2d.geo.Point) {
      this.x = x.x
      this.y = x.y
    }
    else {
      this.x = x
      this.y = y
    }

    if (this.repaintBlocked === true || this.shape === null) {
      return this
    }

    // performance improvement by setting the coordinates direct.
    this.shape.attr({x: this.x, y: this.y})

    this.applyTransformation()
  },

  /**
   *
   * Set the new dimension of the the ResizeHandle. If you didn't pass any width/height the best default for the
   * platform will be used.
   *
   * Additional the "snapTo" anchor is re-calculated in relation to the type of ResizeHandle
   *
   * @param {Number} [width] new width of the resize handle
   * @param {Number} [height] new width of the resize handle
   */
  setDimension: function (width, height) {

    if (typeof height !== "undefined") {
      this._super(width, height)
    }
    else {
      if (draw2d.isTouchDevice) {
        this._super(15, 15)
      }
      else {
        this._super(8, 8)
      }
    }


    let offset = this.getWidth()
    let offset2 = offset / 2

    switch (this.type) {
      case 1:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset, offset))
        break
      case 2:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, offset))
        break
      case 3:
        this.setSnapToGridAnchor(new draw2d.geo.Point(0, offset))
        break
      case 4:
        this.setSnapToGridAnchor(new draw2d.geo.Point(0, offset2))
        break
      case 5:
        this.setSnapToGridAnchor(new draw2d.geo.Point(0, 0))
        break
      case 6:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, 0))
        break
      case 7:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset, 0))
        break
      case 8:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset, offset2))
        break
      case 9:
        this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, offset2))
        break
    }

    return this
  },

  /**
   *
   * Show the ResizeHandle and add it to the canvas.<br>
   * Additional bring it in to the front of other figures if we didn't use
   * an overlayCanvas.
   *
   * If the ResizeHandle is place inside an overlayCanvas it is automatically on top.
   *
   * @param {draw2d.Canvas} canvas the canvas to use
   **/
  show: function (canvas) {
    // don't call the parent function. The parent functions delete this object
    // and a resize handle can't be deleted.
    this.setCanvas(canvas)

    this.canvas.resizeHandles.add(this)
    this.shape.insertAfter(this.owner.getShapeElement())

    try{
      this.blockEvent=true
      this.zoomCallback()
    }
    finally{
      this.blockEvent=false
    }
    this.repaint()

    return this
  },

  /**
   *
   * Hide the resize handle and remove it from the canvas.
   *
   **/
  hide: function () {
    // don't call the parent function. The parent functions delete this object
    // and a resize handle shouldn't be deleted.
    if (this.shape === null) {
      return
    }

    this.canvas.resizeHandles.remove(this)
    this.setCanvas(null)

    return this
  },

  setCanvas: function (canvas) {

    if(this.canvas!==null){
      this.canvas.off(this.zoomCallback);
    }

    this._super(canvas)

    if(this.canvas!==null){
      this.canvas.on("zoom", this.zoomCallback);
    }
  },

  /**
   *
   * Set the new background color of the figure. It is possible to hands over
   * <code>null</code> to set the background transparent.
   *
   * @param {draw2d.util.Color} color The new background color of the figure
   **/
  setBackgroundColor: function (color) {
    color = new draw2d.util.Color(color)

    this.bgGradient = "90-" + color.darker(0.2).hash() + "-" + color.hash()
    this._super(color)

    return this
  },

  /**
   * @inheritdoc
   */
  repaint: function (attributes) {

    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes = attributes || {}

    if (this.bgColor.hash() === "none") {
      attributes.fill = "none"
    }
    else if (this.getAlpha() < 0.9 || this.useGradient === false) {
      attributes.fill = this.bgColor.rgba()
    }
    else {
      attributes.fill = this.bgGradient
    }


    this._super(attributes)
  },

  /**
   *
   * return true if the element can be used in combination with the
   * SnapToHelper feature.
   *
   * @return {Boolean}
   **/
  supportsSnapToHelper: function () {
    return true
  },

  /**
   *
   * Override this method and redirect them to the cavas. A ResizeHandle didn't support
   * Keyboard interaction at the moment.
   *
   * @param {Number} keyCode the id of the pressed key
   * @param {Boolean} ctrl true if the user has pressed the CTRL/STRG key as well.
   **/
  onKeyDown: function (keyCode, ctrl) {
    // don't call the parent function. The parent functions delete this object
    // and a resize handle can't be deleted.
    this.canvas.onKeyDown(keyCode, ctrl)
  },

  /**
   * @inheritdoc
   */
  fireEvent: function (event, args) {
    // A resizeHandle doesn't fire this event.
    // Normally this set the document dirty. This is not necessary for a ResizeHandle.
  }
})

