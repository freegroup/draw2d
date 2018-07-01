var jsonDocument = 
    [
      {
        "type": "draw2d.shape.node.Start",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
        "x": 25,
        "y": 117,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "draw2d.shape.node.End",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2",
        "x": 272,
        "y": 75,
        "width": 50,
        "height": 50,
        "radius": 2
      },
      {
        "type": "MyConnection",
        "id": "74ce9e7e-5f0e-8642-6bec-4ff9c54b3f0a",
        "radius":10,
        "stroke":3,
        "source": {
          "node": "354fa3b9-a834-0221-2009-abc2d6bd852a",
          "port": "output0",
          "decoration": "draw2d.decoration.connection.CircleDecorator"   /*CUSTOM ATTRIBUTE */
        },
        "target": {
          "node": "ebfb35bb-5767-8155-c804-14bda7759dc2",
          "port": "input0",
          "decoration": "draw2d.decoration.connection.ArrowDecorator"   /*CUSTOM ATTRIBUTE */
        },
        "vertex": []
      }
    ];
