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
import Profile from '../components/Profile.vue'
import EditProfile from '../components/EditProfile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: '',
        name: 'Charts',
        component: Charts
      },
      {
        path: '/events',
        name: 'Events',
        component: Events
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
        component: Profile
      },
      {
        path: '/edit',
        name: 'EditProfile',
        component: EditProfile
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
