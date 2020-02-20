
/**
 * @class
 * Change proposal for grid/mesh layout changes.
 *
 * @author Andreas Herz
 */
import draw2d from '../../packages'

draw2d.layout.mesh.ProposedMeshChange = Class.extend(
  /** @lends draw2d.layout.mesh.ProposedMeshChange.prototype */

  {

	/**
	 * Creates change object.
	 */
    init: function(figure, x, y)
    {
    	this.figure = figure;
    	this.x = x;
    	this.y = y;
    },

    /**
     *
     * Return the related figure.
     *
     * @return {draw2d.Figure} the figure to the related change proposal
     */
    getFigure: function( )
    {
    	return this.figure;
    },

    /**
     *
     * The proposed x-coordinate.
     *
     * @return {Number}
     */
    getX: function()
    {
    	return this.x;
    },

    /**
     *
     * The proposed y-coordinate
     *
     * @return {Number}
     */
    getY: function()
    {
    	return this.y;
    }

});
