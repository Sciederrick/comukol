<template id="">
  <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
    <div class="max-w-sm">
      <div v-if="files" class="">
        <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Filled Forms</p>
        <ul>
          <li v-for="file in files" :key="file" class="text-left text-xs font-mono pl-2 pr-1 md:px-4 md:pl-4 py-1 border border-white cursor-pointer">
            <fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>
            <span @click="downloadFile">{{file.split('/').pop()}}</span>
            <br>
            <button class="outline-none w-12 h-8 z-40 text-red-600 hover:bg-red-600 hover:text-white rounded" :id="file.split('/').pop()" @click="deleteFile">
              delete
            </button>
          </li>
        </ul>
      </div>
      <div v-else class="w-full">
        <p class="text-center pt-12 font-mono">Nothing yet</p>
      </div>
    </div>
    <div class="">
      <iframe src="" id="preview" class="w-full lg:h-64 mx-auto my-4 lg:max-w-sm"/>
      <MultipleFilesUploader category="Filled"/>
    </div>
    <Spinner v-if="spinner"/>
    <statusBar/>
  </div>
</template>
<script>
import statusBar from '@/components/statusBar.vue'
import statusPanel from '@/mixins/statusPanel'
import fileListing from '@/mixins/fileListing'
import downloadFile from '@/mixins/downloadFile'
import deleteFile from '@/mixins/deleteFile'
import MultipleFilesUploader from '@/components/MultipleFilesUploader.vue'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'FilledForms',
  components:{
    MultipleFilesUploader,
    statusBar,
    Spinner
  },
  data(){
    return{
      files: [],
      directoryPath: '',
      spinner: false
    }
  },
  created(){
    const userToolkit = 'Team_Test/Filled'
    this.toolkit=userToolkit
    this.directoryPath = userToolkit.concat('/')
    this.fileListing(userToolkit)
  },
  mixins:[statusPanel, downloadFile, fileListing, deleteFile]
}
</script>
