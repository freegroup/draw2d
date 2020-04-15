
MarkdownFigure = draw2d.shape.basic.Rectangle.extend({
  NAME: "MarkdownFigure",

  init : function(attr)
  {
      this._super($.extend({bgColor:"#00a3f6",color:"#1B1B1B"},attr));
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
      })

      this.on("removed", (emitter, event)=>{
        this.overlay.remove()
      })

    this.on("change:dimension", (emitter, event)=>{
      this.overlay.css({width: event.width,height: event.height})
    })
    this.on("move", (emitter, event)=>{
      this.overlay.css({ top: event.y,left: event.x })
    })
  }



});
