<template>
  <div id="home" class="w-full p-1 overflow-hidden font-sans">
    <header class="bg-gray-300 px-6 py-2 flex flex-row justify-between">
      <p class="text-gray-800 font-bold text-2xl text-left">Comukol</p>
      <div class="h-8 w-8 ml-2 my-1 lg:mx-3 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
        <img class="h-full w-full object-cover" :src="require(`@/../server/uploads/profile/avatar.jpg`)" alt="photo">
      </div>
    </header>
    <main class="mt-4">
      <div class="">
        <div id="sidebar" class="absolute left-0 z-40 mt-1">
          <div class="flex items-center justify-between px-4 lg:px-6 lg:py-1">
            <div class="">
              <button @click="isOpen=!isOpen" type="button" class="text-gray-500 hover:text-white focus:text-white focus:outline-none" name="button">
                <fa-icon v-if="!isOpen" :icon="['fas', 'bars']" class="self-center text-gray-900" size="2x"/>
                <fa-icon v-if="isOpen" :icon="['fas', 'times']" class="self-center text-gray-900" size="2x"/>
              </button>
            </div>
          </div>
          <div :class="isOpen ? 'block': 'hidden'" class=" h-auto rounded bg-gray-700 px-1 pt-2 pb-4 text-left">
            <router-link to="/home" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'home']" class="self-center" size="1x"/><span class="pl-2">Home</span>
            </router-link>
            <router-link to="" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'users']" class="self-center" size="1x"/><span class="pl-2">Members</span>
            </router-link>
            <router-link to="/workspace" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'briefcase']" class="self-center" size="1x"/><span class="pl-2">Workspace</span>
            </router-link>
            <router-link to="/events" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'calendar-week']" class="self-center" size="1x"/><span class="pl-2">Events</span>
            </router-link>
            <router-link to="" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'file']" class="self-center" size="1x"/><span class="pl-2">Events</span>
            </router-link>
          </div>
        </div>
        <router-view class="static"></router-view>
      </div>
    </main>
    <footer>
      <statusBar/>
    </footer>
  </div>
</template>

<script>
import statusBar from '../components/statusBar.vue'
export default {
  name: 'Home',
  components:{
    statusBar
  },
  data(){
    return{
      isOpen: false,
    }
  }
}
</script>
