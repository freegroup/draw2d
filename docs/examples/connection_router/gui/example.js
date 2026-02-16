// the document to load....in this case a simple JSON Object
// Left column (Start nodes) and right column (End nodes) for manual connection testing
var jsonDocument = 
    [
      // Left column - Start nodes
      {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852as",
        "x": 25,
        "y": 97,
        "width": 50,
        "height": 50,
        "radius": 2,
        "angle": 270
      },
      {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852as_2",
        "x": 25,
        "y": 197,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.Start",
        "id": "node_left_3",
        "x": 25,
        "y": 297,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.Start",
        "id": "node_left_4",
        "x": 25,
        "y": 397,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.Start",
        "id": "node_left_5",
        "x": 25,
        "y": 497,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      
      // Right column - End nodes
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
        "x": 332,
        "y": 45,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_2",
        "x": 332,
        "y": 145,
        "width": 50,
        "height": 50,
        "radius": 2,
        "angle": 270
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "node_right_3",
        "x": 332,
        "y": 245,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "node_right_4",
        "x": 332,
        "y": 345,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "node_right_5",
        "x": 332,
        "y": 445,
        "width": 50,
        "height": 50,
        "radius": 2
      }
    ];