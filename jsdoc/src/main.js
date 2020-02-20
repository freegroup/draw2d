import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LiquorTree from 'liquor-tree'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import VueHighlightJS from 'vue-highlight.js'

import javascript from 'highlight.js/lib/languages/javascript.js'
import 'highlight.js/styles/googlecode.css'

Vue.use(VueHighlightJS, {
  languages: {
    javascript
  }
})
Vue.use(Vuetify)
Vue.use(LiquorTree)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify({
    theme: { dark: false },
    icons: {
      iconfont: 'md'
    }
  }),
  render: h => h(App)
}).$mount('#app')
