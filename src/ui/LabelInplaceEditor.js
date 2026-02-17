import draw2d from '../packages'
import {fadeIn, fadeOut} from '../util/Animation'


/**
 * @class
 *
 * Inplace editor for draw2d.shape.base.Label
 *
 * @example
 *
 *    let label =  new draw2d.shape.basic.Label({text:"Double Click on me"});
 *
 *    label.installEditor(new draw2d.ui.LabelInplaceEditor({
 *       // called after the value has been set to the LabelFigure
 *       onCommit: function(value){
 *           alert("new value set to:"+value);
 *       },
 *       // called if the user abort the operation
 *       onCancel: function(){
 *       }
 *    }));
 *
 *    canvas.add(label,50,10);
 *
 * @author Andreas Herz
 * @extends draw2d.ui.LabelEditor
 */
draw2d.ui.LabelInplaceEditor = draw2d.ui.LabelEditor.extend(
  /** @lends draw2d.ui.LabelInplaceEditor.prototype */
  {

    NAME: "draw2d.ui.LabelInplaceEditor",

    init: function (listener) {
      this._super()

      // register some default listener and override this with the handover one
      this.listener = {
        onCommit: function () {
        },
        onCancel: function () {
        },
        onStart: function () {
        }
      , ...listener}
    },

    /**
     *
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function (label) {
      this.label = label
      this.canvas = label.getCanvas()

      this.commitCallback = () => this.commit()

      // commit the editor if the user clicks anywhere in the document
      //
      document.body.addEventListener("click", this.commitCallback)

      // append the input field to the document and register
      // the ENTER and ESC key to commit /cancel the operation
      //
      this.html = document.createElement('input')
      this.html.className = 'draw2d-label-inplace-editor'
      this.html.value = label.getText()
      this.html.style.display = 'none'

      document.body.appendChild(this.html)

      this.installAutoResize(this.html)

      this.html.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          this.commit()
        } else if (e.key === "Escape") {
          this.cancel()
        }
      })

      this.html.addEventListener("blur", this.commitCallback)

      // avoid commit of the operation if we click inside the editor
      //
      this.html.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
      })

      // Position the INPUT element and install scroll/zoom handlers
      this.positionInput()
      this.installScrollHandler()
      this.installZoomHandler()
      
      fadeIn(this.html, 200, () => {
        this.html.focus()
        this.listener.onStart()
      })
    },

    /**
     * Position the input element over the label
     * @private
     */
    positionInput: function() {
      let bb = this.label.getBoundingBox()
      bb.setPosition(this.canvas.fromCanvasToDocumentCoordinate(bb.x, bb.y))

      // If canvas is directly in body, we need to add back the scroll position
      // because fromCanvasToDocumentCoordinate subtracts it, but the input element
      // is position:absolute to body which doesn't account for scroll
      let scrollArea = this.canvas.getScrollArea()
      let scrollElement = scrollArea.jquery ? scrollArea[0] : scrollArea
      if (scrollElement === document.body) {
        bb.translate(this.canvas.getScrollLeft(), this.canvas.getScrollTop())
      }

      bb.translate(-1, -1)
      bb.resize(2, 2)

      Object.assign(this.html.style, {
        position: "absolute",
        top: bb.y + "px",
        left: bb.x + "px",
        minWidth: (bb.w * (1 / this.canvas.getZoom())) + "px",
        height: Math.max(25, bb.h * (1 / this.canvas.getZoom())) + "px"
      })
    },

    /**
     * Install scroll handler to reposition input when scrollArea scrolls
     * @private
     */
    installScrollHandler: function() {
      this.scrollHandler = () => this.positionInput()
      
      // Get scroll area - can be jQuery object or native element
      let scrollArea = this.canvas.getScrollArea()
      let element = scrollArea.jquery ? scrollArea[0] : scrollArea
      let parent = element.parentElement
      
      // Only add scroll handler if there's a custom scroll container (not body)
      // When scrollArea is body or parent is body, the input (position:absolute to body)
      // will automatically scroll with the page, no handler needed.
      // fromCanvasToDocumentCoordinate already accounts for scroll position.
      if (element !== document.body && parent && parent !== document.body) {
        this.scrollElement = parent
        this.scrollElement.addEventListener("scroll", this.scrollHandler)
      }
    },

    /**
     * Remove scroll handler
     * @private
     */
    uninstallScrollHandler: function() {
      if (this.scrollHandler) {
        if (this.scrollElement) {
          this.scrollElement.removeEventListener("scroll", this.scrollHandler)
          this.scrollElement = null
        }
        this.scrollHandler = null
      }
    },

    /**
     * Install zoom handler to reposition input when canvas zooms
     * @private
     */
    installZoomHandler: function() {
      this.zoomHandler = () => this.positionInput()
      this.canvas.on("zoom", this.zoomHandler)
    },

    /**
     * Remove zoom handler
     * @private
     */
    uninstallZoomHandler: function() {
      if (this.zoomHandler) {
        this.canvas.off(this.zoomHandler)
        this.zoomHandler = null
      }
    },

    /**
     * Install auto-resize behavior on an input element.
     * Automatically adjusts the input width based on content.
     *
     * @param {HTMLInputElement} input the input element to auto-resize
     * @private
     */
    installAutoResize: function(input) {
      // Create invisible measurement element
      this.measureSpan = document.createElement('span')
      this.measureSpan.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        font: ${getComputedStyle(input).font};
        padding: ${getComputedStyle(input).padding};
        letter-spacing: ${getComputedStyle(input).letterSpacing};
      `
      document.body.appendChild(this.measureSpan)
      
      // Resize function
      this.resizeHandler = () => {
        this.measureSpan.textContent = input.value || input.placeholder || 'M'
        const newWidth = this.measureSpan.offsetWidth + 20
        input.style.width = newWidth + 'px'
      }
      
      input.addEventListener('input', this.resizeHandler)
      this.resizeHandler() // Initial sizing
    },

    /**
     * Remove auto-resize behavior and clean up
     * @private
     */
    uninstallAutoResize: function() {
      if (this.measureSpan) {
        this.measureSpan.remove()
        this.measureSpan = null
      }
      if (this.html && this.resizeHandler) {
        this.html.removeEventListener('input', this.resizeHandler)
        this.resizeHandler = null
      }
    },

    /**
     *
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     *
     * @private
     */
    commit: function () {
      this.html.removeEventListener("blur", this.commitCallback)
      document.body.removeEventListener("click", this.commitCallback)
      this.uninstallScrollHandler()
      this.uninstallZoomHandler()
      this.uninstallAutoResize()
      let labelText = this.html.value
      let cmd = new draw2d.command.CommandAttr(this.label, {text: labelText})
      this.label.getCanvas().getCommandStack().execute(cmd)
      fadeOut(this.html, 200, () => {
        this.html.remove()
        this.html = null
        this.listener.onCommit(this.label.getText())
      })
    },

    /**
     *
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     * @private
     */
    cancel: function () {
      this.html.removeEventListener("blur", this.commitCallback)
      document.body.removeEventListener("click", this.commitCallback)
      this.uninstallScrollHandler()
      this.uninstallZoomHandler()
      this.uninstallAutoResize()
      fadeOut(this.html, 200, () => {
        this.html.remove()
        this.html = null
        this.listener.onCancel()
      })
    }
  })