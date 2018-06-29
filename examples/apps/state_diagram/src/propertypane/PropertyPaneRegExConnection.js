function regexRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    if(value!==null && value !==""){
        td.innerHTML = RegexColorizer.colorizeText(value);
        $(td).addClass("regex");
    }
    return td;
}
function actionRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    td.innerHTML = "<img class='open_regexpr_editor' src='img/open_in_new_window.png'>";
    return td;
}
    

example.propertypane.PropertyPaneRegExConnection = Class.extend({
	
	init:function(stateFigure){
	    this.figure = stateFigure;
	    this.table = null;
	},
	
	injectPropertyView: function( domId)
	{
	    this.table = domId;
	    
		this.table.handsontable({
            data: this.figure.getUserData(),
            maxCols: 3,
            minRows:1,
            colHeaders: ["", "Regular Expression","Default Answer"],
            colWidths: [55, 280, 80],
            manualColumnResize: true,
            rowHeaders: false,
            minSpareRows: 1,
            stretchH: 'last',
            columns: [
                      {                 type:{renderer: actionRenderer}},
                      {data: "regexpr", type:{renderer: regexRenderer}},
                      {data: "defaultAnswer"}
                    ],
            width: function () {		                
                return domId.width();
            },
            height: function () {		              
                return domId.height();
            },
            afterSelectionEnd: $.proxy(function(row, column){
                if(column==0){
                    var data =this.figure.getUserData();
                    
                    if(data.length<=row){
                        return;
                    } 
                    (new example.dialog.RegexEditorDialog(this.figure,data[row])).show();
                }
            },this),
            beforeChange: $.proxy(function (change, source) {
                change = change[0];
                var row = change[0];
                var field = change[1];
                var newVal = change[3];
                
                var data =this.figure.getUserData()[row];
                var newData = {};
                newData[field]=newVal;
                this.cmd = new example.command.CommandSetJSON(this.figure, data, newData);
            },this),
            afterChange: $.proxy(function (change, source) {
                if (source === 'edit') {
                    app.executeCommand(this.cmd);
                }

            },this)
          });
          this.table.find("table").addClass('table');
	},

    /**
     * @method
     * called by the framework if the pane has been resized. This is a good moment to adjust the layout if
     * required.
     * 
     */
    onResize: function()
    {
        // trigger a resize
        this.table.handsontable('render');
    },

    /**
     * @method
     * called by the framework before the pane will be removed from the DOM tree
     * 
     */
    onHide: function()
    {
        this.table.handsontable('destroy');
    }
   

});

