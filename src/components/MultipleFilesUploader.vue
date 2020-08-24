<template>
<div id="MultipleFilesUpload">
  <div class="w-full mx-auto">
    <form enctype="multipart/form-data">
      <span class="my-3 py-1 lg:w-1/4 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4 lg:pr-2"><fa-icon  :icon="['fas', 'upload']" class="self-center pr-2" size="1x"/>  Image</span>
      <input multiple @change="selectFile" ref="files" type="file" class="ml-1 text-xs bg-orange-400 text-white" placeholder="">
    </form>
  </div>
  <div class="mx-auto">
    <div v-for="(file, index) in files" :key="index" class="flex flex-col">
      <div class="flex flex-row justify-end">
        <p>{{file.name}}</p>
        <span v-if="file.invalidMessage" class="text-red-700">&nbsp;- {{file.invalidMessage}}</span>
        <a @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)" class="btn p-1 mx-1"><fa-icon :icon="['fas', 'times-circle']" size="1x" color="red"class="self-center"/></a>
      </div>
    </div>
  </div>
  <div class="mx-auto">
    <button @click.prevent="sendFiles()" class="btn p-1 bg-green-500 text-sm text-white">send</button>
  </div>
  <statusBar/>
</div>
</template>
<script>
import statusBar from './statusBar.vue'
import statusPanel from '../mixins/statusPanel'
import _ from 'lodash'
export default{
  name: 'Files',
  components:{
    statusBar
  },
  data(){
    return{
      files:[],
      uploadFiles: []
    }
  },
  methods:{
    selectFile(){
      const files = this.$refs.files.files
      this.uploadFiles = [...this.files, ...files]
      this.files = [
        ...this.files,
        ..._.map(files, file=>({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ]
    },
    validate(file){
      const MAX_SIZE = 200000000
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf", "application/docx", "application/odt", "application/xls", "application/xlsx", "application/ods", "application/ppt", "application/pptx", "application/txt"]
      if(!allowedTypes.includes(file.type)){
        return 'Invalid Format!'
      }

      if(file.size > MAX_SIZE){
        return `Max size: ${MAX_SIZE/1000}kb`
      }


      return ''
    },
    async sendFiles(){
      const formData = new FormData()
      _.forEach(this.uploadFiles, file=>{
        if(this.validate(file)===''){
          formData.append('files', file)
        }
      })
      try{
        const files = await this.$axios.post('/api/file/manager/multiple/uploads', formData)
        this.files=[]
        this.uploadFiles=[]
        this.success(`${files}:files uploaded successfully`)
      }catch(err){
        this.fail(err)
        console.log(err.response.data.error)
      }
    }
  },
  mixins:[statusPanel]
}
</script>
