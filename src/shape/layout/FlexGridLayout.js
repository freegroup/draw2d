/**
 * @class draw2d.shape.layout.FlexGridLayout
 *
 * FlexGridLayout is a powerful, flexible and precise layout manager that aligns components vertically and
 * horizontally in a dynamic rectangular grid of cells, with each component occupying in one or more cell.
 * To define a form layout you specify the form's columns, rows. Everyhing that applies to columns applies
 * to rows too - just with a different orientation. FlexGridLayout uses the same API, algorithms and implementation
 * for column and rows.
 *
 * FlexGridLayout focuses on form-oriented panels much like the 'Segment' panel. Nevertheless, it is a general purpose
 * layout system that can be used for the vast majority of rectangular layouts.
 *
 * Define your layout with:
 * <ul>
 *  <li>[number]px</li>
 *  <li>grow</li>
 *  <li>pref</li>
 * </ul>
 *
 * e.g. we want build a shape with a border on the left and right and a label in the
 * center. We allow the center to grow, the shape is resizeable.
 *
 * <pre>
 *    10px       grow         10px
 *
 *    -----+------------------+-----
 *    |    |  [LABEL]         |    |
 *    |    |                  |    |
 *    |    |                  |    |    grow
 *    |    |                  |    |
 *    |    |                  |    |
 *    -----+------------------+-----
 * </pre>
 *
 * The number forces the exact width or height of the cell. <b>grow</b> respect the minimum width of the
 * element and allows to resize the shape. The row/col with the <b>grow</b> declaration will be resized.
 * The <b>pref</b> declaration forces the cell to the minimum width/height of the embedded figure.
 *
 * Example Implementation of a shape:
 *
 *     @example preview small frame
 *     let PredefinedProcess = draw2d.shape.layout.FlexGridLayout.extend({
 *
 *
 *          //     10px       grow         10px
 *          //
 *          //    -----+------------------+-----
 *          //    |    |  [LABEL]         |    |
 *          //    |    |                  |    |
 *          //    |    |                  |    |    grow
 *          //    |    |                  |    |
 *          //    |    |                  |    |
 *          //    -----+------------------+-----
 *          //
 *          // @param attr
 *          //
 *         init: function(attr, setter, getter)
 *         {
 *            this._super(extend({
 *                 columns:"10px, grow, 10px",
 *                 rows:   "grow",
 *                 bgColor:"#FFFFFF",
 *                 stroke:2
 *             },attr),
 *            setter,
 *             getter);
 *
 *
 *             this.label = new draw2d.shape.basic.Label({text:"Process Name", resizeable:true, stroke:2});
 *             this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
 *             this.add(this.label, {row:0, col:1});
 *
 *             this.setDimension(120,80);
 *         }
 *     });
 *     let shape = new PredefinedProcess();
 *     canvas.add(shape,10,10);
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 * @since 2.5.1
 */
import draw2d from '../../packages'
import extend from '../../util/extend'

