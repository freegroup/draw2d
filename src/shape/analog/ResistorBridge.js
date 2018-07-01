
/**
 * @class draw2d.shape.analog.ResistorBridge
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.ResistorBridge({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
import draw2d from '../../packages';
draw2d.shape.analog.ResistorBridge = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.ResistorBridge",

    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.PortLocator.extend({
        init: function( ){
          this._super();
        },
        relocate: function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure,w/2+1, h*index);
        }
    }),

    // custom locator for the special design of the ResistorBridge Input area
    MyOutputPortLocator : draw2d.layout.locator.PortLocator.extend({
        init: function( ){
          this._super();
        },
        relocate: function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();

            this.applyConsiderRotation(figure,w*(index-2), h/2);
        }
    }),


    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter ){

        this._super(extend({width:50, height:50},attr), setter, getter);

        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid",this.inputLocator);
        this.createPort("hybrid",this.inputLocator);

        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    },


    /**
     * @inheritdoc
     */
    getSVG: function(){
         return '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">'+
                 '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12322" d="m47.62207,22.71094l0,0c0.73145,0.73242 0.71777,1.93359 -0.03027,2.68164c-0.74805,0.74951 -1.94922,0.76123 -2.68073,0.0293c-0.73138,-0.73242 -0.71967,-1.93211 0.03033,-2.68115c0.74707,-0.74803 1.94727,-0.76219 2.68066,-0.02979l0,0z"/>'+
                 '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12324" d="m25.84082,0.93115l0,0c0.73145,0.73096 0.71875,1.93359 -0.02832,2.68066c-0.75,0.74951 -1.94922,0.76123 -2.68164,0.0293c-0.73242,-0.73241 -0.71973,-1.93164 0.0293,-2.68065c0.74805,-0.74756 1.94922,-0.76172 2.68066,-0.0293l0,0l0,-0.00002z"/>'+
                 '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12326" d="m25.75098,44.58203l0,0c0.73145,0.73193 0.71875,1.93311 -0.02832,2.68115c-0.75,0.74902 -1.94922,0.76074 -2.68262,0.0293c-0.73145,-0.73193 -0.71973,-1.93262 0.03033,-2.68164c0.74707,-0.74756 1.94922,-0.76123 2.68066,-0.02879l0,0l-0.00006,-0.00002z"/>'+
                 '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12328" d="m3.9707,22.80127l0,0c0.73242,0.73193 0.71777,1.93359 -0.0293,2.68115c-0.74902,0.74951 -1.94922,0.76172 -2.68164,0.0293c-0.73145,-0.73242 -0.71973,-1.93164 0.03027,-2.68115c0.74707,-0.74707 1.94922,-0.76074 2.68066,-0.0293l0,0z"/>'+
                 '<polyline fill="none" stroke="#010101" id="polyline12334" points="24.908203125,45.49267578125 31.71875,38.68310546875 31.2119140625,36.98876953125 34.892578125,37.95703125 33.953125,34.22265625 37.6650390625,35.18359375 36.6767578125,31.52490234375 40.3759765625,32.47314453125 39.873046875,30.52783203125 45.884765625,24.51708984375 " stroke-miterlimit="14.3"/>'+
                 '<polyline fill="#010101" id="polyline12338" points="36.3408203125,23.98876953125 38.146484375,29.55810546875 33.630859375,29.55810546875 35.435546875,23.98779296875 "/>'+
                 '<line fill="none" stroke="#010101" id="line12340" y2="28.90967" x2="35.8877" y1="41.13428" x1="35.88867" stroke-miterlimit="14.3"/>'+
                 '<polyline fill="none" stroke="#010101" id="polyline12346" points="3.2109375,23.79248046875 10.01953125,16.98388671875 9.513671875,15.2890625 13.193359375,16.25732421875 12.251953125,12.5234375 15.9658203125,13.48486328125 14.9775390625,9.82568359375 18.6767578125,10.7734375 18.173828125,8.82958984375 24.185546875,2.81787109375 " stroke-miterlimit="14.3"/>'+
                 '<polyline fill="#010101" id="polyline12350" points="13.126953125,23.80419921875 11.3212890625,18.236328125 15.8369140625,18.236328125 14.0322265625,23.806640625 "/>'+
                 '<line fill="none" stroke="#010101" id="line12352" y2="18.8833" x2="13.58008" y1="6.65967" x1="13.5791" stroke-miterlimit="14.3"/>'+
                 '<polyline fill="none" stroke="#010101" id="polyline12358" points="46.65625,24.33642578125 39.84765625,17.52783203125 38.154296875,18.033203125 39.1220703125,14.353515625 35.3876953125,15.29345703125 36.34765625,11.58056640625 32.689453125,12.56884765625 33.6376953125,8.86865234375 31.6923828125,9.373046875 24.322265625,2.00341796875 " stroke-miterlimit="14.3"/>'+
                 '<polyline fill="#010101" id="polyline12362" points="36.578125,1.87109375 38.3828125,7.439453125 33.8681640625,7.439453125 35.6728515625,1.869140625 "/>'+
                 '<line fill="none" stroke="#010101" id="line12364" y2="6.7915" x2="36.125" y1="19.01758" x1="36.125" stroke-miterlimit="14.3"/>'+
                 '<polyline fill="none" stroke="#010101" id="polyline12370" points="24.494140625,46.49951171875 17.685546875,39.69091796875 15.9921875,40.1953125 16.958984375,36.515625 13.2265625,37.45556640625 14.185546875,33.7421875 10.52734375,34.73193359375 11.474609375,31.03125 9.529296875,31.53515625 2.1611328125,24.166015625 " stroke-miterlimit="14.3"/>'+
                 '<polyline fill="#010101" id="polyline12374" points="12.150390625,44.80029296875 10.34765625,39.23193359375 14.861328125,39.23095703125 13.0556640625,44.80224609375 "/>'+
                 '<line fill="none" stroke="#010101" id="line12376" y2="39.87891" x2="12.60352" y1="27.6543" x1="12.60352" stroke-miterlimit="14.3"/>'+
                '</svg>';
    }
});
