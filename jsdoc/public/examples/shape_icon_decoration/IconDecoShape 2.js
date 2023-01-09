
IconDecoShape = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "IconDecoShape",
	
    init : function(attr)
    {
        this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:2, gap:2},attr));
        
        
        this.icons = new draw2d.shape.layout.HorizontalLayout()
                        .setStroke(0)
                        .setRadius(this.getRadius())
                        .setBackgroundColor("#f7f7f7");;
        

       
        var img1 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        var img2 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        var img3 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        
        img1.on("click",function(){alert("hit icon 1");});
        img2.on("click",function(){alert("hit icon 2");});
        img3.on("click",function(){alert("hit icon 3");});
        
        this.icons.add(img1);                
        this.icons.add(img2);                
        this.icons.add(img3);                
        this.icons.add(new draw2d.shape.basic.Label({text:"icons"}));                
               
        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(new draw2d.shape.basic.Label({text:"Header Header Header Header Header"}));
        this.add(this.icons);
        this.add(new draw2d.shape.basic.Label({text:"Fixed Footer"}));
        
        // resizeable:true => strech the label to the complete width of the shape
        this.add(new draw2d.shape.basic.Label({text:"Resizeable Footer", resizeable:true}));
    }
     
});
