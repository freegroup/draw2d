/**
 * @class draw2d.policy.figure.DragDropEditPolicy
 *
 * Called by the framework if the user edit the position of a figure with a drag drop operation.
 * Sub class like SelectionEditPolicy or RegionEditPolicy can adjust the position of the figure or the selections handles.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.figure.FigureEditPolicy
 */
import draw2d from '../../packages'

draw2d.policy.figure.DragDropEditPolicy = draw2d.policy.figure.FigureEditPolicy.extend(
  /** @lends draw2d.policy.figure.DragDropEditPolicy.prototype */
  {

  NAME: "draw2d.policy.figure.DragDropEditPolicy",

  /**
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
    this.moveCallback = (emitter, event)=>{
      this.moved(emitter.getCanvas(),emitter)
    }
  },


  /**
   * 
   * Called by the host if the policy has been installed.
   *
   * @param {draw2d.Canvas|draw2d.Figure} host
   */
  onInstall: function (host) {
    this._super(host)
    host.on("move",this.moveCallback)
  },

  /**
   * 
   * Called by the host if the policy has been uninstalled.
   *
   * @param {draw2d.Canvas|draw2d.Figure} host
   */
  onUninstall: function (host) {
    this._super(host)
    host.off(this.moveCallback)
  },

  /**
   * 
   * Called by the framework if the related shape has init a drag&drop
   * operation
   *
   * The Policy can send a veto to prevent the DragDrop operation
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @return {Boolean} return <b>false</b> to send a veto to the drag operation
   */
  onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    figure.shape.attr({cursor: "move"})

    // this happens if you drag&drop the shape outside of the screen and
    // release the mouse button outside the window. We restore the alpha
    // with the next drag&drop operation
    if (figure.isMoving === true) {
      figure.setAlpha(figure.originalAlpha)
    }

    figure.originalAlpha = figure.getAlpha()
    figure.isMoving = false

    // return value since 6.1.0
    return true
  },

  /**
   * 
   * Called by the framework during drag a figure.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @template
   */
  onDrag: function (canvas, figure) {
    // enable the alpha blending of the first real move of the object
    //
    if (figure.isMoving === false) {
      figure.isMoving = true
      figure.setAlpha(figure.originalAlpha * 0.4)
    }
  },

  /**
   * 
   * Called by the framework if the drag drop operation ends.
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @template
   */
  onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
    figure.shape.attr({cursor: "default"})
    figure.isMoving = false
    figure.setAlpha(figure.originalAlpha)
  },

  /**
   * 
   * Adjust the coordinates to the rectangle/region of this constraint.
   *
   * @param {draw2d.Figure} figure
   * @param {Number|draw2d.geo.Point} x
   * @param {Number} [y]
   * @returns {draw2d.geo.Point} the constraint position of the figure
   *
   * @template
   */
  adjustPosition: function (figure, x, y) {
    // do nothing per default implementation
    if (x instanceof draw2d.geo.Point) {
      return x
    }

    return new draw2d.geo.Point(x, y)
  },

  /**
   * 
   * ensure that the dimension didn't goes outside the given restrictions
   *
   * @param {draw2d.Figure} figure
   * @param {Number} w
   * @param {number} h
   * @returns {draw2d.geo.Rectangle} the constraint position of the figure
   */
  adjustDimension: function (figure, w, h) {
    return new draw2d.geo.Rectangle(0, 0, w, h)
  },

  /**
   * 
   * Callback if the figure has moved
   *
   * @param {draw2d.Canvas} canvas The host canvas
   * @param {draw2d.Figure} figure The related figure
   *
   * @template
   */
  moved: function (canvas, figure) {
  }
})
