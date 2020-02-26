/* eslint-disable indent, no-nested-ternary, space-infix-ops */

/**
    @overview Builds a tree-like JSON string from the doclet data.
    @version 0.0.3
    @example
        ./jsdoc scratch/jsdoc_test.js -t templates/haruki -d console -q format=xml
*/
const xml = require('js2xmlparser');

const hasOwnProp = Object.prototype.hasOwnProperty;

function graft(parentNode, childNodes, parentLongname) {
    childNodes
    .filter(({memberof}) => memberof === parentLongname)
    .forEach(element => {
        let i;
        let len;
        let thisClass;
        let thisEvent;
        let thisFunction;
        let thisMixin;
        let thisNamespace;

        if (element.kind === 'namespace') {
            if (!parentNode.namespaces) {
                parentNode.namespaces = [];
            }
            thisNamespace = {
                'name': element.name,
                'namespace': parentNode.name?(parentNode.namespace?parentNode.namespace+".":"")+parentNode.name:"",
                'description': element.description || '',
                'access': element.access || '',
                'virtual': Boolean(element.virtual)
            };
            parentNode.namespaces.push(thisNamespace);

            graft(thisNamespace, childNodes, element.longname);
        }
        else if (element.kind === 'mixin') {
            if (!parentNode.mixins) {
                parentNode.mixins = [];
            }

            thisMixin = {
                'name': element.name,
                'description': element.description || '',
                'access': element.access || '',
                'virtual': Boolean(element.virtual)
            };

            parentNode.mixins.push(thisMixin);

            graft(thisMixin, childNodes, element.longname);
        }
        else if (element.kind === 'function') {
            if (!parentNode.functions) {
                parentNode.functions = [];
            }

            thisFunction = {
                'name': element.name,
                'access': element.access || '',
                'virtual': Boolean(element.virtual),
                'deprecated': element.deprecated || '',
                'description': element.description || '',
                'parameters': [],
                'inherited': Boolean(element.inherited),
                'since': element.since || '',
                'examples': []
            };

            parentNode.functions.push(thisFunction);

            if (element.returns && element.returns[0]) {
                thisFunction.returns = {
                    'type': element.returns[0].type? (element.returns[0].type.names.length === 1? element.returns[0].type.names[0] : element.returns[0].type.names) : '',
                    'description': element.returns[0].description || ''
                };
            }

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisFunction.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisFunction.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': hasOwnProp.call(element.params[i], 'defaultvalue') ? element.params[i].defaultvalue : '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }
        }
        else if (element.kind === 'member') {
            if (!parentNode.properties) {
                parentNode.properties = [];
            }
            parentNode.properties.push({
                'name': element.name,
                'access': element.access || '',
                'virtual': Boolean(element.virtual),
                'description': element.description || '',
                'type': element.type? (element.type.length === 1? element.type[0] : element.type) : ''
            });
        }

        else if (element.kind === 'event') {
            if (!parentNode.events) {
                parentNode.events = [];
            }

            thisEvent = {
                'name': element.name,
                'access': element.access || '',
                'virtual': Boolean(element.virtual),
                'description': element.description || '',
                'parameters': [],
                'examples': []
            };

            parentNode.events.push(thisEvent);

            if (element.returns) {
                thisEvent.returns = {
                    'type': element.returns.type ? (element.returns.type.names.length === 1 ? element.returns.type.names[0] : element.returns.type.names) : '',
                    'description': element.returns.description || ''
                };
            }

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisEvent.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisEvent.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': hasOwnProp.call(element.params[i], 'defaultvalue') ? element.params[i].defaultvalue : '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }
        }
        else if (element.kind === 'class') {
            if (!parentNode.classes) {
                parentNode.classes = [];
            }

            thisClass = {
                'name': element.name,
                'namespace': parentNode.name?(parentNode.namespace?parentNode.namespace+".":"")+parentNode.name:"",
                'description': element.classdesc || '',
                'extends': element.augments || [],
                'access': element.access || '',
                'virtual': Boolean(element.virtual),
                'functions': [],
                'fires': element.fires || '',
                'constructor': {
                    'name': element.name,
                    'description': element.description || '',
                    'parameters': [
                    ],
                    'examples': []
                }
            };

            parentNode.classes.push(thisClass);

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisClass.constructor.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisClass.constructor.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': hasOwnProp.call(element.params[i], 'defaultvalue') ? element.params[i].defaultvalue : '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }

            graft(thisClass, childNodes, element.longname);
       }
    });
}


