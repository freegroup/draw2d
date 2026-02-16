var TableTestFigure = draw2d.shape.box.VBox.extend({

    init : function(attr)
    {
    	this._super($.extend({
            stroke: 1,
            bgColor: '#FFFFFF',
            radius: 0,
            padding: 6,
            align: 'center'  // Center non-resizable children horizontally
        },attr ));



        this.stepName = this.createStepName('Hello World');
        this.question = this.createQuestion('What is the meaning of Life?');
        this.add(this.stepName);
        this.add(this.question);
    },


    setText:function(text){
        this.stepName.setText(text);
    },

    createStepName: function(stepNameText)
    {
        return new draw2d.shape.basic.Label({
            text: stepNameText,
            resizable: true,
            stroke: 0,
            padding: 5,
            textAlign: "center",
            bgColor: '#FF0000'
        });
    },

    createQuestion: function(questionText)
    {
        return new draw2d.shape.basic.Label({
            text: questionText,
            stroke: 0,
            resizable: true,
            radius: 2,
            padding: 5
        });
    }
});