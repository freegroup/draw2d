
/**
 * @class draw2d.shape.pert.Activity
 * 
 * NOT FOR PRODUCTIVE
 * 
 * Checkout [Wikipedia PERT][1] for more information.
 * 
 * Double click on the Task name or the top middle number to change the value.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     canvas.add( new draw2d.shape.pert.Activity,10,10);
 *     canvas.add( new draw2d.shape.pert.Activity,80,130);
 *     canvas.add( new draw2d.shape.pert.Activity,180,50);
 *     
 * [1] http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 * 
 * @extends draw2d.shape.layout.VerticalLayout
 */
example.shape.Start = draw2d.shape.state.Start.extend({

	NAME: "example.shape.Start",
	
    init : function()
    {
        this._super();  
        this.setCssClass("start");
    }
});
