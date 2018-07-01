function init(canvas){


    var r1 = new draw2d.shape.layout.HorizontalLayout();
    r1.add(new draw2d.shape.basic.Label({text:"R", resizeable:true, bgColor:"#ff0000"}));
    r1.add(new draw2d.shape.basic.Label({text:"This is a simple label", resizeable:true}));

    var r2 = new draw2d.shape.layout.HorizontalLayout();
    r2.add(new draw2d.shape.basic.Label({text:"G", resizeable:true, bgColor:"#00ff00"}));
    r2.add(new draw2d.shape.basic.Label({text:"This is a simple label", resizeable:true}));

    var r3 = new draw2d.shape.layout.HorizontalLayout();
    r3.add(new draw2d.shape.basic.Label({text:"B", resizeable:true, bgColor:"#0000ff", fontColor:"#ffffff"}));
    r3.add(new draw2d.shape.basic.Label({text:"This is a simple label", resizeable:true}));

    var v1 = new draw2d.shape.layout.VerticalLayout();
    v1.add(r1);
    v1.add(r2);
    v1.add(r3);

    var centeredRotatedLabel = new draw2d.shape.basic.Rectangle({height:100,minWidth:40,resizeable:true});
    centeredRotatedLabel.add(new draw2d.shape.basic.Label({text:"K-1", angle:90, stroke:0}), new draw2d.layout.locator.CenterLocator());

    var figure = new draw2d.shape.layout.HorizontalLayout();
    figure.add(centeredRotatedLabel);
    figure.add(v1);

    canvas.add(figure,100,100);



    var msg = new draw2d.shape.note.PostIt({text:"a simple demo how to use vertical and horizontal layout shapes and a vertical label"});
    canvas.add(msg, 20,20);


}