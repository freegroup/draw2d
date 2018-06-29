
/**
 * @class draw2d.policy.figure.RectangleSelectionFeedbackPolicy
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle({diameter:50});
 *       circle.installEditPolicy(new draw2d.policy.RectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
import draw2d from '../../packages';

draw2d.policy.figure.RectangleSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.figure.RectangleSelectionFeedbackPolicy",
    /**
     * @constructor
     * Creates a selection feedback for a shape.
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },


    /**
     * @inheritdoc
     */
    onSelect: function(canvas, figure, isPrimarySelection)
    {
        if(figure.selectionHandles.isEmpty())
        {
            // Add a dotted line rectangle to the figure. Override the show/hide method of the standard
            // figure to avoid adding these element to the hit test of the canvas. In this case the element
            // is just visible but not part of the model or responsible for any drag/drop operation
            // #2C70FF #2096fc
            var box = new draw2d.shape.basic.Rectangle({bgColor:null, dashArray:"- ", color:"#2C70FF", stroke:0.5});
            box.hide= function(){
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                box.setCanvas(null);
            };
            box.show= function(canvas){
                box.setCanvas(canvas);
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                //canvas.resizeHandles.add(box);
                box.toFront(figure);
            };
            // create standard Resize handles for the figure
            //
            var r1= draw2d.Configuration.factory.createResizeHandle(figure,1); // 1 = LEFT TOP
            var r3= draw2d.Configuration.factory.createResizeHandle(figure,3); // 3 = RIGHT_TOP
            var r5= draw2d.Configuration.factory.createResizeHandle(figure,5); // 5 = RIGHT_BOTTOM
            var r7= draw2d.Configuration.factory.createResizeHandle(figure,7); // 7 = LEFT_BOTTOM
            figure.selectionHandles.add(r1);
            figure.selectionHandles.add(r3);
            figure.selectionHandles.add(r5);
            figure.selectionHandles.add(r7);
            r1.show(canvas);
            r3.show(canvas);
            r5.show(canvas);
            r7.show(canvas);


            // change the look&feel of the corner resizehandles if the
            // figure isn't resizeable
            //
            if(figure.isResizeable()===false) {
              r1.setBackgroundColor(null);
              r3.setBackgroundColor(null);
              r5.setBackgroundColor(null);
              r7.setBackgroundColor(null);
              r1.setDraggable(false);
              r3.setDraggable(false);
              r5.setDraggable(false);
              r7.setDraggable(false);
            }

            // show only the additional resizehandles if the figure is resizeable and didn't care about
            // the aspect ration
            //
            if((!figure.getKeepAspectRatio()) && figure.isResizeable())
            {
                var r2= draw2d.Configuration.factory.createResizeHandle(figure,2); // 2 = CENTER_TOP
                var r4= draw2d.Configuration.factory.createResizeHandle(figure,4); // 4 = RIGHT_MIDDLE
                var r6= draw2d.Configuration.factory.createResizeHandle(figure,6); // 6 = CENTER_BOTTOM
                var r8= draw2d.Configuration.factory.createResizeHandle(figure,8); // 8 = LEFT_MIDDLE
                figure.selectionHandles.add(r2);
                figure.selectionHandles.add(r4);
                figure.selectionHandles.add(r6);
                figure.selectionHandles.add(r8);
                r2.show(canvas);
                r4.show(canvas);
                r6.show(canvas);
                r8.show(canvas);
            }

            // add the reference of the "ant box" to the figure as well. But wee add them
            // to the end of the array because inherit classes expect the resizehandles
            // on index 0-7.
            //
            figure.selectionHandles.add(box);

            // call the box.show() at last to ensure that the resize handles are above the
            // rectangle. The rectangle did a toFront(parentShape);
            box.show(canvas);


        }
        this.moved(canvas, figure);
   },


    /**
     * @method
     * Callback if the figure has been moved. In this case we must update the position of the
     * resize handles and the "ant" box.
     *
     * @param figure
     *
     * @template
     */
    moved: function(canvas, figure )
    {
        if(figure.selectionHandles.isEmpty()){
            return; // silently
        }

        var objHeight   = figure.getHeight();
        var objWidth    = figure.getWidth();
        var xPos = figure.getAbsoluteX();
        var yPos = figure.getAbsoluteY();

        var r1= figure.selectionHandles.find(function(handle){return handle.type===1});
        var r3= figure.selectionHandles.find(function(handle){return handle.type===3});
        var r5= figure.selectionHandles.find(function(handle){return handle.type===5});
        var r7= figure.selectionHandles.find(function(handle){return handle.type===7});

        r1.setPosition(xPos-r1.getWidth(),yPos-r1.getHeight());
        r3.setPosition(xPos+objWidth,yPos-r3.getHeight());
        r5.setPosition(xPos+objWidth,yPos+objHeight);
        r7.setPosition(xPos-r7.getWidth(),yPos+objHeight);

        if(!figure.getKeepAspectRatio()  && figure.isResizeable())
        {
            var r2= figure.selectionHandles.find(function(handle){return handle.type===2});
            var r4= figure.selectionHandles.find(function(handle){return handle.type===4});
            var r6= figure.selectionHandles.find(function(handle){return handle.type===6});
            var r8= figure.selectionHandles.find(function(handle){return handle.type===8});

            r2.setPosition(xPos+(objWidth/2)-(r2.getWidth()/2),yPos-r2.getHeight());
            r4.setPosition(xPos+objWidth,yPos+(objHeight/2)-(r4.getHeight()/2));
            r6.setPosition(xPos+(objWidth/2)-(r6.getWidth()/2),yPos+objHeight);
            r8.setPosition(xPos-r8.getWidth(),yPos+(objHeight/2)-(r8.getHeight()/2));
        }
        var box= figure.selectionHandles.last();
        box.setPosition(figure.getAbsolutePosition().translate(-2.5,-2.5));
        box.setDimension(figure.getWidth()+4, figure.getHeight()+4);
        box.setRotationAngle(figure.getRotationAngle());
    }


});
