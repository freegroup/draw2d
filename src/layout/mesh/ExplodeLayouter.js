
/**
 * @class draw2d.layout.mesh.ExplodeLayouter
 * Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.mesh.MeshLayouter
 */
import draw2d from '../../packages'

draw2d.layout.mesh.ExplodeLayouter = draw2d.layout.mesh.MeshLayouter.extend(
  /** @lends draw2d.layout.mesh.ExplodeLayouter.prototype */
  {

	MIN_MARGIN : 40,
	
	/**
	 * Creates a new layouter object.
	 */
    init: function()
	{
    },
    
    /**
     *
     * Return a changes list for an existing mesh/canvas to ensure that the element to insert 
     * did have enough space.
     * 
     * @param {draw2d.Canvas} canvas the canvas to use for the analytic
     * @param {draw2d.Figure} figure The figure to add to the exising canvas
     * @param {Number} x requested x-position for the figure
     * @param {Number} y requested y-position for the figure
     * 
     * 
     * @return {draw2d.util.ArrayList} a list of changes to apply if the user want to insert he figure.
     */
    add: function( canvas, figureToAdd)
    {
    	// changes for the different octant areas
    	var changes = [];
    	changes[0]= {x:0, y:0};
    	changes[1]= {x:0, y:0};
    	changes[2]= {x:0, y:0};
    	changes[3]= {x:0, y:0};
    	changes[4]= {x:0, y:0};
    	changes[5]= {x:0, y:0};
    	changes[6]= {x:0, y:0};
    	changes[7]= {x:0, y:0};
    	changes[8]= {x:0, y:0};

    	var boundingBox = figureToAdd.getBoundingBox();

    	var figures = canvas.getFigures();
    	var figure = null;
    	
    	var dis=0;
    	var oct =0;
    	var currentOctChanges =null;
    	var i=0;
    	for( i=0; i< figures.getSize();i++){
    		
    		figure = figures.get(i);
    		
    		// calculate the distance of all corners in relation to the requested x/y coordinate
    		//
    		if(figure !== figureToAdd ){
    			dis = figure.getBoundingBox().getDistance(boundingBox);
    			// other figure is to close
    			//
    			if(dis<this.MIN_MARGIN){
    				// determine the octant of the figure
    				oct = this.determineOctant(boundingBox, figure.getBoundingBox());
        			
    				// all other relevant segments must be arranged too!!
    				//
        			switch(oct){
        			case 2:
        				changes[2].x =  Math.max(changes[2].x,this.MIN_MARGIN-dis);
        				changes[3].x =  Math.max(changes[3].x,this.MIN_MARGIN-dis);
        				changes[4].x =  Math.max(changes[4].x,this.MIN_MARGIN-dis);
        				break;
        			case 3:
        				changes[2].x =  Math.max(changes[2].x,this.MIN_MARGIN-dis);
        				changes[3].x =  Math.max(changes[3].x,this.MIN_MARGIN-dis);
        				changes[4].x =  Math.max(changes[4].x,this.MIN_MARGIN-dis);
        				break;
        			case 4:
        				changes[2].x =  Math.max(changes[2].x,this.MIN_MARGIN-dis);
        				changes[3].x =  Math.max(changes[3].x,this.MIN_MARGIN-dis);
        				changes[4].x =  Math.max(changes[4].x,this.MIN_MARGIN-dis);
        				changes[4].y =  Math.max(changes[4].y,this.MIN_MARGIN-dis);
        				changes[5].y =  Math.max(changes[5].y,this.MIN_MARGIN-dis);
        				changes[6].y =  Math.max(changes[6].y,this.MIN_MARGIN-dis);
        				break;
        			case 5:
        				changes[4].y =  Math.max(changes[4].y,this.MIN_MARGIN-dis);
        				changes[5].y =  Math.max(changes[5].y,this.MIN_MARGIN-dis);
        				changes[6].y =  Math.max(changes[6].y,this.MIN_MARGIN-dis);
        				break;
        			case 6:
        				changes[4].y =  Math.max(changes[4].y,this.MIN_MARGIN-dis);
        				changes[5].y =  Math.max(changes[5].y,this.MIN_MARGIN-dis);
        				changes[6].y =  Math.max(changes[6].y,this.MIN_MARGIN-dis);
        				break;
        			case 8:
        				// overlapping
        				// we must determine the new distance with the border of the figures
        				dis = (boundingBox.getBottomRight().getDistance(figure.getBoundingBox().getTopLeft()))|0;
        				
        				changes[2].x =  Math.max(changes[2].x,this.MIN_MARGIN+dis);
        				changes[3].x =  Math.max(changes[3].x,this.MIN_MARGIN+dis);
        				changes[4].x =  Math.max(changes[4].x,this.MIN_MARGIN+dis);
        				changes[4].y =  Math.max(changes[4].y,this.MIN_MARGIN+dis);
        				changes[5].y =  Math.max(changes[5].y,this.MIN_MARGIN+dis);
        				changes[6].y =  Math.max(changes[6].y,this.MIN_MARGIN+dis);
        				changes[8].x =  Math.max(changes[8].x,this.MIN_MARGIN+dis);
//        				changes[8].y =  Math.max(changes[8].y,this.MIN_MARGIN+dis);
        			}
    			}
    		}
    		// Falls die minimale Distance zu den Objecten kleiner 80 ist, muss ein layout erfolgen
    	}

    	// calculate the adjustment for each figure
    	//
    	var result = new draw2d.util.ArrayList();
    	for( i=0; i< figures.getSize();i++){
    		figure = figures.get(i);
    		if(figure !== figureToAdd ){
				oct = this.determineOctant(boundingBox, figure.getBoundingBox());
				currentOctChanges = changes[oct];
				if(currentOctChanges.x!==0 || currentOctChanges.y!==0){
					result.add(new draw2d.layout.mesh.ProposedMeshChange(figure, currentOctChanges.x,currentOctChanges.y));
				}
    		}
    	}
    	
    	return result;
    },
    
    
    /**
     *
     * Determin Octant
	 *
	 *    0 | 1 | 2
	 *    __|___|__
	 *    7 | 8 | 3
     *    __|___|__
	 *    6 | 5 | 4
     *
	 * @returns {Number}
     */
    determineOctant: function(r1, r2){
		var ox = r1.x;
		var oy = r1.y;
		var ow = r1.w;
		var oh = r1.h;
		
		var cx = r2.x;
		var cy = r2.y;
		var cw = r2.w;
		var ch = r2.h;
		var oct =0;

		if(cx + cw <= ox){
			if((cy + ch) <= oy){
				oct = 0;
			}
			else if(cy >= (oy + oh)){
				oct = 6;
			}
			else{
				oct = 7;
			}
	    }
		else if(cx >= ox + ow){
			if(cy + ch <= oy){
				oct = 2;
			}
			else if(cy >= oy + oh){
				oct = 4;
			}
			else{
				oct = 3;
			}
		}
		else if(cy + ch <= oy){
			oct = 1;
		}
		else if(cy >= oy + oh){
			oct = 5;
		}
		else{
			oct= 8;
		}
		
		return oct;
    }
});
