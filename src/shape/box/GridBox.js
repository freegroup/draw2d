import draw2d from '../../packages'

/**
 * @class
 * Grid Layout - Flutter's Table equivalent.
 * 
 * Arranges children in a grid with specified columns and rows.
 * 
 * Column/Row definitions:
 * - "100px" - Fixed size
 * - "pref" or "p" - Preferred size (child's minimum)
 * - "grow" or "g" - Expands to fill available space
 * 
 * @example
 *    let grid = new draw2d.shape.box.GridBox({
 *      columns: "100px, grow, 50px",
 *      rows: "pref, grow"
 *    });
 *    grid.add(label, {row: 0, col: 1});
 *    canvas.add(grid, 50, 50);
 * 
 * @author Andreas Herz
 * @extends draw2d.shape.box.Box
 */
draw2d.shape.box.GridBox = draw2d.shape.box.Box.extend(
  /** @lends draw2d.shape.box.GridBox.prototype */
  {

  NAME: "draw2d.shape.box.GridBox",

  /**
   * Create a new instance
   *
   * @param {Object} attr - Configuration including columns and rows definitions
   */
  init: function (attr, setter, getter) {
    this.grid = {
      colDefs: [],     // Column definitions
      rowDefs: [],     // Row definitions
      colWidths: [],   // Computed column widths
      rowHeights: [],  // Computed row heights
      cells: new Map() // Map of "row,col" -> figure
    }

    this._super(
      {stroke: 2, ...attr},
      {...setter},
      {...getter}
    )

    // Parse column and row definitions
    if (attr && attr.columns) {
      this.grid.colDefs = this._parseDefs(attr.columns)
    }
    if (attr && attr.rows) {
      this.grid.rowDefs = this._parseDefs(attr.rows)
    }

    // GridBox locator - positions children based on grid cell
    let _this = this
    this.locator = {
      translate: function (figure, diff) {
        figure.setPosition(figure.x + diff.x, figure.y + diff.y)
      },
      bind: function () {},
      unbind: function () {},
      relocate: function (index, target) {
        // Compute grid dimensions if not already computed
        _this._computeGrid()
        
        const cell = target._gridCell
        if (!cell) return
        
        // Calculate cell position
        let x = _this.stroke
        let y = _this.stroke
        
        for (let c = 0; c < cell.col; c++) {
          x += _this.grid.colWidths[c] || 0
        }
        for (let r = 0; r < cell.row; r++) {
          y += _this.grid.rowHeights[r] || 0
        }
        
        // Calculate cell size
        let cellWidth = 0
        let cellHeight = 0
        
        for (let c = 0; c < cell.colspan; c++) {
          cellWidth += _this.grid.colWidths[cell.col + c] || 0
        }
        for (let r = 0; r < cell.rowspan; r++) {
          cellHeight += _this.grid.rowHeights[cell.row + r] || 0
        }
        
        // Apply alignment
        let finalX = x
        let finalY = y
        
        if (cell.align === 'center') {
          finalX += (cellWidth - target.getWidth()) / 2
        } else if (cell.align === 'right') {
          finalX += cellWidth - target.getWidth()
        }
        
        if (cell.valign === 'middle') {
          finalY += (cellHeight - target.getHeight()) / 2
        } else if (cell.valign === 'bottom') {
          finalY += cellHeight - target.getHeight()
        }
        
        target.setPosition(finalX, finalY)
      }
    }
  },

  /**
   * Parse column/row definition string.
   * @private
   */
  _parseDefs: function(defString) {
    return defString.split(",").map(def => {
      def = def.trim()
      
      // Fixed pixel size
      const pxMatch = def.match(/^(\d+)(?:px)?$/)
      if (pxMatch) {
        return { type: 'fixed', value: parseInt(pxMatch[1]) }
      }
      
      // Preferred size
      if (def === 'pref' || def === 'p') {
        return { type: 'pref', value: 0 }
      }
      
      // Grow
      if (def === 'grow' || def === 'g') {
        return { type: 'grow', value: 0 }
      }
      
      // Default to pref
      return { type: 'pref', value: 0 }
    })
  },

  /**
   * Add a child to a specific cell.
   * 
   * @param {draw2d.Figure} child
   * @param {Object} constraint - {row, col, rowspan, colspan, align, valign}
   * @returns {this}
   */
  add: function(child, constraint) {
    // Default constraint
    const cell = {
      row: 0,
      col: 0,
      rowspan: 1,
      colspan: 1,
      align: 'left',
      valign: 'top',
      ...constraint
    }
    
    // Store cell info on child
    child._gridCell = cell
    
    // Store in cells map
    const key = `${cell.row},${cell.col}`
    this.grid.cells.set(key, child)
    
    // Call parent with locator (required by Layout#add)
    this._super(child, this.locator)
    
    // Schedule layout for next frame
    this.scheduleLayout()
    
    return this
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
    for (const width of this.grid.colWidths) {
      total += width
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
    for (const height of this.grid.rowHeights) {
      total += height
    }
    return total
  },

  /**
   * Compute grid column widths and row heights based on children.
   * @private
   */
  _computeGrid: function() {
    const colCount = this.grid.colDefs.length
    const rowCount = this.grid.rowDefs.length
    
    // Initialize with definition values
    this.grid.colWidths = this.grid.colDefs.map(def => 
      def.type === 'fixed' ? def.value : 0
    )
    this.grid.rowHeights = this.grid.rowDefs.map(def => 
      def.type === 'fixed' ? def.value : 0
    )
    
    // Measure children and update pref columns/rows
    this.children.each((i, entry) => {
      const child = entry.figure
      const cell = child._gridCell
      if (!cell) return
      
      const childWidth = child.isResizeable() ? child.getMinWidth() : child.getWidth()
      const childHeight = child.isResizeable() ? child.getMinHeight() : child.getHeight()
      
      // Update column width (for single-column span only)
      if (cell.colspan === 1) {
        const colDef = this.grid.colDefs[cell.col]
        if (colDef && (colDef.type === 'pref' || colDef.type === 'grow')) {
          this.grid.colWidths[cell.col] = Math.max(
            this.grid.colWidths[cell.col], 
            childWidth
          )
        }
      }
      
      // Update row height (for single-row span only)
      if (cell.rowspan === 1) {
        const rowDef = this.grid.rowDefs[cell.row]
        if (rowDef && (rowDef.type === 'pref' || rowDef.type === 'grow')) {
          this.grid.rowHeights[cell.row] = Math.max(
            this.grid.rowHeights[cell.row], 
            childHeight
          )
        }
      }
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
    
    // 1. Calculate minimum size
    let minWidth = this.stroke * 2
    let minHeight = this.stroke * 2
    
    for (const w of this.grid.colWidths) minWidth += w
    for (const h of this.grid.rowHeights) minHeight += h
    
    const width = Math.max(minWidth, this.width)
    const height = Math.max(minHeight, this.height)
    
    // 2. Distribute extra space to 'grow' columns/rows
    const extraWidth = width - minWidth
    const extraHeight = height - minHeight
    
    const growCols = this.grid.colDefs.filter(d => d.type === 'grow').length
    const growRows = this.grid.rowDefs.filter(d => d.type === 'grow').length
    
    if (growCols > 0 && extraWidth > 0) {
      const perCol = Math.floor(extraWidth / growCols)
      this.grid.colDefs.forEach((def, i) => {
        if (def.type === 'grow') {
          this.grid.colWidths[i] += perCol
        }
      })
    }
    
    if (growRows > 0 && extraHeight > 0) {
      const perRow = Math.floor(extraHeight / growRows)
      this.grid.rowDefs.forEach((def, i) => {
        if (def.type === 'grow') {
          this.grid.rowHeights[i] += perRow
        }
      })
    }
    
    // 3. Set our size
    draw2d.shape.basic.Rectangle.prototype.setDimension.call(this, width, height)
    
    // 4. Position children
    this.children.each((i, entry) => {
      const child = entry.figure
      const cell = child._gridCell
      if (!cell) return
      
      // Calculate cell position
      let x = this.stroke
      let y = this.stroke
      
      for (let c = 0; c < cell.col; c++) {
        x += this.grid.colWidths[c]
      }
      for (let r = 0; r < cell.row; r++) {
        y += this.grid.rowHeights[r]
      }
      
      // Calculate cell size
      let cellWidth = 0
      let cellHeight = 0
      
      for (let c = 0; c < cell.colspan; c++) {
        cellWidth += this.grid.colWidths[cell.col + c] || 0
      }
      for (let r = 0; r < cell.rowspan; r++) {
        cellHeight += this.grid.rowHeights[cell.row + r] || 0
      }
      
      // Position and size child
      if (child.isResizeable()) {
        child.setDimension(
          Math.max(child.getMinWidth(), cellWidth),
          Math.max(child.getMinHeight(), cellHeight)
        )
      }
      
      // Apply alignment
      let finalX = x
      let finalY = y
      
      if (cell.align === 'center') {
        finalX += (cellWidth - child.getWidth()) / 2
      } else if (cell.align === 'right') {
        finalX += cellWidth - child.getWidth()
      }
      
      if (cell.valign === 'middle') {
        finalY += (cellHeight - child.getHeight()) / 2
      } else if (cell.valign === 'bottom') {
        finalY += cellHeight - child.getHeight()
      }
      
      child.setPosition(finalX, finalY)
    })
  }
})