draw2d.shape.layout.FlexGridLayout = draw2d.shape.layout.Layout.extend(
  /** @lends draw2d.shape.layout.FlexGridLayout.prototype */
  {
  
  NAME: "draw2d.shape.layout.FlexGridLayout",


  /**
   * Create a new instance
   *
   * @constructs
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    let _this = this
    this.cellLocator = {
      relocate: function (index, figure) {
        if (_this.gridDef.layoutRequired === true) {
          _this._layout()
        }
        let cell = figure.__cellConstraint
        let x = cell.x
        let y = cell.y

        // stretch the figure to fill the complete cell
        //
        if (figure.isResizeable()) {
          figure.setDimension(
            Math.max(figure.getMinWidth(), cell.width),
            Math.max(figure.getMinHeight(), cell.height))
        }
        // else apply the valign and align property
        //
        else {
          // apply vertical alignment
          //
          switch (cell.valign) {
            case "middle":
              y = y + (cell.height - figure.getHeight()) / 2
              break
            case "bottom":
              y = y + (cell.height - figure.getHeight())
              break
          }

          // apply horizontal alignment
          //
          switch (cell.align) {
            case "center":
              x = x + (cell.width - figure.getWidth()) / 2
              break
            case "right":
              x = x + (cell.width - figure.getWidth())
              break
          }
        }
        figure.setPosition(x, y)
      },
      bind: function () {
      },
      unbind: function () {
      },
      translate: function (figure, diff) {
        figure.setPosition(figure.x + diff.x, figure.y + diff.y)
      }
    }

    this.debug = false
    this.gridDef = {
      debugLines: [],
      def_cols: [],
      def_rows: [],
      min_height: [],
      min_width: [],
      minGridWidth: 10,
      minGridHeight: 10,
      hResizeable: false,
      vResizeable: false,
      layoutRequired: true
    }

    this._super(
      extend({stroke: 2}, attr),
      extend({}, setter),
      extend({}, getter))

    this.resizeListener = function (figure) {
      _this.gridDef.layoutRequired = true
      // propagate the event to the parent or other listener if existing
      //
      if (_this.getParent() instanceof draw2d.shape.layout.Layout) {
        _this.fireEvent("resize")
      }
      // or we are the parent and must consume it self
      else {
        _this.setDimension(
          _this.gridDef.hResizeable === true ? _this.getWidth() : 1,
          _this.gridDef.vResizeable === true ? _this.getHeight() : 1
        )

      }
    }

    let rows = attr.rows.split(",")
    let columns = attr.columns.split(",")
    for (let i = 0; i < columns.length; i++) {
      this.gridDef.def_cols[i] = this.cellWidthFromDef(columns[i])
    }

    for (let i = 0; i < rows.length; i++) {
      this.gridDef.def_rows[i] = this.cellWidthFromDef(rows[i])
    }

    this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy())
  },

  add: function (figure, cellConstraint) {

    figure.__cellConstraint = extend({}, {
      row: 0,
      col: 0,
      rowspan: 1,
      colspan: 1,
      align: "left",
      valign: "top",
      width: 1,
      height: 1
    }, cellConstraint)
    this.gridDef.layoutRequired = true
    this._super(figure, this.cellLocator)
    this._layout()
  },


  /**
   * @inheritdoc
   */
  getMinWidth: function () {
    return this.gridDef.minGridWidth
  },

  /**
   * @inheritdoc
   */
  getMinHeight: function () {
    return this.gridDef.minGridHeight
  },

  /**
   * @inheritdoc
   */
  setCanvas: function (canvas) {
    // layout must be recalculated if the shape will be assigned
    // to a canvas. "Text" elements can now calculate correct with the right font settings.
    //
    this.gridDef.layoutRequired = true
    this._super(canvas)

    return this
  },

  repaint: function (attributes) {
    if (this.repaintBlocked === true || this.shape === null) {
      return this
    }
    this._super(attributes)
    if (this.debug) {
      this.paintDebugGrid()
    }

    return this
  },

  setDimension: function (w, h) {
    // we need the calculated layout to determine the min width/height of the figure
    //
    if (this.gridDef.layoutRequired === true) {
      this._layout()
    }
    // set the new dimension
    this._super(w, h)

    // after setting the new dimension a recalculation of the layout is required. May the shape
    // has grown up
    this.gridDef.layoutRequired = true
    this.repaint()

    return this
  },

  _layout: function () {
    this.gridDef.layoutRequired = false

    let figures = this.getChildren()

    // copy the initial requested width/heights
    //
    this.gridDef.min_height = this.gridDef.def_rows.slice(0)
    this.gridDef.min_width = this.gridDef.def_cols.slice(0)

    // Calculate the basic width/height of the elements without considering the "span" and "grow"
    //
    for (let i = 0; i < figures.getSize(); i++) {
      let figure = figures.get(i)
      let cell = figure.__cellConstraint
      // ermitteln der derzeitig zur verfügung stehenden weite
      this.gridDef.min_width[cell.col] = Math.max(this.gridDef.min_width[cell.col], figure.getMinWidth())

      // Falls das Elemente eine y_span hat, dann versuchen ob es auf die ganze
      // höhe rein passt. Wenn nicht wird der Teil der 'grow' angegeben hat verändert.
      // Wenn kein Element 'grow' angegeben hat, dann wird das letzte Element verändert
      if (cell.rowspan > 1) {
        let eHeight = figure.getMinHeight()
        let cHeight = this.cellHeight(cell.row, cell.row + cell.rowspan)
        if (cHeight < eHeight) {
          let diff = eHeight - cHeight
          this.gridDef.min_height[cell.row + cell.rowspan - 1] = this.gridDef.min_height[cell.row + cell.rowspan - 1] + diff
        }
      }
      else {
        this.gridDef.min_height[cell.row] = Math.max(this.gridDef.min_height[cell.row], figure.getMinHeight())
      }
    }
    this.gridDef.minGridWidth = this._getGridWidth()
    this.gridDef.minGridHeight = this._getGridHeight()

    // Resize the grid height if at least one row supports "grow"
    //
    let gridHeight = this._getGridHeight()
    for (let i = 0; i < this.gridDef.def_rows.length; i++) {
      // row found which can grow
      if (this.gridDef.def_rows[i] === -1) {
        this.gridDef.min_height[i] = this.gridDef.min_height[i] + Math.max(0, this.getHeight() - gridHeight)
        this.gridDef.vResizeable = true
        break
      }
    }

    // Resize the grid if at least one column supports "grow"
    //
    let gridWidth = this._getGridWidth()
    for (let i = 0; i < this.gridDef.def_cols.length; i++) {
      // column found which can grow
      if (this.gridDef.def_cols[i] === -1) {
        this.gridDef.min_width[i] = this.gridDef.min_width[i] + Math.max(0, this.getWidth() - gridWidth)
        this.gridDef.hResizeable = true
        break
      }
    }

    // apply the cell constraints to the elements
    //
    for (let i = 0; i < figures.getSize(); i++) {
      let cell = figures.get(i).__cellConstraint
      cell.width = this.cellWidth(cell.col, cell.col + cell.colspan)
      cell.height = this.cellHeight(cell.row, cell.row + cell.rowspan)
      cell.x = this.cellX(cell.col)
      cell.y = this.cellY(cell.row)
    }

    return this
  },

  cellX: function (col) {
    let r = 0
    for (let i = 0; i < col; i++) {
      r = r + this.gridDef.min_width[i]
    }

    return r
  },

  cellY: function (row) {
    let r = 0
    for (let i = 0; i < row; i++) {
      r = r + this.gridDef.min_height[i]
    }

    return r
  },

  cellWidth: function (from, to) {
    let r = 0
    for (let i = from; i < to; i++) {
      r = r + this.gridDef.min_width[i]
    }

    return r
  },

  cellHeight: function (from, to) {
    let r = 0
    for (let i = from; i < to; i++) {
      r = r + this.gridDef.min_height[i]
    }

    return r
  },

  paintDebugGrid: function () {
    // alte Linien erstmal entfernen bevor man neue zeichnet
    //
    for (let i = 0; i < this.gridDef.debugLines.length; i++)
      this.gridDef.debugLines[i].remove()
    this.gridDef.debugLines = []

    let gridHeight = this._getGridHeight()
    let gridWidth = this._getGridWidth()
    let posX = this.getAbsoluteX()
    let posY = this.getAbsoluteY()

    // draw the cols first
    let x = posX
    for (let i = 0; i <= this.gridDef.min_width.length; i++) {
      let newLine = this.canvas.paper.path("M " + x + " " + posY + " l 0 " + gridHeight).attr({
        "stroke": "#FF0000",
        "stroke-width": 1
      })
      this.gridDef.debugLines.push(newLine)
      if (i < this.gridDef.min_width.length)
        x = x + this.gridDef.min_width[i]
    }

    let y = posY
    for (let i = 0; i <= this.gridDef.min_height.length; i++) {
      let newLine = this.canvas.paper.path("M " + posX + " " + y + " l " + gridWidth + " 0").attr({
        "stroke": "#FF0000",
        "stroke-width": 1
      })
      this.gridDef.debugLines.push(newLine)
      if (i < this.gridDef.min_height.length)
        y = y + this.gridDef.min_height[i]
    }
  },

  _getGridWidth: function () {
    let gridWidth = 0
    for (let i = 0; i < this.gridDef.min_width.length; i++) {
      gridWidth = gridWidth + this.gridDef.min_width[i]
    }

    return gridWidth
  },

  _getGridHeight: function () {
    let gridHeight = 0
    for (let i = 0; i < this.gridDef.min_height.length; i++) {
      gridHeight = gridHeight + this.gridDef.min_height[i]
    }

    return gridHeight
  },


  cellWidthFromDef: function (def) {
    let pattern = new RegExp("(\\d+)(?:px)?")
    let match = def.match(pattern)

    if (match != null) {
      return parseInt(match[1])
    }

    pattern = new RegExp("p(?:ref)?")
    match = def.match(pattern)
    if (match != null) {
      return 0
    }

    pattern = new RegExp("g(?:row)?")
    match = def.match(pattern)
    if (match != null) {
      this.autoResize = false
      return -1
    }

    return 0
  }


})



