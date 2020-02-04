/**
 * @class draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
 *
 * Feedback and edit policy for the InteractiveManhattanRouter.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.line.LineSelectionFeedbackPolicy
 */
import draw2d from '../../packages'

// do not delete them
import plugin from "lib/jquery.contextmenu"
import css from 'css/contextmenu.css'

draw2d.policy.line.OrthogonalSelectionFeedbackPolicy = draw2d.policy.line.LineSelectionFeedbackPolicy.extend({

  NAME: "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",

  /**
   * @constructs
   * Creates a new Router object
   */
  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)

    // The ResizeHandle for the Policy. This is inline to avoid that a user want to use them without
    // the right installed policy.
    //
    this.ResizeHandle = draw2d.ResizeHandle.extend({
      NAME: "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy.ResizeHandle",

      init: function (owner, index) {
        this._super({owner})
        this.index = index
      },


      /**
       * @method
       * Called if a drag&drop operation starts.<br>
       * @param {Number} x the x-coordinate of the mouse up event
       * @param {Number} y the y-coordinate of the mouse up event
       * @param {Boolean} shiftKey true if the shift key has been pressed during this event
       * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
       *
       * @private
       **/
      onDragStart: function (x, y, shiftKey, ctrlKey) {
        this._super(x, y, shiftKey, ctrlKey)
        this.command = this.getCanvas().getPrimarySelection().createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_VERTICES))

        // Vertex is a reference and not a copy of the point
        this.vertex = this.owner.getVertex(this.index).clone()
      },

      /**
       * @method
       * Called from the framework during a drag&drop operation of the ResizeHandles
       *
       * @param {Number} dx the x difference between the start of the drag drop operation and now
       * @param {Number} dy the y difference between the start of the drag drop operation and now
       * @param {Number} dx2 The x diff since the last call of this dragging operation
       * @param {Number} dy2 The y diff since the last call of this dragging operation
       *
       * @return {Boolean}
       **/
      onDrag: function (dx, dy, dx2, dy2) {
        if (this.command == null) {
          return false
        }

        let MINDIST = this.owner.getRouter().MINDIST || 10

        let fromDir = this.owner.getSource().getConnectionDirection(this.owner.getTarget())
        let toDir = this.owner.getTarget().getConnectionDirection(this.owner.getSource())

        this.vertex.translate(dx2, dy2)

        let vertices = this.owner.getVertices()
        let count = vertices.getSize()
        //shortcut for math operations
        let max = Math.max
        let min = Math.min


        // Keep in mind: "p1" is always the dragged handle in the coding below
        //               marked with an '*' in the diagram
        //

        // FIRST handle of the connection
        //
        if (this.index === 1) {
          let p0 = vertices.get(this.index - 1) // first vertex of the connection
          let p1 = vertices.get(this.index) // dragged vertex
          let p2 = vertices.get(this.index + 1) // additional neighbor

          // vertex alignment to handle:
          //
          //      p0 +-----* p1       p1 *------+ p0
          //               |             |
          //               |             |
          //               + p2       p2 +
          if ((p1.x === p2.x) && (p0.y === p1.y)) {
            switch (fromDir) {
              case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                // p0 is on the left of p1
                //
                this.owner.setVertex(1, max(p0.x + MINDIST, this.vertex.x), p1.y) // p1
                this.owner.setVertex(2, max(p0.x + MINDIST, this.vertex.x), p2.y) // p2
                break
              // p0 is on the right of p2
              //
              case draw2d.geo.Rectangle.DIRECTION_LEFT:
                this.owner.setVertex(1, min(p0.x - MINDIST, this.vertex.x), p1.y) // p1
                this.owner.setVertex(2, min(p0.x - MINDIST, this.vertex.x), p2.y) // p2
                break
            }
          }

          // vertices alignment to handle:
          //
          //      p0 +              p1 *--------+ p2
          //         |                 |
          //         |                 |
          //      p1 *-----+ p2     p0 +
          else {
            switch (fromDir) {
              case draw2d.geo.Rectangle.DIRECTION_UP:
                // p0 is below of p1
                //
                this.owner.setVertex(1, p1.x, min(p0.y - MINDIST, this.vertex.y)) // p1
                this.owner.setVertex(2, p2.x, min(p0.y - MINDIST, this.vertex.y)) // p2
                break
              // p0 is above of p2
              //
              case draw2d.geo.Rectangle.DIRECTION_DOWN:
                this.owner.setVertex(1, p1.x, max(p0.y + MINDIST, this.vertex.y)) // p1
                this.owner.setVertex(2, p2.x, max(p0.y + MINDIST, this.vertex.y)) // p2
                break
            }
          }
        }

        // LAST handle: Only the left hand side sibling can be changed
        //
        else if (this.index === (count - 2)) {
          let p2 = vertices.get(this.index - 1)  // neighbor of the dragged vertex
          let p1 = vertices.get(this.index)  // dragged vertex
          let p0 = vertices.get(this.index + 1)  // last vertex of the connection

          // vertices with this alignment.
          //
          //      p2 +-----* p1                 + p0
          //               |                    |
          //               |                    |
          //               + p0     p2 +--------* p1
          if ((p0.x === p1.x) && (p2.y === p1.y)) {
            switch (toDir) {
              // p0 is below of p1
              case draw2d.geo.Rectangle.DIRECTION_UP:
                this.owner.setVertex(count - 2, p1.x, min(p0.y - MINDIST, this.vertex.y)) // p1
                this.owner.setVertex(count - 3, p2.x, min(p0.y - MINDIST, this.vertex.y)) // p2
                break
              // p0 is above p2
              case draw2d.geo.Rectangle.DIRECTION_DOWN:
                this.owner.setVertex(count - 2, p1.x, max(p0.y + MINDIST, this.vertex.y)) // p1
                this.owner.setVertex(count - 3, p2.x, max(p0.y + MINDIST, this.vertex.y)) // p2
                break
            }
          }

          // vertices with this alignment.
          //
          //      p2 +              p0 +--------* p1
          //         |                          |
          //         |                          |
          //      p1 *-----+ p0              p2 +
          else {
            switch (toDir) {
              case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                // p0 is on the left of p1
                //
                this.owner.setVertex(count - 2, max(p0.x + MINDIST, this.vertex.x), p1.y) // p1
                this.owner.setVertex(count - 3, max(p0.x + MINDIST, this.vertex.x), p2.y) // p2
                break
              // p0 is on the right of p2
              //
              case draw2d.geo.Rectangle.DIRECTION_LEFT:
                this.owner.setVertex(count - 2, min(p0.x - MINDIST, this.vertex.x), p1.y) // p1
                this.owner.setVertex(count - 3, min(p0.x - MINDIST, this.vertex.x), p2.y) // p2
                break
            }
          }
        }
        // The resize handle is in the middle of the connection.
        // -> In this case the connection MUST HAVE at least 5 vertices
        //
        else {
          let p_m1 = vertices.get(this.index - 2)
          let p0 = vertices.get(this.index - 1)
          let p1 = vertices.get(this.index)   // selected DragHandle
          let p2 = vertices.get(this.index + 1)
          let p3 = vertices.get(this.index + 2)

          // vertices alignment to handle
          //
          //               .              .
          //               .              .
          //   p1 *------->+  p0      p0  +<---------* p1
          //      |        .              .          |
          //      |        .              .          |
          //   p2 |                                  | p2
          //   ...+...                         ......+.....
          //
          if ((p1.x === p2.x) && (p1.y === p0.y)) {
            // Exception handling if the dragged handle (p1) is near by the start of the connection
            // p_m1 is the start of the connection
            // p0 must be the immediate neighbor of p_m1
            //
            if (this.index - 2 === 0) {
              switch (fromDir) {
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                  this.owner.setVertex(this.index - 1, p0.x, max(this.vertex.y, p_m1.y - MINDIST))          // p0
                  this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p_m1.y - MINDIST)) // p1
                  this.owner.setVertex(this.index + 1, this.vertex.x, p2.y)                         // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                  this.owner.setVertex(this.index - 1, p0.x, min(this.vertex.y, p_m1.y + MINDIST))          // p0
                  this.owner.setVertex(this.index, this.vertex.x, this.vertex.y) // p1
                  this.owner.setVertex(this.index + 1, this.vertex.x, p2.y)                         // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_UP:
                  this.owner.setVertex(this.index - 1, p0.x, min(this.vertex.y, p_m1.y - MINDIST))          // p0
                  this.owner.setVertex(this.index, this.vertex.x, min(this.vertex.y, p_m1.y - MINDIST)) // p1
                  this.owner.setVertex(this.index + 1, this.vertex.x, p2.y)                         // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                  this.owner.setVertex(this.index - 1, p0.x, max(this.vertex.y, p_m1.y + MINDIST))          // p0
                  this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p_m1.y + MINDIST)) // p1
                  this.owner.setVertex(this.index + 1, this.vertex.x, p2.y)                        // p2
                  break
              }
            }
            // Exception handling if the dragged handle (p1L) near by the end of the connection
            // p3 is the end of the connection
            //
            else if ((this.index - count + 3) === 0) {
              switch (toDir) {
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                  this.owner.setVertex(this.index - 1, p0.x, this.vertex.y)                       // p0
                  this.owner.setVertex(this.index, max(this.vertex.x, p3.x + MINDIST), this.vertex.y) // p1
                  this.owner.setVertex(this.index + 1, max(this.vertex.x, p3.x + MINDIST), p2.y)          // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                  this.owner.setVertex(this.index - 1, p0.x, this.vertex.y)                       // p0
                  this.owner.setVertex(this.index, min(this.vertex.x, p3.x - MINDIST), this.vertex.y) // p1
                  this.owner.setVertex(this.index + 1, min(this.vertex.x, p3.x - MINDIST), p2.y)          // p2
                  break
              }
            }
            else {
              this.owner.setVertex(this.index - 1, p0.x, this.vertex.y)                          // p0
              this.owner.setVertex(this.index, this.vertex)                                 // p1
              this.owner.setVertex(this.index + 1, this.vertex.x, p2.y)                          // p2
            }
          }
          // vertices alignment to handle
          //
          //  ...+...                            ...+...
          //  p0 |                        .         | p0
          //     |          .             .         |
          //     |          .             .         |
          //  p1 *----------+ p2      p2  +---------* p1
          //                .             .
          //                .             .
          else if ((p0.x === p1.x) && (p1.y === p2.y)) {
            // p_m1 is the start of the analyzed segment
            // p0 must be the immediate neighbor of p_m1
            //
            if (this.index - 2 === 0) {
              switch (fromDir) {
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                  this.owner.setVertex(this.index - 1, max(this.vertex.x, p_m1.x + MINDIST), p0.y)          // p0
                  this.owner.setVertex(this.index, max(this.vertex.x, p_m1.x + MINDIST), this.vertex.y) // p1
                  this.owner.setVertex(this.index + 1, p2.x, this.vertex.y)                              // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                  this.owner.setVertex(this.index - 1, min(this.vertex.x, p_m1.x - MINDIST), p0.y)          // p0
                  this.owner.setVertex(this.index, min(this.vertex.x, p_m1.x - MINDIST), this.vertex.y) // p1
                  this.owner.setVertex(this.index + 1, p2.x, this.vertex.y)                              // p2
                  break
              }
            }
            // p3 is the end point
            //
            else if ((this.index - count + 3) === 0) {
              switch (toDir) {
                case draw2d.geo.Rectangle.DIRECTION_UP:
                  this.owner.setVertex(this.index - 1, this.vertex.x, max(this.vertex.y, p0.y))      // p0
                  this.owner.setVertex(this.index, this.vertex.x, min(this.vertex.y, p3.y - MINDIST))   // p1
                  this.owner.setVertex(this.index + 1, p2.x, min(this.vertex.y, p3.y - MINDIST))   // p2
                  break
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                  this.owner.setVertex(this.index - 1, this.vertex.x, p0.y)                // p0
                  this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p3.y + MINDIST))   // p1
                  this.owner.setVertex(this.index + 1, p2.x, max(this.vertex.y, p3.y + MINDIST))   // p2
                  break
              }
            }
            // just any element in the middle of the connection
            //
            else {
              this.owner.setVertex(this.index - 1, this.vertex.x, p0.y)                  // p0
              this.owner.setVertex(this.index, this.vertex)                  // p1
              this.owner.setVertex(this.index + 1, p2.x, this.vertex.y)                  // p2
            }
          }
        }

        this.relocate()

        // update the command for the undo/redo stuff
        //
        if (this.command !== null) {
          this.command.updateVertices(this.owner.getVertices().clone())
        }

        // note that the user has changed the routing manually.
        // This skips the automatic routing.
        this.owner._routingMetaData.routedByUserInteraction = true
        return true
      },

      /**
       * @method Called after a drag and drop action.<br>
       *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
       *
       * @param {Number} x the x-coordinate of the mouse event
       * @param {Number} y the y-coordinate of the mouse event
       * @param {Boolean} shiftKey true if the shift key has been pressed during this event
       * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
       *
       * @return {Boolean}
       */
      onDragEnd: function (x, y, shiftKey, ctrlKey) {
        let stack = this.getCanvas().getCommandStack()

        stack.execute(this.command)
        this.command = null
        return true
      },


      /**
       * @method
       * Controls the location of the resize handle
       *
       * @template
       **/
      relocate: function () {

        let resizeWidthHalf = this.getWidth() / 2
        let resizeHeightHalf = this.getHeight() / 2

        let anchor = this.owner.getVertices().get(this.index)
        if (anchor)
          this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf)
      }

    })
  },


  /**
   * @method
   *
   * @template
   * @param {draw2d.Connection} connection the selected figure
   * @param {Boolean} isPrimarySelection
   */
  onSelect: function (canvas, connection, isPrimarySelection) {
    this._super(canvas, connection, isPrimarySelection)

    let points = connection.getVertices()
    let i = 1
    for (; i < (points.getSize() - 1); i++) {
      let handle = new this.ResizeHandle(connection, i)
      connection.selectionHandles.add(handle)
      handle.setDraggable(connection.isResizeable())
      handle.show(canvas)
    }

    this.moved(canvas, connection)
  },


  /**
   * @method
   * remove the segment with the given index.
   * You must check if it possible to remove the segment before. The method didn'T do any consistency checks.
   *
   * @param conn
   * @param segmentIndex
   */
  removeSegment: function (conn, segmentIndex) {
    let PADDING = 10

    let segmentCount = conn.getVertices().getSize() - 1

    let fromPt = conn.getStartPoint()
    let fromDir = conn.getSource().getConnectionDirection(conn.getTarget())

    let toPt = conn.getEndPoint()
    let toDir = conn.getTarget().getConnectionDirection(conn.getSource())

    let p0 = conn.getVertex(segmentIndex - 1)
    let p1 = conn.getVertex(segmentIndex)
    let p2 = conn.getVertex(segmentIndex + 1)
    let p3 = conn.getVertex(segmentIndex + 2)

    //                                             p0 .
    // Es wird ein Horizontales Segment               .
    // geloescht. Es muessen somit die Punkte         .
    // p0 und p3 neu gesetzt werden.               p1 +------*-----+ p2
    // Ihre neue X-Koordinate ist somit in der               ^     .
    // Mitte des geloeschten Segmentes                      newX   .
    //                                                             . p3
    //
    if (p1.y === p2.y) {
      let newX = (p1.x + p2.x) / 2
      // Die neue X-Koordinate muss auf jeden Falls zwischen p-1 und p4 liegen
      //
      if (segmentIndex === 1) {
        switch (fromDir) {
          case draw2d.geo.Rectangle.DIRECTION_RIGHT:
            newX = Math.max(newX, fromPt.x + PADDING)
            break
          case draw2d.geo.Rectangle.DIRECTION_LEFT:
            newX = Math.min(newX, fromPt.x - PADDING)
            break
          case draw2d.geo.Rectangle.DIRECTION_UP:
            newX = fromPt.x
            break
          case draw2d.geo.Rectangle.DIRECTION_DOWN:
            newX = fromPt.x
            break
        }
      }

      if (segmentIndex === segmentCount - 2) {
        switch (fromDir) {
          case draw2d.geo.Rectangle.DIRECTION_RIGHT:
            newX = Math.max(newX, toPt.x + PADDING)
            break
          case draw2d.geo.Rectangle.DIRECTION_LEFT:
            newX = Math.min(newX, toPt.x - PADDING)
            break
          case draw2d.geo.Rectangle.DIRECTION_UP:
            newX = toPt.x
            break
          case draw2d.geo.Rectangle.DIRECTION_DOWN:
            newX = toPt.x
            break
        }
      }

      conn.setVertex(segmentIndex - 1, new draw2d.geo.Point(newX, p0.y))
      conn.setVertex(segmentIndex + 2, new draw2d.geo.Point(newX, p3.y))

      conn.removeVertexAt(segmentIndex)
      conn.removeVertexAt(segmentIndex)
      conn._routingMetaData.routedByUserInteraction = true
    }

    //                                                         p2       p3
    // Es wird ein vertikales Segment                        +..........+
    // geloescht. Es muessen somit die Punkte                |
    // p0 und p3 neu gesetzt werden.                         |
    // Ihre neue Y-Koordinate ist somit in der               |
    // Mitte des geloeschten Segmentes              p0       | p1
    //                                              +........+
    //
    else if (p1.x === p2.x) {
      let newY = (p1.y + p2.y) / 2
      // Die neue Y-Koordinate muss auf jeden Falls zwischen p-1 und p4 liegen
      //
      if (segmentIndex === 1) {
        switch (fromDir) {
          case draw2d.geo.Rectangle.DIRECTION_RIGHT:
          case draw2d.geo.Rectangle.DIRECTION_LEFT:
            newY = fromPt.y
            break
          case draw2d.geo.Rectangle.DIRECTION_UP:
          case draw2d.geo.Rectangle.DIRECTION_DOWN:
            debugger // newX is newer read....why did I calculate them?!
            newX = fromPt.x
            break
        }
      }
      if (segmentIndex === segmentCount - 2) {
        switch (toDir) {
          case draw2d.geo.Rectangle.DIRECTION_RIGHT:
          case draw2d.geo.Rectangle.DIRECTION_LEFT:
            newY = toPt.y
            break
          case draw2d.geo.Rectangle.DIRECTION_UP:
          case draw2d.geo.Rectangle.DIRECTION_DOWN:
            debugger // newX is newer read....why did I calculate them?!
            newX = toPt.x
            break
        }
      }

      conn.setVertex(segmentIndex - 1, new draw2d.geo.Point(p0.x, newY))
      conn.setVertex(segmentIndex + 2, new draw2d.geo.Point(p3.x, newY))

      conn.removeVertexAt(segmentIndex)
      conn.removeVertexAt(segmentIndex)
      conn._routingMetaData.routedByUserInteraction = true
    }
  },


  /**
   * @method
   * split the segment with the given index and insert a new segment.
   *
   * @param conn
   * @param segmentIndex
   */
  splitSegment: function (conn, segmentIndex, x, y) {
    let segmentCount = conn.getVertices().getSize() - 1
    let p1 = conn.getVertex(segmentIndex)
    let p2 = conn.getVertex(segmentIndex + 1)
    let length = 40

    // the selected segment is vertical
    //
    if (p1.x === p2.x) {
      conn._routingMetaData.routedByUserInteraction = true
      // edge case of an ManhattanRouter: One segment. This happens if the source/target on the same x - coordinate
      //
      if (segmentCount === 1) {
        //     + p1
        //     |
        // np1 +-----+ np2
        //           |
        //           |
        // np3 +-----+ np3
        //     |
        //     |
        //     + p2
        //
        let newSegLength = (p1.getDistance(p2) / 4) / 2
        let np1 = new draw2d.geo.Point(p1.x, y - newSegLength)
        let np2 = new draw2d.geo.Point(p2.x + length, y - newSegLength)
        let np3 = new draw2d.geo.Point(p2.x + length, y + newSegLength)
        let np4 = new draw2d.geo.Point(p2.x, y + newSegLength)

        conn.insertVertexAt(segmentIndex + 1, np1)
        conn.insertVertexAt(segmentIndex + 2, np2)
        conn.insertVertexAt(segmentIndex + 3, np3)
        conn.insertVertexAt(segmentIndex + 4, np4)
      }
      else {
        let np1 = new draw2d.geo.Point(0, 0)
        let np2 = new draw2d.geo.Point(0, 0)
        //       p2 +
        //          .
        // np1 +----+ np2
        //     .
        //     .
        //     + p1
        // p1 ist der Startpunkt und darf somit nicht verschoben werden
        //
        if (segmentIndex === 0) {
          np1.y = y
          np1.x = p1.x
          np2.y = y
          np2.x = p2.x + length
          conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(np2.x, p2.y))
        }
        // p2 ist der Schlusspunkt und darf somit nicht veaendert werden
        //
        else if (segmentIndex === segmentCount - 1) {
          np1.y = y
          np1.x = p1.x - length
          np2.y = y
          np2.x = p2.x
          conn.setVertex(segmentIndex, new draw2d.geo.Point(np1.x, p1.y))
        }
        else {
          np1.y = y
          np1.x = p1.x - (length / 2)
          np2.y = y
          np2.x = p2.x + (length / 2)
          conn.setVertex(segmentIndex, new draw2d.geo.Point(np1.x, p1.y))
          conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(np2.x, p2.y))
        }

        conn.insertVertexAt(segmentIndex + 1, np1)
        conn.insertVertexAt(segmentIndex + 2, np2)
      }
    }
    // the selected segment is horizontal
    //
    else if (p1.y == p2.y) {
      conn._routingMetaData.routedByUserInteraction = true
      // edge case of an ManhattanRouter: One segment. This happens if the source/target on the same y - coordinate
      //
      if (segmentCount === 1) {
        //     np2 +---------+ np3
        //         |         |
        // --------+np1   np4+--------
        //
        let newSegLength = (p1.getDistance(p2) / 4) / 2
        let np1 = new draw2d.geo.Point(x - newSegLength, p1.y)
        let np2 = new draw2d.geo.Point(x - newSegLength, p1.y - length)
        let np3 = new draw2d.geo.Point(x + newSegLength, p1.y - length)
        let np4 = new draw2d.geo.Point(x + newSegLength, p1.y)

        conn.insertVertexAt(segmentIndex + 1, np1)
        conn.insertVertexAt(segmentIndex + 2, np2)
        conn.insertVertexAt(segmentIndex + 3, np3)
        conn.insertVertexAt(segmentIndex + 4, np4)
      }
      else {
        //     p1        np1
        //   +.........+
        //             |
        //             |
        //             | np2       p2
        //             +.........+
        let np1 = new draw2d.geo.Point(0, 0)
        let np2 = new draw2d.geo.Point(0, 0)

        // p1 ist der Startpunkt und darf somit nicht verschoben werden
        //
        if (segmentIndex === 0) {
          np1.x = x
          np1.y = p1.y
          np2.x = x
          np2.y = p2.y + length
          conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(p2.x, np2.y))
        }
        // p2 ist der Schlusspunkt und darf somit nicht veaendert werden
        //
        else if (segmentIndex === segmentCount - 1) {
          np1.x = x
          np1.y = p1.y - length
          np2.x = x
          np2.y = p2.y
          conn.setVertex(segmentIndex, new draw2d.geo.Point(p1.x, np1.y))
        }
        else {
          np1.x = x
          np1.y = p1.y - (length / 2)
          np2.x = x
          np2.y = p2.y + (length / 2)
          conn.setVertex(segmentIndex, new draw2d.geo.Point(p1.x, np1.y))
          conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(p2.x, np2.y))
        }
        conn.insertVertexAt(segmentIndex + 1, np1)
        conn.insertVertexAt(segmentIndex + 2, np2)
      }
    }
  },

  /**
   * @method
   * Called if the user press the right mouse on the figure.<br>
   * You can either override the "onContextMenu" method of the figure or install an editor policy and override this method.
   * Booth is valid and possible.
   *
   * @param {draw2d.shape.basic.Line} conn the polyline below the mouse
   * @param {Number} x the x-coordinate of the mouse down event
   * @param {Number} y the y-coordinate of the mouse down event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @template
   * @since 4.4.0
   */
  onRightMouseDown: function (conn, x, y, shiftKey, ctrlKey) {
    let segment = conn.hitSegment(x, y)
    let items = {"split": {name: draw2d.Configuration.i18n.menu.addSegment}}

    if (segment === null) {
      return
    }

    if (conn.getRouter().canRemoveSegmentAt(conn, segment.index)) {
      items.remove = {name: draw2d.Configuration.i18n.menu.deleteSegment}
    }

    $.contextMenu({
      selector: 'body',
      events:
        {
          hide: function () {
            $.contextMenu('destroy')
          }
        },
      callback: (key, options) => {
        switch (key) {
          case "remove": {
            // deep copy of the vertices of the connection for the command stack to avoid side effects
            let originalVertices = conn.getVertices().clone(true)
            this.removeSegment(conn, segment.index)
            let newVertices = conn.getVertices().clone(true)
            conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices))
            }
            break
          case "split": {
            // deep copy of the vertices of the connection for the command stack to avoid side effects
            let originalVertices = conn.getVertices().clone(true)
            this.splitSegment(conn, segment.index, x, y)
            let newVertices = conn.getVertices().clone(true)
            conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices))
            }
            break
          default:
            break
        }

      },
      x: x,
      y: y,
      items: items
    })
  }
})
