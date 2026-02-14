import draw2d from '../../packages'


/**
 * @class
 *
 * A Jailhouse is a figure that acts as a container for other figures. A Jailhouse
 * is a StrongComposite node that controls a set of child figures. Child nodes can't
 * moved outside of the composite.<br>
 * Objects in a jailhouse have the same Z-order, which can be relatively controlled with
 * respect to other figures.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.StrongComposite
 * @since 4.8.0
 */
draw2d.shape.composite.Jailhouse = draw2d.shape.composite.StrongComposite.extend(
  /** @lends draw2d.shape.composite.Jailhouse.prototype */
  {

    NAME: "draw2d.shape.composite.Jailhouse",

    /**
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
      this.policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 10, 10)
      this._super( {bgColor: "#f0f0f0", color: "#333333", ...attr}, setter, getter)

      this.stickFigures = false
    },

    /**
     *
     * Set the new width and height of the figure and update the constraint policy for the assigned
     * figures..
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension: function (w, h) {
      this._super(w, h)
      this.policy.setBoundingBox(this.getAbsoluteBounds())
    },


    /**
     *
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
      let oldX = this.x
      let oldY = this.y


      this._super(x, y)

      let dx = this.x - oldX
      let dy = this.y - oldY

      if (dx === 0 && dy === 0) {
        return this
      }
      this.policy.getBoundingBox().setPosition(x,y)

      if (this.stickFigures === false) {
        this.assignedFigures.each(function (i, figure) {
          figure.translate(dx, dy)
        })
      }

      return this
    },

    /**
     *
     * Assign a figure to the given group.
     * The bounding box of the group is recalculated and the union of the current bounding box with the
     * figure bounding box.
     *
     * @param {draw2d.Figure} figure
     */
    assignFigure: function (figure) {
      if (!this.assignedFigures.contains(figure) && figure !== this) {
        this.stickFigures = true
        this.setBoundingBox(this.getBoundingBox().merge(figure.getBoundingBox()))
        this.assignedFigures.add(figure)
        figure.setComposite(this)
        figure.installEditPolicy(this.policy)
        figure.toFront(this)
        this.stickFigures = false
      }
      return this
    },

    getAssignedFigures: function () {
      return this.assignedFigures
    },

    /**
     *
     * Remove the given figure from the group assignment
     *
     * @param {draw2d.Figure} figure the figure to remove
     *
     */
    unassignFigure: function (figure) {
      if (this.assignedFigures.contains(figure)) {
        this.stickFigures = true
        figure.setComposite(null)
        figure.uninstallEditPolicy(this.policy)
        this.assignedFigures.remove(figure)
        if (!this.assignedFigures.isEmpty()) {
          let box = this.assignedFigures.first().getBoundingBox()
          this.assignedFigures.each(function (i, figure) {
            box.merge(figure.getBoundingBox())
          })
          this.setBoundingBox(box)
        }
        this.stickFigures = false
      }

      return this
    },

    onCatch: function (droppedFigure, x, y, shiftKey, ctrlKey) {
      this.getCanvas().getCommandStack().execute(new draw2d.command.CommandAssignFigure(droppedFigure, this))
    },


    /**
     *
     * Return the minWidth of the jailhouse. The minWidth is calculated by care the assigned figures.
     *
     * @returns {Number} the minimum width for the figure
     */
    getMinWidth: function () {
      let width = 0
      this.assignedFigures.each(function (i, figure) {
        width = Math.max(width, figure.getBoundingBox().getRight())
      })
      return width - this.getAbsoluteX()
    },

    /**
     *
     * @returns {Number} the minimum height of the figure
     */
    getMinHeight: function () {
      let height = 0
      this.assignedFigures.each(function (i, figure) {
        height = Math.max(height, figure.getBoundingBox().getBottom())
      })
      return height - this.getAbsoluteY()
    }
  })






