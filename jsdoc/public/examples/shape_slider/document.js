
// the document to load.
var jsonDocument =
        [
            {
                "type": "SliderShape",
                "id": "ebfb35bb-5767-8155-c804-14bd48789dc21",
                "x": 72,
                "y": 145,
                "width": 122.6875,
                "height": 107,
                "alpha": 1,
                "angle": 0,
                "userData": {},
                "cssClass": "SliderShape",
                "bgColor": "#DBDDDE",
                "color": "#D7D7D7",
                "stroke": 1,
                "radius": 3,
                "dasharray": null,
                "gap": 8,
                "name": "Figure with Sliders",
                "entities": [
                    {
                        "id": "sdfsfdg1"
                    },
                    {
                        "id": "sdfsfdg2"
                    },
                    {
                        "id": "sdfsfdg3"
                    }
                ]
            },
            {
                "type": "LED",
                "id": "ebfb35bb-5767-8155-c804-14bd48789dc22",
                "x": 272,
                "y": 195,
                "width": 30,
                "height": 30,
                "alpha": 0.54,
                "angle": 0,
                "userData": {},
                "cssClass": "LED",

                "bgColor": "#FF6D00",
                "color": "#D7D7D7",
                "stroke": 3,
                "dasharray": null
            },
            {
                "type": "draw2d.shape.note.PostIt",
                "id": "d7ecf85f-bc9d-94fd-5a95-6a35027ff298",
                "x": 20,
                "y": 20,
                "width": 272.703125,
                "height": 35,
                "alpha": 1,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_shape_note_PostIt",
                "ports": [],
                "bgColor": "#5B5B5B",
                "color": "#FFFFFF",
                "stroke": 1,
                "radius": 5,
                "dasharray": null,
                "text": "Use the contextmenu to add additional sliders to the figure.\nAll of them can be store and restore via JSON",
                "outlineStroke": 0,
                "outlineColor": "none",
                "fontSize": 14,
                "fontColor": "#FFFFFF",
                "fontFamily": null
            },
            {
                "type": "draw2d.Connection",
                "id": "3d42fc9a-a8a2-097a-9403-8de5bf1ed11f",
                "alpha": 1,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_Connection",
                "stroke": 4,
                "color": "#00e676",
                "outlineStroke": 1,
                "outlineColor": "#1b5e20",
                "policy": "draw2d.policy.line.VertexSelectionFeedbackPolicy",
                "vertex": [
                    {
                        "x": 194.6875,
                        "y": 197.5
                    },
                    {
                        "x": 272,
                        "y": 210
                    }
                ],
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "ebfb35bb-5767-8155-c804-14bd48789dc21",
                    "port": "output_sdfsfdg1"
                },
                "target": {
                    "node": "ebfb35bb-5767-8155-c804-14bd48789dc22",
                    "port": "input0"
                }
            }
        ]
    ;
