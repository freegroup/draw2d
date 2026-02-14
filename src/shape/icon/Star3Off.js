import draw2d from '../../packages'


/**
 * @class

 *
 * @example
 *
 *    let icon =  new draw2d.shape.icon.Star3Off();
 *
 *    canvas.add(icon,50,10);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.icon.Icon
 */
draw2d.shape.icon.Star3Off = draw2d.shape.icon.Icon.extend(
  /** @lends draw2d.shape.icon.Star3Off.prototype */
  {

  NAME: "draw2d.shape.icon.Star3Off",

  /**
   *
   * Creates a new icon element which are not assigned to any canvas.
   *
   * @param {Object} attr the configuration of the shape
   */
  init: function (attr, setter, getter) {
    this._super({width: 50, height: 50, ...attr}, setter, getter)
  },

  /**
   * @private
   * @returns {Object} the raphaelJS path object
   */
  createSet: function () {
    return this.canvas.paper.path("M28.631,12.359c-0.268-0.826-1.036-1.382-1.903-1.382h-0.015l-7.15,0.056l-2.155-6.816c-0.262-0.831-1.035-1.397-1.906-1.397s-1.645,0.566-1.906,1.397l-2.157,6.816l-7.15-0.056H4.273c-0.868,0-1.636,0.556-1.904,1.382c-0.27,0.831,0.029,1.737,0.74,2.246l5.815,4.158l-2.26,6.783c-0.276,0.828,0.017,1.739,0.723,2.25c0.351,0.256,0.763,0.384,1.175,0.384c0.418,0,0.834-0.132,1.189-0.392l5.751-4.247l5.751,4.247c0.354,0.26,0.771,0.392,1.189,0.392c0.412,0,0.826-0.128,1.177-0.384c0.704-0.513,0.997-1.424,0.721-2.25l-2.263-6.783l5.815-4.158C28.603,14.097,28.901,13.19,28.631,12.359zM19.712,17.996l2.729,8.184l-6.94-5.125L8.56,26.18l2.729-8.184l-7.019-5.018l8.627,0.066L15.5,4.82l2.603,8.225l8.627-0.066L19.712,17.996z")
  }
})

