<template>
  <div class="flex items-center justify-center font-sans" style="background: #edf2f7;">
    <div class="h-full w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <!-- modal -->
      <div class="bg-white shadow-lg w-3/4 md:w-1/3">
        <!-- modal header -->
        <div :class="shade" class="border-b px-4 py-2 flex justify-between items-center">
          <h4 class="font-semibold text-lg">
            <fa-icon :icon="['fas','thumbs-up']" color="darkGreen" size="2x" v-if="msg.status"/>
            <fa-icon :icon="['fas','exclamation-triangle']" color="maroon" size="2x" v-else/>
          </h4>
          <button @click="closeModal()" class="text-red-800 text-2xl focus:outline-none hover:text-red-900">&cross;</button>
        </div>
        <!-- modal body -->
        <div :class="color" class="p-3">{{msg.text}}</div>
        <div class="flex justify-end items-center w-100 border-b border-white">
          <!-- <button @click="" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">Cancel</button>
          <button @click="" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">Ok</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '@/main.js'
export default{
  name:'Modal',
  props:{
    msg:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      show:true
    }
  },
  computed:{
    color(){
      return this.msg.status?"bg-green-600 text-white":"bg-red-600 text-white"
    },
    shade(){
      return this.msg.status?"bg-green-200 text-white":"bg-red-200 text-white"
    }
  },
  methods:{
    closeModal(){
      bus.$emit('closeModal', false)
    }
  }
}
</script>
