
/**
 * @class draw2d.shape.node.Node
 * 
 * A Node is the base class for all figures which can have {@link draw2d.Port}s. A {@link draw2d.Port} is the
 * anchor for a {@link draw2d.Connection} line.<br><br>A {@link draw2d.Port} is a green dot which can 
 * be dragged and dropped over another port.<br>
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.Figure 
 */ import draw2d from '../../packages';
draw2d.shape.node.Node = draw2d.Figure.extend({
 
	NAME : "draw2d.shape.node.Node",

   /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
    */
    init: function( attr ,setter , getter) 
    {
      this.inputPorts = new draw2d.util.ArrayList();
      this.outputPorts= new draw2d.util.ArrayList();
      this.hybridPorts= new draw2d.util.ArrayList();
      
      // flag which indicates if the figure should read/write ports to 
      // JSON 
      this.persistPorts = true;
      
      // Flags just for performance reasons
      //
      this.portRelayoutRequired = true;
      
      // just for performance reasons
      //
      this.cachedPorts = null;
      
      this._super(
              $.extend({width:50, height:50}, attr),
              $.extend({
                  /** @attr {Number} indicate whenever you want persists the ports too */
                  persistPorts : this.setPersistPorts
              }, setter),
              $.extend({
                  persistPorts : this.getPersistPorts
              }, getter));
    },
    

    /**
     * @method
     * Indicates if the node should read/write the ports via the draw2d.Figure.getPersistenAttributes 
     * to the JSON object
     * 
     * @param {Boolean} flag
     * @since 5.0.4
     */
    setPersistPorts: function(flag)
    {
        this.persistPorts = flag;
        this.fireEvent("change:persistPorts",{value:this.persistPorts});

        return this;
    },
    
    /**
     * @method
     * Indicates if the figure writes the ports to the JSON structore too.
     * Default is "false"
     * 
     * @returns {Boolean}
     */
    getPersistPorts: function()
    {
        return this.persistPorts;
    },

    /**
     * @inheritdoc
     */
    toFront: function(figure)
    {
        this._super(figure);
        
        var _this = this;
        this.getPorts().each(function(i,port){
            port.getConnections().each(function(i,connection){
                connection.toFront(figure);
            });
            // a port should always be in front of the shape dosn't matter what the 
            // "figure" parameter says.
            //
            port.toFront(_this);
        });
        
        return this;
    },

    /**
     * @inheritdoc
     */
    toBack: function(figure)
    {
        
        this.getPorts().each(function(i,port){
            port.getConnections().each(function(i,connection){
                connection.toBack(figure);
            });
            port.toBack(figure);
        });
        
        this._super(figure);
        
        return this;
    },

    /**
     * @inheritdoc
     */
    setVisible: function(flag, duration)
    {
    	// adjust the visibility of the ports to the parent state
    	//
    	if(!flag){
    		this.getPorts().each(function(i,port){
    			port.__initialVisibilityState=port.isVisible();
    			port.setVisible(false, duration);
    		});
    	}
    	else{
    		this.getPorts().each(function(i,port){
    			if(typeof port.__initialVisibilityState !=="undefined"){
    				port.setVisible(port.__initialVisibilityState, duration);
    			}
    			else{
    				port.setVisible(true, duration);
    			}
    			delete port.__initialVisibilityState;
    		});
    	}
    	this._super(flag, duration);
    },
    
    
    /**
     * @method
     * Return all ports of the node. The results contains
     * all ports of the children too per default. Set <b>recursive</b>
     * to false to retrieve direct assigned ports only.
     *
     * @param {Boolean} [recursive] indicates if the method should return children ports too. Default is <b>true</b>
     * @return  {draw2d.util.ArrayList}
     **/
    getPorts: function(recursive)
    {
      if(typeof recursive === "boolean" && recursive===false){
          var ports = new draw2d.util.ArrayList();
          ports.addAll(this.inputPorts);
          ports.addAll(this.outputPorts);
          ports.addAll(this.hybridPorts);
          return ports;
      }

      if(this.cachedPorts===null ){
          this.cachedPorts = new draw2d.util.ArrayList();
          this.cachedPorts.addAll(this.inputPorts);
          this.cachedPorts.addAll(this.outputPorts);
          this.cachedPorts.addAll(this.hybridPorts);

          var _this = this;
          this.children.each(function(i,e){
              _this.cachedPorts.addAll( e.figure.getPorts());
          });
      }
              
      return this.cachedPorts;
    },
    
    
    /**
     * @method
     * Return all input ports of the node.
     *
     * @return {draw2d.util.ArrayList}
     **/
    getInputPorts: function()
    {
      return this.inputPorts
               .clone()
               .addAll(this.hybridPorts);
    },
    
    /**
     * @method
     * Return all output ports of the node.
     *
     * @return {draw2d.util.ArrayList}
     **/
    getOutputPorts: function()
    {
      return this.outputPorts
          .clone()
          .addAll(this.hybridPorts);
    },



    /**
     * @method
     * Clone the figure. <br>
     * You must override and implement the methods <b>getPersistentAttributes</b> and <b>setPersistentAttributes</b> for your custom
     * figures if the have special attributes.
     *
     * The clone() method performs a deep copy of the object, meaning that it copies the children, ports and decorations
     * per default. You can control the clone procedure with the 'cloneMetaData'.
     *
     *
     * @param {Object} [cloneMetaData] controls the clone procedure
     * @param {Boolean} [cloneMetaData.excludeChildren] set it to true if you want exclude the children.
     * @param {Boolean} [cloneMetaData.excludePorts] set it to true if you want exclude the ports of the node.
     *
     * @since 4.1.0
     * @experimental
     */
    clone: function(cloneMetaData)
    {
        cloneMetaData = $.extend({excludePorts:false},cloneMetaData);

        var clone = this._super(cloneMetaData);
        
        // remove all ports of the clone. the "init" method can have create some. but this must
        // removed because we want a clone of an existing figure
        //
        if(cloneMetaData.excludePorts ===false) {
            clone.resetPorts();
            var ports = this.getPorts(false);

            ports.each(function (i, port) {
                var clonePort = port.clone();
                var locator = port.getLocator().clone();
                clone.addPort(clonePort, locator);
            });
        }

        return clone;
    },

    /**
     * @method
     * Return the port with the corresponding name.
     *
     * 
     * @param {String} portName The name of the port to return.
     * @return {draw2d.Port} Returns the port with the hands over name or null.
     **/
    getPort: function( portName)
    {
    	var port = null;
    	
        this.getPorts().each(function(i,e){
            
            if (e.getName() === portName) {
                port = e;
         		return false;
            }
        });
        
        return port;
    },
    
    /**
     * @method
     * Return the input port with the corresponding name.
     *
     * 
     * @param {String/Number} portNameOrIndex The name or numeric index of the port to return.
     * @return {draw2d.InputPort} Returns the port with the hands over name or null.
     **/
    getInputPort: function( portNameOrIndex)
    {
        if(typeof portNameOrIndex === "number"){
            return this.inputPorts.get(portNameOrIndex);
        }
        
        for ( var i = 0; i < this.inputPorts.getSize(); i++) {
            var port = this.inputPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }
      
        return null;
    },
    
    /**
     * @method
     * Return the output port with the corresponding name.
     *
     * @param {String/Number} portNameOrIndex The name or the numeric index of the port to return.
     * @return {draw2d.OutputPort} Returns the port with the hands over name or null.
     **/
    getOutputPort: function( portNameOrIndex)
    {
        if(typeof portNameOrIndex === "number"){
            return this.outputPorts.get(portNameOrIndex);
        }
        
         for ( var i = 0; i < this.outputPorts.getSize(); i++) {
            var port = this.outputPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }

        return null;
    },
    
    /**
     * @method
     * Return the input port with the corresponding name.
     *
     * 
     * @param {String/Number} portNameOrIndex The name or numeric index of the port to return.
     * @return {draw2d.InputPort} Returns the port with the hands over name or null.
     **/
    getHybridPort: function( portNameOrIndex)
    {
        if(typeof portNameOrIndex === "number"){
            return this.hybridPorts.get(portNameOrIndex);
        }
        
        for ( var i = 0; i < this.hybridPorts.getSize(); i++) {
            var port = this.hybridPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }
      
        return null;
    },
    
    /**
     * @method
     * Add a port to this node at the given position.<br>
     *
     * @param {draw2d.Port} port The new port to add.
     * @param {draw2d.layout.locator.Locator} locator The layouter for the port.
     **/
    addPort: function(port, locator)
    {
        if(!(port instanceof draw2d.Port)){
            throw "Argument is not typeof 'draw2d.Port'. \nFunction: draw2d.shape.node.Node#addPort";
        }

        // add to the internal cache if already build
        if(this.cachedPorts !== null){
        	this.cachedPorts.add(port);
        };
        
        this.portRelayoutRequired=true;
        
        
        if (port instanceof draw2d.InputPort) {
            this.inputPorts.add(port);
        }
        else if(port instanceof draw2d.OutputPort){
            this.outputPorts.add(port);
        }
        else if(port instanceof draw2d.HybridPort){
            this.hybridPorts.add(port);
        }

        if((typeof locator !== "undefined") && (locator instanceof draw2d.layout.locator.Locator)){
            port.setLocator(locator);
        }
        
        port.setParent(this);
        port.setCanvas(this.canvas);

        // You can't delete a port with the [DEL] key if a port is a child of a node
        port.setDeleteable(false);

        if (this.canvas !== null) {
            port.getShapeElement();
            this.canvas.registerPort(port);
        }
    },
    
    /**
     * @method
     * Remove all ports of this node
     * 
     * @since 5.0.0
     */
    resetPorts: function()
    {
        var _this = this;
        this.getPorts().each(function(i,port){
            _this.removePort(port);
        });
 
        return this;
    },

    
    /**
     * @method
     * Removes a port and all related connections from this node.<br>
     *
     * @param {draw2d.Port} port The port to remove.
     **/
    removePort: function(port)
    {
        this.portRelayoutRequired=true;

        this.cachedPorts = null;
        this.inputPorts.remove(port);
        this.outputPorts.remove(port);
        this.hybridPorts.remove(port);

        if (port.getCanvas() !== null) {
            port.getCanvas().unregisterPort(port);
            // remove the related connections of the port too.
            var connections = port.getConnections();
            for ( var i = 0; i < connections.getSize(); ++i) {
                port.getCanvas().remove(connections.get(i));
            }
        }

        port.setCanvas(null);
    },
    
    /**
     * @method
     * Create a standard Port for this element. Inherited class can override this
     * method to create its own type of ports.
     * 
     * @param {String} type the type of the requested port. possible ["input", "output"]
     * @param {draw2d.layout.locator.Locator} [locator] the layouter to use for this port
     * @template
     */
    createPort: function(type, locator){
        var newPort = null;
        var count =0;
        
    	switch(type){
    	case "input":
    		newPort= draw2d.Configuration.factory.createInputPort(this);
    		count = this.inputPorts.getSize();
    		break;
    	case "output":
    		newPort= draw2d.Configuration.factory.createOutputPort(this);
            count = this.outputPorts.getSize();
    		break;
        case "hybrid":
            newPort= draw2d.Configuration.factory.createHybridPort(this);
            count = this.hybridPorts.getSize();
            break;
    	default:
            throw "Unknown type ["+type+"] of port requested";
    	}
    	
   	    newPort.setName(type+count);
    	
    	this.addPort(newPort, locator);
    	// relayout the ports
    	this.setDimension(this.width,this.height);
    	
//        this.layoutPorts();

    	return newPort;
    },
    
    /**
     * @method
     * Return all connections related to this node.
     * 
     * @returns {draw2d.util.ArrayList}
     */
    getConnections: function()
    {
        var connections = new draw2d.util.ArrayList();
        var ports = this.getPorts();
        for(var i=0; i<ports.getSize(); i++)
        {
          var port = ports.get(i);
          // Do NOT add twice the same connection if it is linking ports from the same node
          for (var c = 0, c_size = port.getConnections().getSize() ; c< c_size ; c++)
          {
              if(!connections.contains(port.getConnections().get(c)))
              {
                connections.add(port.getConnections().get(c));
              }
          }
        }
        return connections;
    },


    /**
     * @inheritdoc
     */
    setCanvas: function(canvas)
    {
        var oldCanvas = this.canvas;
        this._super(canvas);
       
        var ports = this.getPorts();
        if (oldCanvas !== null) {
            ports.each(function(i,port){
                oldCanvas.unregisterPort(port);
            });
        }

        if (canvas !== null) {
            ports.each(function(i,port){
                port.setCanvas(canvas);
                canvas.registerPort(port);
            });
            // relayout the ports
            this.setDimension(this.width,this.height);
        }
        else {
            ports.each(function(i,port){
                port.setCanvas(null);
            });
        }
    },
    
    /**
     * @inheritdoc
     */
    setRotationAngle: function(angle)
    {
        this.portRelayoutRequired=true;
        this._super(angle);
        
        this.layoutPorts();
    },
    
    /**
     * @inheritdoc
     */
    setDimension: function(w,h)
    {
        this.portRelayoutRequired=true;
        this._super(w,h);
    },
    
    /**
     * @method
     * Called if the value of any port has been changed
     * 
     * @param {draw2d.Port} relatedPort
     * @template
     */
    onPortValueChanged: function(relatedPort)
    {
    
    },
    
    /**
     * @inheritdoc
     */
     repaint: function(attributes)
     {
         if (this.repaintBlocked===true || this.shape === null){
             return;
         }
         
         this._super(attributes);
         this.layoutPorts();
     },
     
    /**
     * @method
     * 
     * @private
     */
     layoutPorts: function()
    {
         if(this.portRelayoutRequired===false){
             return;//silently
         }
         this.portRelayoutRequired=false;
         
         // layout the ports
         //
         this.outputPorts.each(function(i, port){
             port.locator.relocate(i,port);
         });
         
         this.inputPorts.each(function(i, port){
             port.locator.relocate(i,port);
         });
         
         this.hybridPorts.each(function(i, port){
             port.locator.relocate(i,port);
         });
     },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function( request)
    {
        if(request===null){
            return null;
        }

        if(request.getPolicy() === draw2d.command.CommandType.ROTATE){
            return new draw2d.command.CommandRotate(this, (this.getRotationAngle()+90)%360);
        }


        return this._super(request);
    },


    /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes: function()
     {
         var memento = this._super();
         
         // write all ports to the JSON
         //
         if(this.persistPorts===true){
             memento.ports = [];
             this.getPorts().each(function(i,port){
                 memento.ports.push($.extend(port.getPersistentAttributes(),{
                     name   : port.getName(),
                     port   : port.NAME,
                     locator: port.getLocator().NAME
                 }));
             });
         }
         
         return memento;
     },
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      * 
      * @param {Object} memento
      * @returns 
      */
     setPersistentAttributes: function(memento)
     {
         this._super(memento);
         
         if(typeof memento.ports !=="undefined"){
             // we read the ports from the JSON and now we save it to the JSON too.
             this.persistPorts = true;
             
             // remove all ports created in the init method
             //
             this.resetPorts();
             
             // and restore all ports of the JSON document instead.
             //
             $.each(memento.ports, $.proxy(function(i,e){
                 var port    =  eval("new "+e.port+"()");
                 var locator =  eval("new "+e.locator+"()");
                 port.setPersistentAttributes(e);
                 this.addPort(port, locator);
                 port.setName(e.name);
             },this));
         }
     }
    
});



