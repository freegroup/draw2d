/**
 * Check if a value is a plain object (created with {} or new Object()).
 * 
 * This is a native replacement for jQuery's $.isPlainObject().
 * 
 * A plain object is an object that:
 * - Is not null
 * - Has typeof 'object'
 * - Has Object.prototype as its prototype (or null prototype via Object.create(null))
 * - Is not an instance of a custom class
 * 
 * @param {any} obj - The value to check
 * @returns {boolean} - True if the value is a plain object
 * 
 * @example
 * isPlainObject({})                    // true
 * isPlainObject({ a: 1 })              // true
 * isPlainObject(new Object())          // true
 * isPlainObject(Object.create(null))   // true
 * 
 * isPlainObject(null)                  // false
 * isPlainObject(undefined)             // false
 * isPlainObject([])                    // false
 * isPlainObject(new Date())            // false
 * isPlainObject(new Map())             // false
 * isPlainObject(() => {})              // false
 * isPlainObject(new (class Foo {}))    // false
 */
export function isPlainObject(obj) {
  // Must be an object and not null
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  // Get the prototype
  const proto = Object.getPrototypeOf(obj)

  // Plain objects have either Object.prototype or null as their prototype
  // (null prototype is for objects created with Object.create(null))
  return proto === null || proto === Object.prototype
}

export default isPlainObject