function regexGroupIndexRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    if(value!==null && value !==""){
        td.innerHTML = row;
        td.className="htDimmed";
    }
    else{
        td.innerHTML="";
    }
    return td;
}

function regexGroupResultPreviewRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    if(value!==null && value !==""){
        try{
            var val = this.editor.val();
            var match = new RegExp(val).exec(this.test.val());
            if(match!==null && match.length>row && typeof match[row+1]!=="undefined"){
                $(td).text( match[row+1]);
            }
        }
        catch(exc){
            td.innerHTML="";
        }
        td.className="htDimmed";
        
    }
    else{
        td.innerHTML="";
    }
    return td;
}


example.dialog.RegexEditorDialog = Class.extend({
    
    init:function(figure, data){
      this.figure = figure;
      this.data = data;
    },
    
    show: function(){
        this.container = $('#myModal');
        var container = this.container;
        var _this = this;
        
        // Regular expression editor with syntax highlighter.
        //
        var template ='<div>Regular Expression</div>'+
                      '<div class="regexeditor_container">'+
        	          '   <pre      class="regexeditor_color regex"></pre>'+
                      '   <pre      class="regexeditor_cursor regex"></pre>'+
                      '   <textarea class="regexeditor_editor" spellcheck="false">{{regexpr}}</textarea>'+
                      '</div>';

        var compiled = Hogan.compile(template);
        var output   = compiled.render(this.data);
        container.find('.modal-body').html(output);
        var textarea = container.find('.regexeditor_editor');
        var color    = container.find('.regexeditor_color');
        var cursor   = container.find('.regexeditor_cursor');

        textarea.on('keyup', $.proxy(function(e) {
           this.updateTest();
        },this));

        var updateCursor = function(){
            var val = textarea.val();
            var pos = textarea.caretPosition();
            var substring = val.substring(0,pos);
            cursor.html(substring+"<span style='color: black;font-weight: bold;margin:-4px;'>&#124;</span>");
        };
        textarea.on('click',   updateCursor);
        textarea.on('keydown', updateCursor);
        textarea.on('keyup',   updateCursor);
        textarea.scroll(function() {
            color.scrollTop(textarea.scrollTop());
            cursor.scrollTop(textarea.scrollTop());
         });
        this.editor = textarea;
        this.highlight = color;

        // test text for the regular expression
        //
        var template ='<div>Test User Input</div>'+
   			          '<div class="regexeditor_container">'+
			          '   <pre      class="regexeditor_color regex" style="color:transparent"></pre>'+
			          '   <textarea class="regexeditor_testinput" spellcheck="false">{{test}}</textarea>'+
			          '</div>';
		var compiled = Hogan.compile(template);
		var output = $(compiled.render(this.data));
		container.find('.modal-body').append(output);
        this.test    = output.find(".regexeditor_testinput");
        this.preview = output.find(".regexeditor_color");
        this.test.on('keyup',   $.proxy(this.updateTest,this));
        
        // test text for the regular expression
        //
        var output =$('<div>Value mapping</div>'+
                      '<div id="regexp_mapping"></div>');
		container.find('.modal-body').append(output);

		// set some good defaults
		if(typeof this.data.mapping ==="undefined" || this.data.mapping ==null){
			this.data.mapping = [];
		}
		
		$("#regexp_mapping").handsontable({
            data: this.data.mapping,
            maxCols: 3,
            minRows:1,
            colHeaders: ["Group #", "Variable name","Preview of grep group values"],
            rowHeaders: false,
            minSpareRows: 1,
            stretchH: 'last',
            columns: [
                      {data: "index",    type:{renderer: regexGroupIndexRenderer} , readOnly:true},
                      {data: "variable"},
                      {data: "test"    , type:{renderer:$.proxy(regexGroupResultPreviewRenderer,this)}, readOnly:true }
                    ],
            beforeChange: $.proxy(function (change, source) {

            },this),
            afterChange: $.proxy(function (change, source) {
                if (source === 'edit') {
            
                }
            },this)
          });
        output.find("table").addClass('table');

		// Button Bar with SAVE / CANCEL buttons
        //
        template = '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button><button class="btn btn-primary">Save</button>';
        container.find('.modal-footer').html(template);
        
        container.find('.btn-primary').on('click', $.proxy(function(e) {
            e.preventDefault();
            this._onOk();
        },this));

        
        $("#myModalLabel").text("Regular Expression Editor");
        container.on('shown', function () {
            $("#regexp_mapping").handsontable('render');
       	});
        container.modal();

        this.updateTest();
    },
    
    _onOk: function(){
        var cmd = new example.command.CommandSetJSON(this.figure, this.data, {regexpr:this.editor.val(), test:this.test.val()});
        app.executeCommand(cmd);
        this.container.modal('hide');
    },
    
    updateTest: function(){
    	try{
    	    // update the regexp preview in the mapping table
            $("#regexp_mapping").handsontable('render');

            // update RegExpr highlicht
            var val = this.editor.val();
            this.highlight.html(RegexColorizer.colorizeText(val));

            var match = new RegExp(val).exec(this.test.val());
            val = this.test.val().replace(match[0], "<b>"+match[0]+"</b>");
            this.preview.html(val);
        }
        catch(exc){
            this.preview.html("");
        }
    }
});


