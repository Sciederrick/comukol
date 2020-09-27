import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Charts from '../views/Charts.vue'
import MultipleUploads from '../components/MultipleFilesUploader.vue'
import FilesDropZone from '../components/FilesDropZone.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/register',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue'),
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue'),
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/invited/:email/:team',
    name: 'InvitedMemberSignIn',
    component: () => import(/* webpackChunkName: "InvitedMemberSignIn" */ '../views/InvitedMemberSignIn.vue'),
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: '',
        name: 'Charts',
        component: Charts,
        meta:{
          requiresAuth:true
        }
      },
      {
        path: '/events',
        name: 'Events',
        component: () => import(/* webpackChunkName: "Events" */ '../views/Events.vue'),
        meta:{
          requiresAuth:true
        }
      },
      {
        path: '/workspace',
        component: () => import(/* webpackChunkName: "Workspace" */ '../views/Workspace.vue'),
        children:[
          {
            path: '',
            name: 'DefaultTemplates',
            component: () => import(/* webpackChunkName: "DefaultTemplates" */ '../components/DefaultTemplates.vue'),
            meta:{
              requiresAuth:true
            }
          },
          {
            path: '/custom/templates',
            name: 'CustomTemplates',
            component: () => import(/* webpackChunkName: "CustomTemplates" */ '../components/CustomTemplates.vue'),
            meta:{
              requiresAuth:true
            }
          },
          {
            path: '/filled/forms',
            name: 'FilledForms',
            component: () => import(/* webpackChunkName: "FilledForms" */ '../components/FilledForms.vue'),
            meta:{
              requiresAuth:true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/create/join/team',
    name: 'CreateJoinTeam',
    component: () => import(/* webpackChunkName: "CreateJoinTeam" */ '../views/CreateJoinTeam.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/create/team',
    name: 'CreateTeam',
    component: () => import(/* webpackChunkName: "CreateTeam" */ '../views/CreateTeam.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/user/profile',
    component: () => import(/* webpackChunkName: "UserProfile" */ '../views/UserProfile.vue'),
    children:[
      {
        path: '',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../components/Profile.vue'),
        props:true,
        meta:{
          requiresAuth:true
        }
      },
      {
        path: 'edit',
        name: 'EditProfile',
        component: () => import(/* webpackChunkName: "EditProfile" */ '../components/EditProfile.vue'),
        props:true,
        meta:{
          requiresAuth:true
        }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import(/* webpackChunkName: "Schedule" */ '../components/Schedule.vue'),
        props:true,
        meta:{
          requiresAuth:true
        }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import(/* webpackChunkName: "Report" */ '../components/Report.vue'),
        meta:{
          requiresAuth:true
        }
      }
    ]
    },
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: () => import(/* webpackChunkName: "ChatRoom" */ '../views/ChatRoom.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      requiresAuth:false
    }
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
  },
  {
    path: '/expired',
    name: 'Expired',
    component: () => import(/* webpackChunkName: "Expired" */ '../components/Expired.vue'),
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '*',
    alias: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../components/NotFound.vue'),
    meta:{
      requiresAuth:false
    }
  },
  // {
  //   path: '*',
  //   redirect: '/NotFound'
  // },
]

const router = new VueRouter({
  mode: 'history',
  // linkExactActiveClass: '', ##change the name of the active class from here (referenced by css)
  // scrollBehavior(to, from, savedPosition){
  //   if(savedPosition){
  //     return savedPosition
  //   }else{
  //     const position = {}
  //     if(to.hash){
  //       position.selector = to.hash
  //       if(to.hash === "#experience"){
  //         position.offset = {y:140}
  //       }
  //       if(document.querySelector(to.hash)){
  //         return position
  //       }
  //       return false
  //     }
  //   }
  // },
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.meta.requiresAuth
  const loggedIn = localStorage.getItem('token')

  if(authRequired && !loggedIn){
    return next('/')
  }

  next()
})

export default router
