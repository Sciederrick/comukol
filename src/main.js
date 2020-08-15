import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import '../icons.js'
import axios from 'axios'
import UUID from 'vue-uuid'

Vue.config.productionTip = false

Vue.use(UUID)

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
