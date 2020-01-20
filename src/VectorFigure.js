
/**
 * @class draw2d.VectorFigure
 * The base class for all vector based figures like {@link draw2d.shape.basic.Rectangle}  or {@link draw2d.shape.basic.Oval}
 * inside a canvas.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.node.Node
 */

import draw2d from 'packages';
import jsonUtil from 'util/JSONUtil';
import extend from 'util/extend';

draw2d.VectorFigure = draw2d.shape.node.Node.extend({
    NAME : "draw2d.VectorFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter)
    {
        this.stroke = 1;
        this.radius = 0;
        this.bgColor= new draw2d.util.Color("#ffffff");
        this.color  = new draw2d.util.Color("#303030");
        this.dasharray = null;

        // memento for the stroke if we reset the glow effect of this shape
        //
        this.strokeBeforeGlow = this.stroke;
        this.glowIsActive = false;

        this._super( attr,
            extend({
                /** @attr {String} dasharray the line pattern see {@link draw2d.shape.basic.Line#setDashArray} for more information*/
                dasharray : this.setDashArray,
                /** @attr {Number} radius the radius to render the line edges */
                radius : this.setRadius,
                /** @attr {String|draw2d.util.Color} bgColor the background color of the shape */
                bgColor: this.setBackgroundColor,
                /** @attr {String|draw2d.util.Color} color the main color of the shape */
                color  : this.setColor,
                /** @attr {Number} stroke the stroke width */
                stroke : this.setStroke
            }, setter),
            extend({
               dasharray: this.getDashArray,
               radius :   this.getRadius,
               bgColor:   this.getBackgroundColor,
               color  :   this.getColor,
               stroke :   this.getStroke
            }, getter)
        );
    },

    /**
     * @method
     * Sets the corner radius or the edges.
     *
     * @param {Number} radius
     * @since 4.2.1
     */
     setRadius: function(radius)
     {
        this.radius = radius;
        this.repaint();
        this.fireEvent("change:radius",{value:this.radius});

        return this;
    },

    /**
     * @method
     * Get the corner radius of the edges.
     *
     * @return {Number}
     * @since 4.2.1
     */
    getRadius: function()
    {
        return this.radius;
    },



    /**
     * @method
     * Set the line style for this object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        dash: dashPattern
    *      });
     *
     * @param {String} dash can be one of this ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
     */
    setDashArray: function(dashPattern)
    {
        this.dasharray = dashPattern;
        this.repaint();

        this.fireEvent("change:dashArray",{value:this.dasharray});

        return this;
    },

    /**
     * @method
     * Get the line style for this object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr("dash");
     *
     * @since 5.1.0
     */
    getDashArray: function()
    {
        return this.dasharray;
    },

    /**
     * @method
     * Highlight the element or remove the highlighting
     *
     * @param {Boolean} flag indicates glow/noGlow
     */
    setGlow: function(flag)
    {

        if(flag === this.glowIsActive) {
            return this;
        }

        this.glowIsActive = flag;
        if(flag===true){
            this.strokeBeforeGlow = this.getStroke();
            this.setStroke(this.strokeBeforeGlow*2.5);
        }
        else {
            this.setStroke(this.strokeBeforeGlow);
        }

        return this;
    },

    /**
     * @inheritdoc
     */
    repaint: function(attributes)
    {
        if (this.repaintBlocked===true || this.shape === null){
            return;
        }

        attributes= attributes || {};

        attributes.x = this.getAbsoluteX();
        attributes.y = this.getAbsoluteY();

        if(typeof attributes.stroke==="undefined"){
            if(this.color === null || this.stroke ===0){
                attributes.stroke = "none";
            }
            else {
                attributes.stroke = this.color.rgba();
            }
        }

        jsonUtil.ensureDefault(attributes,"stroke-width" , this.stroke);
        jsonUtil.ensureDefault(attributes,"fill" ,this.bgColor.rgba());
        jsonUtil.ensureDefault(attributes,"dasharray" , this.dasharray);
        jsonUtil.ensureDefault(attributes,"stroke-dasharray" , this.dasharray);

        this._super(attributes);

        return this;
    },


   /**
    * @method
    * Set the new background color of the figure. It is possible to hands over
    * <code>null</code> to set the background transparent.
    *
    *      // Alternatively you can use the attr method:
    *      figure.attr({
    *        "bgColor": "#f0f0f0"
    *      });
    *
    * @param {String|draw2d.util.Color} color The new background color of the figure
    **/
    setBackgroundColor: function(color)
    {
        this.bgColor = new draw2d.util.Color(color);

        this.repaint();
        this.fireEvent("change:bgColor",{value:this.bgColor});

        return this;
    },

   /**
    * @method
    * The current used background color.
    *
    *      // Alternatively you can use the attr method:
    *      var color =figure.attr("bgColor");
    *
    * @return {draw2d.util.Color}
    */
   getBackgroundColor: function()
   {
     return this.bgColor;
   },

   /**
    * @method
    * Set the stroke to use.
    *
    *      // Alternatively you can use the attr method:
    *      figure.attr({
    *        "stroke": 2
    *      });
    *
    * @param {Number} w The new line width of the figure
    **/
   setStroke: function( w )
   {
     this.stroke=w;
     this.repaint();
     this.fireEvent("change:stroke",{value:this.stroke});

     return this;
   },

   /**
    * @method
    * The used line width.
    *
    * @returns {Number}
    **/
   getStroke: function( )
   {
     return this.stroke;
   },

   /**
    * @method
    * Set the foreground color of the figure.
    * This method fires a <i>document dirty</i> event.
    *
    *      // Alternatively you can use the attr method:
    *      figure.attr({
    *        "color": "#f3f3f3"
    *      });
    *
    * @param {String|draw2d.util.Color} color The new color of the line.
    **/
   setColor: function( color)
   {
     this.color = new draw2d.util.Color(color);
     this.repaint();
     this.fireEvent("change:color",{value:this.color});

     return this;
   },

   /**
    * @method
    * Get the current used foreground color
    *
    *
    * @returns {draw2d.util.Color}
    */
   getColor: function()
   {
     return this.color;
   },


   /**
    * @inheritdoc
    */
   getPersistentAttributes: function()
   {
       return  extend(this._super(), {
           bgColor : this.bgColor.rgba(),
           color   : this.color.rgba(),
           stroke  : this.stroke,
           radius  : this.radius,
           dasharray : this.dasharray
       });
   },

   /**
    * @inheritdoc
    */
   setPersistentAttributes: function(memento)
   {
       this._super(memento);

       if(typeof memento.radius !=="undefined"){
           this.setRadius(memento.radius);
        }

       if(typeof memento.bgColor !== "undefined"){
           this.setBackgroundColor(memento.bgColor);
       }

       if(typeof memento.color !== "undefined"){
           this.setColor(memento.color);
       }

       if(typeof memento.stroke !== "undefined" ){
           this.setStroke(memento.stroke===null?0:parseFloat(memento.stroke));
       }

       if(typeof memento.dasharray ==="string"){
           this.dasharray = memento.dasharray;
       }


       return this;
   }


});

