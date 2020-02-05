import draw2d from 'packages'

draw2d.Configuration = {
    version : "@VERSION@",
    i18n : {
        command : {
            move : "Move Shape",
            assignShape : "Add Shapes to Composite",
            groupShapes : "Group Shapes",
            ungroupShapes : "Ungroup Shapes",
            deleteShape : "Delete Shape",
            moveShape : "Move Shape",
            moveLine : "Move Line",
            addShape : "Add Shape",
            moveVertex : "Move Vertex",
            moveVertices : "Move Vertices",
            deleteVertex : "Delete Vertex",
            resizeShape : "Resize Shape",
            rotateShape : "Rotate Shape",
            collection : "Execute Commands",
            addVertex : "Add Vertex",
            changeAttributes:"Change Attributes",
            connectPorts : "Connect Ports"
        },
        menu : {
            deleteSegment : "Delete Segment",
            addSegment : "Add Segment"
        },
        dialog : {
            filenamePrompt : "Enter Filename:"
        }
    },

    factory:{
    	// all selection policies calles this method to create a ResizeHandle.
    	// It is possible to replace this method with a custom implementation
    	// @since 5.2.0
    	createResizeHandle: function(owner, type, width, height){
        // create a custom SelectionPolicy instead
        console.log("deprecated call factory.createResizeHandle");

    		return new draw2d.ResizeHandle({ owner, type, width, height });
    	},
    	// The commands an canvas calles this method to create a new connection.
    	// all parameters are optional.
    	// @since 5.3.0
        // @deprecated
    	createConnection: function(sourcePort, targetPort, callback, dropTarget){
            console.log("deprecated call factory.createConnection");
            debugger;
    	    return new draw2d.Connection();
    	},
        // @since 5.3.0
    	createInputPort: function(relatedFigure){
    	    return new draw2d.InputPort();
    	},
        // @since 5.3.0
        createOutputPort: function(relatedFigure){
            return new draw2d.OutputPort();
        },
        // @since 5.3.0
        createHybridPort: function(relatedFigure){
            return new draw2d.HybridPort();
        }
    }
};
