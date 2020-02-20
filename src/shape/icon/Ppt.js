import draw2d from '../../packages'


/**
 * @class draw2d.shape.icon.Ppt

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Ppt();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Ppt = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Ppt.prototype */
  {

  NAME: "draw2d.shape.icon.Ppt",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super(extend({width: 50, height: 50}, attr), setter, getter)
  },

  /**
   * @private
   * @returns
   */
  createSet: function () {
    return this.canvas.paper.path("M16.604,1.914c0-0.575-0.466-1.041-1.041-1.041s-1.041,0.466-1.041,1.041v1.04h2.082V1.914zM16.604,22.717h-2.082v3.207c0,0.574-4.225,4.031-4.225,4.031l2.468-0.003l2.807-2.673l3.013,2.693l2.272-0.039l-4.254-4.011V22.717L16.604,22.717zM28.566,7.113c0.86,0,1.56-0.698,1.56-1.56c0-0.861-0.698-1.56-1.56-1.56H2.561c-0.861,0-1.56,0.699-1.56,1.56c0,0.862,0.699,1.56,1.56,1.56h1.583v12.505l-0.932-0.022c-0.861,0-1.213,0.467-1.213,1.04c0,0.576,0.352,1.041,1.213,1.041h24.597c0.86,0,1.299-0.465,1.299-1.041c0-1.094-1.299-1.04-1.299-1.04l-0.804,0.109V7.113H28.566zM11.435,17.516c-3.771,0-4.194-4.191-4.194-4.191c0-4.096,4.162-4.161,4.162-4.161v4.161h4.193C15.596,17.516,11.435,17.516,11.435,17.516zM18.716,13.388h-1.071v-1.073h1.071V13.388zM18.716,10.267h-1.071V9.194h1.071V10.267zM23.314,13.388H20.26c-0.296,0-0.535-0.24-0.535-0.536c0-0.297,0.239-0.537,0.535-0.537h3.057c0.297,0,0.535,0.24,0.535,0.537C23.852,13.147,23.611,13.388,23.314,13.388zM23.314,10.267H20.26c-0.296,0-0.535-0.239-0.535-0.535c0-0.297,0.239-0.537,0.535-0.537h3.057c0.297,0,0.535,0.24,0.535,0.537C23.852,10.027,23.611,10.267,23.314,10.267z")
  }
})

