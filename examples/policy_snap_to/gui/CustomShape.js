/**
 * Created by andherz on 26.02.15.
 */


CustomShape = draw2d.shape.basic.Diamond.extend({

    NAME: "CustomShape",

    /**
     * @param {Object} [attr] the configuration of the shape
     * @param {Object} [setter] optional setter functions
     * @param {Object} [getter] optional getter functions
     */
    init: function (attr, setter, getter) {

        this._super(
            {bgColor:'#EDFEA9', width:50, height:50, resizeable:false, ...attr},
            setter, getter);


        this.port = this.createPort(
            "hybrid",
            new draw2d.layout.locator.CenterLocator()
        );

        this.port.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor());

        this.port.on("connect", function(){
            // port connected
        });
        this.port.on("disconnect", function(){
            // port disconnected
        });

        var icon = new draw2d.shape.icon.Alarm({width:20, height:20, bgColor:'#2C3E50'});


        this.add(icon, new draw2d.layout.locator.CenterLocator());
    }
});

