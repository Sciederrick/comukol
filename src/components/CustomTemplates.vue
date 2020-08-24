<template id="">
  <div class="">
    <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
      <div class="max-w-sm">
        <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Custom Templates</p>
        <ul>
          <li v-for="file in files" class="text-left text-xs font-mono pl-4"><fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>{{file}}</li>
        </ul>
      </div>
      <div class="">
        <FilesDropZone/>
      </div>
    </div>
    <div class="flex mt-4 mx-auto md:mx-0">
      <div class="w-32 h-32 bg-white text-center py-6 shadow-xl rounded-lg border">
        <p class="font-mono">New Form</p>
        <fa-icon :icon="['fas','plus']" size="2x" color="green"/>
      </div>
    </div>
  </div>
</template>

<script>
import statusPanel from '../mixins/statusPanel'
import FilesDropZone from '@/components/FilesDropZone.vue'
export default {
  name: 'CustomTemplates',
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
      const url = '/api/file/manager/get/files/custom'
      try{
        const response = await this.$axios.post(url, {toolkit}, {timeout:20000})
        this.files = response.data
      }catch(err){
        console.log(err)
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
