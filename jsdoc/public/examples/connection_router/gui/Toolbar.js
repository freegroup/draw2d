
example.Toolbar = Class.extend({
	
	init:function(elementId, app, view){
        $( "#radio" ).buttonset();
        this.view = view;
      
        /*
        $("#clear").button().click(function(){
            app.view.clear();
        });
        */
        
        $('#radio>input').click(function() {

            var defaultRouterClassName =$(this).data("router");
            app.setDefaultRouterClassName(defaultRouterClassName);
            var router = eval("new "+defaultRouterClassName+"()");
          
            view.getLines().each(function(i,line){
                line.setRouter(router);
            });
            
            // Recalculate intersections for new router and repaint all connections
            view.calculateConnectionIntersection();
            view.getLines().each(function(i,line){
                line.svgPathString = null;
                line.repaint();
            });
        });
	}
});