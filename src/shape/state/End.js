
/**
 * @class draw2d.shape.state.End
 * 
 * The end node for a state diagram
 * 
 * See the example:
 *
 *     @example preview small frame
 *     var end   = new draw2d.shape.state.End();
        
 *     // ...add it to the canvas 
 *     canvas.add( end, 230,80);
  *     
 * @extends draw2d.shape.basic.Circle
 */ import draw2d from '../../packages';
draw2d.shape.state.End = draw2d.shape.basic.Circle.extend({

    NAME : "draw2d.shape.state.End",

	DEFAULT_COLOR : new draw2d.util.Color("#4D90FE"),

	init: function(attr, setter, getter )
    {
        this.innerCircle = new draw2d.shape.basic.Circle(20);

        this._super(attr, setter, getter);
        
        this.port = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port));
        
        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        
        this.innerCircle.setStroke(2);
        this.innerCircle.setBackgroundColor(null);
        this.add(this.innerCircle, new draw2d.layout.locator.CenterLocator());

        this.setStroke(0);
        //this.setColor(this.DEFAULT_COLOR.darker());
    },
 
    /**
     * @inheritdoc
     */
    setDimension: function(w, h)
    {
        this._super(w,h);
        this.innerCircle.setDimension(this.getWidth()-10,this.getHeight()-10);
    }
});
