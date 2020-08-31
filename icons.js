import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faSpinner, faEnvelope, faKey, faAngleDown, faBars, faTimes, faCaretDown, faPhoneAlt, faUsers, faLongArrowAltRight, faLongArrowAltLeft, faEdit, faIdCardAlt, faUniversity, faUpload, faHome, faBriefcase, faFile, faCalendarWeek, faCalendarAlt, faMapMarkerAlt, faTimesCircle, faRedoAlt, faToolbox, faFolderOpen, faFileUpload, faPlus, faUser, faQuoteRight, faComments, faColumns, faClipboardList, faSyncAlt, faUserTie, faTrashAlt, faBell, faMobileAlt, faSmileWink, faUserCircle, faChartLine} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faSpinner, faEnvelope, faKey, faAngleDown, faBars, faTimes, faCaretDown, faPhoneAlt, faUsers, faLongArrowAltRight, faLongArrowAltLeft, faEdit, faIdCardAlt, faUniversity, faUpload, faHome, faBriefcase, faFile, faCalendarWeek, faCalendarAlt, faMapMarkerAlt, faTimesCircle, faRedoAlt, faToolbox, faFolderOpen, faFileUpload, faPlus, faUser, faQuoteRight, faComments, faColumns, faClipboardList, faSyncAlt, faUserTie, faTrashAlt, faBell, faMobileAlt, faSmileWink, faUserCircle, faChartLine)

Vue.component('fa-icon', FontAwesomeIcon)
