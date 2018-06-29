
/**
 * @class draw2d.shape.layout.TableLayout
 * 
 * The TableLayout class arranges the children in a row/column order. Each cell can be styled 
 * with valign, align and padding.
 * 
 * 
 * See the example below with and without padding or alignment settings
 * 
 *     
 *     @example preview small frame
 *     
 *         var label1 =  new draw2d.shape.basic.Label({text:"[0,1] with long long long long label", fontColor:"#00AF00"});
 *         var label2 =  new draw2d.shape.basic.Label({text:"[1,1] padding:10", fontColor:"#00AF00"});
 *         var label3 =  new draw2d.shape.basic.Label({text:"[2,1] align:right", fontColor:"#00AF00"});
 *         var label4 =  new draw2d.shape.basic.Label({text:"[3,1] resize:true",resizeable:true, fontColor:"#00AF00"});
 *     
 *         var container = new draw2d.shape.layout.TableLayout();
 *     
 *         container.addRow("[0,0]", label1 ,"[0,2] align:center");
 *         container.addRow("[1,0] valign:bottom", label2,"[1,2] long long long label");
 *         container.addRow("[2,0]", label3,"[2,2]");
 *         container.addRow("[3,0]", label4,"[3,2]");
 *     
 *         container.setPadding(0);
 *         container.setCellPadding(1,1, 10);
 *     
 *         container.setCellAlign(0,2, "center");
 *         container.setCellAlign(2,1, "right");
 *     
 *         container.setCellVerticalAlign(1, 0, "bottom");
 *         canvas.add(container,10,10);
 *     
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 * @since 5.3.0
 */ import draw2d from '../../packages';
