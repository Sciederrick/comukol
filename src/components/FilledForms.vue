<template id="">
  <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
    <div class="max-w-sm">
      <div v-if="files" class="">
        <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Filled Forms</p>
        <ul>
          <li v-for="file in files" :key="file" @click="downloadFile" class="relative text-left text-xs font-mono  pl-2 pr-1 md:px-4 md:pl-4 py-1 border border-white cursor-pointer">
            <fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>
            {{file.split('/').pop()}}
            <fa-icon :icon="['fas', 'trash-alt']" class="absolute right-0 ml-2 text-base" size="1x" color="red" :id="file.split('/').pop()" @click="deleteFile"/>
          </li>
        </ul>
      </div>
      <div v-else class="w-full">
        <p class="text-center pt-12 font-mono">Nothing yet</p>
      </div>
    </div>
    <div class="">
      <p class="text-xs text-center text-red-500">file preview(pdf only)</p>
      <iframe src="" id="preview" class="w-full lg:h-64 mx-auto my-4 lg:max-w-sm"/>
      <MultipleFilesUploader category="Filled"/>
    </div>
    <Spinner v-if="spinner"/>
  </div>
</template>
<script>
import storage from './firebaseInit'
import statusPanel from '../mixins/statusPanel'
import downloadFile from '../mixins/downloadFile'
import MultipleFilesUploader from '@/components/MultipleFilesUploader.vue'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'FilledForms',
  components:{
    MultipleFilesUploader,
    Spinner
  },
  data(){
    return{
      files: [],
      directoryPath: '',
      spinner: false
    }
  },
  methods:{
    async fileListing(toolkit){
      this.spinner=true
      const storageRef=storage.ref(toolkit)
      try{
        let items = await storageRef.listAll()
        items.items.forEach((item)=>{
          let el = item.location.path
          this.files.push(el)
        })
        this.spinner=false
      }catch(err){
        this.spinner=false
        this.files.push('Nothing Yet')
        this.fail(err.response.data.error)
        console.log(err)
      }
    },
    async deleteFile(e){
      const del = window.confirm('Are you sure you want to delete this file?')
      if(del){
        this.spinner=true
        let file = this.directoryPath.concat(e.target.attributes.id.nodeValue)
        console.log(file)
        const storageRef=storage.ref()
        let fileRef=storageRef.child(file.trim())
        try{
          await fileRef.delete()
          this.spinner=false
          window.alert(`${file} deleted Successfully`)
        }catch(err){
          this.spinner=false
          window.alert(err.code)
          console.log(err)
        }
      }
    }
  },
  created(){
    const userToolkit = 'Cholera/Filled'
    this.toolkit=userToolkit
    this.directoryPath = userToolkit.concat('/')
    this.fileListing(userToolkit)
  },
  mixins:[statusPanel, downloadFile]
}
</script>
