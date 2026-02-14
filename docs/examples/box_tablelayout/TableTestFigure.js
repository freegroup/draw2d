var TableTestFigure = draw2d.shape.box.VBox.extend({

    init : function(attr)
    {
    	this._super($.extend({
            stroke: 1,
            minWidth: 200,
            bgColor: '#FFFFFF',
            radius: 0,
            gap: 0,
            align: 'center'  // Center non-resizable children horizontally
        },attr ));



        this.stepName = this.createStepName('Hello World');
        this.question = this.createQuestion('What is the meaning of Life?');
        this.add(this.stepName);
        this.add(this.question);

        this.on("contextmenu", function(){
            console.log("lll");
        });

    },


    setText:function(text){
        this.stepName.setText(text);
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