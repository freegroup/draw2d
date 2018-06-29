
/**
 * @class draw2d.shape.pert.Activity
 * 
 * NOT FOR PRODUCTIVE
 * 
 * Checkout [Wikipedia PERT][1] for more information.
 * 
 * Double click on the Task name or the top middle number to change the value.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     canvas.add( new draw2d.shape.pert.Activity,10,10);
 *     canvas.add( new draw2d.shape.pert.Activity,80,130);
 *     canvas.add( new draw2d.shape.pert.Activity,180,50);
 *     
 * [1] http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 * 
 * @extends draw2d.shape.layout.VerticalLayout
 */
example.shape.Activity = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "example.shape.Activity",
	
    init : function()
    {
        this._super();
        // init the object with some good defaults for the activity setting.
        this.setUserData({activity:"NOP", mapping:[]});
        
        this.port = this.createPort("hybrid", new draw2d.layout.locator.BottomLocator(this));
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.port));

        this.setCssClass("activity");
        this.setBackgroundColor("#f3f3f3");

        // UI representation
        this.setStroke(1);
        this.setColor("#e0e0e0");
        this.setRadius(1);  
        
        // Compose the top row of the shape
        //
        var top = this.createLabel("Activity").setStroke(0);        
        this.label = top;
        
        // the middle part of the shape
        // This part contains the ports for the connection
        //
        var center =  new draw2d.shape.basic.Rectangle();  
        center.getHeight= function(){return 1;};
        center.setMinWidth(90);
        center.setColor("#e0e0e0");
        
        // the bottom of the activity shape
        //
        var bottom = this.createLabel("ReloadDefinitions");   
        this.activityLabel = bottom;
        bottom.setMinHeight(30);
        bottom.setStroke(0);
        bottom.setBackgroundColor(null);
        bottom.setFontColor("#a0a0a0");

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(center);
        this.add(bottom);        
     },
     
     /**
      * @method
      * Set the text to show if the state shape
      * 
      * @param {String} text
      */
     setLabel: function (text)
     {
         this.label.setText(text);
         
         return this;
     },
     
     
     /**
      * @method
      * Return the label of the shape
      * 
      */
     getLabel: function ()
     {
         return this.label.getText();
     },
     
     /**
      * @method
      * Set the text to show if the state shape
      * 
      *     {
      *       activity: "activityId"
      *       mapping: [{ parameterName: "nameOfTheParameter",
      *                   value: "theVariableOfTheContext"
      *                 },
      *                 ...
      *                ]
      *     }

      * @param {Object} activityDef the setting for the activity
      */
     setActivity: function (activityDef)
     {
    	 this.activityLabel.setText(activityDef.activity);
         this.setUserData(activityDef);
         
         return this;
     },
     
     
     /**
      * @method
      * Return the activity setting of the shape
      * 
      * Example:
      *     {
      *       activity: "activityId"
      *       mapping: [{ activityParameter: "nameOfTheParameter",
      *                   contextVariable: "theVariableOfTheContext"
      *                 },
      *                 ...
      *                ]
      *     }
      * 
      */
     getActivity: function ()
     {
         return this.getUserData();
     },
     
     
     /**
      * @method
      * helper method to create some labels
      * 
      * @param {String} txt the label to display
      * @returns {draw2d.shape.basic.Label}
      * @private
      */
     createLabel: function(txt){
    	 var label =new draw2d.shape.basic.Label({text:txt});
    	 label.setStroke(1);
    	 label.setRadius(0);
    	 label.setBackgroundColor(null);
    	 label.setPadding(5);
    	 label.setColor(this.bgColor.darker(0.2));
    	 label.onDoubleClick=function(angle){/* ignore them for the layout elements*/};
    	    
    	 return label;
     },
     
     /**
      * @method
      * validate all regular expression from this connection and set a corresponding
      * color for the connection if any errors are in.
      * 
      */
     validate: function(){
         
     },
     
     
    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        memento.label = this.getLabel();
        
        delete memento.radius;

        return memento;
    },
    
    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     * @returns 
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        try{
            this.setLabel(memento.label);
            this.setActivity(memento.userData);
        }
        catch(exc)
        {
     
        }

    }
});
