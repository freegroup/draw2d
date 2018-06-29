
var CustomFigure = draw2d.SVGFigure.extend({

    init : function(attr)
    {
        this._super($.extend({width:100, height:100},attr));

        this.index=0;
        this.svgs=[];

        this.svgs.push( '<svg xmlns="http://www.w3.org/2000/svg">'+
            '  <path stroke="#000" fill="#FFF" stroke-miterlimit="4" d="m0,49.842l0,-49.742l49.982,0l0,49.742l-49.982,0z" id="polygon3873"/>'+
            '  <text text-anchor="middle" fill="#000000" font-family="Sans-serif" x="24.81563" y="26.50938" xml:space="preserve" font-size="8px" id="svg_1">Click me</text>'+
            '</svg>');

        this.svgs.push( '<svg xmlns="http://www.w3.org/2000/svg">'+
            '  <path stroke="#000" fill="#FFF" stroke-miterlimit="4" d="m0,49.842l0,-49.742l49.982,0l0,49.742l-49.982,0z" id="polygon3873"/>'+
            '  <text text-anchor="middle" fill="#000000" font-family="Sans-serif" x="24.81563" y="26.50938" xml:space="preserve" font-size="8px" id="svg_1">INTERFACE</text>'+
            '</svg>');

        this.on("click", function(){
            this.index = (++this.index)%this.svgs.length;
            this.setSVG(this.svgs[this.index],500);
        },this);
    },



    getSVG: function(){
      return this.svgs[0];
    }
});
