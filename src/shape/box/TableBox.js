import draw2d from '../../packages'

/**
 * @class
 * Table Layout - Simple row-based grid layout.
 * 
 * Arranges children in a table with automatic column sizing.
 * Add rows using the addRow() method - columns are created automatically.
 * 
 * @example
 *    let table = new draw2d.shape.box.TableBox();
 *    
 *    let label1 = new draw2d.shape.basic.Label({text: "Name:"});
 *    let label2 = new draw2d.shape.basic.Label({text: "John Doe"});
 *    
 *    table.addRow(label1, label2);
 *    table.addRow("Email:", "john@example.com");  // Strings become Labels
 *    
 *    canvas.add(table, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.box.Box
 */
draw2d.shape.box.TableBox = draw2d.shape.box.Box.extend(
  /** @lends draw2d.shape.box.TableBox.prototype */
  {

  NAME: "draw2d.shape.box.TableBox",

  /**
   * Create a new instance
   *
   * @param {Object} attr - Configuration
   */
  init: function (attr, setter, getter) {
    this.grid = []           // 2D array of figures [row][col]
    this.colWidths = []      // Computed column widths
    this.rowHeights = []     // Computed row heights
    this.cellPadding = {top: 2, right: 4, bottom: 2, left: 4}
    
    this._super(
      {stroke: 1, ...attr},
      {
        cellPadding: this.setCellPadding,
        ...setter
      },
      {
        cellPadding: this.getCellPadding,
        ...getter
      }
    )

    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
    
    // TableBox locator - positions children based on cell
    let _this = this
    this.locator = {
      translate: function (figure, diff) {
        figure.setPosition(figure.x + diff.x, figure.y + diff.y)
      },
      bind: function () {},
      unbind: function () {},
      relocate: function (index, target) {
        // Position is calculated in _renderLayout based on cell
      }
    }
  },

  /**
   * Set the cell padding.
   * 
   * @param {Number|Object} padding - Padding value or {top, right, bottom, left}
   * @returns {this}
   */
  setCellPadding: function(padding) {
    if (typeof padding === 'number') {
      this.cellPadding = {top: padding, right: padding, bottom: padding, left: padding}
    } else {
      this.cellPadding = {...this.cellPadding, ...padding}
    }
    this.scheduleLayout()
    return this
  },

  /**
   * Get the cell padding.
   * 
   * @returns {Object}
   */
  getCellPadding: function() {
    return this.cellPadding
  },

  /**
   * Add a row to the table.
   * 
   * Each argument becomes a cell in the row. Strings are automatically
   * converted to Label figures.
   * 
   * @param {...(draw2d.Figure|String)} figures - Figures or strings for each cell
   * @returns {this}
   */
  addRow: function() {
    const args = Array.prototype.slice.call(arguments)
    const row = []
    
    // Convert strings to Labels
    args.forEach((item) => {
      let figure
      if (typeof item === 'string') {
        figure = new draw2d.shape.basic.Label({text: item})
      } else {
        figure = item
      }
      row.push(figure)
    })
    
    // Add row to grid
    this.grid.push(row)
    
    // Ensure all rows have the same column count
    const maxCols = Math.max(...this.grid.map(r => r.length))
    this.grid.forEach((r, rowIndex) => {
      while (r.length < maxCols) {
        // Add empty label as placeholder
        const placeholder = new draw2d.shape.basic.Label({text: ''})
        placeholder._isPlaceholder = true
        r.push(placeholder)
      }
    })
    
    // Add all figures from this row as children
    const rowIndex = this.grid.length - 1
    row.forEach((figure, colIndex) => {
      figure._tableCell = {row: rowIndex, col: colIndex}
      this._super(figure, this.locator)
    })
    
    // Schedule layout
    this.scheduleLayout()
    
    return this
  },

  /**
   * Remove a row from the table.
   * 
   * @param {Number} index - Row index to remove
   * @returns {Array} The removed row of figures
   */
  removeRow: function(index) {
    if (index < 0 || index >= this.grid.length) {
      return null
    }
    
    const removedRow = this.grid.splice(index, 1)[0]
    
    // Remove figures from children
    removedRow.forEach((figure) => {
      this.remove(figure)
    })
    
    // Update cell indices for remaining rows
    this.grid.forEach((row, rowIndex) => {
      row.forEach((figure, colIndex) => {
        figure._tableCell = {row: rowIndex, col: colIndex}
      })
    })
    
    this.scheduleLayout()
    
    return removedRow
  },

  /**
   * Get the number of rows.
   * 
   * @returns {Number}
   */
  getRowCount: function() {
    return this.grid.length
  },

  /**
   * Get the number of columns.
   * 
   * @returns {Number}
   */
  getColumnCount: function() {
    return this.grid.length > 0 ? this.grid[0].length : 0
  },

  /**
   * Get a figure at a specific cell.
   * 
   * @param {Number} row
   * @param {Number} col
   * @returns {draw2d.Figure|null}
   */
  getCell: function(row, col) {
    if (row >= 0 && row < this.grid.length) {
      if (col >= 0 && col < this.grid[row].length) {
        return this.grid[row][col]
      }
    }
    return null
  },

  // ============================================================
  // INTRINSIC DIMENSIONS
  // ============================================================

  /**
   * Compute minimum width.
   * @protected
   */
  computeMinIntrinsicWidth: function() {
    this._computeGrid()
    
    let total = this.stroke * 2
    for (const width of this.colWidths) {
      total += width + this.cellPadding.left + this.cellPadding.right
    }
    return total
  },

  /**
   * Compute minimum height.
   * @protected
   */
  computeMinIntrinsicHeight: function() {
    this._computeGrid()
    
    let total = this.stroke * 2
    for (const height of this.rowHeights) {
      total += height + this.cellPadding.top + this.cellPadding.bottom
    }
    return total
  },

  /**
   * Compute grid column widths and row heights based on children.
   * @private
   */
  _computeGrid: function() {
    const rowCount = this.grid.length
    const colCount = this.getColumnCount()
    
    // Initialize dimensions
    this.colWidths = new Array(colCount).fill(0)
    this.rowHeights = new Array(rowCount).fill(0)
    
    // Measure each cell
    this.grid.forEach((row, rowIndex) => {
      row.forEach((figure, colIndex) => {
        if (figure._isPlaceholder) return
        
        const width = figure.isResizeable() ? figure.getMinWidth() : figure.getWidth()
        const height = figure.isResizeable() ? figure.getMinHeight() : figure.getHeight()
        
        this.colWidths[colIndex] = Math.max(this.colWidths[colIndex], width)
        this.rowHeights[rowIndex] = Math.max(this.rowHeights[rowIndex], height)
      })
    })
  },

  // ============================================================
  // LAYOUT
  // ============================================================

  /**
   * Perform the layout.
   * @protected
   */
  _renderLayout: function() {
    this._computeGrid()
    
    // Calculate total size
    let totalWidth = this.stroke * 2
    let totalHeight = this.stroke * 2
    
    for (const w of this.colWidths) {
      totalWidth += w + this.cellPadding.left + this.cellPadding.right
    }
    for (const h of this.rowHeights) {
      totalHeight += h + this.cellPadding.top + this.cellPadding.bottom
    }
    
    const width = Math.max(totalWidth, this.width)
    const height = Math.max(totalHeight, this.height)
    
    // Set our size
    draw2d.shape.basic.Rectangle.prototype.setDimension.call(this, width, height)
    
    // Position children
    let y = this.stroke
    
    this.grid.forEach((row, rowIndex) => {
      let x = this.stroke
      const cellHeight = this.rowHeights[rowIndex] + this.cellPadding.top + this.cellPadding.bottom
      
      row.forEach((figure, colIndex) => {
        const cellWidth = this.colWidths[colIndex] + this.cellPadding.left + this.cellPadding.right
        
        // Position figure with padding
        const figX = x + this.cellPadding.left
        const figY = y + this.cellPadding.top
        
        // Resize if allowed
        if (figure.isResizeable()) {
          figure.setDimension(this.colWidths[colIndex], this.rowHeights[rowIndex])
        }
        
        // Center vertically in cell
        const yOffset = (this.rowHeights[rowIndex] - figure.getHeight()) / 2
        
        figure.setPosition(figX, figY + yOffset)
        
        x += cellWidth
      })
      
      y += cellHeight
    })
  },

  // ============================================================
  // PERSISTENCE
  // ============================================================

  /**
   * @inheritdoc
   */
  getPersistentAttributes: function() {
    let memento = this._super()
    
    memento.cellPadding = this.cellPadding
    memento.gridData = []
    
    // Save grid structure (row/col info per child)
    this.grid.forEach((row, rowIndex) => {
      row.forEach((figure, colIndex) => {
        if (!figure._isPlaceholder) {
          memento.gridData.push({
            id: figure.getId(),
            row: rowIndex,
            col: colIndex
          })
        }
      })
    })
    
    return memento
  },

  /**
   * @inheritdoc
   */
  setPersistentAttributes: function(memento) {
    this._super(memento)
    
    if (memento.cellPadding) {
      this.cellPadding = memento.cellPadding
    }
    
    // Grid data will be restored after children are added
    // by the reader
    
    return this
  }
})