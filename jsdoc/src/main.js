import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify({
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#00BCD4',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#FAFAFA',
          surface: '#FFFFFF'
        },
        dark: {
          primary: '#2196F3',
          secondary: '#757575',
          accent: '#00BCD4',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#121212',
          surface: '#1E1E1E'
        }
      }
    },
    icons: {
      iconfont: 'md'
    }
  }),
  render: h => h(App)
}).$mount('#app')
