import draw2d from '../../packages'


/**
 * A collapsible Jailhouse container that can expand/collapse to show/hide assigned child figures.
 * 
 * When collapsed:
 * - Children are hidden but their ports remain visible at the container edges
 * - Connections between internal children are hidden
 * - Only external connections (to figures outside the container) remain visible
 * - Container shrinks to a compact size showing only collapse/expand controls
 * 
 * When expanded:
 * - All children and connections are visible
 * - Container returns to its original dimensions
 * - Full interaction with children is restored
 * 
 * @class
 * @extends draw2d.shape.composite.Jailhouse
 * 
 * @example
 * let container = new draw2d.shape.composite.CollapsibleJailhouse({
 *   x: 100,
 *   y: 100,
 *   width: 300,
 *   height: 200
 * });
 * canvas.add(container);
 * 
 * // Add some figures to the container
 * let node1 = new draw2d.shape.node.Between();
 * let node2 = new draw2d.shape.node.Between();
 * canvas.add(node1, 150, 150);
 * canvas.add(node2, 250, 150);
 * 
 * // Figures become children of the container automatically when dragged onto it
 * 
 * @author Andreas Herz
 * @since 7.0.0
 */
draw2d.shape.composite.CollapsibleJailhouse = draw2d.shape.composite.Jailhouse.extend(
  /** @lends draw2d.shape.composite.CollapsibleJailhouse.prototype */
  {

    NAME: "draw2d.shape.composite.CollapsibleJailhouse",

    /**
     * Creates a new CollapsibleJailhouse instance.
     * 
     * @param {Object} [attr] Configuration attributes
     * @param {Number} [attr.stroke=1] Border width in pixels
     * @param {Number} [attr.radius=4] Corner radius in pixels
     * @param {String} [attr.color="#1E88E5"] Border color
     * @param {String} [attr.bgColor="#BBDEFB"] Background color
     * @param {Function} [setter] Optional setter function
     * @param {Function} [getter] Optional getter function
     */
    init: function (attr, setter, getter) {
      this._super({stroke: 1, radius: 4, color: "#1E88E5", bgColor: "#BBDEFB", ...attr}, setter, getter)

      this.expanded = true
      this.collapsedWidth = 90
      this.collapsedHeight = 20

      let absoluteLocator = new draw2d.layout.locator.XYAbsPortLocator({x: 3, y: 3})

      let collapseIcon = new draw2d.shape.icon.Contract({width: 15, height: 15})
      let expandIcon = new draw2d.shape.icon.Expand({width: 15, height: 15, visible: false})

      collapseIcon.addCssClass("cursor")
      expandIcon.addCssClass("cursor")

      this.add(collapseIcon, absoluteLocator)
      this.add(expandIcon, absoluteLocator)

      let toggle = () => {
        this.expanded = !this.expanded

        collapseIcon.setVisible(this.expanded)
        expandIcon.setVisible(!this.expanded)

        if (this.expanded) {
          this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
          this.assignedFigures.each((i, child) => {
            child.setVisible(true)
            child.installEditPolicy(this.policy)
            child.getPorts().each((i, port) => {
              port.setLocator(port._originalLocator)
              port.setConnectionDirection(port._originalDirection)
              port.getConnections().each((i, conn) => {
                conn.setVisible(true)
              })
            })
            child.portRelayoutRequired = true
            child.layoutPorts()
          })
          this.attr(this.oldDim)
        }
        else {
          this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())
          this.oldDim = {width: this.getWidth(), height: this.getHeight()}
          this.assignedFigures.each((i, child) => {
            // offset of the child and jailhouse shape
            let offset = child.getAbsolutePosition().subtract(this.getAbsolutePosition())
            child.setVisible(false)
            child.uninstallEditPolicy(this.policy)
            child.getPorts().each((i, port) => {
              port._originalLocator = port.getLocator()
              // store the applied connection direction (if this used)
              port._originalDirection = port.preferredConnectionDirection
              // and force the current calculated direction
              port.setConnectionDirection(port.getConnectionDirection())
              if (port.getConnectionDirection() === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
                port.setLocator({
                  relocate: (index, figure) => {
                    figure.setPosition(-offset.x + this.collapsedWidth + 1, -offset.y + this.collapsedHeight / 2)
                  },
                })
              }
              else {
                port.setLocator({
                  relocate: (index, figure) => {
                    figure.setPosition(-offset.x - 1, -offset.y + this.collapsedHeight / 2)
                  },
                })
              }
              port.getConnections().each((i, conn) => {
                let source = conn.getSource().getParent()
                let target = conn.getTarget().getParent()
                conn.setVisible(source.getComposite() !== target.getComposite())
              })
            })
            child.portRelayoutRequired = true
            child.layoutPorts()
          })
          this.attr({boundingBox: {x: this.getX(), y: this.getY(), width: this.collapsedWidth, height: this.collapsedHeight}})
        }
      }

      collapseIcon.on("click", toggle)
      expandIcon.on("click", toggle)
    },

    /**
     * Assigns a figure to this Jailhouse container. Once assigned, the figure moves with the container
     * and cannot be dragged out (hence "Jailhouse"). Connections are rejected as they cannot be
     * children of composites.
     * 
     * @param {draw2d.Figure} figure The figure to assign to this container
     * @returns {draw2d.shape.composite.CollapsibleJailhouse} this instance for method chaining
     */
    assignFigure: function (figure) {
      // Connections can never be children of a composite - reject silently
      if (figure instanceof draw2d.Connection)
        return

      this._super(figure)

      // Ensure ports and their connections are rendered on top
      figure.getPorts().each((i, port) => {
        port.toFront()
        port.getConnections().each((i, connection) => {
          connection.toFront()
        })
      })

      return this
    },

    /**
     * Return the minWidth of the jailhouse. The minWidth is calculated by care the assigned figures.
     *
     * @returns {Number} the minimum width for the figure
     */
    getMinWidth: function () {
      let width = 0
      this.assignedFigures.each(function (i, figure) {
        if (figure.isVisible()) {
          width = Math.max(width, figure.getBoundingBox().getRight())
        }
      })
      return width - this.getAbsoluteX()
    },

    /**
     * Return the minimum height of the figure
     *
     * @returns {Number} the minimum height of the figure
     */
    getMinHeight: function () {
      let height = 0
      this.assignedFigures.each(function (i, figure) {
        if (figure.isVisible()) {
          height = Math.max(height, figure.getBoundingBox().getBottom())
        }
      })
      return height - this.getAbsoluteY()
    }
  })