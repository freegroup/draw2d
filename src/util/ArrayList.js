import draw2d from '../packages'

/**
 * @class
 *
 * <Disclaimer> Writing my own class for arrays was one of my worst ideas...
 *
 * An ArrayList stores a variable number of objects. This is similar to making an array of
 * objects, but with an ArrayList, items can be easily added and removed from the ArrayList
 * and it is resized dynamically. This can be very convenient, but it's slower than making
 * an array of objects when using many elements.
 */
draw2d.util.ArrayList = Class.extend(
  /** @lends draw2d.util.ArrayList */
  {

  init: function (a) {
    if (Array.isArray(a)) {
      this.data = a
    }
    else {
      this.data = []
    }
  },


  /**
   *
   * Clears the array
   *
   * @since 6.1.0
   */
  clear: function () {
    this.data = []

    return this
  },

  /**
   *
   * Reverses the order of the elements in the ArrayList. The array will be modified!
   *
   */
  reverse: function () {
    this.data.reverse()

    return this
  },

  /**
   *
   * The size/count of the stored objects.
   *
   * @return {Number}
   */
  getSize: function () {
    return this.data.length
  },


  /**
   *
   * checks to see if the Vector has any elements.
   *
   * @return {Boolean} true if the list is empty
   **/
  isEmpty: function () {
    return this.getSize() === 0
  },

  /**
   *
   * return the last element.
   *
   * @return {Object}
   */
  last: function () {
    return this.data[this.data.length - 1]
  },

  /**
   *
   * Return a reference to the internal javascript native array.
   *
   * @return {Array}
   */
  asArray: function () {
    return this.data
  },

  /**
   *
   * returns the first element
   *
   * @return {Object}
   */
  first: function () {
    if (this.data.length > 0) {
      return this.data[0]
    }
    return null
  },


  /**
   *
   * returns an element at a specified index
   *
   * @param {Number} i
   * @return {Object}
   */
  get: function (i) {
    return this.data[i]
  },

  /**
   *
   * Adds a element at the end of the Vector.
   *
   * @param {Object} obj the object to add
   */
  add: function (...objs) {
    this.data.push(...objs)

    return this
  },

  /**
   *
   *
   * The method removes items from an array as necessary so that all remaining items pass a
   * provided test. The test is a function that is passed an array item and the index of the
   * item within the array. Only if the test returns true will the item stay in the array.
   *
   * @param {Function} func the filter function(element,index)
   * @param {Object} func.value value of the element in iteration.
   * @since 2.0.0
   */
  grep: function (func) {
    this.data = this.data.filter(func)

    return this
  },

  /**
   *
   *
   * Return ONE element which matches by the given function or <b>null</b>
   * if no element is found.
   *
   *    var r1= figures.find(function(figure){
   *                  return figure.id===123456
   *            });
   *
   * @param {Function} func the filter function
   * @param {Object} func.value value of the element in iteration.
   * @param {Object} func.index index of the element in collection.
   * @since 2.0.0
   */
  find: function (func) {
    let result = this.data.filter(func)
    if (result.length === 0) {
      return null
    }
    return result[0]
  },

  /**
   *
   * Translate all items in the array into new items. The array list is modified after this call.
   * You must clone the array before if you want avoid this.
   *
   *    var labels = this.commands.clone().map(function(e){
   *         return e.getLabel();
   *    });
   *
   * @param {Function} func The function to process each item against. The first argument to the function is the value; the second argument is the index or key of the array or object property.
   * @param {Object} func.value value of the element in iteration.
   * @param {Number} func.i index of the element in iteration
   *
   * @since 4.0.0
   */
  map: function (func) {
    this.data = this.data.map(func)

    return this
  },

  /**
   *
   * Removes any duplicate elements from the array. The array is modified after this call. You
   * must clone the array before if you want avoid this
   *
   * @since 4.0.0
   */
  unique: function () {
    this.data = this.data.filter((value, index, self) => self.indexOf(value) === index)

    return this
  },


  /**
   *
   * Add all elements into this array.
   *
   * @param {draw2d.util.ArrayList} list
   * @param {Boolean} [avoidDuplicates] checks whenever the new elements exists before insert if the parameter is to [true]
   *
   */
  addAll: function (list, avoidDuplicates) {
    if (!(list instanceof draw2d.util.ArrayList)) {
      throw "Unable to handle unknown object type in ArrayList.addAll"
    }

    this.data = this.data.concat(list.data)
    if (avoidDuplicates) {
      this.unique()
    }
    return this
  },

  /**
   *
   * You can use the Array list as Stack as well. this is the pop method to remove one element
   * at the end of the stack.
   *
   * @returns
   */
  pop: function () {
    return this.removeElementAt(this.data.length - 1)
  },

  /**
   *
   * Push one element at the top of the stack/array
   *
   * @param path
   */
  push: function (value) {
    this.add(value)
  },

  /**
   *
   * Remove the element from the list
   *
   * @param {Object} obj the object to remove
   *
   * @return {Object} the removed object or null
   */
  remove: function (obj) {
    let index = this.indexOf(obj)
    if (index >= 0) {
      return this.removeElementAt(index)
    }

    return null
  },


  /**
   *
   * Inserts an element at a given position. Existing elements will be shifted
   * to the right.
   *
   * @param {Object} obj the object to insert.
   * @param {Number} index the insert position.
   *
   */
  insertElementAt: function (obj, index) {
    this.data.splice(index, 0, obj)

    return this
  },

  /**
   *
   * Removes an element at a specific index.
   *
   * @param {Number} index the index of the element to remove
   * @return {Object} the removed object
   */
  removeElementAt: function (index) {
    let element = this.data[index]

    this.data.splice(index, 1)

    return element
  },

  /**
   *
   * removes all given elements in the ArrayList
   *
   * @param {draw2d.util.ArrayList} elements The elements to remove
   */
  removeAll: function (elements) {
    if (elements instanceof draw2d.util.ArrayList) {
      elements = elements.data
    }

    if (Array.isArray(elements)) {
      elements.forEach((e) => {
        this.remove(e)
      })
    }

    return this
  },

  /**
   *
   * Return the zero based index of the given element or -1 if the element
   * not in the list.
   *
   * @param {Object} obj the element to check
   *
   * @return {Number} the index of the element or -1
   */
  indexOf: function (obj) {
    return this.data.indexOf(obj)
  },

  /**
   *
   * returns true if the element is in the Vector, otherwise false.
   *
   * @param {Object} obj the object to check
   *
   * @return {Boolean}
   */
  contains: function (obj) {
    return this.indexOf(obj) !== -1
  },


  /**
   *
   * Sorts the collection based on a field name or sort a function. See on http://www.w3schools.com/jsref/jsref_sort.asp
   * if you use a sort function.
   *
   * @param {String|Function} f the field name for the sorting or a sort function
   *
   * @return {draw2d.util.ArrayList} self
   */
  sort: function (f) {
    if (typeof f === "function") {
      this.data.sort(f)
    }
    else {
      this.data.sort(function (a, b) {
        if (a[f] < b[f])
          return -1
        if (a[f] > b[f])
          return 1
        return 0
      })
    }
    return this
  },

  /**
   *
   * Copies the contents of a Vector to another Vector returning the new Vector.
   *
   * @param {Boolean} [deep] call "clone" of each elements and add the clone to the new ArrayList
   *
   * @returns {draw2d.util.ArrayList} the new ArrayList
   */
  clone: function (deep) {
    let newVector = new draw2d.util.ArrayList()


    if (deep) {
      for (let i = 0; i < this.data.length; i++) {
        newVector.data.push(this.data[i].clone())
      }
    }
    else {
      newVector.data = this.data.slice(0)
    }

    return newVector
  },


  /**
   *
   * Iterates over the list of elements, yielding each in turn to an iterator
   * function.
   * Each invocation of iterator is called with two arguments: (index, element).
   *
   * @param {Function} func the callback function to call for each element
   * @param {Number} func.i index of the element in iteration
   * @param {Object} func.value value of the element in iteration.
   * @param {Boolean} [reverse] optional parameter. Iterate the collection reverse if it set to <b>true</b>
   *
   */
  each: function (func, reverse) {
    if (typeof reverse !== "undefined" && reverse === true) {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (func(i, this.data[i]) === false)
          break
      }
    }
    else {
      for (let i = 0; i < this.data.length; i++) {
        if (func(i, this.data[i]) === false)
          break
      }
    }

    return this
  },

  // overwriteElementAt() - overwrites the element with an object at the specific index.
  overwriteElementAt: function (obj, index) {
    this.data[index] = obj

    return this
  },

  getPersistentAttributes: function () {
    return {data: this.data}
  },

  /**
   *
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    this.data = memento.data
  }


})

draw2d.util.ArrayList.EMPTY_LIST = new draw2d.util.ArrayList()


