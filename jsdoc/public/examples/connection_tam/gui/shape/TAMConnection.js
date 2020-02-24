/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var TAMConnection= draw2d.Connection.extend({

    NAME: "TAMConnection",

    init:function(attr)
    {
        this._super(attr);

        // Create any Draw2D figure as decoration for the connection
        //
        this.circle = new LabeledCircle();
        this.add(this.circle, new draw2d.layout.locator.ManhattanMidpointLocator());


        this.on("contextmenu",  (emitter, event)=> {
            let figure = emitter


            let x = event.x
            let y = event.y
            if (figure !== null) {

                let items = {
                    "left":   {name: "Left",   icon: "x ion-ios-pricetag-outline"},
                    "right":  {name: "Right",  icon: "x ion-ios-pricetag-outline"},
                    "up":     {name: "Up",   icon: "x ion-ios-pricetag-outline"},
                    "down":   {name: "Down",  icon: "x ion-ios-pricetag-outline"},
                    "delete": {name: "Delete", icon: "x ion-ios-close-outline"},
                }

                $.contextMenu({
                    selector: 'body',
                    events:
                        {
                            hide: function () {
                                $.contextMenu('destroy')
                            }
                        },
                    callback:  (key, options) =>{
                        switch (key) {
                            case "left":
                                this.circle.left()
                                break
                            case "right":
                                this.circle.right()
                                break
                            case "up":
                                this.circle.up()
                                break
                            case "down":
                                this.circle.down()
                                break
                            case "delete":
                                let cmd = new draw2d.command.CommandDelete(figure)
                                figure.getCanvas().getCommandStack().execute(cmd)
                                break
                            default:
                                break
                        }

                    },
                    x: x,
                    y: y,
                    items: items

                })
            }
        })
    },



    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        let memento = this._super()

        console.log( this.children)
        // add all decorations to the memento
        //
        memento.labels = []
        this.children.each(function (i, e) {
            let labelJSON = e.figure.getPersistentAttributes()
            labelJSON.locator = e.locator.NAME
            memento.labels.push(labelJSON)
        })
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
            figure.setPersistentAttributes(json)

            // instantiate the locator
            let locator = eval("new " + json.locator + "()")

            // add the new figure as child to this figure
            this.add(figure, locator)
        }, this))
        this.circle = this.getChildren().first()
    }
});
