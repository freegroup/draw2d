<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <div class="page">
      <h2>{{ $attrs.className }}</h2>
            <span v-html="clazz.description"></span>
            <div v-for="(example, index) in clazz.constructor.examples" :key="'example'+index"
              class="codepen"
              data-height="350"
              data-theme-id="1"
              data-default-tab="js,result"
              data-prefill='{"scripts":[ "https://freegroup.github.io/draw2d/buildin_bridge/lib/jquery.js", "https://freegroup.github.io/draw2d/buildin_bridge/lib/jquery-ui.js", "https://freegroup.github.io/draw2d/draw2d.js" ]}'
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

      <v-divider v-if="clazz.constructor.examples.length === 0"></v-divider>

      <h3>Methods</h3>

          <v-expansion-panels focusable multiple>
            <v-expansion-panel
              v-for="func in functions"
              :key="func.name"
            >
              <v-expansion-panel-header>
                <span>
                <span class="function">{{func.name}}</span> (
                <span class="arguments" v-for="(param, index) in func.parameters" :key="param.name">
                  <template>{{param.name}}</template><template v-if="index+1 < func.parameters.length">, </template>
                </span>
                )
                  </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-html="func.description"></span>

                <h4>Arguments</h4>
                <v-simple-table dense="true" dark>
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
                      <td>{{ param.type }}</td>
                      <td v-html="param.description"></td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  components: {
  },
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
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    functions () {
      let f = this.clazz.functions.filter(func => func.inherited === false)
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
    items () {
      if (this.clazz.namespace) {
        let segments = this.clazz.namespace.split('.')
        let path = ''
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
    fetchData () {
      console.log(this.$attrs.className)
      this.loading = true
      axios.get('/data/' + this.$attrs.className + '.json')
        .then(response => {
          this.loading = false
          this.clazz = response.data
          console.log(this.clazz)
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>

<style>
body{
  font-family: "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
}
h2{
  margin-top: 0;
  margin-bottom: 10.5px;
  font-size: 32px;
  font-weight: 300;
  color: #66ab16;
}

h3{
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-size: 26px;
  font-weight: 300;
}

h4{
  margin-top: 16px;
  margin-bottom: 10.5px;
  font-size: 19px;
  font-weight: 300;
}

.page{
  padding:15px;
  padding-left:0px;
  padding-top:0;
}

.function{
  font-weight: bold;
  color:#083772;
}
.arguments{
  color: #aaaaaa;
}
.v-breadcrumbs{
  padding-bottom:0;
  padding-left:0 !important;
}
.v-data-table p{
  margin:0 !important;
}

.example .v-expansion-panel-content__wrap{
  padding:0 !important;
}
.example code{
  width:100% !important;
  padding: 0 !important;
  display:block;
  background-color: #607d8b03;
}

.example button {
  padding: 5px;
  min-height: 30px !important;
  padding-left: 20px;
}
</style>
