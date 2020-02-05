import draw2d from '../../packages'


/**
 * @class draw2d.shape.widget.Widget
 * Base class for all diagrams.
 *
 * @extends draw2d.SetFigure
 */
draw2d.shape.widget.Widget = draw2d.SetFigure.extend({

  init: function (attr, setter, getter) {
    this._super(attr, setter, getter)
  }
})
