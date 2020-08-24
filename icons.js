import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faSpinner, faEnvelope, faKey, faAngleDown, faBars, faTimes, faCaretDown, faPhoneAlt, faUsers, faLongArrowAltRight, faEdit, faIdCardAlt, faUniversity, faUpload, faHome, faBriefcase, faFile, faCalendarWeek, faMapMarkerAlt, faTimesCircle, faRedoAlt, faToolbox, faFolderOpen, faFileUpload, faPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faSpinner, faEnvelope, faKey, faAngleDown, faBars, faTimes, faCaretDown, faPhoneAlt, faUsers, faLongArrowAltRight, faEdit, faIdCardAlt, faUniversity, faUpload, faHome, faBriefcase, faFile, faCalendarWeek, faMapMarkerAlt, faTimesCircle, faRedoAlt, faToolbox, faFolderOpen, faFileUpload, faPlus)

Vue.component('fa-icon', FontAwesomeIcon)
