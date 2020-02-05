import draw2d from '../../packages'
import extend from '../../util/extend'


/**
 * @class draw2d.shape.layout.Layout
 *
 * A base class for positioning child figures and determining the ideal size for
 * a figure with children.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.layout.Layout = draw2d.shape.basic.Rectangle.extend(
  /** @lends draw2d.shape.layout.Layout.prototype */
  {

  NAME: "draw2d.shape.layout.Layout",

  /**
   * Create a new instance
   *
   * @param {Object} [attr] the configuration of the shape
   */
  init: function (attr, setter, getter) {
    // @since 4.3.3
    this.padding = {top: 0, right: 0, bottom: 0, left: 0}

    this._super(extend({bgColor: null, radius: 0, stroke: 0}, attr),
      extend({
        // @attr {Number} padding the padding in pixel around the text */
        padding: this.setPadding
      }, setter),
      extend({
        padding: this.getPadding
      }, getter))


    let _this = this
    this.resizeListener = function (figure) {
      // propagate the event to the parent or other listener if existing
      //
      if (_this.getParent() instanceof draw2d.shape.layout.Layout) {
        _this.fireEvent("resize")
      }
      // or we are the parent and must consume it self
      else {
        _this.setDimension(1, 1)
        _this.fireEvent("resize")
      }
    }

    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy())
  },

  /**
   * @inheritdoc
   */
  add: function (child, locator, index) {
    this._super(child, locator, index)

    child.on("resize", this.resizeListener)
    child.on("change:visibility", this.resizeListener)

    // don't use the getter/setter. This considers the canvas assignment and
    // the child is always invisible. BIG BUG. The example shape_db will break if you change this.
//       child.setVisible(this.isVisible());
    // respect the "visible" flag of the child as well
    child.visible = child.visible && this.visible

    return this
  },

  /**
   * @inheritdoc
   */
  remove: function (child) {
    let r = this._super(child)
    child.off(this.resizeListener)
    this.setDimension(1, 1)

    return r
  },


  /**
   * 
   * Set the padding of the element
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
   * @since 4.3.3
   **/
  setPadding: function (padding) {
    if (typeof padding === "number") {
      this.padding = {top: padding, right: padding, bottom: padding, left: padding}
    }
    else {
      this.padding = extend(this.padding, padding)
    }
    this.fireEvent("change:padding", {value: this.padding})

    // force a relayout of the figure
    this.setDimension(1, 1)


    return this
  },


  /**
   * 
   * Get the padding of the element.
   *
   * @since 4.3.3
   **/
  getPadding: function () {
    return this.padding
  },

  /**
   * @inheritdoc
   */
  setVisible: function (flag) {
    // propagate the visibility to all children too.
    //
    this.children.each(function (i, e) {
      e.figure.setVisible(flag)
    })


    this._super(flag)

    // force a relayout of the shape because the dimension has been changed
    // by enable/disable of child shapes
    this.setDimension(1, 1)

    return this
  },

  /**
   * 
   * Returns the Command to perform the specified Request or null.
   *
   * @param {draw2d.command.CommandType} request describes the Command being requested
   * @return {draw2d.command.Command} null or a Command
   * @private
   **/
  createCommand: function (request) {
    // it is not possible to rate a layout object
    // ..at the moment
    if (request.getPolicy() === draw2d.command.CommandType.ROTATE) {
      return null
    }


    return this._super(request)
  }
})



