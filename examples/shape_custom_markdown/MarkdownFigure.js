
MarkdownFigure = draw2d.shape.basic.Rectangle.extend({
  NAME: "MarkdownFigure",

  init : function(attr)
  {
      this._super($.extend({bgColor:"#00a3f6",color:"#1B1B1B"},attr));

      let updateOverlay = (emitter, {value})=>{
        value ??=1
        this.overlay?.css({
            width: this.getWidth(),
            height: this.getHeight(),
            top: this.getY() * 1/value,
            left: this.getX() * 1/value,
            transform: `scale(${1/value})`,
            "transform-origin": "top left"
        })
    }

    this.markdown = markdown.render(
`
# header code
[link](./link/?param=444)
`
    )

    this.on("added", (emitter, event)=>{
      this.overlay = $(`<div id="${this.id}" style="overflow:hidden;border:1px solid black;position:absolute; top:${this.getY()}px;left:${this.getY()}px">
                      ${this.markdown}
                      </div>`)
      event.canvas.html.append(this.overlay)
      this.overlay.css({
        width: this.getWidth(),
        height: this.getHeight(),
        top: this.getY(),
        left: this.getX()
      })
      event.canvas.on("zoom", updateOverlay)
    })
    .on("removed", (emitter, event) => {
        this.overlay.remove()
        event.canvas.off(updateOverlay)
    })
    .on("change:dimension", (emitter, event) => {
        updateOverlay( emitter, {value: this.canvas?.getZoom()})
    })
    .on("move", (emitter, event) => {
        updateOverlay( emitter, {value: this.canvas?.getZoom()})
    })
  }

});
