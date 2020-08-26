import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import CreateJoinTeam from '../views/CreateJoinTeam.vue'
import CreateTeam from '../views/CreateTeam.vue'
import UserProfile from '../views/UserProfile.vue'
import Events from '../views/Events.vue'
import Charts from '../views/Charts.vue'
import Workspace from '../views/Workspace.vue'
import InvitedMemberSignIn from '../views/InvitedMemberSignIn.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Profile from '../components/Profile.vue'
import EditProfile from '../components/EditProfile.vue'
import MultipleUploads from '../components/MultipleFilesUploader.vue'
import FilesDropZone from '../components/FilesDropZone.vue'
import DefaultTemplates from '../components/DefaultTemplates.vue'
import CustomTemplates from '../components/CustomTemplates.vue'
import FilledForms from '../components/FilledForms.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/invited',
    name: 'InvitedMemberSignIn',
    component: InvitedMemberSignIn
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: '',
        name: 'Charts',
        component: Charts,
      },
      {
        path: '/events',
        name: 'Events',
        component: Events
      },
      {
        path: '/workspace',
        component: Workspace,
        children:[
          {
            path: '',
            name: 'DefaultTemplates',
            component: DefaultTemplates
          },
          {
            path: '/custom/templates',
            name: 'CustomTemplates',
            component: CustomTemplates
          },
          {
            path: '/filled/forms',
            name: 'FilledForms',
            component: FilledForms
          }
        ]
      }
    ]
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/create/join/team',
    name: 'CreateJoinTeam',
    component: CreateJoinTeam
  },
  {
    path: '/create/team',
    name: 'CreateTeam',
    component: CreateTeam
  },
  {
    path: '/user/profile',
    component: UserProfile,
    children:[
      {
        path: '',
        name: 'Profile',
        component: Profile,
        props:true
      },
      {
        path: '/user/profile/edit',
        name: 'EditProfile',
        component: EditProfile,
        props:true
      }
    ]
  },
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/files',
    name: 'Files',
    component: MultipleUploads
  },
  {
    path: '/drop/files',
    name: 'FilesDropZone',
    component: FilesDropZone
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
