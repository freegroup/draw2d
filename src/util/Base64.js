import draw2d from '../packages';


draw2d.util.Base64 = {

    /**
     * Maps bytes to characters.
     * @type {Object}
     * @private
     */
    byteToCharMap_ :null,


    /**
     * Maps characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMap_: null,


    /**
     * Maps bytes to websafe characters.
     * @type {Object}
     * @private
     */
    byteToCharMapWebSafe_ : null,

    /**
     * Maps websafe characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMapWebSafe_ : null,


    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     * @type {string}
     */
    ENCODED_VALS_BASE : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     * @type {string}
     */
    ENCODED_VALS : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + '+/=',


    /**
     * Our websafe alphabet.
     * @type {string}
     */
    ENCODED_VALS_WEBSAFE :'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + '-_.',


    encodeByteArray: function(input, opt_webSafe) {
        draw2d.util.Base64.init();

        var byteToCharMap = opt_webSafe ?  draw2d.util.Base64.byteToCharMapWebSafe_ : draw2d.util.Base64.byteToCharMap_;

        var output = [];

        for (var i = 0; i < input.length; i += 3) {
          var byte1 = input[i];
          var haveByte2 = i + 1 < input.length;
          var byte2 = haveByte2 ? input[i + 1] : 0;
          var haveByte3 = i + 2 < input.length;
          var byte3 = haveByte3 ? input[i + 2] : 0;

          var outByte1 = byte1 >> 2;
          var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
          var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
          var outByte4 = byte3 & 0x3F;

          if (!haveByte3) {
            outByte4 = 64;

            if (!haveByte2) {
              outByte3 = 64;
            }
          }

          output.push(byteToCharMap[outByte1],
                      byteToCharMap[outByte2],
                      byteToCharMap[outByte3],
                      byteToCharMap[outByte4]);
        }

        return output.join('');
      },


      /**
       * 
       * Base64-encode a string.
       *
       * @param {string} input A string to encode.
       * @param {boolean=} opt_webSafe If true, we should use the alternative alphabet.
       * @return {string} The base64 encoded string.
       */
     encode: function(input, opt_webSafe) {
        return draw2d.util.Base64.encodeByteArray( draw2d.util.Base64.stringToByteArray(input), opt_webSafe);
      },


      /**
       * 
       * Base64-decode a string.
       *
       * @param {String} input to decode (length not required to be a multiple of 4).
       * @param {boolean=} opt_webSafe True if we should use the
       *     alternative alphabet.
       * @return {Array} bytes representing the decoded value.
       */
      decode: function(input, opt_webSafe) {
        draw2d.util.Base64.init();

        var charToByteMap = opt_webSafe ?draw2d.util.Base64.charToByteMapWebSafe_ : draw2d.util.Base64.charToByteMap_;

        var output = [];

        for (var i = 0; i < input.length; ) {
          var byte1 = charToByteMap[input.charAt(i++)];

          var haveByte2 = i < input.length;
          var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
          ++i;

          var haveByte3 = i < input.length;
          var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 0;
          ++i;

          var haveByte4 = i < input.length;
          var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 0;
          ++i;

          if (byte1 == null || byte2 == null ||
              byte3 == null || byte4 == null) {
            throw Error();
          }

          var outByte1 = (byte1 << 2) | (byte2 >> 4);
          output.push(outByte1);

          if (byte3 != 64) {
            var outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
            output.push(outByte2);

            if (byte4 != 64) {
              var outByte3 = ((byte3 << 6) & 0xC0) | byte4;
              output.push(outByte3);
            }
          }
        }

        return output;
     },

    /**
     * Turns a string into an array of bytes; a "byte" being a JS number in the
     * range 0-255.
     * @param {string} str String value to arrify.
     * @return {!Array.<number>} Array of numbers corresponding to the
     *     UCS character codes of each character in str.
     */
    stringToByteArray: function(str) {
      var output = [], p = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        while (c > 0xff) {
          output[p++] = c & 0xff;
          c >>= 8;
        }
        output[p++] = c;
      }
      return output;
    },

    init: function() {
        if (!draw2d.util.Base64.byteToCharMap_) {
            draw2d.util.Base64.byteToCharMap_ = {};
            draw2d.util.Base64.charToByteMap_ = {};
            draw2d.util.Base64.byteToCharMapWebSafe_ = {};
            draw2d.util.Base64.charToByteMapWebSafe_ = {};

          // We want quick mappings back and forth, so we precompute two maps.
          for (var i = 0; i < draw2d.util.Base64.ENCODED_VALS.length; i++) {
              draw2d.util.Base64.byteToCharMap_[i] = draw2d.util.Base64.ENCODED_VALS.charAt(i);
              draw2d.util.Base64.charToByteMap_[draw2d.util.Base64.byteToCharMap_[i]] = i;
              draw2d.util.Base64.byteToCharMapWebSafe_[i] = draw2d.util.Base64.ENCODED_VALS_WEBSAFE.charAt(i);
              draw2d.util.Base64.charToByteMapWebSafe_[draw2d.util.Base64.byteToCharMapWebSafe_[i]] = i;
          }
        }
    }
};
