
// the document to load....in this case a simple JSON Object
var jsonDocument = 
    [
      {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852as",
        "x": 25,
        "y": 97,
        "width": 50,
        "height": 50,
        "radius": 2,
        "angle":270
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
        "x": 332,
        "y": 145,
        "width": 50,
        "height": 50,
        "radius": 2,
        "angle": 270
      },
     {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852as_2",
        "x": 25,
        "y": 397,
        "width": 50,
        "height": 50,
        "radius": 8
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_2",
        "x": 272,
        "y": 45,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.Connection",
        "id": "74ce9e7e-5f0e-8642-6bec-4ff9c54b3f0ac",
        "stroke": 3,
        "radius":10,
        "color":'#00A8F0',
        "outlineStroke":1,
        "outlineColor":"#303030",
        "source": {
          "node": "354fa3b9-a834-0221-2009-abc2d6bd852as",
          "port": "output0",
          "decoration": "draw2d.decoration.connection.ArrowDecorator"
        },
        "target": {
          "node": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
          "port": "input0"
        }
      },
      {
        "type": "draw2d.Connection",
        "id": "74ce9e7e-5f0e-8642-6bec-4ff9c54b3f0ac_2",
        "stroke": 2,
        "radius":4,
        "source": {
          "node": "354fa3b9-a834-0221-2009-abc2d6bd852as_2",
          "port": "output0"
        },
        "target": {
          "node": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
          "port": "input0"
        }
      }
      
    ];
