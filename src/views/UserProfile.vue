<template>
  <div id="UserProfile" class="p-4 overflow-hidden bg-gray-100">
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
        <p class="py-2 px-2 lg:pl-6 text-left font-sans italic text-opacity-25 underline">Focal Person</p>
        <div class="w-48 text-left py-4 md:py-2">
          <a href="#" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-gray-800 hover:bg-indigo-500 hover:text-white">Profile</a>
          <a href="#" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-gray-800 hover:bg-indigo-500 hover:text-white">Tasks</a>
          <a href="#" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-gray-800 hover:bg-indigo-500 hover:text-white">Calendar</a>
          <a href="#" class="inline py-2 px-3 border border-transparent rounded-md md:border-0 md:rounded-none md:px-6 md:block text-gray-800 hover:bg-indigo-500 hover:text-white">Files</a>
        </div>
      </div>
      <div class="p-4 border rounded-lg text-left md:w-3/4 md:pl-12 md:pt-8 bg-gray-200 lg:bg-gray-100 lg:border-0 lg:rounded-none lg:pt-4">
        <p class="my-3 py-1 lg:w-full lg:bg-gray-300 rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'users']" color="blue" class="self-center pr-2" size="1x"/>
           Team(s): cholera_mitigation
        </p>
        <p class="my-3 py-1 lg:w-5/6 lg:bg-gray-300 rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'university']" color="green" class="self-center pr-2" size="1x"/>
           Institution of Work: Red Cross Society  <fa-icon  :icon="['fas', 'edit']" class="self-center" color="" size="xs" @click="workingInsititutionVisible=!workingInsititutionVisible"/>
           <input v-if="workingInsititutionVisible" type="tel" class="input w-48 mx-auto px-2" placeholder="" autocomplete="on">
        </p>
        <p class="my-3 py-1 lg:w-3/4 lg:bg-gray-300 rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'id-card-alt']" color="green" class="self-center pr-2" size="1x"/>
           Specialty: Epidemiologist <fa-icon  :icon="['fas', 'edit']" class="self-center" color="" size="xs" @click="specialtyVisible=!specialtyVisible"/>
           <input v-if="specialtyVisible" type="tel" class="input w-48 mx-auto px-2" placeholder="" autocomplete="on">
        </p>
        <p class="my-3 py-1 lg:w-1/2 lg:bg-gray-300 rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'phone-alt']" color="green" class="self-center pr-2" size="1x"/>
           254743709788 <fa-icon  :icon="['fas', 'edit']" class="self-center" color="" size="xs" @click="contactVisible=!contactVisible"/>
           <input v-if="contactVisible" type="tel" class="input w-48 mx-auto px-2" placeholder="" autocomplete="on">
        </p>
        <p class="my-3 py-1 lg:w-1/3 lg:bg-gray-300 rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'envelope']" class="self-center pr-2" size="1x"/>
          gatweri@gmail.com <fa-icon  :icon="['fas', 'edit']" class="self-center" color="" size="xs" @click="emailVisible=!emailVisible"/>
          <input v-if="emailVisible" type="text" class="input w-48 mx-auto px-2" placeholder="" autocomplete="on">
        </p>
        <p>
          <span class="my-3 py-1 lg:w-1/4 lg:bg-gray-300 rounded-md lg:pl-4 lg:pr-2"><fa-icon  :icon="['fas', 'upload']" class="self-center pr-2" size="1x"/>  Image</span>
          <input type="file" class="ml-1 text-xs" placeholder="">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router"
import Dropdown from "@/components/Dropdown.vue"
export default {
  name: 'UserProfile',
  components:{
    Dropdown
  },
  data(){
    return{
      contactVisible:false,
      workingInsititutionVisible:false,
      specialtyVisible:false,
      emailVisible:false
    }
  },
  methods:{

  }
}
</script>
<style>
</style>
