<template>
  <div id="home" class="w-full p-1 overflow-hidden font-sans">
      <div class="flex md:flex-row-reverse flex-wrap">
    <!--Main Content-->
        <div class="w-full md:w-4/5 bg-grey-100">
           <div class="container bg-grey-100 px-1">
             <!-- header -->
             <div class="px-6 py-2 lg:py-0 flex flex-row justify-between">
               <p class="text-gray-800 font-bold text-2xl text-left">ComuKol</p>
               <div class="h-8 w-8 ml-2 my-1 lg:mx-3 lg:h-10 lg:w-10 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                 <router-link to="/user/profile" :key="$route.path">
                   <img v-if="userImage" class="h-full w-full object-cover" :src="require(`@/../server/uploads/profile/${userImage}`)" alt="photo">
                 </router-link>
               </div>
             </div>
             <transition name="slide" mode="out-in">
               <router-view class="static"></router-view>
             </transition>
           </div>
        </div>
      </div>
      <!--Sidebar-->
      <div class="w-full md:w-1/5 bg-black md:bg-white px-2 text-center fixed bottom-0 pin-b md:pt-8 md:top-0 md:left-0 h-16 md:h-screen md:border-r-2 md:border-gray-600">
        <div class="md:relative mx-auto lg:float-right lg:px-6">
          <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
            <li class="mr-3 flex-1">
              <router-link to="/home" class="block py-1 md:py-3 pl-1 align-middle text-grey-darkest  hover:text-pink-800 border-b-2 border-grey-900 md:border-black hover:border-pink-700">
                <fa-icon  :icon="['fas', 'columns']" class="pr-0 md:pr-3 lg:text-2xl" size="1x"/><span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Dashboard</span>
              </router-link>
            </li>
            <li class="mr-3 flex-1">
              <router-link to="" class="block py-1 md:py-3 pl-1 align-middle text-grey-darkest  hover:text-pink-800 border-b-2 border-grey-900 md:border-black hover:border-pink-700">
                <fa-icon  :icon="['fas', 'users']" class="pr-0 md:pr-3 lg:text-2xl" size="1x"/><span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Members</span>
              </router-link>
            </li>
            <li class="mr-3 flex-1">
              <router-link to="/workspace" class="block py-1 md:py-3 pl-1 align-middle text-grey-darkest  hover:text-pink-800 border-b-2 border-grey-900 md:border-black hover:border-pink-700">
                <fa-icon  :icon="['fas', 'briefcase']" class="pr-0 md:pr-3 lg:text-2xl" size="1x"/><span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Workspace</span>
              </router-link>
            </li>
            <li class="mr-3 flex-1">
              <router-link to="/events" class="block py-1 md:py-3 pl-1 align-middle text-grey-darkest  hover:text-pink-800 border-b-2 border-grey-900 md:border-black hover:border-pink-700">
                <fa-icon  :icon="['fas', 'calendar-week']" class="pr-0 md:pr-3 lg:text-2xl" size="1x"/><span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Events</span>
              </router-link>
            </li>
            <li class="mr-3 flex-1">
              <router-link to="/chatroom" class="block py-1 md:py-3 pl-1 align-middle text-grey-darkest  hover:text-pink-800 border-b-2 border-grey-900 md:border-black hover:border-pink-700">
                <fa-icon  :icon="['fas', 'comments']" class="pr-0 md:pr-3 lg:text-2xl" size="1x"/><span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Chatroom</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    <!-- Footer -->
    <div>
      <statusBar/>
    </div>
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
#Workspace a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
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