draw2d.shape.layout.TableLayout= draw2d.shape.layout.Layout.extend({

	NAME : "draw2d.shape.layout.TableLayout",
    
	DUMMY_CELL : {
	               getMinHeight: function(){return 1;},
	               getMinWidth:  function(){return 1;},
	               off:          function(){}
                 },
    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        var _this = this;
        this.cellLocator = {
            relocate: function(index, figure){ 
                if(_this.repaintBlocked===true){
                    return;
                }
                var cell= figure.__cell;
                var layout = _this.getCellLayout(cell.row,cell.column);
                var outerWidth = _this.getWidth();
                var minWidth   = _this.getMinWidth();
                var widthOffset =0;
                if(outerWidth!=minWidth){
                	widthOffset= ((outerWidth-minWidth)/ _this.layoutInfos[0].length)*cell.column;
                }

                var width  = figure.getWidth();
                var height = figure.getHeight();
            	var x = layout.x+_this.padding.left+layout.padding.left+widthOffset;
            	var y = layout.y+_this.padding.top +layout.padding.top;

            	// stretch the figure to fill the complete cell
                //
                if(figure.isResizeable()){
                	var w = Math.max(figure.getMinWidth() , layout.w-(layout.padding.left+layout.padding.right)+widthOffset);
                	var h = Math.max(figure.getMinHeight(), layout.h-(layout.padding.top+layout.padding.bottom));
                	figure.setDimension(w,h);
                }
                // else apply the valign and align property
                //
                else{
                	// apply vertical alignment
                	//
                	switch(layout.valign){
                	case "middle":
                		y=y+ (layout.h-(height+layout.padding.top+layout.padding.bottom))/2;
                		break;
                	case "bottom":
                		y=y+ (layout.h-(height+layout.padding.top+layout.padding.bottom));
                		break;
                	}
                	
                	// apply horizontal alignment
                	//
                	switch(layout.align){
                	case "center":
                		x=x+ (layout.w-(width+layout.padding.left+layout.padding.right))/2+(widthOffset/2);
                		break;
                	case "right":
                		x=x+ (layout.w-(width+layout.padding.left+layout.padding.right))+widthOffset;
                		break;
                	}                	
                }
                figure.setPosition(x, y);
            },
            bind: function(){},
            unbind: function(){},
            translate: function(figure, diff){
                figure.setPosition(figure.x+diff.x,figure.y+diff.y);
            }
        };

        this.padding = {top:4, right:4, bottom:4,left:4};

        this.grid = [];
        this.layoutInfos = [];
        this.layoutInfos[0]=[];
        this.layoutInfos[0][0]={x:0, y:0, w:1, h:1, valign:"top", align:"left"};
        
        
        this._super(
                $.extend({stroke:1, resizeable:false},attr),
                $.extend({
                    /** @attr {Number} padding the padding in pixel around the text */
                    padding  : this.setPadding
                }, setter),
                $.extend({
                    padding  : this.getPadding
                }, getter));
                

    },
    
    /**
     * @method
     * Set the padding of the given cell.
     * 
     * 
     * @param {Number|Object} padding The new padding
     **/
    setCellPadding: function(row, column, padding)
    {
    	var layout = this.getCellLayout(row, column);
    	if(layout===null){
    		return this;
    	}

    	if(typeof padding ==="number"){
          layout.padding = {top:padding, right:padding, bottom:padding, left:padding};
    	}
    	else{
          $.extend(layout.padding, padding);
    	}
    	
        this.calculateLayout();
    	this.setDimension(1,1);
      
    	return this;
    },

    /**
     * @method
     * Get the padding of the outer grid.
     *
     **/
    getCellPadding: function(row, column )
    {

        var layout = this.getCellLayout(row, column);
    	if(layout===null || typeof layout.padding==="undefined"){
    		return {top:0, right:0, bottom:0, left:0};
    	}
    	return layout.padding;
    },

    
    /**
     * @method
     * Set the padding of the outer grid.
     * 
     *      // Alternatively you can use the attr method:
     *      //
     *      // set the padding for top,left,bottom,right in one call 
     *      figure.attr({
     *        padding: 3
     *      });
     *      
     *      // update the padding left and top
     *      figure.attr({
     *        padding: {left:3, top:30}
     *      });
     * 
     * @param {Number|Object} padding The new padding
     **/
    setPadding: function( padding)
    {
        if(typeof padding ==="number"){
            this.padding = {top:padding, right:padding, bottom:padding, left:padding };
        }
        else{
            $.extend(this.padding, padding);
        }
        this.calculateLayout();
        this.setDimension(1,1);
        this.fireEvent("change:padding",{value:this.padding});
      
        return this;
    },

    /**
     * @method
     * Get the padding of the outer grid.
     *
     **/
    getPadding: function( )
    {
      return this.padding;
    },

    setCanvas: function(canvas)
    {
         this._super(canvas);  
         this.calculateLayout();
         this.setDimension(2,2);

        return this;
    },


    /**
     * @inheritdoc
     */
    add: function(child, locator, index)
    {
        this._super(child, locator, index);

        this.setDimension(1,1);

        return this;
    },

    /**
     *
     * @method
     * Removes the row from the TableLayout
     *
     * @returns the removed row
     */
    removeRow: function(index)
    {
        var _this = this;
    	var removedRow = this.grid.splice(index, 1);
    	removedRow[0].forEach(function(figure){
    		_this.remove(figure);
    	});
    	
    	this.calculateLayout();
    	this.setDimension(2,2);

        return removedRow;
    },


    /**
     * @method
     * Add a row to the table grid.
     * This method has a variable argument list. All arguments are added in one row.
     * 
     * @param {Array} figures variable count of figures to add as one row
     */
    addRow: function ()
    {
        var figuresToAdd = [];
        var _this = this;
    	var args = Array.prototype.slice.call(arguments); // sometimes js is stupid...
    	
    	var rowCount    = this.grid.length+1;
    	var columnCount = this.grid.length>0?Math.max(this.grid[0].length, args.length):args.length;
    	
    	var row = [];
   	
    	args.forEach(function(figure, index){
    		if(typeof figure ==="string"){
    		    figure = new draw2d.shape.basic.Label({text:figure});
    		}
    		row.push(figure);
    		figuresToAdd.push(figure);
    	});
    	this.grid.push(row);
    	
    	// adjust the columns. All rows must have the same column count. Add empty cells
    	// if required.
    	//
    	this.grid.forEach(function(row, index){
    	    var missingColumns = columnCount-row.length;
    	    for(var i=0;i<missingColumns;i++){
    	        row.push(_this.DUMMY_CELL);
    	    }
    	});

        var orig = this.repaintBlocked;
    	this.repaintBlocked=true;
        figuresToAdd.forEach(function(figure){
            _this.add(figure, _this.cellLocator);
        });
        this.repaintBlocked = orig;
        
        this.calculateLayout();
        this.setDimension(1,1);
        
    	return this;
    },
    
    getMinWidth: function()
    {
        // return some good default if we are not part of the canvas.
        // A real width/height calculation isn'T possible if the canvas not set
        if(this.canvas===null ||this.layoutInfos.length===0){
            return 10;
        }
        
    	var bottom     = this.layoutInfos[this.layoutInfos.length-1];
    	var layout= bottom[bottom.length-1];
    	
    	return layout.w+layout.x+this.padding.left+this.padding.right;
    },

    getMinHeight: function()
    {
        // return some good default if we are not part of the canvas.
        // A real width/height calculation isn'T possible if the canvas not set
        if(this.canvas===null ||this.layoutInfos.length===0){
            return 10;
        }

        var bottom     = this.layoutInfos[this.layoutInfos.length-1];
    	var layout= bottom[bottom.length-1];
    	
    	return layout.h+layout.y+ this.padding.top+this.padding.bottom;
    },
    
    
    /**
     * @method 
     * Set the vertical alignment of a cell. Possible values are
     * <ul>
     * <li>top</li>
     * <li>middle</li>
     * <li>bottom</li>
     * </ul>
     * 
     * @param {Number} row  The row index of the cell. Starting by 0
     * @param {Number} column The column index of the cell. Starting by 0 
     * @param {String} align The vertical alignment of the cell
     */
    setCellVerticalAlign: function(row, column, valign){
       	var layout = this.getCellLayout(row, column);
    	if(layout===null){
    		return; // silently
    	}
   	
    	switch(valign){
	    	case "top":
	    	case "middle":
	    	case "bottom":
	    		layout.valign = valign;
	            this.calculateLayout();
	            this.setDimension(1,1);
    	}

        return this;
    },
    
        /**
     * @method 
     * Get the vertical alignment of a cell. Possible values are
     * <ul>
     * <li>top</li>
     * <li>middle</li>
     * <li>bottom</li>
     * </ul>
     * 
     * @param {Number} row  The row index of the cell. Starting by 0
     * @param {Number} column The column index of the cell. Starting by 0 
     * @returns {String} The vertical alignment of the cell
     */
     getCellVerticalAlign: function(row, column){
        var layout = this.getCellLayout(row, column);
        if(layout===null){
            return "top";
        }
    
        return layout.valign;
    },
    
    
    /**
     * @method 
     * Set the alignment of a cell. Possible values are
     * <ul>
     * <li>left</li>
     * <li>center</li>
     * <li>right</li>
     * </ul>
     * 
     * 
     * @param {Number} row  The row index of the cell. Starting by 0
     * @param {Number} column The column index of the cell. Starting by 0 
     * @param {String} align The horizontal alignment of the cell
     */
    setCellAlign: function(row, column, align){

    	var layout = this.getCellLayout(row, column);
    	if(layout===null){
    		return; // silently
    	}
    	
    	switch(align){
	    	case "left":
	    	case "center":
	    	case "right":
	    		layout.align = align;
	            this.calculateLayout();
	            this.setDimension(1,1);
    	}

        return this;
    },
    
        /**
     * @method 
     * Return the alignment of a cell. Possible values are
     * <ul>
     * <li>left</li>
     * <li>center</li>
     * <li>right</li>
     * </ul>
     * 
     * 
     * @param {Number} row  The row index of the cell. Starting by 0
     * @param {Number} column The column index of the cell. Starting by 0 
     * return {String} The horizontal alignment of the cell
     */
    getCellAlign: function(row, column){

        var layout = this.getCellLayout(row, column);
        if(layout===null){
            return "left";
        }
        return layout.align;
    },
    
    
    /**
     * @method
     * Return the layout information for the given row/column or <b>null</b>
     * if the row/column index is out of range.
     * 
     * @private
     */
    getCellLayout: function(row, column)
    {
    	if(row<0 || column<0){
    		return null; // silently
    	}

    	if(row >= this.layoutInfos.length){
    		return null; // silently
    	}
    	
    	var layouts = this.layoutInfos[row];
    	if(column >= layouts.length){
    		return null; // silently
    	}
    	
    	return layouts[column];
    },
    
    /**
     * @method
     * Recalculate the layout of the table
     * 
     * @private
     */
    calculateLayout: function()
    {
    	var _this = this;
    	var rowCount    = this.grid.length;
    	var columnCount = this.grid.length>0?this.grid[0].length:0;
 
    	var newLayoutInfos = [];
        for (var row=0;row<rowCount;row++) {
        	newLayoutInfos[row]=[];
        	for (var column=0;column<columnCount;column++) {
        		newLayoutInfos[row][column]={width:0, height:0, x:0, y:0, valign:this.getCellVerticalAlign(row, column), align:this.getCellAlign(row, column), padding: this.getCellPadding(row, column)};
	         }
        }

    	// determine the heights/widths of the grid
    	//
        var layoutWidths = new Array(columnCount+1).join('0').split('').map(parseFloat);
        var layoutHeights= new Array(rowCount+1).join('0').split('').map(parseFloat);
        this.grid.forEach(function(figures, row){
        	for(var column=0; column<columnCount; column++){
        		var layout = newLayoutInfos[row][column];
        		var figure = figures[column];
                figure.__cell = {row:row, column:column};
                layoutHeights[row]   = Math.max(layoutHeights[row]  , figure.getMinHeight() +layout.padding.top + layout.padding.bottom);
                layoutWidths[column] = Math.max(layoutWidths[column], figure.getMinWidth()  +layout.padding.left+ layout.padding.right );
        	}
        });
        
        var x=0, y=0;
        for (row=0;row<rowCount;row++) {
       		for(column=0;column<columnCount;column++) {
       			var layout = newLayoutInfos[row][column];
       			layout.w = layoutWidths[column];
       			layout.h = layoutHeights[row];
       			layout.x = x;
       			layout.y = y;
       			x = x+layout.w;
	        }
       		y= y+layoutHeights[row];
       		x=0;
        }
        
        this.layoutInfos = newLayoutInfos;

        return this;
    }
});



