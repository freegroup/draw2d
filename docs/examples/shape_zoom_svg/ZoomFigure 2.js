
ZoomFigure = draw2d.SVGFigure.extend({

    NAME : "ZoomFigure",
    
    /**
     * @constructor 
     * Creates a new figure element which is not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init : function(attr, getter, setter)
    {

        this.svg1 = '<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" ><rect id="Rectangle-1" stroke="#979797" fill="#D8D8D8" width="39" height="39" rx="8"></rect></svg>';

        this.svg2 = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">'+
                    '<path stroke="#000" id="svg_3" d="m3.606718,12.334785l8.709842,0l2.691408,-8.967823l2.69141,8.967823l8.70984,0l-7.046397,5.542356l2.691547,8.967823l-7.0464,-5.542507l-7.046399,5.542507l2.691548,-8.967823l-7.046399,-5.542356z" stroke-width="1.5" fill="#fff"/>'+
                    '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="4"  y="10.515114" x="11" stroke="#000" fill="#000000">Star</text>'+
                    '</svg>';

        this.lastZoom= 1;

        this._super($.extend({svg: this.svg1, width:50, height:50},attr), getter, setter);


        this.createPort("input");
        this.createPort("output");

        var _this = this;
        var zoomToggleBorder= 0.8;
        var zoomHandler = function(emitter, event){

            if(_this.lastZoom>=zoomToggleBorder && event.value<zoomToggleBorder){
                _this.setSVG(_this.svg2,500);
            }
            else if(_this.lastZoom<=zoomToggleBorder && event.value>zoomToggleBorder){
                _this.setSVG(_this.svg1,500);
            }
            _this.lastZoom = event.value;
        };

        this.on("added", function(emitter, event){
            event.canvas.on("zoom", zoomHandler);
        });

        this.on("removed", function(emitter, event){
            event.canvas.off("zoom", zoomHandler);
        });
    }
});

