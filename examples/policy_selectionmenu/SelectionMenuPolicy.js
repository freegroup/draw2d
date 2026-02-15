
var SelectionMenuPolicy = draw2d.policy.figure.SelectionPolicy.extend({
	NAME: "SelectionMenuPolicy",

    init : function(attr, setter, getter)
    {
		this.overlay = null; // div DOM node
		this.zoomListener = null; // zoom event listener

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
			
			// Attach overlay to parent of scrollArea (same level as canvas container)
			// This keeps the overlay fixed in viewport while figure scrolls
			var scrollArea = canvas.getScrollArea();
			scrollArea.parent().append(this.overlay);
			
			this.overlay.on("click",function(){
				// use a Command and CommandStack for undo/redo support
				var command= new draw2d.command.CommandDelete(figure);
				canvas.getCommandStack().execute(command);
			});
			
			// Add zoom event listener to update position when zoom changes
			this.zoomListener = () => {
				this.posOverlay(canvas, figure);
			};
			canvas.on("zoom", this.zoomListener);
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
			// Remove zoom event listener
			if(this.zoomListener) {
				canvas.off("zoom", this.zoomListener);
				this.zoomListener = null;
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
		var zoom = canvas.getZoom();
		
		var top = (figure.getAbsoluteY() * zoom) - 20;
		var left = ((figure.getAbsoluteX() + figure.getWidth()) * zoom) + 10;
		
		this.overlay.css({
			"top": top,
			"left": left
		});
	}
});
