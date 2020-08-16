import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import '../icons.js'
import axios from 'axios'
import UUID from 'vue-uuid'
import VueGoogleCharts from 'vue-google-charts'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'


Vue.config.productionTip = false

Vue.use(UUID)
Vue.use(VueGoogleCharts)
Vue.use(Chartkick.use(Chart))
Chartkick.configure({language: "en", mapsApiKey: "AIzaSyAbzzDj3yw9FrKFV0Vvaotsqiw8Xg66vuc"})

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
