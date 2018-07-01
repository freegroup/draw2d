module.exports = function(o) {
  // return typeof o === 'object'; // fails
  // return o === Object(o); // fails
  // return o instanceof Object; // fails
  return !!o
    && typeof o === 'object'
    && Object.prototype.toString.call(o) === '[object Object]';
}
