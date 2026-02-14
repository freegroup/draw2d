import draw2d from '../../packages'

/**
 * Static markdown-it instance that can be configured before creating Markdown figures.
 * Must be set by the application, e.g.:
 * 
 * @example
 * // Configure markdown-it
 * draw2d.shape.note.Markdown.markdown = window.markdownit({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 */

/**
 * @class
 * 
 * A Markdown figure that renders markdown content in a resizable rectangle.
 * The markdown content is rendered as HTML overlay on the canvas.
 * 
 * @example
 * 
 *    let figure = new draw2d.shape.note.Markdown({
 *        x: 100,
 *        y: 100,
 *        width: 300,
 *        height: 200,
 *        markdown: "# Title\n\nSome **bold** text\n\n- Item 1\n- Item 2"
 *    });
 *    canvas.add(figure);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.note.Markdown = draw2d.shape.basic.Rectangle.extend(
  /** @lends draw2d.shape.note.Markdown.prototype */
  {

  NAME: "draw2d.shape.note.Markdown",

  /**
   * Creates a new Markdown figure
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function(attr, setter, getter) {
    this._super(
      {
        bgColor: "#00a3f6",
        color: "#1B1B1B",
        markdown: "# Header\nDefault markdown content",
        ...attr
      },
      {
        markdown: this.setMarkdown,
        ...setter
      },
      {
        markdown: this.getMarkdown,
        ...getter
      }
    );

    // Render initial markdown
    this._renderMarkdown();

    // Store reference for proper cleanup
    this._zoomHandler = (emitter, {value}) => {
      value = value || 1;
      if (this.overlay) {
        this.overlay.css({
          width: this.getWidth(),
          height: this.getHeight(),
          top: this.getY() * (1/value),
          left: this.getX() * (1/value),
          transform: `scale(${1/value})`,
          "transform-origin": "top left"
        });
      }
    };

    this.on("added", (emitter, event) => {
      this.overlay = $(`<div id="${this.id}" style="overflow:hidden;border:1px solid black;position:absolute; top:${this.getY()}px;left:${this.getX()}px;pointer-events:none;">
                      ${this.markdownHtml}
                      </div>`);
      event.canvas.html.append(this.overlay);
      this.overlay.css({
        width: this.getWidth(),
        height: this.getHeight(),
        top: this.getY(),
        left: this.getX()
      });
      event.canvas.on("zoom", this._zoomHandler);
    })
    .on("removed", (emitter, event) => {
      if (this.overlay) {
        this.overlay.remove();
      }
      event.canvas.off("zoom", this._zoomHandler);
    })
    .on("change:dimension", (emitter, event) => {
      this._zoomHandler(emitter, {value: this.canvas?.getZoom()});
    })
    .on("move", (emitter, event) => {
      this._zoomHandler(emitter, {value: this.canvas?.getZoom()});
    });
  },

  /**
   * Render markdown to HTML
   * 
   * @private
   */
  _renderMarkdown: function() {
    if (draw2d.shape.note.Markdown.markdown) {
      this.markdownHtml = draw2d.shape.note.Markdown.markdown.render(this.markdown);
    } else {
      console.error('draw2d.shape.note.Markdown requires markdown-it library');
      this.markdownHtml = '<div style="color:red;padding:10px;">markdown-it library not loaded</div>';
    }
  },

  /**
   * Set the markdown content
   * 
   * @param {String} text The markdown text to render
   */
  setMarkdown: function(text) {
    this.markdown = text;
    this._renderMarkdown();
    
    if (this.overlay) {
      this.overlay.html(this.markdownHtml);
    }
    
    this.fireEvent("change:markdown", {value: this.markdown});
    return this;
  },

  /**
   * Get the current markdown content
   * 
   * @returns {String}
   */
  getMarkdown: function() {
    return this.markdown;
  }

})
