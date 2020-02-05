import draw2d from '../packages';

/**
 * @class
 *
 * Serialize the canvas to an external format. This is only a template/interface class.
 * Inherit classes must implement the export format.
 *
 * @author Andreas Herz
 */
draw2d.io.Writer = Class.extend(
  /** @lends draw2d.io.Writer */

  {
    init: function(){
    },

    /**
     * 
     * Export the content to the implemented data format. Inherit class implements
     * content specific writer.
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     * @template
     * @since 2.10.1
     * @param {draw2d.Canvas} canvas
     * @param {Function} resultCallback the method to call on success. The first argument is the result object, the second the base64 content of a corresponding file
     * @returns {Object}
     *
     */
    marshal: function(canvas, resultCallback){
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if(typeof resultCallback !== "function"){
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }


        resultCallback("", "");
    },

    /**
     * 
     * utility method to format a given XML string.
     *
     * @param xml
     * @returns {String}
     */
    formatXml: function(xml) {
        let formatted = '';
        let reg = new RegExp("(>)(<)(\/*)","g");
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach(function(node) {
            let indent = 0;
            if (node.match( new RegExp(".+<\/\w[^>]*>$") )) {
                indent = 0;
            } else if (node.match( new RegExp("^<\/\w") )) {
                if (pad != 0) {
                    pad -= 1;
                }
            } else if (node.match( new RegExp("^<\w[^>]*[^\/]>.*$") )) {
                indent = 1;
            } else {
                indent = 0;
            }

            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    }
});
