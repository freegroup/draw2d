var jsonDocument = [
  {
    "type": "draw2d.shape.note.PostIt",
    "id": "ebfb35bb-5767-8155-c804-any",
    "x": 20,
    "y": 20,
    "text": "Use the right mouse button on the\nconnection to add or remove segments"
  },
  {
    "type": "draw2d.shape.node.Start",
    "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
    "x": 25,
    "y": 120,
    "width": 50,
    "height": 50,
    "radius": 2
  },
  {
    "type": "draw2d.shape.node.End",
    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2",
    "x": 332,
    "y": 175,
    "width": 50,
    "height": 50,
    "radius": 2
  },
  {
    "type": "draw2d.Connection",
    "id": "74ce9e7e-5f0e-8642-6bec-4ff9c54b3f0a",
    "radius": 8,
    "stroke": 3,
    "color": "#00A8F0",
    "outlineStroke": 1,
    "outlineColor": "#303030",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "source": {
      "node": "354fa3b9-a834-0221-2009-abc2d6bd852a",
      "port": "output0"
    },
    "target": {
      "node": "ebfb35bb-5767-8155-c804-14bda7759dc2",
      "port": "input0"
    }
  }
];