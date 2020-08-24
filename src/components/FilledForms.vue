<template id="">
  <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
    <div class="max-w-sm">
      <div v-if="files" class="">
        <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Filled Forms</p>
        <ul>
          <li v-for="file in files" class="text-left text-xs font-mono pl-4"><fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>{{file}}</li>
        </ul>
      </div>
      <div v-else class="w-full">
        <p class="text-center pt-12 font-mono">Nothing yet</p>
      </div>
    </div>
    <div class="">
      <FilesDropZone/>
    </div>
  </div>
</template>
<script>
import statusPanel from '../mixins/statusPanel'
import FilesDropZone from '@/components/FilesDropZone.vue'
export default {
  name: 'FilledForms',
  components:{
    FilesDropZone
  },
  data(){
    return{
      files:''
    }
  },
  methods:{
    async fileListing(toolkit){
      const url = '/api/file/manager/get/filled'
      try{
        const response = await this.$axios.post(url, {toolkit}, {timeout:20000})
        this.files = response.data
      }catch(err){
        console.log(err.response.data.error)
        this.fail(err.response.data.error)
      }
    }
  },
  created(){
    //hard coded value, ???
    const userToolkit = 'Cholera'
    this.fileListing(userToolkit)
  },
  mixins:[statusPanel]
}
</script>
