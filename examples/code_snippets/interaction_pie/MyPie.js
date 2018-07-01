
var MyPie = draw2d.shape.diagram.Pie.extend({

    NAME : "MyPie",

    init : function(attr)
    {
        this._super(extend({diameter:200},attr));

        this.createPort("input");
        this.createPort("input");
        this.createPort("input");

    },

    /**
     * @method
     * Called if the value of any port has been changed
     *
     * @param {draw2d.Port} relatedPort
     * @template
     */
    onPortValueChanged: function(relatedPort){
        var data = [];
        this.getInputPorts().each(function(i,port){
            data.push(port.getValue());
        });
        this.setData(data);
    }

});
