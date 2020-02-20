import draw2d from '../../packages'
import extend from '../../util/extend'


/**
 * @class
 * This decorations hides draw2d.Ports which are to far from the current cursor position.
 * This makes the canvas more clean if you have a lot of nodes on it.<br>
 * You didn't see a bunch of ports.
 *
 *
 * @example
 *
 *      // install the policy to the canvas
 *
 *      // add some demo figure to the canvas
 *      canvas.add(new draw2d.shape.node.Start({x: 10,  y: 30}));
 *      canvas.add(new draw2d.shape.node.End({x: 90,  y: 90}));
 *      canvas.add(new draw2d.shape.node.Between({ x: 310, y: 30}));
 *
 *      canvas.add(new draw2d.shape.basic.Label({text:"move the mouse and you see that ports are hidden if the mouse far from it"}),5,5);
 *
 *      canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.CoronaDecorationPolicy = draw2d.policy.canvas.DecorationPolicy.extend(
  /** @lends draw2d.policy.canvas.CoronaDecorationPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.CoronaDecorationPolicy",

  /**
   *
   */
  init: function (attr, setter, getter) {

    this.startDragX = 0
    this.startDragY = 0
    this.diameterToBeFullVisible = 0
    this.diameterToBeVisible = 0
    this.sumDiameter = 0

    this._super(
      extend({diameterToBeVisible: 200, diameterToBeFullVisible: 20}, attr),

      extend({
        diameterToBeVisible: this.setDiameterToBeVisible,
        diameterToBeFullVisible: this.setDiameterToBeFullVisible
      }, setter),

      extend({
        diameterToBeVisible: this.getDiameterToBeVisible,
        diameterToBeFullVisible: this.getDiameterToBeFullVisible
      }, getter)
    )
  },

  setDiameterToBeVisible: function (diameter) {
    this.diameterToBeVisible = diameter
    this.sumDiameter = this.diameterToBeFullVisible + this.diameterToBeVisible
  },

  getDiameterToBeVisible: function () {
    return this.diameterToBeVisible
  },

  setDiameterToBeFullVisible: function (diameter) {
    this.diameterToBeFullVisible = diameter
    this.sumDiameter = this.diameterToBeFullVisible + this.diameterToBeVisible
  },

  getDiameterToBeFullVisible: function () {
    return this.diameterToBeFullVisible
  },

  /**
   * @inheritdoc
   */
  onInstall: function (canvas) {
    this._super(canvas)
    canvas.getFigures().each((i, figure) => {
      figure.getPorts().each((i, p) => p.setVisible(false))
    })
  },

  /**
   * @inheritdoc
   */
  onUninstall: function (canvas) {
    this._super(canvas)

    canvas.getFigures().each(function (i, figure) {
      figure.getPorts().each(function (i, p) {
        if (p.__origAlpha) {
          p.setAlpha(p.__origAlpha)
          delete p.__origAlpha
        }
        p.setVisible(true)
      })
    })
  },


  /**
   * @inheritdoc
   */
  onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
    this.startDragX = x
    this.startDragY = y
  },

  /**
   * @inheritdoc
   */
  onMouseMove: function (canvas, x, y, shiftKey, ctrlKey) {
    this.updatePorts(canvas, x, y)
  },

  /**
   * @inheritdoc
   */
  onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    this.updatePorts(canvas, this.startDragX + dx, this.startDragY + dy)
  },


  /**
   * 
   * Update all ports with the new calculated opacity in relation to the distance to the current
   * mouse position
   *
   * @param canvas
   * @param x
   * @param y
   * @private
   */
  updatePorts: function (canvas, x, y) {
    canvas.getFigures().each((i, figure) => {
      if (figure instanceof draw2d.shape.node.Node) {
        if (figure.isVisible() === true && figure.hitTest(x, y, this.sumDiameter) === true) {
          figure.getPorts().each((i, p) => {
            if (p.isVisible() === false) {
              p.__origAlpha = figure.getAlpha()
            }
            let dist = figure.getBoundingBox().getDistance(new draw2d.geo.Point(x, y))
            let alpha = 1 - ((100 / (this.diameterToBeVisible - this.diameterToBeFullVisible)) * dist) / 100.0
            p.setAlpha(alpha)
            p.setVisible(true)
          })
        }
        else {
          figure.getPorts().each((i, p) => {
            if (p.__origAlpha) {
              p.setAlpha(p.__origAlpha)
              delete p.__origAlpha
            }
            p.setVisible(false)
          })
        }
      }
    })
  }

})
