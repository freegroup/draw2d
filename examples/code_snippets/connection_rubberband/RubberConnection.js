/**
 * @class RubberConnection
 * 
 * A simple bee line connection with a rubber band rendering
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var RubberConnection= draw2d.Connection.extend({
    
    init:function(attr, setter, getter)
    {
      this._super($.extend({
          color: "#33691e",
          stroke:1,
          outlineStroke:0,
          outlineColor:null
      },attr),
      setter,
      getter);

      
      this.setRouter(new draw2d.layout.connection.RubberbandRouter());
    },
    
    repaint:function(attributes)
    {
        if (this.repaintBlocked===true || this.shape === null){
            return;
        }

        attributes= attributes || {};
        
        if(typeof attributes.fill === "undefined"){
        	   attributes.fill = "#aed581";
         }

        this._super(attributes);
    }
});
