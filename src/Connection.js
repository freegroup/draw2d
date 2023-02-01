import draw2d from 'packages'

/**
 * @class
 *
 * Connections figures are used to display a line between two points. The Connection interface extends
 * {@link draw2d.shape.basic.PolyLine PolyLine}.<br>
 * The source and target endpoints of a connection are each defined using a {@link draw2d.layout.anchor.ConnectionAnchor ConnectionAnchor}.
 * These endpoints, along with any other points on the connection, are set by the connection's  {@link draw2d.layout.connection.ConnectionRouter ConnectionRouter}.
 * <br>
 * Usually every connection in a drawing has the same router instance. Connections with
 * common endpoints can share anchor instances as well.
 *
 * <h2>Connection Usage</h2>
 *
 * Connections are created and added just like any other figure. Unlike normal figures, you must not set the
 * bounds of a connection. Instead, you must provide the source and target port and let the connection router
 * calculate the connection's points. The connection then determines its own bounding box.<br>
 * <br>
 * A connection has a simple router by default - one that can connect the source and target anchors. But additional routers
 * are available and can be set on the connection. Some routers can handle constraints for the connection. Note that when
 * setting a routing constraint on a connection, you must first set the router which will use that constraint.<br>
 * <br>
 *
 * <b>TODO:<br></b>
 * <i>
 * A convenient way to share the router with all connections and to place connections above the drawing is to use a
 * ConnectionLayer. The layer has a connection router property which it shares with every child that's a connection.
 * You can update this property and easily change every connection's router at once.
 * </i>
 * <br>
 * <br>
 * <h2>Routing and Anchors</h2>
 * A connection always has a router and it must set at least two ports on the connection: the source and target
 * endpoints. By default, or when set to null, the connection's routing will be performed by an internal default router.
 * The ends are placed with the help of {@link draw2d.layout.anchor.ConnectionAnchor anchors}. An
 * {@link draw2d.layout.anchor.ConnectionAnchor anchors} is a fixed or calculated location, usually associated with some
 * figure. For example, the {@link draw2d.layout.anchor.ChopboxConnectionAnchor ChopboxAnchor} finds the point at which a
 * line going to the reference point intersects a box, such as the bounds of a figure. The reference point is either
 * the anchor at the opposite end, or a bendpoint or some other point nearest to the anchor.
 * <br>
 * {@img jsdoc_chopbox.gif ChopboxAnchor}
 * <br>
 * The router calculates the endpoints and any other points in the middle of the connection. It then sets the points on the
 * connection by calling {@link draw2d.shape.basic.PolyLine#addPoint Polyline.addPoint}. The connection's existing point list
 * can be reused to reduce garbage, but the points must be set on the connection anyway so that it knows about any changes made.
 * <br>
 * <h2>Adding Decorations and Children to Connections</h2>
 * Like most figures, Connection supports the addition of children. The children might be a label that
 * decorate the connection. The placement of each type of decoration can vary, so a {@link draw2d.layout.locator.ConnectionLocator ConnectionLocator}
 * is used to delegate to each child's constraint object, a Locator. <br>
 * <br>
 * {@link draw2d.decoration.connection.Decorator Decorator} can be used to create and render a rotatable shape at
 * the end or start of a connection like arrows or boxes. Examples are {@link draw2d.decoration.connection.ArrowDecorator ArrowDecorator}, {@link draw2d.decoration.connection.BarDecorator BarDecorator} or {@link draw2d.decoration.connection.CircleDecorator CircleDecorator}
 * <br>
 * <h2>Connection Layout</h2>
 * Connections extend the process of validation and layout to include routing. Since layout is the process of positioning children, routing must
 * come first. This allows a child's locator to operate on the connection's newly-routed points.<br>
 * Check out [Class System Guide](#!/guide/class_system) for additional reading.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.PolyLine
 */

