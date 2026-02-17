import draw2d from '../../packages'
const canvg = require('canvg-browser')

/**
 * @class
 *
 * Converts the canvas document into a PNG Image.
 *
 * @example
 *    // example how to create a PNG image and set an
 *    // image src attribute.
 *    //
 *    let writer = new draw2d.io.png.Writer();
 *    writer.marshal(canvas, function(png){
 *        document.getElementById("preview").src = png;
 *    });
 *
 * @author Andreas Herz
 * @extends draw2d.io.Writer
 */
draw2d.io.png.Writer = draw2d.io.Writer.extend(
  /** @lends draw2d.io.png.Writer */
  {

    init: function () {
      this._super()
    },

    /**
     *
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
    marshal: function (canvas, resultCallback, cropBoundingBox) {
      // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
      // if any application not care about this changes.
      if (typeof resultCallback !== "function") {
        throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
      }

      let svg = ""
      let canvasState = false

      // the png.Writer can create Snapshots of a single figure too.
      // Didn't work in IE <10
      // @status beta
      // @since 5.5.0
      if (canvas instanceof draw2d.Figure) {
        let figure = canvas
        let origPos = figure.getPosition()
        figure.setPosition(1, 1)
        svg = "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" >"
          + figure.shape.node.outerHTML
          + "</svg>";
        figure.setPosition(origPos);
        figure.initialWidth = figure.getWidth() + 2
        figure.initialHeight = figure.getHeight() + 2
      }
      // create a snapshot of a complete canvas
      //
      else {
        canvasState = {
          zoom: canvas.getZoom(),
          scrollLeft: canvas.getScrollLeft(),
          scrollTop: canvas.getScrollTop(),
        }
        canvas.setZoom(1.0)
        canvas.hideDecoration()
        // canvas.getHtmlContainer() returns jQuery object, use [0] to get native element
        // then use querySelector to find the SVG
        let htmlContainer = canvas.getHtmlContainer()
        let containerElement = htmlContainer[0] || htmlContainer
        svg = (new XMLSerializer()).serializeToString(containerElement.querySelector("svg"));
      }

      // Create canvas element using native DOM
      let fullSizeCanvas = document.createElement('canvas')
      fullSizeCanvas.id = 'canvas_png_export_for_draw2d'
      fullSizeCanvas.width = canvas.initialWidth
      fullSizeCanvas.height = canvas.initialHeight
      document.body.appendChild(fullSizeCanvas)

      canvg("canvas_png_export_for_draw2d", svg, {
        ignoreMouse: true,
        ignoreAnimation: true,
        renderCallback: function () {
          try {
            if (canvas instanceof draw2d.Canvas) {
              if(canvasState) {
                canvas.setZoom(canvasState.zoom)
                canvas.setScrollLeft(canvasState.scrollLeft)
                canvas.setScrollTop(canvasState.scrollTop)
              }
              canvas.showDecoration();
            }

            if (typeof cropBoundingBox !== "undefined") {
              let sourceX = cropBoundingBox.x
              let sourceY = cropBoundingBox.y
              let sourceWidth = cropBoundingBox.w
              let sourceHeight = cropBoundingBox.h

              let croppedCanvas = document.createElement('canvas')
              croppedCanvas.width = sourceWidth
              croppedCanvas.height = sourceHeight

              croppedCanvas.getContext("2d").drawImage(fullSizeCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

              let dataUrl = croppedCanvas.toDataURL("image/png")
              let base64Image = dataUrl.replace("data:image/png;base64,", "")
              resultCallback(dataUrl, base64Image)
            } else {
              let img = fullSizeCanvas.toDataURL("image/png")
              resultCallback(img, img.replace("data:image/png;base64,", ""))
            }
          } finally {
            // Remove the canvas element using native DOM
            fullSizeCanvas.remove()
          }
        }
      })
    }
  })