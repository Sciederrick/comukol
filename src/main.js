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
import VueTelInput from 'vue-tel-input'
import CKEditor from 'ckeditor4-vue'
import Popover from 'vue-js-popover'

//global components
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

Vue.component('Modal', Modal)
Vue.component('Spinner', Spinner)

Vue.config.productionTip = false

Vue.use(UUID)
Vue.use(VueGoogleCharts)
Vue.use(Chartkick.use(Chart))
Vue.use(VueTelInput)
Vue.use(CKEditor)
Vue.use(Popover)

Chartkick.configure({language: "en", mapsApiKey: "AIzaSyAbzzDj3yw9FrKFV0Vvaotsqiw8Xg66vuc"})

export const bus = new Vue()

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
