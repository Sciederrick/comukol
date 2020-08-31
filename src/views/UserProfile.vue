<template>
  <div id="UserProfile" class="p-4 overflow-hidden bg-white">
    <div class="pl-2 text-left">
      <router-link to="/create/join/team">
        <button @click.prevent="nextPage()" class="btn ml-1 md:ml-4 lg:ml-8 hover:bg-indigo-300 hover:text-white font-bold">Next  <fa-icon  :icon="['fas', 'long-arrow-alt-right']" class="self-center" color="" size="1x"/>
        </button>
      </router-link>
    </div>
    <div class="flex flex-col md:flex-row justify-around m-1 mx-auto max-w-5xl md:ml-16 md:pt-4 lg:mt-10">
      <div class="relative rounded-t-lg pt-6 lg:pt-0" id="ProfileImage">
        <div class="h-24 w-24 mx-auto md:ml-2 md:h-32 md:w-32 lg:mx-3 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
          <img v-if="user.image" class="h-full w-full object-cover" :src="require(`@/../server/uploads/profile/${user.image}`)" alt="photo">
        </div>
        <p class="py-2 lg:pl-6 text-left font-sans italic text-center text-gray-500 lg:text-gray-900 lg:text-left lg:text-opacity-25 underline"><fa-icon :icon="['fas', 'user-tie']" class="self-center mr-1" size="1x"/>{{user.role?'focalperson':user.role===undefined?'error':'member'}}</p>
        <div class="w-full text-sm md:text-base lg:w-48 text-center md:text-left py-4 md:py-2">
          <router-link to="/user/profile" class="inline py-2 px-5 md:px-6 border lg:mt-2 mb-1 lg:bg-gray-100 border-transparent rounded-md md:border-0 md:rounded-none md:block text-white md:text-blue-700 md:font-semibold hover:bg-indigo-500 hover:text-white"><span class="hidden md:inline font-mono">Profile</span><fa-icon  :icon="['fas', 'user']" class="self-center text-base md:hidden" color="" title="profile"/></router-link>
          <router-link to="/user/profile/edit" class="inline py-2 px-5 md:px-6 border lg:my-1 lg:bg-gray-100 border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-white md:text-blue-700 md:font-semibold hover:bg-indigo-500 hover:text-white"><span class="hidden md:inline font-mono">Edit</span><fa-icon  :icon="['fas', 'edit']" class="self-center text-base md:hidden" color="" title="edit"/></router-link>
          <router-link to="/user/profile/schedule" class="inline py-2 px-5 md:px-6 border lg:my-1 lg:bg-gray-100 border-transparent rounded-md md:border-0 md:rounded-none md:block text-white md:text-blue-700 md:font-semibold hover:bg-indigo-500 hover:text-white" title="coming soon"><span class="hidden md:inline font-mono">Schedule</span><fa-icon  :icon="['fas', 'calendar-alt']" class="self-center text-base md:hidden" color="" title="schedule"/></router-link>
          <router-link to="/user/profile/report" class="inline py-2 px-5 md:px-6 border lg:my-1 lg:bg-gray-100 border-transparent rounded-md md:border-0 md:rounded-none md:block text-white md:text-blue-700 md:font-semibold hover:bg-indigo-500 hover:text-white"><span class="hidden md:inline font-mono">Report</span><fa-icon  :icon="['fas', 'clipboard-list']" class="self-center text-base md:hidden" color="" title="daily reports"/></router-link>
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
      const user=JSON.parse(localStorage.getItem('user'))
      const email=user.email
      const url='/api/user/profile'
      this.$axios.post(url, {email})
        .then(response=>{
          this.user=response.data
          localStorage.userImage = this.user.image
          this.success()
        })
        .catch(err=>{
          this.fail(err)
        })
    },
    nextPage(){
      if(this.user.contact===null||this.user.name===null||this.user.jurisdiction===null||this.user.specialty===null||this.user.workplace===null){
        router.push('/user/profile/edit')
        this.fail('please complete your profile first then')
      }else{
        localStorage.role=this.user.role
        router.push('/create/join/team')
      }
    }
  },
  created(){
    this.fetchUser()
  },
  mixins:[statusPanel]
}
</script>
<style scoped>
@media screen and (max-width: 767px){
  #ProfileImage{
    background-image:url("./../assets/img/chatroom.png");
  }
}
</style>
