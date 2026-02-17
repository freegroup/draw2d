import draw2d from '../packages'
import {isPlainObject} from './isPlainObject'


draw2d.util.JSON = {

        /**
         * 
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

          let re = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
          // parse path on dots, and brackets
          let pathList = path.match(re);
          let parent = data;
          let parentKey;
          let grandParent = null;
          let grandParentKey = null;

          let addObj = function(obj, key, data) {
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
              if(parent.constructor !== Array ) {
                parent = [];
                addObj(grandParent, grandParentKey, parent);
              }
            // String, treat it as a key
            }
            else if (typeof parentKey==="string") {
              if(!isPlainObject(parent)) {
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
         * 
         * Returns the value defined by the path passed in
         *
         * @param  {Object} data the JSON data object
         * @param  {String} path string leading to a desired value
         */
        get: function(data, path) {
          let regex = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
          //check if path is truthy
          if (!path){
              return undefined;
          }
          //parse path on dots and brackets
          let paths = path.match(regex);
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
         * 
         * calculates the diff between the given json objects
         *
         */
        diff: function(obj1, obj2) {
            let result = {};
            for(let key in obj1) {
              let v1 = obj1[key];
              let v2 = obj2[key];
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
          let result = {};
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

export default draw2d.util.JSON;
