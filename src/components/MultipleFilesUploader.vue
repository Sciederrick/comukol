<template>
<div id="MultipleFilesUpload">
  <div class="w-full mx-auto">
    <form enctype="multipart/form-data">
      <span class="my-3 py-1 lg:w-1/4 lg:bg-gray-200 lg:text-black rounded-md lg:pl-4 lg:pr-2 text-xs">
        <fa-icon  :icon="['fas', 'upload']" class="self-center pr-2 text-lg" size="1x"/>
        Upload File(s)
      </span>
      <input multiple @change="selectFile" ref="files" type="file" class="ml-1 text-xs bg-orange-400 text-white" placeholder="">
    </form>
  </div>
  <div class="mx-auto">
    <div v-for="(file, index) in files" :key="index" class="flex flex-col">
      <div class="flex flex-row justify-end">
        <p>{{file.name}}</p>
        <span v-if="file.invalidMessage" class="text-red-700 text-xs self-center">&nbsp;- {{file.invalidMessage}}</span>
        <a @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)" class="btn p-1 mx-1">
          <fa-icon :icon="['fas', 'times-circle']" size="1x" color="red"class="self-center"/>
        </a>
      </div>
    </div>
  </div>
  <div class="mx-auto">
    <button @click.prevent="sendFiles()" class="btn w-full md:w-3/4 rounded p-1 mt-4 bg-gray-600 text-sm text-white hover:bg-gray-800">upload file</button>
  </div>
  <Spinner v-if="spinner"/>
  <statusBar/>
</div>
</template>
<script>
import storage from './firebaseInit'
import statusBar from './statusBar.vue'
import statusPanel from '../mixins/statusPanel'
import Spinner from '@/components/Spinner.vue'
import _ from 'lodash'
export default{
  name: 'Files',
  components:{
    statusBar,
    Spinner
  },
  props:{
    category:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      files:[],
      uploadFiles: [],
      spinner: false
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
      const allowedTypes = ["jpeg", "png", "jpg", "pdf", "docx", "doc", "odt", "xls", "xlsx", "ods", "ppt", "pptx", "txt", "mp4"]
      if(!allowedTypes.includes(file.name.split('.').pop())){
        return 'Invalid Format!'
      }

      if(file.size > MAX_SIZE){
        return `Max size: ${MAX_SIZE/1000}kb`
      }

      return ''
    },
    async sendFiles(){
      //show the spinner
      this.spinner = true
      //Do some action
      _.forEach(this.uploadFiles, file=>{
        if(this.validate(file) === ''){
          const storageRef = storage.ref(`Cholera/${this.category}/${file.name}`)
          storageRef.put(file)
            .then((snapshot)=>{
              //remove the spinner
              this.spinner = false
              this.success(`${snapshot.metadata.name} upload ${snapshot.state}`)
            })
            .catch(err=>{
              //remove the spinner
              this.spinner = false
              this.fail(err.response.data.error)
              console.log(err)
            })
        }
      })
    }
  },
  mixins:[statusPanel]
}
</script>
