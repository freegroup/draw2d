
SliderShape = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "SliderShape",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3, gap:8},attr));

        var _table=this;

        this.classLabel = new draw2d.shape.basic.Label({
            text:"Figure with Sliders",
            stroke:1,
            fontColor:"#5856d6",  
            bgColor:"#f7f7f7", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor: new draw2d.ui.LabelInplaceEditor()
        });

        this.classLabel.on("contextmenu", function(emitter, event){
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide:function(){ $.contextMenu( 'destroy' ); }
                },
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "new":
                            setTimeout(function(){
                                _table.addSlider("_new_").onDoubleClick();
                            },10);
                            break;
                        default:
                            break;
                    }

                },this),
                x:event.x,
                y:event.y,
                items:
                {
                    "new":    {name: "New Slider"}
                }
            });
        });

        this.add(this.classLabel);
        this.persistPorts = false;
    },

    clone:function()
    {
        var clone = this._super({exludeChildren:true, excludePorts:true});

        return clone;
    },
 
    /**
     * @method
     * Add an entity to the db shape
     *
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addSlider: function( optionalIndex)
    {
	   	 var slider =new draw2d.shape.widget.Slider({
             radius:0,
             stroke:0
	   	 });
	     var output= slider.createPort("output");

        // transfer the value of the slider to all connected ports
        //
        slider.on("change:value", function(element, event) {
            output.setValue(event.value);
            var connections = output.getConnections();
            connections.each(function (i, conn) {
                var targetPort = conn.getTarget();
                targetPort.setValue(event.value);
            });
        });

        slider.setValue(70);

        // add a contextmenu to the slider ass well
        //
         var _table=this;
         slider.on("contextmenu", function(emitter, event){
             $.contextMenu({
                 selector: 'body', 
                 events:
                 {  
                     hide:function(){ $.contextMenu( 'destroy' ); }
                 },
                 callback: $.proxy(function(key, options) 
                 {
                    switch(key){
                    case "new":
                        _table.addSlider("_new_");
                        break;
                    case "delete":
                        // with undo/redo support
                        var cmd = new draw2d.command.CommandDelete(emitter);
                        emitter.getCanvas().getCommandStack().execute(cmd);
                    default:
                        break;
                    }
                 
                 },this),
                 x:event.x,
                 y:event.y,
                 items: 
                 {
                     "new":    {name: "New Slider"},
                     "sep1":   "---------",
                     "delete": {name: "Delete"}
                 }
             });
         });
         
	     if($.isNumeric(optionalIndex)){
             this.add(slider, null, optionalIndex+1);
	     }
	     else{
	         this.add(slider);
	     }
	     return slider;
    },


    getHandleBBox: function()
    {
        return this.classLabel.getBoundingBox();
    },


    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeSlider: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getSlider: function(index)
    {
        return this.children.get(index+1).figure;
    },

     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : function()
     {
         var memento= this._super();

        memento.name = this.classLabel.getText();
        memento.entities   = [];
        this.children.each(function(i,e){
            
            if(i>0){ // skip the header of the figure
                memento.entities.push({
                    id: e.figure.id
                });
            }
        });
         
         return memento;
     },
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);

         if(typeof memento.name !=="undefined") {
             this.setName(memento.name);
         }

         if($.isArray( memento.entities)){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addSlider(e.text);
                 entity.id = e.id;
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});
