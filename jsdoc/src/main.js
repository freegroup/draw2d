import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LiquorTree from 'liquor-tree'

// global registration
Vue.use(LiquorTree)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
