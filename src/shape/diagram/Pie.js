
/**
 * @class draw2d.shape.diagram.Pie
 *
 * Small data pie chart.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var pie = new draw2d.shape.diagram.Pie({
 *        diameter:80,
 *        data:[30,60,122,4],
 *        x:100,
 *        y:60
 *     });
 *
 *     canvas.add( pie);
 *
 * @extends draw2d.shape.diagram.Diagram
 */
import draw2d from '../../packages';
import extend from '../../util/extend';

draw2d.shape.diagram.Pie = draw2d.shape.diagram.Diagram.extend({

    COLORS: ['#00A8F0', '#b9dd69', '#f3546a', '#4DA74D', '#9440ED'],
    TWO_PI : Math.PI * 2,

    /**
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter){


        this._super(
                extend({stroke:0},attr),
                extend({
                    /** @attr {Number} diameter the diameter of the pie chart */
                    diameter  : this.setDiameter,
                    /** @attr {Number} radius the radius of the pie chart */
                    radius    : this.setRadius
                },setter),
                extend({
                    diameter : this.getDiameter,
                    radius   : this.getRadius
                },getter));
    },

    /**
     * @method
     * Set the diameter of the circle. The center of the circle will be retained.
     *
     * @param {Number} d The new diameter of the circle.
     * @since 4.0.0
     **/
    setDiameter: function(d)
    {
        var center = this.getCenter();
        this.setDimension(d,d);
        this.setCenter(center);
        this.fireEvent("change:diameter",{value:this.width});

        return this;
    },

    /**
     * @method
     * Get the diameter of the circle.
     *
     * @since 4.0.0
     **/
    getDiameter: function()
    {
        return this.getWidth();
    },


    /**
     * @method
     * Set the radius of the circle. The center of the circle will be retained.
     *
     * @param {Number} r The new radius of the circle.
     * @since 4.0.0
     **/
    setRadius: function(r)
    {
        this.setDiameter(r*2);
        this.fireEvent("change:radius",{value:this.width/2});

        return this;
    },


    /**
     * @method
     * Get the center of the circle
     *
     */
    getCenter: function()
    {
        var d2= this.getDiameter()/2;
        return this.getPosition().translate(d2,d2);
    },

    /**
     * @method
     * Set the center of the circle.
     *
     * @param {Number|draw2d.geo.Point} x the new x coordinate of the center or a draw2d.geo.Point object with the center
     * @param {Number} y the y coordinate of the new center of the first argument isn't a draw2d.geo.Point object
     */
    setCenter: function(x, y)
    {
        var pos = new draw2d.geo.Point(x,y);
        var d2  = this.getDiameter()/2;
        pos.translate(-d2,-d2);
        this.setPosition(pos);
        this.fireEvent("change:center",{value:{x:x,y:y}});

        return this;
    },

    /**
     * @inheritdoc
     */
    setData: function( data)
    {

        // Normalize the Data.
        // The SUM must be == 1.
        this.sum = 0;
        data.forEach(val=>{this.sum +=val;});
        let _sum=1/this.sum;
        data.forEach((val,i)=>{data[i] = _sum*val;});

        //  pass the normalize data to the base implementation
        //
        this._super(data);
        this.fireEvent("change:data",{value:data});

        return  this;
    },

    /**
     * @inheritdoc
     */
    createSet: function()
    {
        var radius = this.getWidth()/2;
        var length= this.data.length;

        var pie = this.canvas.paper.set();

        var offsetAngle = 0;

        for ( var i = 0; i < length; i++) {
            // angle is percent of TWO_PI
            var angle = this.TWO_PI * this.data[i];
            var color = this.COLORS[i%length];
            var seg = this.drawSegment(radius, angle, offsetAngle, 0.1);
            seg.attr({stroke: this.color.hash(),fill:color});
            pie.push(seg);
            offsetAngle += angle;
        }
        return pie;
    },

    /**
     * @inheritdoc
     */
    setDimension: function(w,h)
    {
        // keep the aspect ration
        //
        if(w>h){
            this._super(w,w);
         }
         else{
            this._super(h,h);
         }

        // we must recreate the diagram if we change the size.
        // low performance. Better: transfor/scale the set. Can be done in the next release
        //
        if (this.svgNodes !== null) {
            this.svgNodes.remove();
            this.svgNodes = this.createSet();
        }

        this.repaint();

        return this;
    },

    polarPath: function(radius, theta, rotation)
    {
        var x, y;
        x = radius * Math.cos(theta + rotation)+radius;
        y = radius * Math.sin(theta + rotation)+radius;
        return "L " + x + " " + y + " ";
    },

    drawSegment: function(radius, value, rotation, resolution)
    {
      var path = "M "+radius+" "+radius;

      for (var i = 0; i < value; i+=resolution){
        path += this.polarPath(radius, i, rotation);
      }
      path += this.polarPath(radius, value, rotation);

      path += "L "+radius+" "+radius;
      return this.getCanvas().paper.path(path);
    },

    /**
     * @inheritdoc
     */
    applyTransformation: function()
    {
       this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());

       return this;
    }

});
