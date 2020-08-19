<template>
  <div id="home" class="w-full p-1 overflow-hidden">
    <header class="bg-gray-900 px-6">
      <p class="text-white text-2xl text-left">Comukol</p>
    </header>
    <main class="mb-6">
      <div id="team" class="h-16 bg-gray-200 mt-1">
        <p>......</p>
      </div>
      <div class="relative">
        <div id="sidebar" class="absolute left-0 z-40 font-serif">
          <div class="flex items-center justify-between px-4 lg:px-6 lg:py-1">
            <div class="">
              <button @click="isOpen=!isOpen" type="button" class="text-gray-500 hover:text-white focus:text-white focus:outline-none" name="button">
                <fa-icon v-if="!isOpen" :icon="['fas', 'bars']" class="self-center text-gray-900" size="2x"/>
                <fa-icon v-if="isOpen" :icon="['fas', 'times']" class="self-center text-gray-900" size="2x"/>
              </button>
            </div>
          </div>
          <div :class="isOpen ? 'block': 'hidden'" class=" h-screen rounded bg-gray-900 px-1 pt-2 pb-4 text-left">
            <router-link to="/home" href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'home']" class="self-center" size="1x"/>  Home
            </router-link>
            <router-link to="" href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'users']" class="self-center" size="1x"/>  Members
            </router-link>
            <router-link to="" href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'briefcase']" class="self-center" size="1x"/>  Workspace
            </router-link>
            <router-link to="/events" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'calendar-week']" class="self-center" size="1x"/>  Events
            </router-link>
            <router-link to="" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">
              <fa-icon  :icon="['fas', 'file']" class="self-center" size="1x"/>  Media
            </router-link>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </main>
    <footer id="statusPanel" class="w-screen fixed bottom-0 h-5">
      <p class="font-serif"></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      isOpen: false,
    }
  }
}
</script>
