<template>
  <div id="Dropdown" class="">
    <button @click="isOpen=!isOpen" class="relative z-10 m-4 block p-1 rounded-md shadow-sm btn bg-white hover:bg-indigo-500 hover:text-white">
      Choose Role
      <fa-icon  :icon="['fas', 'caret-down']" class="self-center" size="1x"/>
    </button>
    <button v-if="isOpen" @click="isOpen=false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
    <div v-if="isOpen" id="RoleDropdown" class="absolute left-0 py-2 w-48 mt-2 bg-white rounded-lg shadow-xl">
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Focal Person</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Team member</a>
    </div>
  </div>
</template>

<script>
export default{
  name:'Dropdown',
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
