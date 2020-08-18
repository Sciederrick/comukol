<template>
  <div id="home" class="w-full p-1 overflow-hidden">
    <header class="bg-gray-900 px-6">
      <p class="text-white text-2xl text-left">Comukol</p>
    </header>
    <main class="mb-6">
      <div id="team" class="h-16 bg-gray-200 mt-1">
        <p>Team details</p>
      </div>
      <div class="relative">
        <div id="sidebar" class="absolute left-0 z-40">
          <div class="flex items-center justify-between px-4 lg:px-6 lg:py-1">
            <div class="">
              <button @click="isOpen=!isOpen" type="button" class="text-gray-500 hover:text-white focus:text-white focus:outline-none" name="button">
                <fa-icon v-if="!isOpen" :icon="['fas', 'bars']" class="self-center text-gray-900" size="2x"/>
                <fa-icon v-if="isOpen" :icon="['fas', 'times']" class="self-center text-gray-900" size="2x"/>
              </button>
            </div>
          </div>
          <div :class="isOpen ? 'block': 'hidden'" class=" h-screen rounded bg-gray-900 px-1 pt-2 pb-4 text-left">
            <a href="#" class="block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">Team_Buktu</a>
            <hr>
            <a href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">Home</a>
            <a href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">Members</a>
            <a href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">Workspace</a>
            <a href="#" class="mt-1 block px-20 py-8 text-white font-semibold rounded hover:bg-gray-800">Media</a>
          </div>
        </div>
        <Charts class="w-full mx-auto"/>
      </div>
    </main>
    <footer id="statusPanel" class="w-screen fixed bottom-0 h-5">
      <p class="font-serif"></p>
    </footer>
  </div>
</template>

<script>
import Charts from '@/components/Charts.vue'

export default {
  name: 'Home',
  components: {
    Charts
  },
  data(){
    return{
      isOpen: false,
    }
  }
}
</script>
