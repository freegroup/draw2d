import draw2d from '../packages';

draw2d.util.JSON = {

        /**
         * @method
         * Given a dot deliminated string set will create an object
         * based on the structure of the string with the desired value
         *
         * @param {Object} data   the json object to modify
         * @param {String} path   path indicating where value should be placed
         * @param {Object} value  the value desired to be set at the location determined by path
         */
        set: function(data, path, value) {
          if(!path || path===''){
              return;
          }

          var re = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
          // parse path on dots, and brackets
          var pathList = path.match(re);
          var parent = data;
          var parentKey;
          var grandParent = null;
          var grandParentKey = null;

          var addObj = function(obj, key, data) {
            if(key === '[]') {
              obj.push(data);
            } else {
              obj[key] = data;
            }
          };

          while(pathList.length > 0) {
            parentKey = pathList.shift().replace(/["']/g, '');

            // Number, treat it as an array
            if (!isNaN(+parentKey) || parentKey === "[]") {
              if($.type(parent)!=="array" ) {
                parent = [];
                addObj(grandParent, grandParentKey, parent);
              }
            // String, treat it as a key
            }
            else if ($.type(parentKey)==="string") {
              if(!$.isPlainObject(parent)) {
                parent = {};
                addObj(grandParent, grandParentKey, parent);
              }
            }
            // Next
            grandParent = parent;
            grandParentKey = parentKey;
            parent = parent[parentKey];
          }

          addObj(grandParent, grandParentKey, value);
        },

        /**
         * @method
         * Returns the value defined by the path passed in
         *
         * @param  {Object} data the JSON data object
         * @param  {String} path string leading to a desired value
         */
        get: function(data, path) {
          var regex = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
          //check if path is truthy
          if (!path){
              return undefined;
          }
          //parse path on dots and brackets
          var paths = path.match(regex);
          //step through data object until all keys in path have been processed
          while (data !== null && paths.length > 0) {
            if(data.propertyIsEnumerable(paths[0].replace(/"/g, ''))){
              data = data[paths.shift().replace(/"/g, '')];
            }
            else{
              return undefined;
            }
          }
          return data;
        },

        /**
         * @method
         * calculates the diff between the given json objects
         *
         */
        diff: function(obj1, obj2) {
            var result = {};
            for(key in obj1) {
            	var v1 = obj1[key];
            	var v2 = obj2[key];
                if(v1 !== v2) {
                	if(v1.equals ){
                		if(!v1.equals(v2)){
                			result[key] = obj1[key];
                		}
                	}
                	else{
            			result[key] = obj1[key];
                	}
                }
            }
            return result;
        },

        flatDiff: function(obj1, obj2) {
            var result = {};
            for(let key in obj1) {
                if(obj1[key] !== obj2[key]) {
                    result[key] = obj1[key];
                }
            }
            return result;
        },

        ensureDefault:function( json, attribute, value)
        {
            if (!json.hasOwnProperty(attribute)) {
                json[attribute] = value;
            }
        }
};
