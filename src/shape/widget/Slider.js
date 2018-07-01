
/**
 * @class draw2d.shape.widget.Slider
 * See the example:
 *
 *     @example preview small frame
 *
 *     var slider = new draw2d.shape.widget.Slider({width:120, height:20});
 *     canvas.add( slider,100,60);
 *
 * @extends draw2d.shape.widget.Widget
 */
import draw2d from '../../packages';
import {Tweenable} from 'shifty';

draw2d.shape.widget.Slider = draw2d.shape.widget.Widget.extend({

    NAME : "draw2d.shape.widget.Slider",

    DEFAULT_COLOR_THUMB : new draw2d.util.Color("#bddf69"),
    DEFAULT_COLOR_BG    : new draw2d.util.Color("#d3d3d3"),


    init: function(attr, setter, getter ){
        this.currentValue = 0; // [0..100]
        this.slideBoundingBox = new draw2d.geo.Rectangle(0,0,10,20);
        this.padding = {top:4, right:4, bottom:4,left:4};
        this.panning = false;
        this.thumbGrow = 0;

        this._super(
            extend({
                width:150,
                height:15,
                stroke:1,
                radius:4,
                resizeable:true,
                color:this.DEFAULT_COLOR_THUMB,
                bgColor:this.DEFAULT_COLOR_BG,
                value:50
            },attr),
            extend({
                /** @attr {Number} padding the padding in pixel around the text */
                padding  : this.setPadding,
                /** @attr {Number} value the new value of the slider. values must be in range of [0..100] */
                value    : this.setValue
            }, setter),
            extend({
                padding  : this.getPadding,
                value    : this.getValue
            }, getter));

        this.setMinHeight(15);
        this.setMinWidth(80);
    },

    /**
     * @method
     * Create the additional elements for the figure
     *
     */
    createSet: function()
    {
        var result = this.canvas.paper.set();
        var thumb= this.canvas.paper.rect(0,0,10,20);
        thumb.node.style.cursor=  "col-resize";
        result.push(thumb);

        return result;
    },

    /**
     * @inheritdoc
     */
    setDimension: function(w,h)
    {
        this._super(w,h);
        this.slideBoundingBox.setBoundary(this.padding.left,0,this.getWidth()-this.padding.right , this.getHeight());
        this.slideBoundingBox.setHeight(this.getHeight()+1);

        // TODO: and repaint again.....two repaints for one "setDimension"....BAD
        //
        this.repaint();
    },


    /**
     * @method
     * Set the padding of the element
     *
     *      // Alternatively you can use the attr method:
     *      //
     *      // set the padding for top,left,bottom,right in one call
     *      figure.attr({
     *        padding: 3
     *      });
     *
     *      // update the padding left and top
     *      figure.attr({
     *        padding: {left:3, top:30}
     *      });
     *
     * @param {Number|Object} padding The new padding
     * @since 5.6.0
     **/
    setPadding: function( padding)
    {
        this.clearCache();
        if(typeof padding ==="number"){
            this.padding = {top:padding, right:padding, bottom:padding, left:padding};
        }
        else{
            extend(this.padding, padding);
        }
        this.repaint();
        this.fireEvent("change:padding",{value:this.padding});

        return this;
    },


    /**
     * @method
     * Get the padding of the element.
     *
     * @since 5.6.0
     **/
    getPadding: function( )
    {
        return this.padding;
    },

    /**
     * @method
     * Called if the value of the slider has been changed.
     *
     * @param {Number} value The new value of the slider in percentage [0..100]
     * @template
     */
    onValueChange: function(value)
    {
    },

    /**
     * @method
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {Boolean} true if the figure accepts dragging
     **/
    onDragStart: function(x, y , shiftKey, ctrlKey)
    {
        // check if the use has been clicked on the thumb.
        // Return "false" to prevent drag&drop operation.
        //
        if(this.slideBoundingBox.hitTest(x, y)){

            this.panningX = x;
            this.panningY = y;
            this.panning=true;
            var tweenable = new Tweenable();
            tweenable.tween({
                from: { grow: this.thumbGrow  },
                to:   { grow: 10 },
                duration: 500,
                easing: 'easeOutQuart',
                step: function(state) {
                    this.thumbGrow = state.grow;
                    this.repaint();
                }.bind(this),
                finish: function(){
                    tweenable.dispose();
                }
            });
            return false;
        }

        return this._super(x, y, shiftKey, ctrlKey);
    },

    /**
     * @method
     * Called by the framework if the figure returns false for the drag operation. In this
     * case we send a "panning" event - mouseDown + mouseMove. This is very useful for
     * UI-Widget like slider, spinner,...
     *
     * @param {Number} dx the x difference between the mouse down operation and now
     * @param {Number} dy the y difference between the mouse down operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     */
    onPanning: function(dx, dy, dx2, dy2)
    {
        // calculate the current position of the mouse pos
        //
        var thumbW2 = this.slideBoundingBox.w/2;
        var width = this.getWidth();
        var sliderWidth = width - this.padding.left - this.padding.right;

        var figurePos = Math.min(width, Math.max(0,this.panningX+dx));
        var sliderPos = Math.min(width-this.padding.left-this.padding.right,figurePos-this.padding.left)-thumbW2;

        this.setValue(100/sliderWidth*sliderPos);
    },


    /**
     * @inheritdoc
     */
    onPanningEnd: function()
    {
        this.panning=false;

        var tweenable = new Tweenable();
        tweenable.tween({
            from: { grow: this.thumbGrow  },
            to:   { grow: 0 },
            duration: 300,
            easing: 'easeOutQuart',
            step: function(state) {
                this.thumbGrow = state.grow;
                this.repaint();
            }.bind(this),
            finish: function(){
                tweenable.dispose();
            }
        });
        this.thumbGrow =0;
        this.repaint();
    },

    /**
     * @method
     * Set the current value of the slider. Valid values are [0..100]
     *
     * @param {Number} value values between [0..100]
     */
    setValue: function(value)
    {
        this.currentValue = Math.min(Math.max(0,(value|0)),100);
        this.repaint();
        this.onValueChange(this.currentValue);
        this.fireEvent("change:value", {value:this.currentValue});

        return this;
    },

    /**
     * @method
     * Returns the current value of the slider
     *
     * @since 5.6.0
     *
     * @returns {Number}
     */
    getValue: function()
    {
        return this.currentValue;
    },

    /**
     *
     * @param attributes
     */
    repaint: function(attributes)
    {
        if (this.repaintBlocked === true || this.shape === null){
            return;
        }

        attributes= attributes || {};

        // adjust the slider to the current value and the new dimension of the widget
        //
        var thumbX =(((this.getWidth()-this.padding.left-this.padding.right)/100*this.currentValue)+this.padding.left)|0;
        this.slideBoundingBox.setX(thumbX);


        // update slider
        //
		if (this.svgNodes !== null) {
			var attr = this.slideBoundingBox.toJSON();
            attr.y      -= (this.thumbGrow/2);
            attr.height += this.thumbGrow;
			attr.fill    = this.getColor().hash();
			attr.stroke  = this.getColor().darker(0.2).hash();
			attr.r       = 4;
			this.svgNodes.attr(attr);
		}


        attributes.fill= "90-"+this.bgColor.hash()+":5-"+this.bgColor.lighter(0.3).hash()+":95";
        attributes.stroke = this.bgColor.darker(0.1).hash();

        this._super(attributes);
    },


    applyTransformation: function()
    {
        this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
    }

});