function writeRouter(namespaces){
  const fs = require('fs')

  let contents = fs.readFileSync('../examples/examples.json')
  let examples = JSON.parse(contents)

  const stream = fs.createWriteStream("./src/router/index.js")

  stream.write('import Vue from \'vue\'\n')
  stream.write('import VueRouter from \'vue-router\'\n\n')
  stream.write('Vue.use(VueRouter)\n\n')

  stream.write('const routes = [\n')
  stream.write('  {\n')
  stream.write('    path: \'/\',\n')
  stream.write('    component: () => import(/* webpackChunkName: "home" */ \'../views/api.vue\')\n')
  stream.write('  },\n')
  stream.write('  {\n')
  stream.write('    path: \'/api\',\n')
  stream.write('    component: () => import(/* webpackChunkName: "api" */ \'../views/api.vue\'),\n')
  stream.write('    children: [\n')
  namespaces.forEach((namespace, idx, array) => {
    let last = (idx === array.length - 1)
    let path = `/api/${namespace.name.toLowerCase()}`
    let component = path.replace('/','').split("/").join("_")
    if(namespace.namespaces) {
      namespace.namespaces.forEach( (n, idx, array) => dumpRoutes(n, stream, '      ', (idx === array.length - 1), path, 'package'))
    }
    if(namespace.classes){
      namespace.classes.forEach( (clz, idx, array) => dumpRoutes(clz, stream, '      ', (idx === array.length - 1), path, 'clazz'))
    }
    stream.write('      {\n')
    stream.write(`        path: '${path}',\n`)
    stream.write(`        props: { className: '${namespace.name}' },\n`)
    stream.write(`        component: () => import(/* webpackChunkName: "${component}" */ '../views/package.vue')\n`)
    if(!last){
      stream.write('      },\n')
    }
    else{
      stream.write('      }\n')
    }
  })
  stream.write('    ]\n')
  stream.write('  },\n') // end #api
  stream.write('  {\n')
  stream.write('    path: \'/examples\',\n')
  stream.write('    component: () => import(/* webpackChunkName: "examples" */ \'../views/examples.vue\'),\n')
  stream.write('    children: [\n')
  examples.forEach( (section, idx, array) => {
    section.data = {path: '/examples/section'+idx }
    stream.write('      {\n')
    stream.write(`        path: '/examples/section${idx}',\n`)
    stream.write(`        props: { index: ${idx} },\n`)
    stream.write(`        component: () => import(/* webpackChunkName: "example_section${idx}" */ '../views/example_section.vue')\n`)
    stream.write('      },\n')
  })
  examples.forEach( (section, idx, array) => {
    section.children.forEach( (example, idx2, array2) => {
      example.data = {path: '/examples/'+example.name }
      stream.write('      {\n')
      stream.write(`        path: '${example.data.path}',\n`)
      stream.write(`        props: { section: ${idx}, example: ${idx2} },\n`)
      stream.write(`        component: () => import(/* webpackChunkName: "example_${example.name}" */ '../views/example.vue')\n`)
      if ((idx === array.length - 1) && (idx2 === array2.length - 1)) {
        stream.write('      }\n')
      }
      else {
        stream.write('      },\n')
      }
    })
  })

  stream.write('    ]\n')
  stream.write('  }\n') // end #examples

  stream.write(']\n\n')

  stream.write('const tree = [\n')
  namespaces.forEach((namespace) => {
    let path = `/api/${namespace.name.toLowerCase()}`
    stream.write('  {\n')
    stream.write(`    data: { path: '${path}' },\n`)
    if(namespace.namespaces) {
      stream.write(`    text: '${namespace.name}',\n`)
      stream.write('    children: [\n')
      namespace.namespaces.forEach( (n, idx, array) => dumpTree(n, stream, '      ', (idx === array.length - 1), path))
      stream.write('    ]\n')
    }
    else{
      stream.write(`    text: '${namespace.name}'\n`)
    }
    stream.write('  }\n')
  })
  stream.write(']\n\n')

  stream.write('const examples = ');
  stream.write(JSON.stringify(examples, undefined, 2).replace(/\'/g,"\\'").replace(/\"/g,"'"))
  stream.write('\n\n')

  stream.write('const router = new VueRouter({\n')
  stream.write('  mode: \'hash\',\n')
  stream.write('  examples,\n')
  stream.write('  tree,\n')
  stream.write('  routes\n')
  stream.write('})\n')
  stream.write('\n')
  stream.write('export default router\n')

  stream.end()
}

function dumpTree(namespace, stream, ident, isLastElement, path){
  path = path +'/'+namespace.name.toLowerCase()
  stream.write(ident+'{\n')
  stream.write(ident+`  data: { path: '${path}' },\n`)
  if(namespace.namespaces) {
    stream.write(ident+`  text: '${namespace.name}',\n`)
    stream.write(ident+'  children: [\n')
    namespace.namespaces.forEach( (n, idx, array) => {
      dumpTree(n, stream, '    ' + ident, (idx === array.length - 1), path)
    })
    stream.write(ident+'  ]\n')
  }
  else{
    stream.write(ident+`  text: '${namespace.name}'\n`)
  }

  if(isLastElement){
    stream.write(ident+'}\n')
  }
  else{
    stream.write(ident+'},\n')
  }
}

function dumpRoutes(namespace, stream, ident, isLastElement, path, template){
  path = path +'/'+namespace.name.toLowerCase()
  let component = path.replace('/','').split("/").join("_")
  stream.write(ident+'{\n')
  stream.write(ident+`  path: '${path}',\n`)
  stream.write(ident+`  props: { className: '${namespace.namespace}.${namespace.name}' },\n`)
  stream.write(ident+`  component: () => import(/* webpackChunkName: "${component}" */ '../views/${template}.vue')\n`)
  stream.write(ident+'},\n')
  if(namespace.namespaces) {
    namespace.namespaces.forEach( (n, idx, array) => {
      dumpRoutes(n, stream, ident, (idx === array.length - 1), path, 'package')
    })
  }
  if(namespace.classes) {
    namespace.classes.forEach( (n, idx, array) => {
      dumpRoutes(n, stream, ident, (idx === array.length - 1), path, 'clazz')
    })
  }
}

function dumpClasses(data){
  const fs = require('fs');
  if(data.classes) {
    data.classes.forEach(clazz => {
      let pathName = './public/data/' + clazz.namespace+"."+clazz.name + '.json'
      if( clazz.namespace.length==0){
        pathName = './public/data/' + clazz.name + '.json'
      }
      const stream = fs.createWriteStream(pathName);
      stream.once('open', function(fd) {
        stream.write(JSON.stringify(clazz, undefined, 2))
        stream.end();
      }, () => {});
    })
  }
  if(data.namespaces) {
    data.namespaces.forEach(dumpClasses)
  }
}

function dumpNamespaces(data){
  const fs = require('fs');
  if(data.namespaces) {
    data.namespaces.forEach(ns => {
      let pathName = './public/data/' + ns.namespace+"."+ns.name + '.json'
      if( ns.namespace.length==0){
        pathName = './public/data/' + ns.name + '.json'
      }
      const stream = fs.createWriteStream(pathName);
      stream.once('open', function(fd) {
        let nss = ns.namespaces
        if(ns.namespaces) {
          ns.namespaces = ns.namespaces.map(n => { return { name: n.name, namespace: n.namespace} })
        }
        else{
          ns.namespaces = []
        }
        stream.write(JSON.stringify(ns, undefined, 2))
        stream.end();
        ns.namespaces = nss
      }, () => {});
    })
    data.namespaces.forEach(dumpNamespaces)
  }
}

/**
    @param {TAFFY} data
    @param {object} opts
 */
exports.publish = (data, {destination, query}) => {
    let docs;
    const root = {};

    data({undocumented: true}).remove();
    docs = data().get(); // <-- an array of Doclet objects

    graft(root, docs);

    writeRouter(root.namespaces)
    dumpClasses(root)
    dumpNamespaces(root)

    const ncp = require('ncp').ncp;
    ncp('../examples', './public/examples', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });
};
