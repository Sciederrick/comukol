<template>
  <div id="home" class="w-full p-1 overflow-hidden font-sans">
    <header class="bg-gray-300 px-6 py-2 lg:py-0 flex flex-row justify-between">
      <p class="text-gray-800 font-bold text-2xl text-left">Comukol</p>
      <div class="h-8 w-8 ml-2 my-1 lg:mx-3 lg:h-10 lg:w-10 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
        <router-link to="/user/profile" :key="$route.path">
          <img v-if="userImage" class="h-full w-full object-cover" :src="require(`@/../server/uploads/profile/${userImage}`)" alt="photo">
        </router-link>
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
              <fa-icon  :icon="['fas', 'columns']" class="self-center" size="1x"/><span class="pl-2">Home</span>
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
            <router-link to="/chatroom" class="mt-1 block pl-4 pr-6 py-6 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'comments']" class="self-center" size="1x"/><span class="pl-2">Chatroom</span>
            </router-link>
          </div>
        </div>
        <transition name="slide" mode="out-in">
          <router-view class="static"></router-view>
        </transition>
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
      userImage: ''
    }
  },
  methods:{

  },
  created(){
    this.userImage = localStorage.getItem('userImage')||'avatar.jpg'
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-30%);
}
</style>
