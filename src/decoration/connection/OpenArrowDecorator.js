import draw2d from '../../packages'

/**
 * @class
 *
 *
 * @example
 *
 *    // create and add two nodes which contains Ports (In and OUT)
 *    //
 *    let start = new draw2d.shape.node.Start();
 *    let end   = new draw2d.shape.node.End();
 *    // ...add it to the canvas
 *    canvas.add( start, 50,50);
 *    canvas.add( end, 230,80);
 *
 *    // Create a Connection and connect the Start and End node
 *    //
 *    let c = new draw2d.Connection();
 *
 *    // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *    c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *    // Set the endpoint decorations for the connection
 *    //
 *    c.setSourceDecorator(new draw2d.decoration.connection.OpenArrowDecorator());
 *    c.setTargetDecorator(new draw2d.decoration.connection.OpenArrowDecorator());
 *
 *    // Connect the endpoints with the start and end port
 *    //
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *
 *    // and finally add the connection to the canvas
 *    canvas.add(c);
 *
 *
 * @author Andreas Herz
 * @param {Number} [width] the width of the arrow
 * @param {Number} [height] the height of the arrow
 * @extends draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.OpenArrowDecorator = draw2d.decoration.connection.Decorator.extend(
  /** @lends draw2d.decoration.connection.OpenArrowDecorator */
  {
    NAME: "draw2d.decoration.connection.OpenArrowDecorator",

    init: function (width, height) {
      this._super(width, height)
    },

    /**
     * Draws a filled arrow decoration.
     *
     *
     * ```
     *                       ---+ [width , height/2]
     *                -------   
     * [0,0]  --------          
     *    +---========================================================
     *        --------          
     *                -------   
     *                       ---+ [width ,-height/2]
     *
     * ```
     *
     * @param {RaphaelPaper} paper the raphael paper object for the paint operation
     * @returns {RaphaelPath}
     * @private
     **/
    paint: function (paper) {
      let st = paper.set()

      st.push(paper.path([
         "M", this.width, " ", -this.height / 2,
         "L0 0",
         "L", this.width, " ", this.height / 2,
       ].join(""))
      )

      //st.attr({fill: this.backgroundColor.rgba()})

      return st
    }
  })

