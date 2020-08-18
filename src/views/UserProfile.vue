<template>
  <div id="UserProfile" class="p-4 bg-gray-100">
    <div class="flex mx-auto max-w-5xl md:flex-row justify-around mt-3 m-1 pt-4">
      <div class="relative">
        <div class="h-40 w-40 mx-3 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
          <img class="h-full w-full object-cover" src="@/assets/profile-images/gatweri.jpg" alt="profile image">
        </div>
        <button @click="isOpen=!isOpen" class="relative z-10 m-4 block p-1 rounded-md shadow-sm btn bg-white hover:bg-indigo-500 hover:text-white">
          Choose Role
          <fa-icon  :icon="['fas', 'caret-down']" class="self-center" size="1x"/>
        </button>
        <button v-if="isOpen" @click="isOpen=false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
        <div v-if="isOpen" id="RoleDropdown" class="absolute left-0 py-2 w-48 mt-2 bg-white rounded-lg shadow-xl">
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Focal Person</a>
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Team member</a>
        </div>
        <div class="w-48 text-left">
          <a href="#" class="block px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Profile</a>
          <a href="#" class="block px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Tasks</a>
          <a href="#" class="block px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Calendar</a>
          <a href="#" class="block px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Files</a>
        </div>
      </div>
      <div class="p-4 bg-gray-300 border rounded-tl-lg">
        <p>Gatweri specializes in epidemiology and plies her trade at Red Cross Society</p>
        <p>Her role in the team will be: {some role}</p>
        <p><fa-icon  :icon="['fas', 'phone-alt']" class="self-center" size="1x"/> 254743709788</p>
        <p><fa-icon  :icon="['fas', 'envelope']" class="self-center" size="1x"/>gatweri@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router"

export default {
  name: 'UserProfile',
  data(){
    return {
      isOpen: false
    }
  },
  methods:{

  },
  created(){
    const handleEscape=(e)=>{
      if(e.key==='Esc'||e.key==='Escape'){
        this.isOpen=false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', ()=>{
      document.removeEventListener('keydown', handleEscape)
    })
  }
}
</script>
<style>

</style>
