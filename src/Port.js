import draw2d from 'packages'
import extend from "./util/extend";


/**
 * @class
 *  A port is an object that is used to establish a connection between a node and a {@link draw2d.Connection}. The port can
 * be placed anywhere within a node ( see {@link draw2d.layout.locator.PortLocator} for details)
 *
 *
 * @author Andreas Herz
 * @param {Object} [attr] the configuration of the shape
 * @extends draw2d.shape.basic.Circle
 */

draw2d.Port = draw2d.shape.basic.Circle.extend(
  /** @lends draw2d.Port.prototype */
  {

  NAME: "draw2d.Port",

  DEFAULT_BORDER_COLOR: new draw2d.util.Color("#1B1B1B"),

  init: function (attr, setter, getter) {
    this.locator = null
    this.lighterBgColor = null
    this.name = null

    this._super(extend({
        bgColor: "#4f6870",
        stroke: 1,
        diameter: 10,
        color: "#1B1B1B",
        selectable: false
      }, attr),
      extend({
        semanticGroup : this.setSemanticGroup
      },setter),
      extend({
        semanticGroup : this.getSemanticGroup
      },getter))


    // status vars for user interaction
    //
    this.ox = this.x
    this.oy = this.y
    this.coronaWidth = 5 // the corona width for the hitTest method. Useful during drag&drop of ports. Better SnapTo behavior.
    this.corona = null // draw2d.shape.basic.Circle
    this.useGradient = true

    this.preferredConnectionDirection = null

    // current attached connections
    this.connections = new draw2d.util.ArrayList()


    this.moveListener = (emitter, event) =>{
      this.repaint()
      // Falls sich der parent bewegt hat, dann muss der Port dies seinen
      // Connections mitteilen
      this.fireEvent("move", {figure: this, dx: 0, dy: 0})
    }

    this.connectionAnchor = new draw2d.layout.anchor.ConnectionAnchor(this)

    // for dynamic diagrams. A Port can have a value which is set by a connector
    //
    this.value = null
    this.maxFanOut = Number.MAX_SAFE_INTEGER

    // semantic group. Only ports in the same semantic group can be connected
    //
    this.semanticGroup = "global"

    this.setCanSnapToHelper(false)

    // uninstall all default selection policies. This is not required for Ports
    this.editPolicy.each( (i, policy) => this.uninstallEditPolicy(policy))

    this.installEditPolicy(new draw2d.policy.port.IntrusivePortsFeedbackPolicy())
    // this.installEditPolicy(new draw2d.policy.port.ElasticStrapFeedbackPolicy());

    // a port handles the selection handling always by its own regardless if
    // the port is part of an composite, node, group or whatever.
    this.portSelectionAdapter = () => this
  },

  getSelectionAdapter: function () {
    return this.portSelectionAdapter
  },

  /**
   * 
   * set the maximal possible count of connections for this port.<br>
   * This method din't delete any connection if you reduce the number and a bunch of
   * connection are bounded already.
   *
   * @param {Number} count the maximal number of connection related to this port
   * @returns {this}
   */
  setMaxFanOut: function (count) {
    this.maxFanOut = Math.max(1, count)
    this.fireEvent("change:maxFanOut", {value: this.maxFanOut})

    return this
  },

  /**
   * 
   * return the maximal possible connections (in+out) for this port.
   *
   * @returns {Number}
   */
  getMaxFanOut: function () {
    return this.maxFanOut
  },

    /**
     *
     * Set the semantic group of this port. Only ports in the same semantic group
     * can be connected.
     *
     * The default for all ports is "global"
     *
     * @param {String} group the semantic group of this port
     * @returns {this}
     */
    setSemanticGroup: function (group) {
      this.semanticGroup = group
      this.fireEvent("change:semanticGroup", {value: this.semanticGroup})

      return this
    },

    /**
     *
     * Get the semantic group of this port. Only ports in the same semantic group
     * can be connected.
     *
     * The default for all ports is "global"
     *
     * @returns {String}
     */
    getSemanticGroup: function () {
      return this.semanticGroup
    },

  /**
   * 
   * Set the Anchor for this object. An anchor is responsible for the endpoint calculation
   * of an connection. just visible representation.
   *
   * @param {draw2d.layout.anchor.ConnectionAnchor} [anchor] the new source anchor for the connection or "null" to use the default anchor.
   * @returns {this}
   **/
  setConnectionAnchor: function (anchor) {
    // set some good defaults.
    if (typeof anchor === "undefined" || anchor === null) {
      anchor = new draw2d.layout.anchor.ConnectionAnchor()
    }

    this.connectionAnchor = anchor
    this.connectionAnchor.setOwner(this)

    // the anchor has changed. In this case all connections needs an change event to recalculate
    // the anchor and the routing itself
    this.fireEvent("move", {figure: this, dx: 0, dy: 0})

    return this
  },

  getConnectionAnchorLocation: function (referencePoint, inquiringConnection) {
    return this.connectionAnchor.getLocation(referencePoint, inquiringConnection)
  },

  getConnectionAnchorReferencePoint: function (inquiringConnection) {
    return this.connectionAnchor.getReferencePoint(inquiringConnection)
  },


  /**
   * 
   * Returns the **direction** for the connection in relation to the given port and it's parent.
   *
   * <p>
   * Possible values:
   * <ul>
   *   <li>draw2d.geo.Rectangle.DIRECTION_UP</li>
   *   <li>draw2d.geo.Rectangle.DIRECTION_RIGHT</li>
   *   <li>draw2d.geo.Rectangle.DIRECTION_DOWN</li>
   *   <li>draw2d.geo.Rectangle.DIRECTION_LEFT</li>
   * </ul>
   * <p>
   *
   * @param {draw2d.Port} peerPort the counterpart port
   *
   * @returns {Number} the direction.
   */
  getConnectionDirection: function (peerPort) {
    // return the calculated connection direction if the port didn't have set any
    //
    if (typeof this.preferredConnectionDirection === "undefined" || this.preferredConnectionDirection === null) {
      return this.getParent().getBoundingBox().getDirection(this.getAbsolutePosition())
    }

    return this.preferredConnectionDirection
  },


  /**
   * 
   * Set the **direction** for the connection in relation to the given port and it's parent.
   *
   * <p>
   * Possible values:
   * <ul>
   *   <li>up -&gt; 0</li>
   *   <li>right -&gt; 1</li>
   *   <li>down -&gt; 2</li>
   *   <li>left -&gt; 3</li>
   *   <li>calculated -&gt; null</li>
   * </ul>
   * <p>
   *
   * @since 5.2.1
   * @param {Number} direction the preferred connection direction.
   * @returns {this}
   */
  setConnectionDirection: function (direction) {
    this.preferredConnectionDirection = direction

    // needs an change event to recalculate the route
    this.fireEvent("move", {figure: this, dx: 0, dy: 0})

    return this
  },

  /**
   * 
   * Set the locator/layouter of the port. A locator is responsive for the x/y arrangement of the
   * port in relation to the parent node.
   *
   * @param {draw2d.layout.locator.Locator} locator
   * @returns {this}
   */
  setLocator: function (locator) {
    this.locator = locator

    return this
  },

  /**
   * 
   * Get the locator/layouter of the port. A locator is responsive for the x/y arrangement of the
   * port in relation to the parent node.
   *
   * @since 4.2.0
   */
  getLocator: function () {
    return this.locator
  },


  /**
   * 
   * Set the new background color of the figure. It is possible to hands over
   * <code>null</code> to set the background transparent.
   *
   * @param {draw2d.util.Color|String} color The new background color of the figure
   * @returns {this}
   **/
  setBackgroundColor: function (color) {
    this._super(color)
    this.lighterBgColor = this.bgColor.lighter(0.3).rgba()

    return this
  },

  /**
   * 
   * Set a value for the port. This is useful for interactive/dynamic diagrams like circuits, simulator,...
   *
   * @param {Object} value the new value for the port
   * @returns {this}
   */
  setValue: function (value) {

    if(value===this.value){
      return this
    }
    let old = this.value
    this.value = value
    if (this.getParent() !== null) {
      this.getParent().onPortValueChanged(this)
    }
    this.fireEvent("change:value", {value: this.value, old: old})

    return this
  },

  /**
   * 
   * Return the user defined value of the port.
   *
   * @returns {Object}
   */
  getValue: function () {
    return this.value
  },

  /**
   * @private
   */
  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return
    }

    attributes = attributes || {}


    // a port did have the 0/0 coordinate in the center and not in the top/left corner
    //
    attributes.cx = this.getAbsoluteX()
    attributes.cy = this.getAbsoluteY()
    attributes.rx = this.width / 2
    attributes.ry = attributes.rx
    attributes.cursor = "move"

    if (this.getAlpha() < 0.9 || this.useGradient === false) {
      attributes.fill = this.bgColor.rgba()
    }
    else {
      attributes.fill = ["90", this.bgColor.hash(), this.lighterBgColor].join("-")
    }

    this._super(attributes)
  },


  /**
   * @inheritdoc
   *
   **/
  onMouseEnter: function () {
    this._oldstroke = this.getStroke()
    this.setStroke(2)
  },


  /**
   * @inheritdoc
   *
   **/
  onMouseLeave: function () {
    this.setStroke(this._oldstroke)
  },


  /**
   * 
   * Returns a {@link draw2d.util.ArrayList} of {@link draw2d.Connection}s of all related connections to this port.
   *
   * @returns {draw2d.util.ArrayList}
   **/
  getConnections: function () {
    return this.connections
  },


  /**
   * @private
   */
  setParent: function (parent) {
    if (this.parent !== null) {
      this.parent.off(this.moveListener)
    }

    this._super(parent)

    if (this.parent !== null) {
      this.parent.on("move", this.moveListener)
    }
  },


  /**
   * 
   * Returns the corona width of the Port. The corona width will be used during the
   * drag&drop of a port.
   *
   * @returns {Number}
   **/
  getCoronaWidth: function () {
    return this.coronaWidth
  },


  /**
   * 
   * Set the corona width of the Port. The corona width will be used during the
   * drag&drop of a port. You can drop a port in the corona of this port to create
   * a connection. It is not neccessary to drop exactly on the port.
   *
   * @param {Number} width The new corona width of the port
   * @returns {this}
   **/
  setCoronaWidth: function (width) {
    this.coronaWidth = width
    
    return this
  },

  /**
   * @inheritdoc
   *
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @returns {Boolean}
   * @private
   **/
  onDragStart: function (x, y, shiftKey, ctrlKey) {
    // just allow the DragOperation if the port didn't have reached the max fanOut
    // limit.
    if (this.getConnections().getSize() >= this.maxFanOut) {
      return false
    }

    let _this = this

//        this.getShapeElement().insertAfter(this.parent.getShapeElement());
    // don't call the super method. This creates a command and this is not necessary for a port
    this.ox = this.x
    this.oy = this.y

    let canStartDrag = true

    // notify all installed policies
    //
    this.editPolicy.each(function (i, e) {
      if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
        // DragStart operation can send a veto for the dragStart
        // @since 6.1.0
        canStartDrag = canStartDrag && e.onDragStart(_this.canvas, _this, x, y, shiftKey, ctrlKey)
      }
    })

    return canStartDrag
  },

  /**
   * @inheritdoc
   *
   * @param {Number} dx the x difference between the start of the drag drop operation and now
   * @param {Number} dy the y difference between the start of the drag drop operation and now
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   *
   * @private
   **/
  onDrag: function (dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    // TODO: warum wurde diese methode überschrieben?!
    this._super(dx, dy)
  },


  /**
   * @param {Number} x the x-coordinate of the mouse event
   * @param {Number} y the y-coordinate of the mouse event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @private
   **/
  onDragEnd: function (x, y, shiftKey, ctrlKey) {
    // Don't call the parent implementation. This will create an CommandMove object
    // and store them o the CommandStack for the undo operation. This makes no sense for a
    // port.
    // draw2d.shape.basic.Rectangle.prototype.onDragEnd.call(this); DON'T call the super implementation!!!

    this.setAlpha(1.0)

    // 1.) Restore the old Position of the node
    //
    this.setPosition(this.ox, this.oy)
  },


  /**
   * 
   * Called if the user drop this element onto the dropTarget
   *
   * @param {draw2d.Figure} dropTarget The drop target.
   * @param {Number} x the x-coordinate of the mouse up event
   * @param {Number} y the y-coordinate of the mouse up event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   * @@private
   **/
  onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
  },


  /**
   * 
   * Callback method if a new connection has created with this port
   *
   *     // Alternatively you register for this event with:
   *     port.on("connect", function(emitterPort, connection){
   *         alert("port connected");
   *     });
   *
   * @param {draw2d.Connection} connection The connection which has been created
   * @since 2.5.1
   *
   * @template
   **/
  onConnect: function (connection) {
  },

  /**
   * 
   * Callback method if a new connection has created with this port
   *
   *     // Alternatively you register for this event with:
   *     port.on("connect", function(emitterPort, connection){
   *         alert("port disconnected");
   *     });
   *
   * @param {draw2d.Connection} connection The connection which has been deleted
   * @since 2.5.1
   *
   * @template
   **/
  onDisconnect: function (connection) {
  },


  /**
   * 
   * Return the name of this port.
   *
   * @returns {String}
   **/
  getName: function () {
    return this.name
  },

  /**
   * 
   * Set the name of this port. The name of the port can be referenced by the lookup of
   * ports in the node.
   *
   *
   * @param {String} name The new name of this port.
   * @returns {this}
   **/
  setName: function (name) {
    this.name = name

    return this
  },


  /**
   * 
   * Hit test for ports. This method respect the corona diameter of the port for the hit test.
   * The corona width can be set with {@link draw2d.Port#setCoronaWidth}
   *
   * @param {Number} iX
   * @param {Number} iY
   * @param {Number} [corona]
   * @returns {Boolean}
   */
  hitTest: function (iX, iY, corona) {
    let x = this.getAbsoluteX() - this.coronaWidth - this.getWidth() / 2
    let y = this.getAbsoluteY() - this.coronaWidth - this.getHeight() / 2
    let iX2 = x + this.getWidth() + (this.coronaWidth * 2)
    let iY2 = y + this.getHeight() + (this.coronaWidth * 2)

    return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2)
  },

  /**
   * 
   * Highlight this port
   *
   * @param {Boolean} flag indicator if the figure should glow.
   * @returns {this}
   */
  setGlow: function (flag) {
    if (flag === true && this.corona === null) {
      this.corona = new draw2d.Corona()
      this.corona.setDimension(this.getWidth() + (this.getCoronaWidth() * 2), this.getWidth() + (this.getCoronaWidth() * 2))
      this.corona.setPosition(this.getAbsoluteX() - this.getCoronaWidth() - this.getWidth() / 2, this.getAbsoluteY() - this.getCoronaWidth() - this.getHeight() / 2)

      this.corona.setCanvas(this.getCanvas())

      // important inital
      this.corona.getShapeElement()
      this.corona.repaint()
    }
    else if (flag === false && this.corona !== null) {
      this.corona.setCanvas(null)
      this.corona = null
    }

    return this
  },

  /**
   * @inheritdoc
   */
  createCommand: function (request) {
    // the port has its own implementation of the CommandMove
    //
    if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
      if (!this.isDraggable()) {
        return null
      }
      return new draw2d.command.CommandMovePort(this)
    }

    return null
  },


  /**
   * 
   * Called from the figure itself when any position changes happens. All listener
   * will be informed.
   * <br>
   * DON'T fire this event if the Port is during a Drag&Drop operation. This can happen
   * if we try to connect two ports
   *
   * @private
   **/
  fireEvent: function (event, args) {
    if (this.isInDragDrop === true && event !== "drag") {
      return
    }

    this._super(event, args)
  },

  /**
   * 
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @return {Object} all attributes required for the persistency
   */
  getPersistentAttributes: function () {
    let memento = this._super()

    memento.maxFanOut = this.maxFanOut
    memento.name = this.name
    memento.semanticGroup = this.semanticGroup

    // defined by the locator. Don't persist
    //
    delete memento.x
    delete memento.y

    // ports didn't have children ports. In this case we
    // delete this attribute as well to avoid confusions.
    //
    delete memento.ports

    return memento
  },

  /**
   * 
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns {this}
   */
  setPersistentAttributes: function (memento) {
    this._super(memento)

    if (typeof memento.maxFanOut !== "undefined") {
      // Big bug in the past.
      // I used Number.MAX_VALUE as maxFanOut which is 1.7976931348623157e+308
      // parseInt creates "1" during the reading of the JSON - which is crap.
      // BIG BIG BUG!!! my fault.
      // Now check if the memento.maxFanOut is a number and take this without crappy parsing.
      if (typeof memento.maxFanOut === "number") {
        this.maxFanOut = memento.maxFanOut
      }
      else {
        this.maxFanOut = Math.max(1, parseInt(memento.maxFanOut))
      }
    }

    if (typeof memento.name !== "undefined") {
      this.setName(memento.name)
    }

    if (typeof memento.semanticGroup !== "undefined") {
      this.setSemanticGroup(memento.semanticGroup)
    }

    return this
  }
})


/**
 * @class
 * Glow effect for ports. Just for internal use.
 *
 * @private
 * @extend draw2d.shape.basic.Circle
 */
draw2d.Corona = draw2d.shape.basic.Circle.extend(
  /** @lends draw2d.shape.basic.Circle.prototype */
  {

  init: function () {
    this._super()
    this.setAlpha(0.3)
    this.setBackgroundColor(new draw2d.util.Color(178, 225, 255))
    this.setColor(new draw2d.util.Color(102, 182, 252))
  },

  /**
   * 
   * the the opacity of the element.
   *
   * @param {Number} percent
   */
  setAlpha: function (percent) {
    this._super(Math.min(0.3, percent))
    this.setDeleteable(false)
    this.setDraggable(false)
    this.setResizeable(false)
    this.setSelectable(false)

    return this
  }
})
