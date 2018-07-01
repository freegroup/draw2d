
var PredefinedProcess = draw2d.shape.layout.FlexGridLayout.extend({

    /**
     *     10px       grow         10px
     *     
     *    -----+------------------+-----
     *    |    |  <LABEL>         |    |
     *    |    |                  |    |
     *    |    |                  |    |    grow
     *    |    |                  |    |
     *    |    |                  |    |
     *    -----+------------------+-----
     *    
     * @param attr
     */
    init : function(attr, setter, getter)
    {
        this._super($.extend({
            columns:"10px, grow, 10px",
            rows:   "grow",
            bgColor:"#FFFFFF",
            stroke:2
        },attr), 
        setter, 
        getter);
        
        
        this.label = new draw2d.shape.basic.Label({text:"Process Name", resizeable:true, stroke:2});
        this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.add(this.label, {row:0, col:1});
        
        this.setDimension(120,80);
    }
});
