import draw2d from '../../packages'
import extend from "../../util/extend";
import jsonUtil from "../../util/JSONUtil";


/**
 * @class
 *
 * Controls the location of an IFigure.
 *
 * @author Andreas Herz
 */
draw2d.layout.locator.Locator = Class.extend(
  /** @lends draw2d.layout.locator.Locator.prototype */
  {

    NAME: "draw2d.layout.locator.Locator",

    /**
     * Initial Constructor
     *
     * @param {Object} attr additional init attributes
     * @param {Object} setter key/value map of injected setter-methods
     * @param {Object} getter key/value map of injected getter-methods
     */
    init: function (attr, setter, getter) {

      this.setterWhitelist = extend({}, setter)
      this.getterWhitelist = extend({}, getter)
      
      // propagate the attr to the new instance
      this.attr(attr)
    },

    /**
     *
     * Read or set locator attributes.<br>
     * When no value is given, reads specified attribute from the element.<br>
     * When value is given, sets the attribute to that value.
     * Multiple attributes can be set by passing an object with name-value pairs.
     *
     *
     *    // multiple attributes:
     *    locator.attr({
     *      x: 30,
     *      y: 40
     *    });
     *
     *    let data = locator.attr()
     *
     *
     * @param {String/Object} name
     * @param {Object} [value]
     * @since 5.0.1
     * @experimental
     * @returns {Object} either the requested attribute if this method used as getter or `this` if the method uses as setter
     **/
    attr: function (name, value) {
      let _this = this

      // call of attr as setter method with {name1:val1, name2:val2 }  argument list
      //
      if ($.isPlainObject(name)) {
        for (let key in name) {
          let func = this.setterWhitelist[key]
          let param = name[key]
          if (func && param !== undefined) {
            func.call(this, param)
          }
        }
      } else if (typeof name === "string") {
        // call attr as getter
        //
        if (typeof value === "undefined") {
          let getter = this.getterWhitelist[name]
          if (typeof getter === "function") {
            return getter.call(this)
          }
          return // undefined
        }

        // the value can be a function. In this case we must call the value().
        if (typeof value === "function") {
          value = value()
        }
        let setter = this.setterWhitelist[name]
        if (setter) {
          setter.call(this, value)
        }
      }
      // may it is a array of attributes used for the getter
      //
      else if (Array.isArray(name)) {
        return Object.assign({}, ...Object.keys(name).map(k => ({[k]: _this.attr(k)})))
      }
      // generic getter of all registered attributes
      else if (typeof name === "undefined") {
        let result = {}
        for (let key in this.getterWhitelist) {
          result[key] = this.getterWhitelist[key].call(this)
        }
        return result
      }

      return this
    },

    /**
     *
     * Callback method if a child is bounded to a parent. This is
     * the perfect moment to prepare the child node with some basic
     * behaviour which are forced by the <code>Locator</code>
     *
     * @param {draw2d.Figure} figure
     * @param {draw2d.Figure} child
     * @returns {this}
     */
    bind: function (figure, child) {
      // default behaviour of an Locator. The child isn't draggable and
      // the locator defines the position of the child.
      //
      child.setDraggable(false)
      child.setSelectable(false)

      return this
    },

    /**
     *
     * Callback method if a child is unbounded to the locator.
     *
     * @param {draw2d.Figure} figure
     * @param {draw2d.Figure} child
     * @returns {this}
     */
    unbind: function (figure, child) {

      return this
    },


    /**
     *
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @private
     **/
    relocate: function (index, figure) {
      // just repaint the child to update the SVG related to the new location
      // of the parent.
      figure.repaint()
    },
	
    /**
     *
     * Return a clone of the locator object
     *
     * @returns {draw2d.layout.locator.Locator}
     */
    clone: function () {
	  let clone = getInstanceForName(this.NAME)
	  clone.attr(this.attr()) // also clone properties
      return clone
    }
  })
