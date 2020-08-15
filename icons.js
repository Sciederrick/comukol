import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faSpinner, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faSpinner, faEnvelope, faKey)

Vue.component('fa-icon', FontAwesomeIcon)
