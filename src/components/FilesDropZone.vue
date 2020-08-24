<template>
  <div id="FilesDropZone" >
    <form enctype="multipart/form-data">
      <div class="relative h-56 mx-2 rounded border-dotted border-2 border-green-400 mt-8 md:mx-auto md:w-5/6 lg:w-1/4 cursor-pointer bg-green-200 outline-none focus:shadow-outline focus:bg-blue-100 hover:bg-green-300">
        <input @change="sendFile" ref="file" type="file" class="absolute inset-0 opacity-0 w-full h-56 cursor-pointer">
        <p v-if="!uploading" class="text-lg text-center  text-green-900 p-12">
          Drag your files here
        </p>
        <p v-if="uploading" class="font-semibold">
          <progress :value="progress" class="w-5/6 rounded h-1 text-center text-white" max="100">{{progress}}%</progress>
        </p>
      </div>
      <div class="bg-orange-200">
        <ul>
          <li v-for="file in uploadedFiles" :key="file.originalname">{{file.originalname}}</li>
        </ul>
      </div>
    </form>
    <statusBar/>
  </div>
</template>

<script>
import statusBar from './statusBar.vue'
import statusPanel from '../mixins/statusPanel'
export default{
  name: 'FilesDropZone',
  components:{
    statusBar
  },
  data(){
    return{
      file: "",
      uploading: false,
      uploadedFiles: [],
      progress: 0
    }
  },
  methods:{
    async sendFile(){
      const file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append("file", file)
      try{
        this.uploading = true
        const response = await this.$axios.post("/api/file/manager/dropzone", formData, {
          onUploadProgress: e => this.progress = Math.round(e.loaded * 100/ e.total)
        })
        this.uploadedFiles.push(response.data.files)
        this.success('upload successful')
        this.uploading = false
      }catch(err){
        console.log(err.response.data.error)
        this.fail(err.response.data.error)
        this.uploading = false
      }
    }
  },
  mixins:[statusPanel]
}
</script>
