
// the document to load....in this case a simple JSON Object
var jsonDocument = 
    [
      {
        "type": "CustomShape",
        "id": "5b4c74b0-96d1-1aa3-7eca-bbeaed5fffd7",
        "x": 237,
        "y": 236
      },
      {
        "type": "draw2d.shape.basic.Rectangle",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
        "x": 225,
        "y": 97,
        "width": 201,
        "height": 82,
        "radius": 2
      },
      {
        "type": "draw2d.shape.basic.Rectangle",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2",
        "x": 72,
        "y": 45,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
          "type": "draw2d.shape.analog.OpAmp",
          "id": "ebfb35bb-5767-8155-c804-14bd48789dc2",
          "x": 372,
          "y": 245,
          "width": 50,
          "height": 50
        },
              {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852as",
        "x": 25,
        "y": 97,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
        "x": 272,
        "y": 45,
        "width": 50,
        "height": 50,
        "radius": 2,
        "stroke":4
      },
      {
        "type": "draw2d.Connection",
        "id": "74ce9e7e-5f0e-8642-6bec-4ff9c54b3f0ac",
        "source": {
          "node": "354fa3b9-a834-0221-2009-abc2d6bd852as",
          "port": "output0"
        },
        "target": {
          "node": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
          "port": "input0"
        }
      }
    ];
