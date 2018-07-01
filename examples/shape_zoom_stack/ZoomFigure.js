
var ZoomFigure = draw2d.shape.layout.StackLayout.extend({

    init : function(attr, getter, setter)
    {
        this._super(attr, getter, setter);

        this.add(new FigureHighDetail(attr));
        this.add(new FigureLowDetail(attr));

        this.setKeepAspectRatio(true);


        this.lastZoom= 1;


        this.createPort("input");
        this.createPort("input");
        this.createPort("output");

        var _this = this;
        var zoomHandler = function(emitter, event){
            var border = 0.7;

            if(_this.lastZoom>=border && event.value<border){
                _this.setVisibleLayer(0,500);
            }
            else if(_this.lastZoom<=border && event.value>border){
                _this.setVisibleLayer(1,700);
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