draw2d.Connection = draw2d.shape.basic.PolyLine.extend(
  /** @lends draw2d.Connection.prototype */
  {

    NAME: "draw2d.Connection",

    /**
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
      this.sourcePort = null
      this.targetPort = null

      this.oldPoint = null

      this.sourceDecorator = null
      /*:draw2d.ConnectionDecorator*/
      this.targetDecorator = null
      /*:draw2d.ConnectionDecorator*/

      // decoration of the polyline
      //
      this.sourceDecoratorNode = null
      this.targetDecoratorNode = null

      // helper let to restore the initial visual representation if the user drag&drop
      // the port outside of the browser window. In this case some events get lost and
      // I can restore the initial state of the connection if the mouse comes in the browser window
      // again.
      this.isMoving = false

      this.moveListener = (figure) => {
        if (figure === this.sourcePort) {
          this.setStartPoint(this.sourcePort.getAbsoluteX(), this.sourcePort.getAbsoluteY())
        } else {
          this.setEndPoint(this.targetPort.getAbsoluteX(), this.targetPort.getAbsoluteY())
        }
      }

      this._super(
        {
          color: "#129CE4",
          stroke: 2,
          //    outlineStroke:1,
          //    outlineColor:"#ffffff",
          radius: 3,
          ...attr},
        {
          sourceDecorator: this.setSourceDecorator,
          targetDecorator: this.setTargetDecorator,
          source: this.setSource,
          target: this.setTarget,
          ...setter
       },
        {
          sourceDecorator: this.getSourceDecorator,
          targetDecorator: this.getTargetDecorator,
          source: this.getSource,
          target: this.getTarget,
          ...getter
      })
    },


    /**
     * @private
     **/
    disconnect: function () {
      if (this.sourcePort !== null) {
        this.sourcePort.off(this.moveListener)
        this.sourcePort.connections.remove(this)

        // fire the events to all listener
        this.sourcePort.fireEvent("disconnect", {port: this.sourcePort, connection: this})
        this.canvas?.fireEvent("disconnect", {port: this.sourcePort, connection: this})
        this.sourcePort.onDisconnect(this)

        this.fireSourcePortRouteEvent()
      }

      if (this.targetPort !== null) {
        this.targetPort.off(this.moveListener)
        this.targetPort.connections.remove(this)

        // fire the events to all listener
        this.targetPort.fireEvent("disconnect", {port: this.targetPort, connection: this})
        this.canvas?.fireEvent("disconnect", {port: this.targetPort, connection: this})
        this.targetPort.onDisconnect(this)

        this.fireTargetPortRouteEvent()
      }
    },


    /**
     * @private
     **/
    reconnect: function () {
      if (this.sourcePort !== null) {
        this.sourcePort.on("move", this.moveListener)
        this.sourcePort.connections.add(this)

        // fire the events to all listener
        this.sourcePort.fireEvent("connect", {port: this.sourcePort, connection: this})
        this.canvas?.fireEvent("connect", {port: this.sourcePort, connection: this})
        this.sourcePort.onConnect(this)

        this.fireSourcePortRouteEvent()
      }

      if (this.targetPort !== null) {
        this.targetPort.on("move", this.moveListener)
        this.targetPort.connections.add(this)

        // fire the events to all listener
        this.targetPort.fireEvent("connect", {port: this.targetPort, connection: this})
        this.canvas?.fireEvent("connect", {port: this.targetPort, connection: this})
        this.targetPort.onConnect(this)

        this.fireTargetPortRouteEvent()
      }
      this.routingRequired = true
      this.repaint()
    },


    /**
     * You can't drag&drop the resize handles of a connector.
     *
     * @returns {Boolean}
     **/
    isResizeable: function () {
      return this.isDraggable()
    },


    /**
     *
     * Add a child figure to the Connection. The hands over figure doesn't support drag&drop
     * operations. It's only a decorator for the connection.<br>
     * Mainly for labels or other fancy decorations :-)
     *
     * @param {draw2d.Figure} child the figure to add as decoration to the connection.
     * @param {draw2d.layout.locator.ConnectionLocator} locator the locator for the child.
     * @param {Number} [index] optional index where to insert the figure
     * @returns {this}
     **/
    add: function (child, locator, index) {
      // just to ensure the right interface for the locator.
      // The base class needs only 'draw2d.layout.locator.Locator'.
      if (!(locator instanceof draw2d.layout.locator.ConnectionLocator)) {
        throw "Locator must implement the class draw2d.layout.locator.ConnectionLocator"
      }

      this._super(child, locator, index)
    },


    /**
     *
     * Set the ConnectionDecorator for this object.
     *
     * @param {draw2d.decoration.connection.Decorator} decorator the new source decorator for the connection
     * @returns {this}
     **/
    setSourceDecorator: function (decorator) {

      this.sourceDecorator?.setParent(null)

      this.sourceDecorator = decorator
      this.routingRequired = true
      this.sourceDecorator.setParent(this)

      this.sourceDecoratorNode?.remove()
      this.sourceDecoratorNode = null

      this.repaint()

      return this
    },

    /**
     *
     * Get the current source ConnectionDecorator for this object.
     *
     * @returns draw2d.decoration.connection.Decorator
     **/
    getSourceDecorator: function () {
      return this.sourceDecorator
    },

    /**
     *
     * Set the ConnectionDecorator for this object.
     *
     * @param {draw2d.decoration.connection.Decorator} decorator the new target decorator for the connection
     * @returns {this}
     **/
    setTargetDecorator: function (decorator) {
      this.targetDecorator?.setParent(null)

      this.targetDecorator = decorator
      this.routingRequired = true
      this.targetDecorator.setParent(this)

      this.targetDecoratorNode?.remove()
      this.targetDecoratorNode = null

      this.repaint()

      return this
    },

    /**
     *
     * Get the current target ConnectionDecorator for this object.
     *
     * @returns draw2d.decoration.connection.Decorator
     **/
    getTargetDecorator: function () {
      return this.targetDecorator
    },


    /**
     *
     * Calculate the path of the polyline.
     *
     * @param {Object} routingHints some helper attributes for the router
     * @param {Boolean} routingHints.startMoved is true if just the start location has moved
     * @param {Boolean} routingHints.destMoved is true if the destination location has changed
     * @private
     */
    calculatePath: function (routingHints) {

      if (this.sourcePort === null || this.targetPort === null) {
        return this
      }

      this._super(routingHints)

      if (this.shape !== null) {
        let z1 = this.sourcePort.getZOrder()
        let z2 = this.targetPort.getZOrder()
        this.toBack(z1 < z2 ? this.sourcePort:this.targetPort)
      }

      return this
    },

    /**
     * @private
     **/
    repaint: function (attributes) {
      if (this.repaintBlocked === true || 
          this.shape          === null || 
          this.sourcePort     === null || 
          this.targetPort     === null) {
        return
      }


      this._super(attributes)

      // paint the decorator if any exists
      //
      if (this.targetDecorator !== null && this.targetDecoratorNode === null) {
        this.targetDecoratorNode = this.targetDecorator.paint(this.getCanvas().paper)
      }

      if (this.sourceDecorator !== null && this.sourceDecoratorNode === null) {
        this.sourceDecoratorNode = this.sourceDecorator.paint(this.getCanvas().paper)
      }

      // translate/transform the decorations to the end/start of the connection
      // and rotate them as well
      //
      if (this.sourceDecoratorNode !== null) {
        let start = this.getVertices().first()
        this.sourceDecoratorNode.transform("r" + this.getStartAngle() + "," + start.x + "," + start.y + " t" + start.x + "," + start.y)
        // propagate the color and the opacity to the decoration as well
        this.sourceDecoratorNode.attr({opacity: this.alpha})
        // apply the color of the connection if the decoration doesn't have any
        if (this.sourceDecorator.getColor() === null) {
          this.sourceDecoratorNode.attr({"stroke": "#" + this.lineColor.hex()})
        } else {
          this.sourceDecoratorNode.attr({"stroke": "#" + this.sourceDecorator.getColor().hex()})
        }
        this.sourceDecoratorNode.forEach(shape => {
          shape.node.setAttribute("class", this.cssClass !== null ? this.cssClass : "")
        })
      }

      if (this.targetDecoratorNode !== null) {
        let end = this.getVertices().last()
        this.targetDecoratorNode.transform("r" + this.getEndAngle() + "," + end.x + "," + end.y + " t" + end.x + "," + end.y)
        this.targetDecoratorNode.attr({opacity: this.alpha})
        // apply the color of the connection if the decoration doesn't have any
        if (this.targetDecorator.getColor() === null) {
          this.targetDecoratorNode.attr({stroke: this.lineColor.hash()})
        } else {
          this.targetDecoratorNode.attr({stroke: this.targetDecorator.getColor().hash()})
        }
        this.targetDecoratorNode.forEach(shape => {
          shape.node.setAttribute("class", this.cssClass !== null ? this.cssClass : "")
        })
      }
    },

    /**
     *
     * The x-offset related to the canvas.
     * Didn't provided by a connection. Return always '0'. This is required
     * for children position calculation. (e.g. Label decoration)
     *
     * @returns {Number} the x-offset to the parent figure
     **/
    getAbsoluteX: function () {
      return 0
    },


    /**
     *
     * The y-offset related to the canvas.
     * Didn't provided by a connection. Return always '0'. This is required
     * for children position calculation. (e.g. Label decoration)
     *
     * @returns {Number} The y-offset to the parent figure.
     **/
    getAbsoluteY: function () {
      return 0
    },


    postProcess: function (postProcessCache) {
      this.router.postProcess(this, this.getCanvas(), postProcessCache)
    },


    /**
     *
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     **/
    onDrag: function (dx, dy, dx2, dy2) {
      if (this.command === null) {
        return
      }

      // Delegate the drag&drop operation to the router. The router has
      // all the meta information how to update start/end vertices
      //
      this.router.onDrag(this, dx, dy, dx2, dy2)

      this.command.updateVertices(this.getVertices().clone())

      // notify all installed policies
      //
      this.editPolicy.each( (i, e) =>{
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.onDrag(this.canvas, this)
        }
      })

      this.svgPathString = null
      this.repaint()

      // Update the resize handles if the user change the position of the
      // element via an API call.
      //
      this.editPolicy.each((i, e) =>{
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.moved(this.canvas, this)
        }
      })

      this.fireEvent("move", {figure: this, dx: dx, dy: dx})
    },


    /**
     *
     * Moves the element so it is the closest to the viewer’s eyes, on top of other elements. Additional
     * the internal model changed as well.
     *
     * Optional: Inserts current object in front of the given one.
     *
     * @param {draw2d.Figure} [figure] move current object in front of the given one.
     * @since 3.0.0
     */
    toFront: function (figure) {
      this._super(figure)

      // ensure that the decoration is always in front of the connection
      //
      if (this.shape !== null) {
        this.targetDecoratorNode?.insertAfter(this.shape)
        this.sourceDecoratorNode?.insertAfter(this.shape)
      }

      return this
    },

    /**
     *
     * Moves the element to the background. Additional
     * the internal model changed as well.
     *
     * @param {draw2d.Figure} [figure] move this object behind of the 'figure'.
     * @since 4.7.2
     */
    toBack: function (figure) {
      this._super(figure)

      if (this.shape !== null) {
        this.targetDecoratorNode?.insertAfter(this.shape)
        this.sourceDecoratorNode?.insertAfter(this.shape)
      }

      return this
    },


    /**
     *
     * Return the recalculated position of the start point with the usage of
     * the installed connection anchor locator.
     *
     * @returns {draw2d.geo.Point}
     * @deprecated
     **/
    getStartPoint: function (refPoint) {
      return this.getStartPosition(refPoint)
    },

    getStartPosition: function (refPoint) {
      if (this.isMoving === false) {
        if (refPoint) {
          return this.sourcePort.getConnectionAnchorLocation(refPoint, this)
        }
        return this.sourcePort.getConnectionAnchorLocation(this.targetPort.getConnectionAnchorReferencePoint(this), this)
      }

      return this._super()
    },

    /**
     *
     * Return the recalculated position of the start point with the usage of
     * the installed connection anchor locator.
     *
     * @returns {draw2d.geo.Point}
     * @deprecated
     **/
    getEndPoint: function (refPoint) {
      return this.getEndPosition(refPoint)
    },

    getEndPosition: function (refPoint) {
      if (this.isMoving === false) {
        if (refPoint) {
          return this.targetPort.getConnectionAnchorLocation(refPoint, this)
        }
        return this.targetPort.getConnectionAnchorLocation(this.sourcePort.getConnectionAnchorReferencePoint(this), this)
      }

      return this._super()
    },

    /**
     *
     * Set the new source port of this connection. This enforce a repaint of the connection.
     *
     * @param {draw2d.Port} port The new source port of this connection.
     *
     **/
    setSource: function (port) {
      if (this.sourcePort !== null) {
        this.sourcePort.off(this.moveListener)
        this.sourcePort.connections.remove(this)
        this.sourcePort.fireEvent("disconnect", {port: this.sourcePort, connection: this})
        // it is possible that a connection has already a port but is not assigned to
        // a canvas. In this case we must check if the canvas set correct before we fire this event
        this.canvas?.fireEvent("disconnect", {port: this.sourcePort, connection: this})

        this.sourcePort.onDisconnect(this)
      }

      this.sourcePort = port
      if (this.sourcePort === null) {
        return
      }

      this.routingRequired = true
      this.fireSourcePortRouteEvent()
      this.sourcePort.connections.add(this)
      this.sourcePort.on("move", this.moveListener)

      this.canvas?.fireEvent("connect", {port: this.sourcePort, connection: this})

      this.sourcePort.fireEvent("connect", {port: this.sourcePort, connection: this})
      this.sourcePort.onConnect(this)

      this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY())
      this.fireEvent("connect", {port: this.sourcePort, connection: this})
    },

    /**
     *
     * Returns the source port of this connection.
     *
     * @returns {draw2d.Port}
     **/
    getSource: function () {
      return this.sourcePort
    },

    /**
     *
     * Set the target port of this connection. This enforce a repaint of the connection.
     *
     * @param {draw2d.Port} port The new target port of this connection
     **/
    setTarget: function (port) {
      if (this.targetPort !== null) {
        this.targetPort.off(this.moveListener)
        this.targetPort.connections.remove(this)
        this.targetPort.fireEvent("disconnect", {port: this.targetPort, connection: this})
        // it is possible that a connection has already a port but is not assigned to
        // a canvas. In this case we must check if the canvas set correct before we fire this event
        this.canvas?.fireEvent("disconnect", {port: this.targetPort, connection: this})

        this.targetPort.onDisconnect(this)
      }

      this.targetPort = port
      if (this.targetPort === null) {
        return
      }

      this.routingRequired = true
      this.fireTargetPortRouteEvent()
      this.targetPort.connections.add(this)
      this.targetPort.on("move", this.moveListener)
      this.canvas?.fireEvent("connect", {port: this.targetPort, connection: this})
      this.targetPort.fireEvent("connect", {port: this.targetPort, connection: this})
      this.targetPort.onConnect(this)

      this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY())
      this.fireEvent("connect", {port: this.targetPort, connection: this})
    },

    /**
     *
     * Returns the target port of this connection.
     *
     * @returns {draw2d.Port}
     **/
    getTarget: function () {
      return this.targetPort
    },

    /**
     * Returns the peer port of the connection for a given port or nulll if `port` not part of this connection
     * @param {draw2d.Port} port 
     * @returns  {draw2d.Port}
     */
    getPeerPort: function(port) {
      if(port === this.sourcePort){
        return this.targetPort
      }
      if(port === this.targetPort){
        return this.sourcePort
      }
      return null
    },

    /**
     *
     * Method returns true if the connection has at least one common draw2d.Port with the given connection.
     *
     * @param {draw2d.Connection} other
     *
     * @returns {Boolean}
     */
    sharingPorts: function (other) {
      return this.sourcePort == other.sourcePort ||
             this.sourcePort == other.targetPort ||
             this.targetPort == other.sourcePort ||
             this.targetPort == other.targetPort
    },


    /**
     *
     * Set the canvas element of this figures.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function (canvas) {
      if (this.canvas === canvas) {
        return // nothing to do
      }

      let notiCanvas = this.canvas === null ? canvas : this.canvas

      this._super(canvas)

      this.sourceDecoratorNode?.remove()
      this.sourceDecoratorNode = null

      this.targetDecoratorNode?.remove()
      this.targetDecoratorNode = null

      if (this.canvas === null) {
        if (this.sourcePort !== null) {
          this.sourcePort.off(this.moveListener)
          notiCanvas.fireEvent("disconnect", { port: this.sourcePort, connection: this})
          this.sourcePort.onDisconnect(this)
        }
        if (this.targetPort !== null) {
          this.targetPort.off(this.moveListener)
          notiCanvas.fireEvent("disconnect", { port: this.targetPort, connection: this})
          this.targetPort.onDisconnect(this)
        }
      } else {

        if (this.sourcePort !== null) {
          this.sourcePort.on("move", this.moveListener)
          this.canvas.fireEvent("connect", { port: this.sourcePort, connection: this})
          this.sourcePort.onConnect(this)
        }
        if (this.targetPort !== null) {
          this.targetPort.on("move", this.moveListener)
          this.canvas.fireEvent("connect", { port: this.targetPort, connection: this})
          this.targetPort.onConnect(this)
        }
      }
    },


    /**
     * Returns the angle of the connection at the output port (source)
     *
     **/
    getStartAngle: function () {
      // return a good default value if the connection is not routed at the
      //  moment
      if (this.lineSegments.getSize() === 0) {
        return 0
      }

      let p1 = this.lineSegments.get(0).start
      let p2 = this.lineSegments.get(0).end
      // Since the points are too close to each other in a spline routing, an 
      // angle is obtained which does not correspond to the optical impression. 
      // In this case, a point is taken which is a little further away 
      // from the port....if ppossible
      if (this.router instanceof draw2d.layout.connection.SplineConnectionRouter) {
        p2 = this.lineSegments.get(5)?.end ?? p2
      }

      let length = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
      let angle = -(180 / Math.PI) * Math.asin((p1.y - p2.y) / length)

      if (angle < 0) {
        if (p2.x < p1.x) {
          angle = Math.abs(angle) + 180
        } else {
          angle = 360 - Math.abs(angle)
        }
      } else {
        if (p2.x < p1.x) {
          angle = 180 - angle
        }
      }
      return angle
    },

    getEndAngle: function () {
      // return a good default value if the connection is not routed at the
      //  moment
      if (this.lineSegments.getSize() === 0) {
        return 90
      }

      let p1 = this.lineSegments.get(this.lineSegments.getSize() - 1).end
      let p2 = this.lineSegments.get(this.lineSegments.getSize() - 1).start

      // Since the points are too close to each other in a spline routing, an 
      // angle is obtained which does not correspond to the optical impression. 
      // In this case, a point is taken which is a little further away 
      // from the port....if ppossible
      if (this.router instanceof draw2d.layout.connection.SplineConnectionRouter) {
        p2 = this.lineSegments.get(this.lineSegments.getSize() - 5)?.end ?? p2
      }

      let length = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
      let angle = -(180 / Math.PI) * Math.asin((p1.y - p2.y) / length)

      if (angle < 0) {
        if (p2.x < p1.x) {
          angle = Math.abs(angle) + 180
        } else {
          angle = 360 - Math.abs(angle)
        }
      } else {
        if (p2.x < p1.x) {
          angle = 180 - angle
        }
      }
      return angle
    },


    /**
     * @private
     **/
    fireSourcePortRouteEvent: function () {
      this.sourcePort.getConnections().each((i, conn) => {
        conn.routingRequired = true
        conn.repaint()
      })
    },

    /**
     * @private
     **/
    fireTargetPortRouteEvent: function () {
      // enforce a repaint of all connections which are related to this port
      // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
      //
      this.targetPort.getConnections().each((i, conn) => {
        conn.routingRequired = true
        conn.repaint()
      })
    },


    /**
     *
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     *
     * @returns {draw2d.command.Command} null or a Command
     **/
    createCommand: function (request) {
      if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
        if (this.isDraggable()) {
          return new draw2d.command.CommandMoveVertices(this)
        }
      }

      if (request.getPolicy() === draw2d.command.CommandType.MOVE_BASEPOINT) {
        // DragDrop of a connection doesn't create a undo command at this point. This will be done in
        // the onDrop method
        return new draw2d.command.CommandReconnect(this)
      }

      return this._super(request)
    },


    /**
     *
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
      let memento = this._super()

      let parentNode = this.getSource().getParent()
      while (parentNode.getParent() !== null) {
        parentNode = parentNode.getParent()
      }
      memento.source = {
        node: parentNode.getId(),
        port: this.getSource().getName()
      }

      parentNode = this.getTarget().getParent()
      while (parentNode.getParent() !== null) {
        parentNode = parentNode.getParent()
      }
      memento.target = {
        node: parentNode.getId(),
        port: this.getTarget().getName()
      }

      if (this.sourceDecorator !== null) {
        memento.source.decoration = this.sourceDecorator.NAME
      }

      if (this.targetDecorator !== null) {
        memento.target.decoration = this.targetDecorator.NAME
      }

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

      // nothing to to for the connection creation. This will be done in the draw2d.io.Reader
      // implementation
      //
      // restore your custom attributes here
      if (typeof memento.target.decoration !== "undefined" && memento.target.decoration != null) {
        this.setTargetDecorator(eval("new " + memento.target.decoration))
      }

      if (typeof memento.source.decoration !== "undefined" && memento.source.decoration != null) {
        this.setSourceDecorator(eval("new " + memento.source.decoration))
      }

      return this

    }
  })
