// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Tue Mar 29 2016 19:19:12 GMT+0200 (CEST)                                         
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//

let CollapsibleJailhouse = draw2d.shape.composite.Jailhouse.extend({

  NAME: "CollapsibleJailhouse",

  init: function (attr, setter, getter) {
    this._super($.extend({stroke: 1, radius:4, color:"#1E88E5", bgColor: "#BBDEFB"}, attr), setter, getter);

    this.expanded = true;
    this.collapsedWidth  = 90
    this.collapsedHeight = 20

    let absoluteLocator = new draw2d.layout.locator.XYAbsPortLocator({x:3, y:3})

    let img1 = new draw2d.shape.icon.Contract({width: 15, height: 15});
    let img2 = new draw2d.shape.icon.Expand({ width: 15, height: 15, visible: false});

    img1.addCssClass("cursor")
    img2.addCssClass("cursor")

    this.add(img1, absoluteLocator)
    this.add(img2, absoluteLocator)

    let toggle=()=>{
      this.expanded = !this.expanded

      img1.setVisible( this.expanded)
      img2.setVisible(!this.expanded)

      if(this.expanded){
        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
        this.assignedFigures.each((i, child)=>{
          child.setVisible(true)
          child.installEditPolicy(this.policy)
          child.getPorts().each( (i, port)=>{
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
      else{
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())
        this.oldDim = { width:this.getWidth(), height:this.getHeight()}
        this.assignedFigures.each((i, child)=>{
          // offset of the child and jailhouse shape
          let offset = child.getAbsolutePosition().subtract(this.getAbsolutePosition())
          child.setVisible(false)
          child.uninstallEditPolicy(this.policy)
          child.getPorts().each( (i, port)=>{
            port._originalLocator = port.getLocator()
            // store the applied connection direction (if this used)
            port._originalDirection = port.preferredConnectionDirection
            // and force the current calculated direction
            port.setConnectionDirection(port.getConnectionDirection())
            if(port.getConnectionDirection() === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
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
        this.attr({boundingBox: {x:this.getX(), y:this.getY(),width:this.collapsedWidth, height: this.collapsedHeight}})
      }
    }

    img1.on("click",toggle);
    img2.on("click",toggle);
  },

  assignFigure: function (figure) {
    if(figure instanceof draw2d.Connection)
      return

    this._super(figure)

    figure.getPorts().each((i, port) => {
      port.toFront()
      port.getConnections().each((i, connection) => {
        connection.toFront()})
    })

    return this
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
      if(figure.isVisible()) {
        width = Math.max(width, figure.getBoundingBox().getRight())
      }
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
      if(figure.isVisible()) {
        height = Math.max(height, figure.getBoundingBox().getBottom())
      }
    })
    return height - this.getAbsoluteY()
  }
});



