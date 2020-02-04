
/**
 * @class draw2d.SVGFigure
 * @classdesc Abstract class which can handle plain SVG content. Inherit class must override the method
 * <code>getSVG()</code>.
 *
 * @author Andreas Herz
 * @extends draw2d.SetFigure
 */

import draw2d from 'packages';
import extend from 'util/extend';

draw2d.SVGFigure = draw2d.SetFigure.extend(
    /** @lends draw2d.SVGFigure.prototype */
    {
    
    NAME: "draw2d.SVGFigure",

    /**
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        this.svg = null;

        this._super(
            extend({},attr),
            extend({
                svg : this.setSVG
            },setter),
            extend({
                svg : this.getSVG
            },getter)

        );
    },

    /**
     * @inheritdoc
     */
    createSet: function()
    {
        // legacy behaviour. Legacy code of Draw2D didn't have the "svg" attribute.
        // in this case we must call the overridden method "getSVG" to retrieve the SVG from inherit
        // the inherit class.
        //
        if(this.svg === null) {
            this.svg = this.getSVG();
        }


		return this.importSVG(this.canvas, this.svg);
	},

    /**
     * 
     * Returns the current used SVG as string
     *
     * @returns {String}
     */
    getSVG: function()
    {
        return this.svg;
    },

    /**
     * 
     * Set the SVG of this shape
     *
     * @param {String} svg The new SVG to render as String
     * @param {Number} [duration] the optional duration for the change of the SVG of the figure
     *
     * @returns {draw2d.SVGFigure}
     */
    setSVG: function(svg, duration)
    {
        this.svg = svg;

        // SVG has changed. Update the rendering
        //
        if(this.canvas !==null && this.svgNodes !==null){
            var newSVGNodes = this.createSet();
            if(!isNaN(parseFloat(duration))) {
                newSVGNodes.hide();
                newSVGNodes.insertAfter(this.svgNodes);
                var oldSVG = this.svgNodes;
                this.svgNodes = newSVGNodes;
                this.applyTransformation();
                oldSVG.forEach(function ( shape) {
                    $(shape.node).fadeOut(duration, function () {
                        shape.remove();
                    });
                });
                newSVGNodes.forEach(function (shape) {
                    $(shape.node).fadeIn(duration);
                });
            }
            else {
                newSVGNodes.insertAfter(this.svgNodes);
                this.svgNodes.remove();
                this.svgNodes = newSVGNodes;
                this.applyTransformation();
//                this.repaint();
            }
        }

        return this;
    },


    /**
     * 
     * Helper method to transform the SVG string into a raphaelJS set.
     *
     * @private
     */
    importSVG : function (canvas, rawSVG)
    {

      var set = canvas.paper.set();

      try {
        if (typeof rawSVG === 'undefined'){
          throw 'No data was provided.';
        }

        // Override the dimension from the JSON if the SVG contains any
        //
        var svgDOM= $(rawSVG);

        // set the dimension of the element if the JSON import didn't provide
        // a dimension already
        //
        if(typeof this._dimensionReadFromJSON ==="undefined"){
            if(svgDOM.attr("width") && svgDOM.attr("height")){
                this.setDimension(parseFloat(svgDOM.attr("width")), parseFloat(svgDOM.attr("height")));
            }
            delete this._dimensionReadFromJSON;
        }

        var findStyle = new RegExp('([a-z0-9\-]+) ?: ?([^ ;]+)[ ;]?','gi');

        svgDOM.children().each(function(i,element){
          //element = $(element);
          var shape=null;
          var style=null;
          var attr = { };
          var node = element.tagName;

          // remove the namespace of the node if existing. This can happen in IE8
          //
          var index = node.indexOf(":");
          if(index != -1)
              node = node.substr(index+1);

          // map some element to Raphael specifix attributes or ignore some unknown attributes
          //
          $(element.attributes).each(function() {
            switch(this.nodeName) {
              case 'stroke-dasharray':
                attr[this.nodeName] = '- ';
              break;
              case 'style':
                style = this.nodeValue;
              break;
              case 'id':
              case 'xml:space':
                  // just to ignore
                  break;
              default:
                if(this.value){
                    attr[this.nodeName] = this.value;
                }
                else{
                    // @deprecated
                    attr[this.nodeName] = this.nodeValue;
                }
              break;
            }
          });


          if ( style !== null){
            while(findStyle.exec(style)){
              attr[RegExp.$1] = RegExp.$2;
            }
          }

          // set some good defaults if the element didn't provide a stroke-width but has a "stroke" attribute
          //
          if (typeof attr['stroke-width'] === 'undefined'){
              attr['stroke-width'] = (typeof attr.stroke === 'undefined' ? 0 : 1.2);
          }

          switch(node) {
            case 'rect':
              shape = canvas.paper.rect();

              // transfer rx-SVG attribute to the "r" attribute of raphael
              if(typeof attr["rx"]!=="undefined") {
                  attr.r = parseInt(attr.rx);
                  delete attr.rx;
              }
              break;
            case 'circle':
              shape = canvas.paper.circle();
              break;
            case 'ellipse':
              shape = canvas.paper.ellipse();
              break;
            case 'path':
              attr.fill ="none";
              shape = canvas.paper.path(attr.d);
              break;
            case 'line':
              attr.d= "M "+attr.x1+" "+attr.y1+"L"+attr.x2+" "+attr.y2;
              attr.fill ="none";
              shape = canvas.paper.path(attr.d);
             break;
            case 'polyline':
              var path = attr.points;
              attr.d = "M "+path.replace(" "," L");
              shape = canvas.paper.path(attr.d);
              break;
            case 'polygon':
              shape = canvas.paper.polygon(attr.points);
              break;
            case 'image':
              shape = canvas.paper.image();
              break;
            case 'tspan':
            case 'text':
                if(element.childNodes.length>0){
                    var child = element.firstChild;
                    do {
                       switch(child.nodeType){
                            case 2://ATTRIBUTE_NODE
                            case 4://CDATA_SECTION_NODE
                            case 5://ENTITY_REFERENCE_NODE
                            case 6://ENTITY_NODE
                            case 7://PROCESSING_INSTRUCTION_NODE
                            case 8://COMMENT_NODE
                            case 9://DOCUMENT_NODE
                            case 10://DOCUMENT_TYPE_NODE
                            case 11://DOCUMENT_FRAGMENT_NODE
                            case 12://NOTATION_NODE
                                return;
                            case 3://TEXT_NODE
                            	 // redirect to the parent node if we found a simple TEXT without any attributes
                            	child = element;
                            	break;
                            case 1://ELEMENT_NODE
                        }
                        var subShape = canvas.paper.text(0,0,$(child).text());
                        var subAttr ={"x":parseFloat(child.attributes.x.value), "y":parseFloat(child.attributes.y.value)};
                        subAttr["text-anchor"] = "start";
                        if(typeof child.attributes["text-anchor"]!=="undefined"){
                            subAttr["text-anchor"] = child.attributes["text-anchor"].value;
                        }
                        else if(typeof attr["text-anchor"]!=="undefined"){
                            subAttr["text-anchor"] = attr["text-anchor"];
                        }

                        if(typeof child.attributes["font-size"]!=="undefined"){
                            subAttr["font-size"] = parseInt(child.attributes["font-size"].value);
                        }
                        else if(typeof attr["font-size"]!=="undefined"){
                            // inherit the font size from the parent node
                            subAttr["font-size"] = parseInt(attr["font-size"]);
                        }

                        if(typeof child.attributes["font-family"]!=="undefined"){
                            subAttr["font-family"] = child.attributes["font-family"].value;
                        }
                        else if(typeof attr["font-family"]!=="undefined"){
                            // inherit the font size from the parent node
                            subAttr["font-family"] = attr["font-family"];
                        }

                        subAttr["fill"] = "#000000";
                        if(typeof child.attributes["fill"]!=="undefined"){
                            subAttr["fill"] = child.attributes["fill"].value;
                        }
                        else if(typeof attr["fill"]!=="undefined"){
                            // inherit the font size from the parent node
                            subAttr["fill"] = attr["fill"];
                        }

                        subAttr.y= subAttr.y+subShape.getBBox().height/2;

                        subShape.attr(subAttr);
                        set.push(subShape);
                        child = child.nextSibling;

                    }while(child && child.nodeType === 3); // 3= TEXT_NODE
                }
                else{
                  shape = canvas.paper.text(0,0,$(element).html());
                  if(typeof attr["fill"]==="undefined")
                      attr["fill"] = "#000000";
                  if(typeof attr["text-anchor"]==="undefined")
                      attr["text-anchor"] = "start";
                  if(typeof attr["font-size"]!=="undefined")
                      attr["font-size"] = parseInt(attr["font-size"]);
                  if(typeof attr["font-family"]!=="undefined")
                      attr["font-family"] = parseInt(attr["font-family"]);
                  attr.y= parseFloat(attr.y)+shape.getBBox().height/2;
                }
              break;
          }
          if(shape!==null){
              shape.attr(attr);
              set.push(shape);
          }
        });
      } catch (error) {
        alert('The SVG data you entered was invalid! (' + error + ')');
      }


      return set;
    },

    /**
     * 
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     */
    setPersistentAttributes: function(memento)
    {
        this._super(memento);

        // keep a temp flag to indicate the we have read the dimension of the
        // element from the JSON struct. In this case we didn't care about the dimension
        // from the SVG data
        //
        if(typeof memento.width !== "undefined"){
            this._dimensionReadFromJSON=true;
        }
        else if(typeof memento.height !== "undefined"){
            this._dimensionReadFromJSON=true;
        }

        return this;
    }


});
