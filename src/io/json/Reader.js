
/**
 * @class draw2d.io.json.Reader
 * Read a JSON data and import them into the canvas. The JSON must be generated with the
 * {@link draw2d.io.json.Writer}.
 *
 *      // Load a standard draw2d JSON object into the canvas
 *      //
 *      var jsonDocument =
 *          [
  *           {
 *              "type": "draw2d.shape.basic.Oval",
 *              "id": "5b4c74 b0-96d1-1aa3-7eca-bbeaed5fffd7",
 *              "x": 237,
 *              "y": 236,
 *              "width": 93,
 *              "height": 38
 *            },
 *            {
 *              "type": "draw2d.shape.basic.Rectangle",
 *              "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
 *              "x": 225,
 *              "y": 97,
 *              "width": 201,
 *              "height": 82,
 *              "radius": 2
 *            }
 *          ];
 *      // unmarshal the JSON document into the canvas
 *      // (load)
 *      var reader = new draw2d.io.json.Reader();
 *      reader.unmarshal(canvas, jsonDocument);
 *
 *
 * @extends draw2d.io.Reader
 */
import draw2d from '../../packages';


draw2d.io.json.Reader = draw2d.io.Reader.extend({

    NAME : "draw2d.io.json.Reader",

    init: function(){
        this._super();
    },

    /**
     * @method
     *
     * Restore the canvas from a given JSON object.
     *
     * @param {draw2d.Canvas} canvas the canvas to restore
     * @param {Object} document the json object to load.
     */
    unmarshal: function(canvas, json){
        var _this = this;
        var result = new draw2d.util.ArrayList();

        if(typeof json ==="string"){
            json = JSON.parse(json);
        }

        var node=null;
        json.forEach((element)=>{
            try{
                let o = _this.createFigureFromType(element.type);
                let source= null;
                let target=null;
                for(let i in element){
                    var val = element[i];
                    if(i === "source"){
                        node = canvas.getFigure(val.node);
                        if(node===null){
                            throw "Source figure with id '"+val.node+"' not found";
                        }
                        source = node.getPort(val.port);
                        if(source===null){
                            throw "Unable to find source port '"+val.port+"' at figure '"+val.node+"' to unmarschal '"+element.type+"'";
                        }
                    }
                    else if (i === "target"){
                        node = canvas.getFigure(val.node);
                        if(node===null){
                            throw "Target figure with id '"+val.node+"' not found";
                        }
                        target = node.getPort(val.port);
                        if(target===null){
                            throw "Unable to find target port '"+val.port+"' at figure '"+val.node+"' to unmarschal '"+element.type+"'";
                        }
                    }
                }
                if(source!==null && target!==null){
                    // don't change the order or the source/target set.
                    // TARGET must always be the second one because some applications needs the "source"
                    // port in the "connect" event of the target.
                    o.setSource(source);
                    o.setTarget(target);
                }
                o.setPersistentAttributes(element);
                canvas.add(o);
                result.add(o);
            }
            catch(exc){
                debug.error(element,"Unable to instantiate figure type '"+element.type+"' with id '"+element.id+"' during unmarshal by "+this.NAME+". Skipping figure..");
                debug.error(exc);
                debug.warn(element);
            }
        });

        // restore group assignment
        //
        json.forEach( element => {
            if(typeof element.composite !== "undefined"){
               let figure = canvas.getFigure(element.id);
               if(figure===null){
                   figure =canvas.getLine(element.id);
               }
               let group = canvas.getFigure(element.composite);
               group.assignFigure(figure);
            }
        });

        // recalculate all crossings and repaint the connections with
        // possible crossing decoration
        canvas.calculateConnectionIntersection();
        canvas.getLines().each((i,line)=>{
            line.svgPathString=null;
            line.repaint();
        });
        canvas.linesToRepaintAfterDragDrop = canvas.getLines().clone();

        canvas.showDecoration();

        return result;
    },

    /**
     * @method
     * Factory method to create an instance of the given element type.
     *
     * @param {String} type
     * @return {draw2d.Figure}
     */
    createFigureFromType:function(type)
    {
        return eval("new "+type+"()");
    }
});
