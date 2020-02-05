
/**
 * @class draw2d.layout.mesh.MeshLayouter
 * Layouter for a mesh or grid.
 *
 * @author Andreas Herz
 */
import draw2d from '../../packages'

draw2d.layout.mesh.MeshLayouter = Class.extend(
  /** @lends draw2d.layout.mesh.MeshLayouter.prototype */

  {

	/**
	 * Creates a new layouter object.
	 */
    init: function(){
    },

    /**
     * 
     * Return a changes list for an existing mesh/canvas to ensure that the element to insert
     * did have enough space.
     *
     * @param {draw2d.Canvas} canvas the canvas to use for the analytic
     * @param {draw2d.Figure} figure The figure to add to the exising canvas
     *
     *
     * @return {draw2d.util.ArrayList} a list of changes to apply if the user want to insert he figure.
     */
    add: function( canvas, figure)
    {
    	return new draw2d.util.ArrayList();
    }
});
