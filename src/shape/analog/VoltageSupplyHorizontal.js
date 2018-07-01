
/**
 * @class draw2d.shape.analog.VoltageSupplyHorizontal
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.analog.VoltageSupplyHorizontal({x:10, y:10});
 *     
 *     canvas.add(figure);
 *     
 *     
 * @extends draw2d.SVGFigure
 */ import draw2d from '../../packages';
draw2d.shape.analog.VoltageSupplyHorizontal = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.VoltageSupplyHorizontal",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.PortLocator.extend({
        init: function( ){
          this._super();
        },    
        relocate: function(index, figure){
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure,0, h/2);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : draw2d.layout.locator.PortLocator.extend({
        init: function( ){
          this._super();
        },    
        relocate: function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure,w, h/2);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter ){
        this._super(extend({width:50, height:30},attr), setter, getter);
        
        this.createPort("hybrid", new this.MyInputPortLocator());  // GND
        this.createPort("hybrid", new this.MyOutputPortLocator()); // VCC
    },
    

    /**
     * @inheritdoc
     */
   getSVG: function(){
         return '<svg width="49" height="28" xmlns="http://www.w3.org/2000/svg" version="1.1">'+
                '<path d="m24.99933,18.95592l0,-9.54576m-5.78374,-9.40907l0,28.35939m-5.78718,-9.40457l0,-9.54576m-5.78374,-9.40907l0,28.35939" id="path10566" stroke-miterlimit="14.3" stroke="#010101" fill="none"/>'+
                '<path d="m26.79878,14.13039l6.90583,0m-33.22691,0l6.90583,0" id="path10568" stroke-miterlimit="14.3" stroke-linecap="square" stroke="#010101" fill="none"/>'+
                '</svg>';
    }
});
