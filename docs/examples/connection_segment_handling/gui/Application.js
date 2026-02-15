// declare the namespace for this example
var example = {};

/**
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 */
example.Application = Class.extend({
    NAME: "example.Application",

    /**
     * @constructor
     */
    init: function() {
        this.view = new example.View("gfx_holder");
        this.toolbar = new example.Toolbar("toolbar", this, this.view);
    }
});