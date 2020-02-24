import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LiquorTree from 'liquor-tree'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.use(VueFriendlyIframe)
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
