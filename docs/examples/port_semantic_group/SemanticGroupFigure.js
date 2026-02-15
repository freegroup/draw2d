/**
 * Custom figure with ports that have different semantic groups.
 * 
 * RED ports = "data" group
 * GREEN ports = "control" group
 * 
 * Only ports in the same semantic group can connect!
 */
var SemanticGroupFigure = draw2d.shape.basic.Rectangle.extend({
  NAME: "SemanticGroupFigure",

  // Color constants for semantic groups
  COLOR_DATA: "#e74c3c",     // Red - "data" semantic group
  COLOR_CONTROL: "#249352",  // Green - "control" semantic group

  init: function(attr) {
    this._super($.extend({
      width: 100,
      height: 80,
      bgColor: "#b1ecf6",
      radius: 5,
      stroke: 2
    }, attr));

    // RED output port - "data" semantic group
    var redOut = this.createPort("output");
    redOut.setSemanticGroup("data");
    redOut.setBackgroundColor(this.COLOR_DATA);
    redOut.setName("data_out");

    // GREEN output port - "control" semantic group
    var greenOut = this.createPort("output");
    greenOut.setSemanticGroup("control");
    greenOut.setBackgroundColor(this.COLOR_CONTROL);
    greenOut.setName("control_out");

    // RED input port - "data" semantic group
    var redIn = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 20));
    redIn.setSemanticGroup("data");
    redIn.setBackgroundColor(this.COLOR_DATA);
    redIn.setName("data_in");

    // GREEN input port - "control" semantic group
    var greenIn = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 80));
    greenIn.setSemanticGroup("control");
    greenIn.setBackgroundColor(this.COLOR_CONTROL);
    greenIn.setName("control_in");
  }
});