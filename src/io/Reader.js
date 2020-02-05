import draw2d from '../packages'

/**
 * @class
 * Template class for general import of a document into the canvas.
 *
 * @author andreas Herz
 */
draw2d.io.Reader = Class.extend(
  /** @lends draw2d.io.Reader */
  {

    init: function(){

    },

    /**
     *
     *
     * Restore the canvas from a given String.
     *
     * @param {draw2d.Canvas} canvas the canvas to restore
     * @param {Object} document the document to read
     *
     * @return {draw2d.util.ArrayList} the added elements
     * @template
     */
    unmarshal: function(canvas, document){
        // do nothing. Inherit classes must implement this method
    }

});
