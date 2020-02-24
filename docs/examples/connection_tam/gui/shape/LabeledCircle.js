
var LabeledCircle = draw2d.shape.basic.Circle.extend({

    NAME : "LabeledCircle",

    init : function(attr, setter, getter)
    {
        this._super($.extend({
            diameter:15,
            color:"#0d0d0d",
            bgColor:"#ffffff"
        },attr), setter, getter);

        this.label = new draw2d.shape.basic.Text({
            text:"\u25c4 R",
            width: 30,
            stroke:0,
        });
        this.add(this.label,new draw2d.layout.locator.SmartDraggableLocator());
        this.label.setWidth(30)
    },


    left: function(){
        this.label.setText("\u25c0 R")
        this.label.setWidth(30)
    },

    right: function(){
        this.label.setText("R \u25b6")
        this.label.setWidth(30)
    },

    up: function(){
        this.label.setText("\u25b2\nR")
        this.label.setWidth(30)
    },

    down: function(){
        this.label.setText("R\n\u25bc")
        this.label.setWidth(30)
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
        console.log(memento.labels)
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
        this.label = this.getChildren().first()
        this.label.setWidth(30)
    }
});

