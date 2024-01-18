import draw2d from '../../packages'
import jsonUtil from '../../util/JSONUtil'

/**
 * @class
 * Implements a simple text label.
 *
 *
 * @example
 *
 *    let shape =  new draw2d.shape.basic.Label({text:"This is a simple label", x:40, y:10});
 *
 *    canvas.add(shape);
 *
 * @author Andreas Herz
 * @extends draw2d.SetFigure
 */
draw2d.shape.basic.Label = draw2d.SetFigure.extend(
  /** @lends draw2d.shape.basic.Label.prototype */
  {

    NAME: "draw2d.shape.basic.Label",

    FONT_FALLBACK: {
      'Georgia': 'Georgia, serif',
      'Palatino Linotype': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      'Times New Roman': '"Times New Roman", Times, serif',
      'Arial': 'Arial, Helvetica, sans-serif',
      'Arial Black': '"Arial Black", Gadget, sans-serif',
      'Comic Sans MS': '"Comic Sans MS", cursive, sans-serif',
      'Impact': 'Impact, Charcoal, sans-serif',
      'Lucida Sans Unicode': '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      'Tahoma, Geneva': 'Tahoma, Geneva, sans-seri',
      'Trebuchet MS': '"Trebuchet MS", Helvetica, sans-serif',
      'Verdana': 'Verdana, Geneva, sans-serif',
      'Courier New': '"Courier New", Courier, monospace',
      'Lucida Console': '"Lucida Console", Monaco, monospace'
    },


    /**
     * Creates a new text element.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

      this.text = ""
      // for performance reasons
      //
      this.cachedWidth = null
      this.cachedHeight = null
      this.cachedMinWidth = null
      this.cachedMinHeight = null

      // appearance of the shape
      //
      this.fontSize = 12
      this.fontColor = new draw2d.util.Color("#080808")
      this.fontFamily = null
      this.padding = {top: 4, right: 4, bottom: 4, left: 4}

      this.outlineStroke = 0
      this.outlineColor = new draw2d.util.Color(null)

      this.textAlign = "left";

      this.bold = false

      // behavior of the shape
      //
      this.editor = null

      this._super(
        {stroke: 1, width: 1, height: 1, resizeable: false, ...attr},
        {
          // @attr {String} text the text to show */
          text: this.setText,
          // @attr {String} set the editor to use see {@link draw2d.ui.LabelEditor} */
          editor: this.installEditor,
          // @attr {Number} outlineStroke the line width of the text to draw. Fill color and outline of the text can be different. */
          outlineStroke: this.setOutlineStroke,
          // @attr {String|draw2d.util.Color} outlineColor the outline color of the text */
          outlineColor: this.setOutlineColor,
          // @attr {String} fontFamily the font to use*/
          fontFamily: this.setFontFamily,
          // @attr {Number} fontSize the font size to use */
          fontSize: this.setFontSize,
          // @attr {String|draw2d.util.Color} fontColor the font color */
          fontColor: this.setFontColor,
          // @attr {Number} padding the padding in pixel around the text */
          padding: this.setPadding,
          // @attr {Boolean} bold indicator if bold text should be used*/
          bold: this.setBold,

          textAlign: this.textAlign,
          ...setter},
        {
          text: this.getText,
          outlineStroke: this.getOutlineStroke,
          outlineColor: this.getOutlineColor,
          fontFamily: this.getFontFamily,
          fontSize: this.getFontSize,
          fontColor: this.getFontColor,
          padding: this.getPadding,
          bold: this.isBold,
          textAlign: this.textAlign,
          ...getter
        }
      )

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())
      // some performance improvements
      this.lastAppliedLabelRotation = ""
      this.lastAppliedTextAttributes = {}
    },

    /**
     *
     * Creates the shape object for a text node.
     *
     * @private
     **/
    createSet: function () {
      return this.canvas.paper.set([this.canvas.paper.text(0, 0, this.text)])
    },

    /**
     *
     * Set the canvas element of this figures.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     * @private
     */
    setCanvas: function (canvas) {
      this.clearCache()
      this._super(canvas)
      this.clearCache()
    },

    /**
     *
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     *
     * @private
     **/
    repaint: function (attributes) {
      if (this.repaintBlocked === true || this.shape === null || (this.parent && this.parent.repaintBlocked === true)) {
        return
      }

      // style the label
      let lattr = this.calculateTextAttr()
      lattr.text = this.text

      let attrDiff = jsonUtil.flatDiff(lattr, this.lastAppliedTextAttributes)
      this.lastAppliedTextAttributes = lattr

      // the two "attr" calls takes 2/3 of the complete method call (chrome performance check).
      // now we check if any changes happens and call this method only if necessary.
      if (Object.getOwnPropertyNames(attrDiff).length > 0) {
        this.svgNodes.attr(lattr)
        // set of the x/y must be done AFTER the font-size and bold has been set.
        // Reason: the getBBox method needs the font attributes for calculation
        this.svgNodes.attr({
          x: (this.padding.left + this.stroke),
          y: (this.svgNodes.getBBox(true).height / 2 + this.padding.top + this.getStroke())
        })
      }
      this._super(attributes)
    },


    /**
     *
     * @private
     */
    calculateTextAttr: function () {
      let lattr = {
        "text-anchor": "start",
        "text-align": this.textAlign,
        "font-size": this.fontSize,
        "font-weight": (this.bold === true) ? "bold" : "normal",
        fill: this.fontColor.rgba(),
        stroke: this.outlineColor.rgba(),
        "stroke-width": this.outlineStroke,
      }
      if (this.fontFamily !== null) {
        lattr["font-family"] = this.fontFamily
      }
      return lattr
    },

    /**
     * @private
     * @returns {this}
     */
    applyTransformation: function () {
      let ts = "R" + this.rotationAngle
      this.shape.transform(ts)
      this.lastAppliedLabelRotation = ts

      this.svgNodes.transform(
        "R" + this.rotationAngle +
        "T" + this.getAbsoluteX() + "," + this.getAbsoluteY())

      return this
    },


    /**
     *
     * Set the new font size in [pt].
     *
     * @returns {this}
     * @param {Number} size The new font size in <code>pt</code>
     **/
    setFontSize: function (size) {
      this.clearCache()
      this.fontSize = size

      this.repaint()

      this.fireEvent("change:fontSize", {value: this.fontSize})
      this.fireEvent("resize")

      // Update the resize handles if the user change the position of the element via an API call.
      //
      this.editPolicy.each( (i, e) =>{
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.moved(this.canvas, this)
        }
      })

      return this
    },

    /**
     *
     * Return the current used font size in px.
     *
     * @returns {Number}
     * @since 4.0.1
     */
    getTextAlign: function () {
      return this.textAlign
    },

     /**
     *
     * Set the new text align in [pt].
     *
     * @returns {this}
     * @param {String} textAlign The new textAlign in <code>pt</code>
     **/
     setTextAlign: function (textAlign) {
      this.clearCache()
      this.textAlign = textAlign

      this.repaint()

      this.fireEvent("change:textAlign", {value: this.textAlign})
      this.fireEvent("resize")

      // Update the resize handles if the user change the position of the element via an API call.
      //
      this.editPolicy.each( (i, e) =>{
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.moved(this.canvas, this)
        }
      })

      return this
    },


    /**
     *
     * Set the label to <b>bold</b> or <b>normal</b> font weight.
     *
     * @param {Boolean} bold The bold flag for the label
     * @since 2.4.1
     * @returns {this}
     **/
    setBold: function (bold) {
      this.clearCache()
      this.bold = bold
      this.repaint()

      this.fireEvent("change:bold", {value: this.bold})
      this.fireEvent("resize")

      // Update the resize handles if the user change the position of the element via an API call.
      //
      this.editPolicy.each((i, e) =>{
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.moved(this.canvas, this)
        }
      })

      return this
    },

    /**
     *
     * Return the "bold" attribute of the label
     *
     * @since 5.0.0
     * @returns {Boolean}
     */
    isBold: function () {
      return this.bold
    },

    /**
     *
     * Set the outline color of the font.
     *
     * @param {draw2d.util.Color/String} color The new color of the line.
     * @since 4.2.1
     * @returns {this}
     **/
    setOutlineColor: function (color) {
      this.outlineColor = new draw2d.util.Color(color)
      this.repaint()
      this.fireEvent("change:outlineColor", {value: this.outlineColor})

      return this
    },

    /**
     *
     * The outline color of the text
     *
     * @returns {draw2d.util.Color}
     * @since 4.2.1
     */
    getOutlineColor: function () {
      return this.outlineColor
    },

    /**
     *
     * Set the stroke of the text to use.
     *
     * @param {Number} w The new line width of the figure
     * @since 4.2.1
     * @returns {this}
     **/
    setOutlineStroke: function (w) {
      this.outlineStroke = w
      this.repaint()
      this.fireEvent("change:outlineStroke", {value: this.outlineStroke})

      return this
    },

    /**
     *
     * The used outline line width.
     *
     * @type {Number}
     * @since 4.2.1
     **/
    getOutlineStroke: function () {
      return this.outlineStroke
    },

    /**
     *
     * Set the color of the font.
     *
     * @param {draw2d.util.Color|String} color The new color of the line.
     * @returns {this}
     **/
    setFontColor: function (color) {
      this.fontColor = new draw2d.util.Color(color)
      this.repaint()
      this.fireEvent("change:fontColor", {value: this.fontColor})

      return this
    },

    /**
     *
     * The current used font color
     *
     * @returns {draw2d.util.Color}
     */
    getFontColor: function () {
      return this.fontColor
    },

    /**
     *
     * Set the padding of the element
     *
     *     // Alternatively you can use the attr method:
     *     //
     *     // set the padding for top,left,bottom,right in one call
     *     figure.attr({
     *       padding: 3
     *     });
     *
     *     // update the padding left and top
     *     figure.attr({
     *       padding: {left:3, top:30}
     *     });
     *
     * @param {Number|Object} padding The new padding
     * @returns {this}
     **/
    setPadding: function (padding) {
      this.clearCache()
      if (typeof padding === "number") {
        this.padding = {top: padding, right: padding, bottom: padding, left: padding}
      } else {
        this.padding = {...this.padding, ...padding}
      }
      this.repaint()
      this.fireEvent("change:padding", {value: this.padding})

      return this
    },


    /**
     *
     * Get the padding of the element.
     *
     * @since 4.0.1
     **/
    getPadding: function () {
      return this.padding
    },

    /**
     *
     * Set the font family to use. If you use the shown font names the typical fallback
     * font are installed as well.
     *
     * <b>Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Georgia'">Georgia</span></li>
     *  <li><span style="font-family:'Palatino Linotype'">Palatino Linotype</span></li>
     *  <li><span style="font-family:'Times New Roman'">Times New Roman</span></li>
     * </ul>
     *
     * <b>Sans-Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Arial'">Arial</span></li>
     *  <li><span style="font-family:'Arial Black'">Arial Black</span></li>
     *  <li><span style="font-family:'Comic Sans MS'">Comic Sans MS</span></li>
     *  <li><span style="font-family:'Impact, Charcoal'">Impact, Charcoal</span></li>
     *  <li><span style="font-family:'Lucida Sans Unicode'">Lucida Sans Unicode</span></li>
     *  <li><span style="font-family:'Tahoma, Geneva'">Tahoma, Geneva</span></li>
     *  <li><span style="font-family:'Trebuchet MS'">Trebuchet MS</span> </li>
     *  <li><span style="font-family:'Verdana'">Verdana</span></li>
     * </ul>
     *
     * <b>Monospace Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Courier New'">Courier New</span></li>
     *  <li><span style="font-family:'Lucida Console'">Lucida Console</span></li>
     * </ul>
     *
     * @param {String} font The font to use
     * @returns {this}
     **/
    setFontFamily: function (font) {
      this.clearCache()

      // check for fallback
      //
      if ((typeof font !== "undefined") && font !== null && typeof this.FONT_FALLBACK[font] !== "undefined") {
        font = this.FONT_FALLBACK[font]
      }

      this.fontFamily = font
      this.repaint()
      this.fireEvent("change:fontFamily", {value: this.fontFamily})

      return this
    },


    /**
     *
     * Returns the used font family of the label.
     *
     * @returns {String}
     */
    getFontFamily: function () {
      return this.fontFamily
    },


    /**
     *
     * A Label did have "autosize". Do nothing at all.
     *
     * @returns {this}
     **/
    setDimension: function (w, h) {
      this.clearCache()

      this._super(w, h)

      return this
    },

    /**
     *
     * clear the internal cache for width/height precalculation
     * @private
     */
    clearCache: function () {
      this.portRelayoutRequired = true
      this.cachedMinWidth = null
      this.cachedMinHeight = null
      this.cachedWidth = null
      this.cachedHeight = null
      this.lastAppliedTextAttributes = {}

      return this
    },

    /**
     *
     * This value is relevant for the interactive resize of the figure.
     *
     * @returns {Number} Returns the min. width of this object.
     */
    getMinWidth: function () {
      if (this.shape === null) {
        return 0
      }

      this.cachedMinWidth ??= (this.svgNodes.getBBox(true).width + this.padding.left+ this.padding.right + 2*this.getStroke())

      return this.cachedMinWidth
    },

    /**
     *
     * This value is relevant for the interactive resize of the figure.
     *
     * @returns {Number} Returns the min. width of this object.
     */
    getMinHeight: function () {
      if (this.shape === null) {
        return 0
      }
      this.cachedMinHeight ??= (this.svgNodes.getBBox(true).height+ this.padding.top+ this.padding.bottom+ 2*this.getStroke())

      return this.cachedMinHeight
    },

    /**
     *
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     *
     * @returns {Number} the calculated width of the label
     **/
    getWidth: function () {
      if (this.shape === null) {
        return 0
      }

      if (this.cachedWidth === null) {
        if (this.resizeable === true) {
          this.cachedWidth = Math.max(this.width, this.getMinWidth())
        } else {
          this.cachedWidth = this.getMinWidth()
        }
      }


      return this.cachedWidth
    },

    /**
     *
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     *
     * @returns {Number} the calculated height of the label
     */
    getHeight: function () {
      if (this.shape === null) {
        return 0
      }

      this.cachedHeight ??= Math.max(this.height, this.getMinHeight())

      return this.cachedHeight
    },

    /**
     *
     * Set an editor for the label. This can be a dialog or inplace editor for the
     * Text.<br>
     * The editor will be activated if you doubleClick on the label.
     *
     * @param {draw2d.ui.LabelEditor|String} editor
     */
    installEditor: function (editor) {
      if (typeof editor === "string") {
        editor = Function(`return new ${editor}()`)()
      }
      this.editor = editor

      return this
    },

    /**
     *
     * Called when a user dbl clicks on the element
     *
     */
    onDoubleClick: function () {
        this.editor?.start(this)
    },


    /**
     *
     * Returns the current text of the label.
     *
     * @returns the current display text of the label
     * @type {String}
     **/
    getText: function () {
      return this.text
    },

    /**
     *
     * Set the text for the label. Use \n for multiline text.
     *
     * @param {String} text The new text for the label.
     * @returns {this}
     **/
    setText: function (text) {
      this.clearCache()
      this.text = text

      this.repaint()
      // Update the resize handles if the user change the position of the element via an API call.
      //
      this.editPolicy.each((i, e) => {
        if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
          e.moved(this.canvas, this)
        }
      })

      this.fireEvent("resize")
      this.fireEvent("change:text", {value: this.text})

      this.parent?.repaint()

      return this
    },


    /**
     *
     * Detect whenever the hands over coordinate is inside the figure.
     * The default implementation is a simple bounding box test.
     *
     * @param {Number} iX
     * @param {Number} iY
     * @param {Number} [corona]
     *
     * @returns {Boolean}
     */
    hitTest: function (x, y, corona) {

      // apply a simple bounding box test if the label isn'T rotated
      //
      if (this.rotationAngle === 0) {
        return this._super(x, y, corona)
      }

      let boundingBox = this.getBoundingBox()
      if (typeof corona === "number") {
        boundingBox.scale(corona, corona)
      }

      // rotate the box with the current matrix of the
      // shape
      let matrix = this.shape.matrix
      let points = boundingBox.getVertices()
      points.each( (i, point) => {
        point.x = matrix.x(point.x, point.y)
        point.y = matrix.y(point.x, point.y)
      })

      let polySides = 4

      let j = polySides - 1
      let oddNodes = false

      for (let i = 0; i < polySides; i++) {
        let pi = points.get(i)
        let pj = points.get(j)
        if ((pi.y < y && pj.y >= y
          || pj.y < y && pi.y >= y)
          && (pi.x <= x || pj.x <= x)) {
          if (pi.x + (y - pi.y) / (pj.y - pi.y) * (pj.x - pi.x) < x) {
            oddNodes = !oddNodes
          }
        }
        j = i
      }
      return oddNodes
    },


    /**
     *
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
      let memento = this._super()

      memento.text = this.text
      memento.outlineStroke = this.outlineStroke
      memento.outlineColor = this.outlineColor.rgba()
      memento.fontSize = this.fontSize
      memento.fontColor = this.fontColor.rgba()
      memento.fontFamily = this.fontFamily

      if (this.editor !== null) {
        memento.editor = this.editor.NAME
      }
      return memento
    },

    /**
     *
     * Apply all attributes from the serialized properties to the shape.
     * Used during JSON serialisation.
     *
     * @param {Object} memento
     * @returns {this}
     */
    setPersistentAttributes: function (memento) {
      this._super(memento)
      if (typeof memento.text !== "undefined") {
        this.setText(memento.text)
      }
      if (typeof memento.outlineStroke !== "undefined") {
        this.setOutlineStroke(memento.outlineStroke)
      }
      if (typeof memento.outlineColor !== "undefined") {
        this.setOutlineColor(memento.outlineColor)
      }
      if (typeof memento.fontFamily !== "undefined") {
        this.setFontFamily(memento.fontFamily)
      }
      if (typeof memento.fontSize !== "undefined") {
        this.setFontSize(memento.fontSize)
      }
      if (typeof memento.fontColor !== "undefined") {
        this.setFontColor(memento.fontColor)
      }

      if (typeof memento.editor === "string") {
        this.installEditor(Function(`return new ${memento.editor}()`)())
      }

      return this
    }

  })



