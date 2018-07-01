
var TableTestFigure = draw2d.shape.layout.TableLayout.extend({

    init : function(attr)
    {
    	this._super($.extend({
            stroke: 1,
            minWidth: 200,
            bgColor: '#FFFFFF',
            radius: 0
        },attr ));



        this.stepName = this.createStepName('Hello World');
        this.question = this.createQuestion('What is the meaning of Life?');
        this.addRow(this.stepName);
        this.addRow(this.question);


        this.setCellPadding(0,0, 2);
        this.setCellAlign(0,0, 'center');
        this.setCellPadding(1,0, 5);
        this.setCellAlign(1,0, 'center');


        this.on("contextmenu", function(){
            console.log("lll");
        });

    },


    setText:function(text){
        this.stepName.setText(text);
        this.calculateLayout();
        this.setDimension(2,2);
    },

    createStepName: function(stepNameText)
    {
        return new draw2d.shape.basic.Label({
            cssClass: 'step-name',
            text: stepNameText,
            resizable: false,
            stroke: 0,
            padding: 5,
            bgColor: '#FF0000'
        });
    },

    createQuestion: function(questionText)
    {
        return new draw2d.shape.basic.Label({
            text: questionText,
            stroke: 0,
            resizable: false,
            radius: 2,
            padding: 5
        });
    }
});
