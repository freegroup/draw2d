
var SelectionMenuPolicy = draw2d.policy.figure.SelectionPolicy.extend({
	NAME: "SelectionMenuPolicy",

    init : function(attr, setter, getter)
    {
		this.overlay = null; // div DOM node
		this.scrollHandler = null; // scroll event handler

        this._super(attr, setter, getter);
    },

	/**
	 * @method
	 *
	 * @template
	 * @param {draw2d.Canvas} canvas the related canvas
	 * @param {draw2d.Figure} figure the selected figure
	 * @param {boolean} isPrimarySelection
	 */
	onSelect: function(canvas, figure, isPrimarySelection)
	{
		this._super(canvas, figure, isPrimarySelection);

		if (this.overlay === null) {
			this.overlay= $("<div class='overlayMenu'>&#x2295;</div>");
			
			// Attach overlay to canvas parent (scrollarea) instead of body
			// This ensures proper positioning relative to the scrollable canvas
			var canvasElement = $(canvas.html);
			var scrollContainer = canvasElement.parent();
			scrollContainer.append(this.overlay);
			
			this.overlay.on("click",function(){
				// use a Command and CommandStack for undo/redo support
				var command= new draw2d.command.CommandDelete(figure);
				canvas.getCommandStack().execute(command);
			});
			
			// Add scroll event handler to update position when scrolling
			this.scrollHandler = () => {
				this.posOverlay(canvas, figure);
			};
			scrollContainer.on("scroll", this.scrollHandler);
		}
		this.posOverlay(canvas, figure);
	},


	/**
	 * @method
	 *
	 * @param {draw2d.Canvas} canvas the related canvas
	 * @param {draw2d.Figure} figure the unselected figure
	 */
	onUnselect: function(canvas, figure )
	{
		this._super(canvas, figure);

		if(this.overlay) {
			// Remove scroll event handler
			if(this.scrollHandler) {
				var canvasElement = $(canvas.html);
				var scrollContainer = canvasElement.parent();
				scrollContainer.off("scroll", this.scrollHandler);
				this.scrollHandler = null;
			}
			
			this.overlay.remove();
			this.overlay=null;
		}
	},


    onDrag: function(canvas, figure)
	{
		this._super(canvas, figure);
		this.posOverlay(canvas, figure);
	},

	posOverlay:function(canvas, figure)
	{
		// Get canvas offset relative to its scroll container
		var canvasElement = $(canvas.html);
		var scrollContainer = canvasElement.parent();
		var canvasOffset = canvasElement.position(); // position relative to parent
		
		// Calculate position: figure position + canvas offset
		// No need to subtract scroll offset because overlay is inside scrollContainer
		// and scrolls naturally with the content
		var top = figure.getAbsoluteY() + canvasOffset.top - 20;
		var left = figure.getAbsoluteX() + canvasOffset.left + figure.getWidth() + 10;
		
		this.overlay.css({
			"top": top,
			"left": left
		});
	}
});
