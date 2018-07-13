/**
 * @class draw2d.io.png.Writer
 * Convert the canvas document into a PNG Image.
 *
 *     // example how to create a PNG image and set an
 *     // image src attribute.
 *     //
 *     var writer = new draw2d.io.png.Writer();
 *     writer.marshal(canvas, function(png){
 *         $("#preview").attr("src",png);
 *     });
 *
 * @author Andreas Herz
 * @extends draw2d.io.Writer
 */
import draw2d from '../../packages';


var canvg = require('canvg-browser');

draw2d.io.png.Writer = draw2d.io.Writer.extend({

    init: function(){
        this._super();
    },

    /**
     * @method
     * Export the content to a PNG image. The result can be set as <b>src="...."</b> because
     * the result is encoded as data source url <b>data:image/png;base64....</b>
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     * @param {draw2d.Canvas} canvas
     * @param {Function} resultCallback the method to call on success. The first argument is the dataUrl, the second is the base64 formated png image
     * @param {String} resultCallback.img  The image as data source url <b>data:image/png;base64....</b>
     * @param {String} resultCallback.base64  the image encoded in base64
     * @param {draw2d.geo.Rectangle} cropBoundingBox optional cropping/clipping bounding box
     */
    marshal: function(canvas, resultCallback, cropBoundingBox){
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if(typeof resultCallback !== "function"){
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }


        var svg = "";

        // the png.Writer can create Snapshots of a singel figure too.
        // Didn't work in IE <10
        // @status beta
        // @since 5.5.0
        if(canvas instanceof draw2d.Figure){
            var origPos = canvas.getPosition();
            canvas.setPosition(1,1);
            svg =   "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" >"
                  + canvas.shape.node.outerHTML
                  + "</svg>";
            canvas.setPosition(origPos);
            canvas.initialWidth = canvas.getWidth()+2;
            canvas.initialHeight= canvas.getHeight()+2;
        }
        // create a snapshot of a complete canvas
        //
        else {
            canvas.hideDecoration();
            svg = canvas.getHtmlContainer().html().replace(/>\s+/g, ">").replace(/\s+</g, "<");

            // add missing namespace for images in SVG if missing
            // depends on raphaelJS version
            if(!svg.includes("http://www.w3.org/1999/xlink")) {
                svg = svg.replace("<svg ", "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");
            }
        }

        // required for IE9 support.
        // The following table contains ready-to-use conditions to detec IE Browser versions
        //
        // IE versions     Condition to check for
        // ------------------------------------------------------------
        // 10 or older     document.all
        // 9 or older      document.all && !window.atob
        // 8 or older      document.all && !document.addEventListener
        // 7 or older      document.all && !document.querySelector
        // 6 or older      document.all && !window.XMLHttpRequest
        // 5.x             document.all && !document.compatMode
        if(document.all){
            svg = svg.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
        }

        let canvasDomNode= $('<canvas id="canvas_png_export_for_draw2d" style="display:none"></canvas>');
        $('body').append(canvasDomNode);
        let fullSizeCanvas = $("#canvas_png_export_for_draw2d")[0];
        fullSizeCanvas.width = canvas.initialWidth;
        fullSizeCanvas.height = canvas.initialHeight;

        canvg("canvas_png_export_for_draw2d", svg, {
            ignoreMouse: true,
            ignoreAnimation: true,
            renderCallback: function(){
                try{
                    if(canvas instanceof draw2d.Canvas)
                        canvas.showDecoration();

                    if(typeof cropBoundingBox!=="undefined"){
                      let sourceX = cropBoundingBox.x;
                      let sourceY = cropBoundingBox.y;
                      let sourceWidth = cropBoundingBox.w;
                      let sourceHeight = cropBoundingBox.h;

                      let croppedCanvas = document.createElement('canvas');
                      croppedCanvas.width = sourceWidth;
                      croppedCanvas.height = sourceHeight;

                      croppedCanvas.getContext("2d").drawImage(fullSizeCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0,sourceWidth, sourceHeight);

                      var dataUrl = croppedCanvas.toDataURL("image/png");
                      var base64Image = dataUrl.replace("data:image/png;base64,","");
                      resultCallback(dataUrl, base64Image);
                    }
                    else{
                        var img = fullSizeCanvas.toDataURL("image/png");
                        resultCallback(img,img.replace("data:image/png;base64,",""));
                    }
                }
                finally{
                    canvasDomNode.remove();
                }
           }
        }) ;
    }
});
