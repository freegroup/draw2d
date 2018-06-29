/**
 * @class draw2d.layout.locator.PortLocator
 * 
 * The port locator calculates the position of an port. All ports MUST have a locator
 * if you add them as child to a node.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
import draw2d from '../../packages';

draw2d.layout.locator.PortLocator = draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.PortLocator",
    
    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a
     * 
     */
    init: function( )
    {
      this._super();
    },
    
    applyConsiderRotation: function(port, x, y)
    {
    	var parent = port.getParent();
    
    	// determine the width/height before manipulate the 
    	// matrix of the shape
        var halfW = parent.getWidth()/2;
        var halfH = parent.getHeight()/2;
        
    	var rotAngle = parent.getRotationAngle();
    	var m = Raphael.matrix();
    	m.rotate(rotAngle, halfW, halfH);
        if(rotAngle=== 90|| rotAngle===270){
            var ratio = parent.getHeight()/parent.getWidth();
            m.scale(ratio, 1/ratio, halfW, halfH);
        }

        port.setPosition( m.x(x,y), m.y(x,y));
    }
});
