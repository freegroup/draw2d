import draw2d from "../../packages";

/**
 * @class
 *
 * A cavas decoration which paints a grid in the background.
 * <br>
 * <br>
 *
 * @example
 *
 *    canvas.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
 *    let shape =  new draw2d.shape.basic.Text({text:"This is a simple text in a canvas with grid background."});
 *
 *    canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.ShowGridEditPolicy =
  draw2d.policy.canvas.DecorationPolicy.extend(
    /** @lends draw2d.policy.canvas.ShowGridEditPolicy.prototype */
    {
      NAME: "draw2d.policy.canvas.ShowGridEditPolicy",

      GRID_COLOR: "#f0f0f0",
      BG_COLOR: "#ffffff",
      GRID_WIDTH: 20,
      GRID_STOKE: 1,

      /**
       * Creates a new constraint policy for snap to grid
       *
       * @param {Number} [grid] the grid width of the canvas
       */
      init: function (gridDistance, gridStroke, gridColor, bgColor) {
        this.gridWidth = gridDistance || this.GRID_WIDTH;
        this.gridStroke = gridStroke || this.GRID_STOKE;
        this.gridColor = new draw2d.util.Color(gridColor || this.GRID_COLOR);
        this.bgColor = new draw2d.util.Color(bgColor || this.BG_COLOR);

        this._super();
        this.onZoomCallback = (emitterFigure, zoomData) => {
          this.setGrid(1 / zoomData.value);
        };
      },

      /**
       *
       * Set the grid color
       *
       * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
       * @since 5.0.3
       */
      setGridColor: function (color) {
        this.gridColor = new draw2d.util.Color(color);
        this.setGrid(1 / this.canvas.getZoom());
      },
      setBackgroundColor: function(color) {
        this.bgColor = new draw2d.util.Color(color);
        this.setGrid(1 / this.canvas.getZoom());
      },

      onInstall: function (canvas) {
        this._super(canvas);

        this.oldBg = this.canvas.html.css("background");
        this.setGrid(1 / canvas.getZoom());
        canvas.on("zoom", this.onZoomCallback);
      },

      onUninstall: function (canvas) {
        this._super(canvas);

        $(canvas.paper.canvas).css({ background: this.oldBg });
        canvas.off(this.onZoomCallback);
      },

      /**
       * @private
       * @param {Number} zoom
       */
      setGrid: function (zoom) {
        let bgColor = this.bgColor.rgba();
        let color = this.gridColor.rgba();

        let background = ` linear-gradient(to right,  ${color} ${this.gridStroke}px, transparent ${this.gridStroke}px),
      linear-gradient(to bottom, ${color} ${this.gridStroke}px, ${bgColor}  ${this.gridStroke}px)`;
        let backgroundSize = `${this.gridWidth * zoom}px ${
          this.gridWidth * zoom
        }px`;

        $(this.canvas.paper.canvas).css({
          background: background,
          "background-size": backgroundSize,
        });
      },
    }
  );
