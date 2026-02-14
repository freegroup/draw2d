<template>
  <div class="api-container">
    <div class="api-card">
      <div class="api-header">
        <v-breadcrumbs :items="items" class="api-breadcrumbs"></v-breadcrumbs>
      </div>
      <div class="api-content">
        <h2 class="api-title">{{ $attrs.className }} <v-chip v-if="clazz.access === 'private'" class="ma-2" color="red" text-color="white" x-small>private</v-chip></h2>

        <p class="api-description" v-html="clazz.description"></p>

        <div v-for="(example, index) in clazz.constructor.examples" :key="'example'+index"
          class="codepen"
          data-height="350"
          data-theme-id="1"
          data-default-tab="js,result"
          data-prefill='{"scripts":[ "https://freegroup.github.io/draw2d/jquery.js", "https://freegroup.github.io/draw2d/jquery-ui.js", "https://freegroup.github.io/draw2d/draw2d.js" ]}'
        >
          <pre data-lang="javascript">
canvas = new draw2d.Canvas("gfx_holder");
// only required on codepen...
canvas.setScrollArea(window);

{{example.replace(/\n\s\s\s\s/g,'\n')}}
          </pre>
          <pre data-lang="html">
&lt;div id="gfx_holder" style="width:2500px; height:2500px; "&gt;
          </pre>
        </div>

        <v-divider v-if="clazz.constructor.examples.length === 0" class="my-4"></v-divider>

        <template v-if="initFunction">
          <h3 class="section-title">Constructor</h3>
          <v-expansion-panels focusable multiple class="method-panels">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span>
                  <span class="function">new {{clazz.namespace}}.{{clazz.name}}</span> (
                  <span class="arguments" v-for="(param, index) in initFunction.parameters" :key="param.name">
                    <template>{{param.name}}</template><template v-if="index+1 < initFunction.parameters.length">, </template>
                  </span>
                  )
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <h4 class="subsection-title">Arguments</h4>
                <v-simple-table :dense="true" dark class="params-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Type</th>
                        <th class="text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="param in initFunction.parameters" :key="initFunction.name+param.name">
                        <td>{{ param.name }}</td>
                        <td>{{ param.type }}</td>
                        <td v-html="param.description"></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>

        <template v-if="publicFunctions.length>0">
          <h3 class="section-title">Public Methods</h3>
          <v-expansion-panels focusable multiple class="method-panels">
            <v-expansion-panel
              v-for="func in publicFunctions"
              :key="func.name"
            >
              <v-expansion-panel-header>
                <span>
                  <span class="function">{{func.name}}</span> (
                  <span class="arguments" v-for="(param, index) in func.parameters" :key="param.name">
                    <template>{{param.name}}</template><template v-if="index+1 < func.parameters.length">, </template>
                  </span>
                  )
                  <template v-if="func.returns">
                    <v-icon>arrow_forward</v-icon> {{ formatType(func.returns.type) }}
                    <template v-if="func.returns.type === 'this'">
                      <v-chip class="ma-2" color="green" text-color="white" x-small>chainable</v-chip>
                    </template>
                  </template>
                  <template v-if="func.deprecated.length>0">
                    <span class="text--disabled">
                      <v-chip class="ma-2" color="red" text-color="white" x-small>deprecated</v-chip>
                      <span v-html="func.deprecated"></span>
                    </span>
                  </template>
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-html="func.description"></span>
                <template v-if="func.returns && func.returns.type !== 'this'">
                  <h4 class="subsection-title">Returns</h4>
                  <v-simple-table :dense="true" dark class="params-table">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Type</th>
                          <th class="text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ formatType(func.returns.type) }}</td>
                          <td v-html="func.returns.description"></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>

                <template v-if="func.returns && func.returns.type === 'this'">
                  <h4 class="subsection-title">Method call is designed to be chainable</h4>
                </template>

                <h4 class="subsection-title">Arguments</h4>
                <v-simple-table :dense="true" dark class="params-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Type</th>
                        <th class="text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="param in func.parameters" :key="func.name+param.name">
                        <td>{{ param.name }}</td>
                        <td>{{ formatType(param.type) }}</td>
                        <td v-html="param.description"></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>

        <template v-if="privateFunctions.length>0">
          <h3 class="section-title">Private Methods</h3>
          <v-expansion-panels focusable multiple class="method-panels">
            <v-expansion-panel
              v-for="func in privateFunctions"
              :key="func.name"
            >
              <v-expansion-panel-header>
                <span>
                  <span class="function">{{func.name}}</span> (
                  <span class="arguments" v-for="(param, index) in func.parameters" :key="param.name">
                    <template>{{param.name}}</template><template v-if="index+1 < func.parameters.length">, </template>
                  </span>
                  )
                  <template v-if="func.returns">
                    <v-icon>arrow_forward</v-icon> {{ formatType(func.returns.type) }}
                    <template v-if="func.returns.type === 'this'">
                      <v-chip class="ma-2" color="green" text-color="white" x-small>chainable</v-chip>
                    </template>
                  </template>
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-html="func.description"></span>
                <template v-if="func.returns && func.returns.type !== 'this'">
                  <h4 class="subsection-title">Returns</h4>
                  <v-simple-table :dense="true" dark class="params-table">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Type</th>
                          <th class="text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ formatType(func.returns.type) }}</td>
                          <td v-html="func.returns.description"></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>

                <template v-if="func.returns && func.returns.type === 'this'">
                  <h4 class="subsection-title">Method call is designed to be chainable</h4>
                </template>

                <h4 class="subsection-title">Arguments</h4>
                <v-simple-table :dense="true" dark class="params-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Type</th>
                        <th class="text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="param in func.parameters" :key="func.name+param.name">
                        <td>{{ param.name }}</td>
                        <td>{{ formatType(param.type) }}</td>
                        <td v-html="param.description"></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  updated () {
    let script = document.createElement('script')
    script.async = true
    script.src = 'https://static.codepen.io/assets/embed/ei.js'
    document.body.appendChild(script)
  },
  data () {
    return {
      loading: false,
      clazz: {
        functions: [],
        constructor: {
          examples: []
        }
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    initFunction () {
      let f = this.clazz.functions.filter(func => func.name === 'init')
      if (f.length > 0) {
        return f[0]
      }
      return null
    },
    publicFunctions () {
      let f = this.clazz.functions.filter(func => func.inherited === false && func.name !== 'init' && func.access !== 'private')
      f.sort(function (a, b) {
        if (a.name === 'init') {
          return -1
        }
        if (b.name === 'init') {
          return 1
        }
        return a.name.localeCompare(b.name)
      })
      return f
    },
    privateFunctions () {
      let f = this.clazz.functions.filter(func => func.inherited === false && func.access === 'private')
      f.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      })
      return f
    },
    items () {
      if (this.clazz.namespace) {
        let segments = this.clazz.namespace.split('.')
        let path = '#/api'
        segments = segments.map(s => {
          path = path + '/' + s
          return { text: s, disabled: false, href: path }
        })
        return segments
      }
      return []
    }
  },
  methods: {
    formatType (type) {
      if (Array.isArray(type)) {
        return type.join(' | ')
      }
      return type
    },
    fetchData () {
      this.loading = true
      axios.get('./data/' + this.$attrs.className + '.json')
        .then(response => {
          this.loading = false
          this.clazz = response.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.api-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  overflow: auto;
}

.api-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  min-height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.api-header {
  padding: 12px 20px 0 20px;
  background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
  border-bottom: 1px solid #f0f0f0;
}

.api-breadcrumbs {
  padding: 0 !important;
  padding-bottom: 8px !important;
}

.api-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.api-title {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 300;
  color: #00BCD4;
  letter-spacing: -0.5px;
}

.api-description {
  color: #4a5568;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.section-title {
  margin: 24px 0 12px 0;
  font-size: 22px;
  font-weight: 500;
  color: #2d3748;
}

.subsection-title {
  margin: 16px 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #4a5568;
}

.method-panels {
  margin-bottom: 16px;
}

.function {
  font-weight: 600;
  color: #1976D2;
}

.arguments {
  color: #718096;
}

.params-table {
  border-radius: 8px;
  overflow: hidden;
}

.example .v-expansion-panel-content__wrap {
  padding: 0 !important;
}

.example code {
  width: 100% !important;
  padding: 0 !important;
  display: block;
  background-color: #607d8b03;
}

.example button {
  padding: 5px;
  min-height: 30px !important;
  padding-left: 20px;
}
</style>

<style>
.api-content .v-data-table p {
  margin: 0 !important;
}
</style>