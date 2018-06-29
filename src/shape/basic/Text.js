
/**
 * @class draw2d.shape.basic.Text
 * Implements a simple text with word wrapping.<br>The height of the element is automatic calculated. The widht of
 * the element is changeable by the user and respect the minWidth constraint.
 * <br>
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new draw2d.shape.basic.Text({text:"This is a simple text with some loooooong word in."});
 *          
 *     canvas.add(shape,40,10);
 *     
 * @author Andreas Herz
 * @since 4.2.3
 * @extends draw2d.shape.basic.Label
 */ import draw2d from '../../packages';
draw2d.shape.basic.Text= draw2d.shape.basic.Label.extend({

	NAME : "draw2d.shape.basic.Text",

    /**
     * @constructor
     * Creates a new text element.
     * 
    * @param {Object} [attr] the configuration of the shape
      */
    init: function(attr, setter, getter)
    {
        this.cachedWrappedAttr = null;

        this._super($.extend({width:100, height:50, resizeable:true},attr), setter, getter);
        
        this.installEditPolicy(new draw2d.policy.figure.WidthSelectionFeedbackPolicy());
    },
    
    
    
    /**
     * @inheritdoc
     */
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        // style the label
       this.svgNodes.attr($.extend({},this.calculateTextAttr(),this.wrappedTextAttr(this.text, this.getWidth()-this.padding.left-this.padding.right)));
        
        // set of the x/y must be done AFTER the font-size and bold has been set.
        // Reason: the getHeight method needs the font-size for calculation because
        //         it redirects the calculation to the SVG element.
        this.svgNodes.attr({x:this.padding.left, y: this.getHeight()/2});

        // this is an exception call. Don't call the super method (Label) to avoid 
        // the calculation in this method.
        draw2d.SetFigure.prototype.repaint.call(this,attributes);
    },
    
    
    /**
     * @inheritdoc
     */
    setDimension: function( w, h)
    {
        this.clearCache();
        var attr = this.wrappedTextAttr(this.text, w);

        this.cachedMinWidth = Math.max(w,attr.width);
        this.cachedMinHeight= attr.height;

        draw2d.shape.node.Node.prototype.setDimension.call(this,this.cachedMinWidth, this.cachedMinHeight);
      //  this._super(Math.min(w,attr.width),attr.height);
        this.fireEvent("change:dimension",{value:{width:this.cachedMinWidth, height:this.cachedMinHeight}});
       
        return this;
    },

    /**
     * @method
     * clear the internal cache for width/height precalculation
     * @private
     */
    clearCache: function()
    {
        this._super();
        this.cachedWrappedAttr = null;
        
        return this;
    },
 

    /**
     * @inheritdoc
     */
    getMinWidth: function()
    {
        if (this.shape === null) {
            return 0;
        }

        if(this.cachedMinWidth === null){
            // get the longest word in the text
            //
            var longestWord = this.text.split(" ").reduce(function(arg1,arg2){ return arg1.length > arg2.length ? arg1 : arg2; });
            var svgText = this.canvas.paper
                                     .text(0, 0, longestWord)
                                     .attr($.extend({},this.calculateTextAttr(),{text:longestWord}));
            this.cachedMinWidth= svgText.getBBox(true).width+this.padding.left+this.padding.right+2*this.getStroke();
            svgText.remove();
        }
        
        return this.cachedMinWidth;
    },
    

    /**
     * @method
     * calculates the attributes (wrapped text and width, height) with the given parameter
     * 
     * @private
     */
    wrappedTextAttr: function(text, width) 
    {
    	var words = text.split(" ");
        if(this.canvas ===null || words.length===0){
            return {text:text, width:width, height:20};
        }
        
        if(this.cachedWrappedAttr===null){
            var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var svgText = this.canvas.paper.text(0, 0, "").attr($.extend({},this.calculateTextAttr(),{text:abc}));
            
            // get a good estimation of a letter width...not correct but this is working for the very first draft implementation
            var letterWidth = svgText.getBBox(true).width / abc.length;
    
            var s = [words[0]], x=s[0].length*letterWidth;
            var w =null;
            for ( var i = 1; i < words.length; i++) {
            	w= words[i];
                var l = w.length* letterWidth;
                if ((x+l) > width) {
                    s.push("\n");
                    x = l;
                }
                else{
                    s.push(" ");
                    x += l;
                }
                s.push(w);
            }
            // set the wrapped text and get the resulted boudning box
            //
            svgText.attr({text: s.join("")});
            var bbox = svgText.getBBox(true);
            svgText.remove();
            this.cachedWrappedAttr= {text: s.join(""), width:(Math.max(width,bbox.width)+this.padding.left+this.padding.right), height: (bbox.height+this.padding.top+this.padding.bottom)};
        }
        return this.cachedWrappedAttr;
     },

     /**
      * @inheritdoc
      */
     getPersistentAttributes: function()
     {
         var memento = this._super();
         

         return memento;
     },
     
     /**
      * @inheritdoc
      */
     setPersistentAttributes: function(memento)
     {
         this._super(memento);

         return this;
     }

});



