import draw2d from '../../packages'
import Color from '../../util/Color'


/**
 * @class
 *
 * A hub is a shape with a special kind of port handling. The hole figure is a hybrid port. You can drag&drop a Port directly on
 * the figure.
 *
 *
 * @example
 *
 *
 *    canvas.add(new draw2d.shape.node.Start({x:50, y:50}));
 *    canvas.add(new draw2d.shape.node.Hub({x:150, y:50}));
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.Hub = draw2d.shape.basic.Rectangle.extend(
  /** @lends draw2d.shape.node.Hub.prototype */
  {

    NAME: "draw2d.shape.node.Hub",

    DEFAULT_COLOR: new Color("#4DF0FE"),
    BACKGROUND_COLOR: new Color("#29AA77"),
    IS_HUB: true,

    /**
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
      this.label = null

      this._super(
        {
          color: this.DEFAULT_COLOR.darker(), 
          bgColor: this.BACKGROUND_COLOR, 
          ...attr
        },
        extend({
          // deprecated
          label: this.setLabel,
          // @attr {String} text the text to display in the center of the hub */
          text: this.setLabel
        }, setter),
        extend({
          label: this.getLabel,
          text: this.getLabel
        }, getter))

      let _port = this.port = this.createPort("hybrid", new draw2d.layout.locator.CenterLocator())

      let r = draw2d.geo.Rectangle
      this.CONNECTION_DIR_STRATEGY = [
        function (peerPort) {
          return _port.getParent().getBoundingBox().getDirection(peerPort.getAbsolutePosition())
        },
        function (peerPort) {
          return _port.getAbsoluteY() > peerPort.getAbsoluteY() ? r.DIRECTION_UP : r.DIRECTION_DOWN
        },
        function (peerPort) {
          return _port.getAbsoluteX() > peerPort.getAbsoluteX() ? r.DIRECTION_LEFT : r.DIRECTION_RIGHT
        }]

      // redirect the glow effect and the hitTest for the port to the parent node
      //
      this.port.setGlow = this.setGlow.bind(this)
      this.port._orig_hitTest = this.port.hitTest
      this.port.hitTest = this.hitTest.bind(this)


      // provide a special connection anchor for this port. We use the bounding box of the
      // parent as connection border
      //
      this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port))
      this.port.setVisible(false)
      this.port.setVisible = function () {
      }

      this.setConnectionDirStrategy(0)
    },

    /**
     *
     * Called by the framework during drag&drop operations if the user drag a figure over this figure
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @returns {draw2d.Figure} the figure which should receive the drop event or null if the element didn't want a drop event
     **/
    delegateTarget: function (draggedFigure) {
      // redirect the dragEnter handling to the hybrid port
      //
      return this.getHybridPort(0).delegateTarget(draggedFigure)
    },


    /**
     *
     * This value is relevant for the interactive resize of the figure.
     *
     * @returns {Number} Returns the min. width of this object.
     */
    getMinWidth: function () {
      if (this.label !== null) {
        return Math.max(this.label.getMinWidth(), this._super())
      }
      return this._super()
    },


    /**
     * @inheritdoc
     *
     * @private
     */
    repaint: function (attributes) {
      if (this.repaintBlocked === true || this.shape === null) {
        return
      }

      attributes ??= {}

      // set some good defaults if the parent didn't
      if (typeof attributes.fill === "undefined") {
        if (this.bgColor !== null) {
          attributes.fill = "90-" + this.bgColor.hash() + ":5-" + this.bgColor.lighter(0.3).hash() + ":95"
        } else {
          attributes.fill = "none"
        }
      }

      this._super(attributes)
    },

    /**
     *
     * Set the label for the Hub
     *
     *     // Alternatively you can use the attr method:
     *     figure.attr({
     *       text: label
     *     });
     *
     *
     * @param {String} label
     * @since 3.0.4
     */
    setLabel: function (label) {
      // Create any Draw2D figure as decoration for the connection
      //
      if (this.label === null) {

        this.label = new draw2d.shape.basic.Label({text: label, color: "#0d0d0d", fontColor: "#0d0d0d", stroke: 0})
        // add the new decoration to the connection with a position locator.
        //
        this.add(this.label, new draw2d.layout.locator.CenterLocator())
        this.label.setSelectionAdapter( () => this )
        this.label.delegateTarget = () => this.port
      } else {
        this.label.setText(label)
      }
    },

    /**
     *
     * Set the strategy for the connection direction calculation.<br>
     * <br>
     *
     * <ul>
     * <li>0 - Use the best/shortest direction (UP/RIGHT/DOWN/LEFT) for the connection routing (default)</li>
     * <li>1 - Use UP/DOWN for the connection direction</li>
     * <li>2 - Use LEFT/RIGHT</li>
     * </ul>
     * @param {Number} strategy the connection routing strategy to use
     * @since 2.4.3
     */
    setConnectionDirStrategy: function (strategy) {
      switch (strategy) {
        case 0:
        case 1:
        case 2:
          this.port.getConnectionDirection = this.CONNECTION_DIR_STRATEGY[strategy]
          break
      }
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
      let memento = this._super()

      memento.dirStrategy = this.CONNECTION_DIR_STRATEGY.indexOf(this.port.getConnectionDirection)
      if (this.label !== null) {
        memento.label = this.label.getText()
      }

      return memento
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
      this._super(memento)

      if (typeof memento.dirStrategy === "number") {
        this.setConnectionDirStrategy(memento.dirStrategy)
      }

      if (typeof memento.label !== "undefined") {
        this.setLabel(memento.label)
      }
    }

  })
