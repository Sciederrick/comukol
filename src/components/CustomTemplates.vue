<template id="">
  <div class="">
    <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
      <div class="max-w-sm pb-4">
        <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Custom Templates</p>
        <ul>
          <li v-for="file in files" @click="downloadFile" class="text-left text-xs font-mono px-4 cursor-pointer py-1 border border-white hover:underline">
            <fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>
            {{file.split('/').pop()}}
            <fa-icon :icon="['fas', 'trash-alt']" class="float-right ml-2" size="1x" color="red" :id="file.split('/').pop()" @click="deleteFile"/>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs text-center text-red-500">file preview(pdf only)</p>
        <iframe src="" id="preview" class="w-full lg:h-64 mx-auto my-4 lg:max-w-sm"/>
        <MultipleFilesUploader category="Custom"/>
        <button class="btn w-full md:w-3/4 p-1 rounded my-3 bg-green-500 text-white hover:bg-green-700">create form</button>
      </div>
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
  name: 'CustomTemplates',
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
      this.spinner=true
      let file = this.directoryPath.concat(e.target.attributes.id.nodeValue)
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
  },
  created(){
    const userToolkit = 'Cholera/Custom'
    this.toolkit=userToolkit
    this.directoryPath = userToolkit.concat('/')
    this.fileListing(userToolkit)
  },
  mixins:[statusPanel, downloadFile]
}
</script>
