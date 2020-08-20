<template>
  <div id="UserProfile" class="p-4 overflow-hidden bg-white">
    <div class="pl-2 text-left">
      <router-link to="/create/join/team">
        <button class="btn ml-1 md:ml-4 lg:ml-8 hover:bg-indigo-300 hover:text-white font-bold">Next  <fa-icon  :icon="['fas', 'long-arrow-alt-right']" class="self-center" color="" size="1x"/>
        </button>
      </router-link>
    </div>
    <div class="flex flex-col md:flex-row mx-auto max-w-5xl justify-around mt-3 m-1 pt-4">
      <div class="relative">
        <div class="h-20 w-20 ml-2 md:h-32 md:w-32 lg:mx-3 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
          <img class="h-full w-full object-cover" src="@/assets/profile-images/gatweri.jpg" alt="profile image">
        </div>
        <p class="py-2 px-2 lg:pl-6 text-left font-sans italic text-opacity-25 underline">{{user.role?'focalperson':user.role===undefined?'error':'member'}}</p>
        <div class="w-full text-sm md:text-base lg:w-48 text-left py-4 md:py-2">
          <router-link to="/user/profile" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-blue-800  lg:font-semibold hover:bg-indigo-500 hover:text-white">Profile</router-link>
          <router-link to="/edit" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-blue-800  lg:font-semibold hover:bg-indigo-500 hover:text-white">Edit <fa-icon  :icon="['fas', 'edit']" class="self-center" color="" size="xs"/></router-link>
          <router-link to="" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-blue-800  lg:font-semibold hover:bg-indigo-500 hover:text-white">Calendar</router-link>
          <router-link to="" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-blue-800  lg:font-semibold hover:bg-indigo-500 hover:text-white">Files</router-link>
        </div>
      </div>
      <router-view :user="user"></router-view>
    </div>
    <statusBar/>
  </div>
</template>

<script>
import router from "../router"
import statusBar from '../components/statusBar.vue'
import statusPanel from '../mixins/statusPanel'
export default {
  name: 'UserProfile',
  components:{
    statusBar
  },
  data(){
    return{
      contactVisible:false,
      workingInsititutionVisible:false,
      specialtyVisible:false,
      emailVisible:false,
      user:{}
    }
  },
  methods:{
    fetchUser(){
      const email=window.email
      const url='http://localhost:5000/user/profile'
      this.$axios.post(url, {email})
        .then(response=>{
          this.user=response.data
          this.success()
        })
        .catch(err=>{
          this.fail(err)
        })
    }
  },
  created(){
    this.fetchUser()
  },
  mixins:[statusPanel]
}
</script>
<style>
</style>
