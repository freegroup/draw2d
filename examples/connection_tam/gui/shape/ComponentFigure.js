
var ComponentFigure = draw2d.shape.basic.Rectangle.extend({

    NAME : "ComponentFigure",

    init : function(attr, setter, getter)
    {
        this._super($.extend({
            width:100,
            height:90,
            radius:4,
            bgColor:"#e7e9fd"
        },attr), setter, getter);
        
        let mainPort = this.createPort("hybrid", new draw2d.layout.locator.CenterLocator());
        
        // calculation of the anchor port of the connection
        //
        mainPort.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.port));
        
        // override the standard behaviour of the connection direction calculation.
        // This is not a perfect solution because I didn't implement a behaviour pattern or something similar
        //
        mainPort.getConnectionDirection = function(relatedPort){
            return mainPort.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        };

        this.setPersistPorts(false);
        this.setUserData({});
    },

    consumeEvent: function(event){
        if(event.status==="ERROR" && event.readed===0){
            this.addCssClass("error")
        }
        this.addCssClass("event");
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        let memento = this._super()

        // add all decorations to the memento
        //
        memento.labels = []
        this.children.each(function (i, e) {
            let labelJSON = e.figure.getPersistentAttributes()
            labelJSON.locator = e.locator.NAME
            memento.labels.push(labelJSON)
        })

        delete memento.cssClass;
        return memento
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        delete memento.bgColor
        this._super(memento)

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren()

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function (i, json) {
            // create the figure stored in the JSON
            let figure = eval("new " + json.type + "()")

            // apply all attributes
            figure.attr(json)

            // instantiate the locator
            let locator = eval("new " + json.locator + "()")

            // add the new figure as child to this figure
            this.add(figure, locator)
        }, this))
    }
});

