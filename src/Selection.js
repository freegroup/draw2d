import draw2d from 'packages'


/**
 * @class
 *
 * Represents the current selection in the canvas. The selection element is a pure passive element which
 * manage/store the selection.
 *
 *
 * @author Andreas Herz
 */
draw2d.Selection = Class.extend(
  /** @lends draw2d.Selection.prototype */
  {

  NAME: "draw2d.Selection",

  /**
   * Creates a new figure element which are not assigned to any canvas.
   *
   */
  init: function () {
    this.primary = null;
    this.all = new draw2d.util.ArrayList();
  },

  /**
   * 
   * Reset the current selection
   *
   */
  clear: function () {
    this.primary = null;
    this.all = new draw2d.util.ArrayList();

    return this;
  },

  /**
   * 
   * Return the primary selection. This can only one figure at once.
   *
   * @returns {draw2d.Figure} the primary selected figure
   */
  getPrimary: function () {
    return this.primary;
  },

  /**
   * 
   * Set the primary selection.
   *
   * @param {draw2d.Figure} figure The new primary selection
   */
  setPrimary: function (figure) {
    this.primary = figure;
    this.add(figure);

    return this;
  },

  /**
   * 
   * Remove the given figure from the selection (primary,all)
   *
   * @param {draw2d.Figure} figure
   */
  remove: function (figure) {
    this.all.remove(figure);
    if (this.primary === figure) {
      this.primary = null;
    }

    return this;
  },

  /**
   * 
   * Add a figure to the selection. No events are fired or update the selection handle. This method just
   * add the figure to the internal management data structure.
   *
   * @param figure
   * @private
   */
  add: function (figure) {
    if (figure !== null && !this.all.contains(figure)) {
      this.all.add(figure);
    }

    return this;
  },


  /**
   * 
   * return true if the given figure part of the selection.
   *
   * @param {draw2d.Figure} figure The figure to check
   * @param {Boolean} [checkDescendant] Check if the figure provided by the argument is a descendant of the selection whether it is a direct child or nested more deeply.
   *
   * @since 2.2.0
   * @returns {Boolean}
   */
  contains: function (figure, checkDescendant) {
    if (checkDescendant) {
      for (let i = 0; i < this.all.getSize(); i++) {
        let figureToCheck = this.all.get(i);
        if (figureToCheck === figure || figureToCheck.contains(figure)) {
          return true;
        }
      }
      return false;
    }
    return this.all.contains(figure);
  },

  /**
   * 
   * Return the size of the selection
   *
   * @since 4.8.0
   */
  getSize: function () {
    return this.all.getSize();
  },

  /**
   * 
   * Return the complete selection - including the primary selection.
   *
   * @param {Boolean} [expand] expand all StrongComposite and WeakComposite to get all figures. Didn't expand any SetFigures or LayoutFigures
   * @returns {draw2d.util.ArrayList}
   *
   */
  getAll: function (expand) {
    if (expand === true) {
      let result = new draw2d.util.ArrayList();
      let addRecursive = (figures) => {
        result.addAll(figures, true);
        figures.each((index, figure) => {
          if (figure instanceof draw2d.shape.composite.StrongComposite) {
            addRecursive(figure.getAssignedFigures());
          }
        });
      };
      addRecursive(this.all);

      return result;
    }

    return this.all.clone();
  },

  /**
   * 
   * Iterates over the current selection with <b>func</b> as callback handler.
   *
   * @param {Function} func the callback function to call for each element
   * @param {Number} func.i index of the element in iteration
   * @param {Object} func.value value of the element in iteration.
   * @param {Boolean} [reverse] optional parameter. Iterate the collection reverse if it set to <b>true</b>
   */
  each: function (func, reverse) {
    this.all.each(func, reverse);

    return this;
  }
});
