
/**
 * @class
 * Base class for connection creation by user interaction.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.KeyboardPolicy
 */
import draw2d from '../../packages'

draw2d.policy.connection.ConnectionCreatePolicy = draw2d.policy.canvas.KeyboardPolicy.extend(
    /** @lends draw2d.policy.connection.ConnectionCreatePolicy.prototype */
    {
    
    NAME: "draw2d.policy.connection.ConnectionCreatePolicy",

    /**
     *
     * Creates a new connection create policy instance
     */
    init: function(attr, setter, getter)
    {
        this._super( attr,setter,getter);
    },


    /**
     * 
     * Factory method to create the connection to insert.
     *
     * @return {draw2d.Connection}
     * @template
     */
    createConnection:function()
    {
        return new draw2d.Connection({
            router: new draw2d.layout.connection.DirectRouter()
        });
    },


    ripple: function(x,y, type)
    {
        switch(type){
            case 0:
                var circle = this.canvas.paper.circle(x, y, 3, 3).attr({fill: null, stroke:"#d0d0ff"});
                var anim = Raphael.animation(
                    {transform: "s6", opacity:0.0, "stroke-width":3 },
                    500,
                    "linear",
                    function(){circle.remove()}
                );
                circle.animate(anim);
                // return an emmpty raphael.set. The circle removes itself after animation is done
                //
                return this.canvas.paper.set();
                break;
            case 1:
                var circle1 = this.canvas.paper.circle(x, y, 3, 3).attr({fill: null, stroke:"#3f72bf"});
                var circle2 = this.canvas.paper.circle(x, y, 3, 3).attr({fill: null, stroke:"#ff0000"});
                var anim1 = Raphael.animation(
                    {transform: "s6", opacity:0.0, "stroke-width":1 },
                    1200,
                    "linear"
                ).repeat(Infinity);
                circle1.animate(anim1);
                var anim2 = Raphael.animation(
                    {transform: "s12", opacity:0.0, "stroke-width":4 },
                    500,
                    "linear",
                    function(){circle2.remove()}
                );
                circle2.animate(anim2);

                // return the "circle1". This shape must be remove by the caller
                // "circle2" is removed automaticly
                //
                return circle1;
                break;
        }
    }


});

