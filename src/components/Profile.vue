<template>
  <div id="Profile" class="p-4 border rounded-lg text-left md:w-3/4 md:pl-12 md:pt-8 lg:border-0 lg:rounded-none lg:pt-4">
    <p class="my-3 py-1 lg:w-full lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'users']" color="blue" class="self-center pr-2" size="1x"/>
       Team(s): cholera_mitigation
    </p>
    <p class="my-3 py-1 lg:w-5/6 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'university']" color="green" class="self-center pr-2" size="1x"/>
       Institution of Work: {Red Cross Society}
    </p>
    <p class="my-3 py-1 lg:w-3/4 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'id-card-alt']" color="green" class="self-center pr-2" size="1x"/>
       Specialty: {Epidemiologist}
    </p>
    <p class="my-3 py-1 lg:w-1/2 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'phone-alt']" color="green" class="self-center pr-2" size="1x"/>
       {254743709788}
    </p>
    <p class="my-3 py-1 lg:w-1/3 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'envelope']" class="self-center pr-2" size="1x"/>
      {gatweri@gmail.com}
    </p>
    <p>
      <span class="my-3 py-1 lg:w-1/4 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4 lg:pr-2"><fa-icon  :icon="['fas', 'upload']" class="self-center pr-2" size="1x"/>  Image</span>
      <input type="file" class="ml-1 text-xs" placeholder="">
    </p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data(){
    return{
      contactVisible:false,
      workingInsititutionVisible:false,
      specialtyVisible:false,
      emailVisible:false
    }
  }
}
</script>

<style scoped>

</style>
