/**
 * @class
 * Util class to handle colors in the draw2d enviroment.
 *
 *      // Create a new Color with RGB values
 *      var color = new draw2d.util.Color(127,0,0);
 *
 *      // of from a hex string
 *      var color2 = new draw2d.util.Color("#f00000");
 *
 *      // Create a little bit darker color
 *      var darkerColor = color.darker(0.2); // 20% darker
 *
 *      // create a optimal text color if 'color' the background color
 *      // (best in meaning of contrast and readability)
 *      var fontColor = color.getIdealTextColor();
 *
 */
import draw2d from '../packages';

draw2d.util.Color = Class.extend({

    /**
     * @constructor
     * Create a new Color object
     *
     * @param {Number|String|draw2d.util.Color|Array} red
     * @param {Number} green
     * @param {Number} blue
     */
    init: function( red, green, blue) {

      this.hashString = null;

      if(typeof red === "undefined" || red===null){
          this.hashString = "none";
      }
      else if(red instanceof draw2d.util.Color){
          if(red.hashString==="none"){
              this.hashString = "none";
          }
          else{
              this.red = red.red;
              this.green = red.green;
              this.blue = red.blue;
          }
      }
      else if(typeof red === "string")
      {
           if (red === "none") {
              this.hashString = "none";
           }
           else {
              var rgb = this.hex2rgb(red);
              this.red = rgb[0];
              this.green = rgb[1];
              this.blue = rgb[2];
          }
      }
      // JSON struct of {red:###, green:###, blue:### }
      else if(typeof red === "object" && typeof red.red==="number")
      {
        this.red= red.red;
        this.green = red.green;
        this.blue = red.blue;
      }
      // array detection 1
      else if(red instanceof Array && red.length===3)
      {
        this.red= red[0];
        this.green = red[1];
        this.blue = red[2];
      }
      // array detection 2
      else if(typeof red === "object" && typeof red.length ==="number" && red.length===3)
      {
        this.red= red[0];
        this.green = red[1];
        this.blue = red[2];
      }
      else
      {
        this.red= parseInt(red);
        this.green = parseInt(green);
        this.blue = parseInt(blue);
      }
    },


    /**
     * @method
     * Convert the color object into a HTML CSS representation
     * @return {String} the color in rgb(##,##,##) representation
     **/
    getHTMLStyle: function()
    {
      return "rgb("+this.red+","+this.green+","+this.blue+")";
    },


    /**
     * @method
     * The red part of the color.
     *
     * @return {Number} the [red] part of the color.
     **/
    getRed: function()
    {
      return this.red;
    },


    /**
     * @method
     * The green part of the color.
     *
     * @return {Number} the [green] part of the color.
     **/
    getGreen: function()
    {
      return this.green;
    },


    /**
     * @method
     * The blue part of the color
     *
     * @return {Number} the [blue] part of the color.
     **/
    getBlue: function()
    {
      return this.blue;
    },

    /**
     * @method
     * Returns the ideal Text Color. Useful for font color selection by a given background color.
     *
     * @return {draw2d.util.Color} The <i>ideal</i> inverse color.
     **/
    getIdealTextColor: function()
    {
       let nThreshold = 105;
       let bgDelta = (this.red * 0.299) + (this.green * 0.587) + (this.blue * 0.114);
       return (255 - bgDelta < nThreshold) ? new  draw2d.util.Color(0,0,0) : new  draw2d.util.Color(255,255,255);
    },


    /**
     * @private
     */
    hex2rgb: function(/*:String */hexcolor)
    {
      hexcolor = hexcolor.replace("#","");
      return(
             {0:parseInt(hexcolor.substr(0,2),16),
              1:parseInt(hexcolor.substr(2,2),16),
              2:parseInt(hexcolor.substr(4,2),16)}
             );
    },

    /**
     *
     **/
    hex: function()
    {
      return(this.int2hex(this.red)+this.int2hex(this.green)+this.int2hex(this.blue));
    },


    /**
     * @method
     * Convert the color object into a HTML CSS representation
     * @return {String} the color in #RRGGBB representation
     **/
    hash: function()
    {
        if(this.hashString===null){
            this.hashString= "#"+this.hex();
        }
        return this.hashString;
    },

    /**
     * @private
     */
    int2hex: function(v)
    {
      v=Math.round(Math.min(Math.max(0,v),255));
      return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
    },

    /**
     * @method
     * Returns a darker color of the given one. The original color is unchanged.
     *
     * @param {Number} fraction  Darkness fraction between [0..1].
     * @return{draw2d.util.Color}        Darker color.
     */
    darker: function(fraction)
    {
       // we can "darker" a undefined color. In this case we return the undefnied color itself
       //
       if(this.hashString==="none")
           return this;

       var red   = parseInt(Math.round (this.getRed()   * (1.0 - fraction)));
       var green = parseInt(Math.round (this.getGreen() * (1.0 - fraction)));
       var blue  = parseInt(Math.round (this.getBlue()  * (1.0 - fraction)));

       if (red   < 0) red   = 0; else if (red   > 255) red   = 255;
       if (green < 0) green = 0; else if (green > 255) green = 255;
       if (blue  < 0) blue  = 0; else if (blue  > 255) blue  = 255;

       return new draw2d.util.Color(red, green, blue);
    },


    /**
     * @method
     * Make a color lighter. The original color is unchanged.
     *
     * @param {Number} fraction  lighter fraction between [0..1].
     * @return {draw2d.util.Color} Lighter color.
     */
    lighter: function( fraction)
    {
        // we can "lighter" a undefined color. In this case we return the undefined color itself
        //
        if(this.hashString==="none")
            return this;

        var red   = parseInt(Math.round (this.getRed()   * (1.0 + fraction)));
        var green = parseInt(Math.round (this.getGreen() * (1.0 + fraction)));
        var blue  = parseInt(Math.round (this.getBlue()  * (1.0 + fraction)));

        if (red   < 0) red   = 0; else if (red   > 255) red   = 255;
        if (green < 0) green = 0; else if (green > 255) green = 255;
        if (blue  < 0) blue  = 0; else if (blue  > 255) blue  = 255;

        return new draw2d.util.Color(red, green, blue);
    },

    /**
     * @method
     * Return a new color wich is faded to the given color.
     * @param {draw2d.util.Color} color
     * @param {Number} pc the fade percentage in [0..1]
     * @returns {draw2d.util.Color}
     *
     * @since 2.1.0
     */
    fadeTo: function(color, pc){

        var r= Math.floor(this.red+(pc*(color.red-this.red)) + .5);
        var g= Math.floor(this.green+(pc*(color.green-this.green)) + .5);
        var b= Math.floor(this.blue+(pc*(color.blue-this.blue)) + .5);

        return new draw2d.util.Color(r,g,b);
    },

	/**
	 * @method
	 * Compares two color objects
	 *
	 * @param {draw2d.util.Color} o
	 * @return {Boolean}
	 **/
	equals: function( o)
	{
		if(!(o instanceof draw2d.util.Color)){
			return false;
		}
		return this.hash()==o.hash();
	}

});

module.exports = draw2d.util.Color;
