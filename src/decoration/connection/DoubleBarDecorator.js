import draw2d from '../../packages'

/**
 * @class
 *
 * A double bar decoration for connections, typically used to indicate 
 * parallel lines or equality symbols at connection endpoints.
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
 *    c.setSourceDecorator(new draw2d.decoration.connection.DoubleBarDecorator());
 *    c.setTargetDecorator(new draw2d.decoration.connection.DoubleBarDecorator());
 *    // Connect the endpoints with the start and end port
 *    //
 *    c.setSource(start.getOutputPort(0));
 *    c.setTarget(end.getInputPort(0));
 *
 *    // and finally add the connection to the canvas
 *    canvas.add(c);
 *
 * @author Andreas Herz
 * @param {Number} [width] the gap/space between the two bars (default: 6)
 * @param {Number} [height] the length/height of the bars (default: 15)
 * @extends draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.DoubleBarDecorator = draw2d.decoration.connection.Decorator.extend(
  /** @lends draw2d.decoration.connection.DoubleBarDecorator */
  {

    NAME: "draw2d.decoration.connection.DoubleBarDecorator",

    init: function (width, height) {
      // width = gap between bars, height = length of bars
      // Use smaller default width (gap) than other decorators
      this._super(width || 6, height)
    },

    /**
     * Draw a double bar decoration.
     *
     * ```
     *
     *         |     | [width , height/2]
     *         |     |
     * [0,0]   |     |                          (Connection)
     *    +====|=====|==========================
     *         |     |
     *         |     |
     *         |     | [width ,-height/2]
     *      bar1   bar2
     *        <----->
     *         width (gap)
     *
     * ```
     *
     * @param {RaphaelPaper} paper the raphael paper object for the paint operation
     * @returns {RaphaelPath}
     * @private
     **/
    paint: function (paper) {
      let st = paper.set()
      
      // height is the length of each bar
      // First bar at width (same position as BarDecorator uses width/2, so we use width)
      // Second bar at 2*width (further towards the connection)
      let halfHeight = this.height / 2
      
      // First bar at width
      let path1 = ["M", this.width, " ", -halfHeight]
      path1.push("L", this.width, " ", halfHeight)
      
      // Second bar at 2*width
      let path2 = ["M", this.width * 2, " ", -halfHeight]
      path2.push("L", this.width * 2, " ", halfHeight)

      st.push(paper.path(path1.join("")))
      st.push(paper.path(path2.join("")))
      
      st.attr({fill: this.backgroundColor.rgba()})
      
      // Use stroke width from parent connection if available
      if (this.parent !== null) {
        st.attr({"stroke-width": this.parent.getStroke()})
      }
      
      return st
    }
  })