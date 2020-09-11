<template id="">
  <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
    <div class="max-w-sm pb-4">
      <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Default Templates</p>
      <ul>
        <li v-for="file in files" @click="downloadFile" class="text-left text-xs font-mono cursor-pointer md:px-4 pl-4 pr-1 py-2 border border-white hover:underline">
          <fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>
          {{file.split('/').pop()}}
        </li>
      </ul>
    </div>
    <div class="">
      <iframe src="" id="preview" class="w-full lg:h-64 mx-auto my-4 lg:max-w-sm"/>
    </div>
    <Spinner v-if="spinner"/>
    <statusBar/>
  </div>
</template>

<script>
import storage from './firebaseInit'
import statusBar from '@/components/statusBar.vue'
import statusPanel from '../mixins/statusPanel'
import downloadFile from '../mixins/downloadFile'
import fileListing from '../mixins/fileListing'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'DefaultTemplates',
  components:{
    Spinner,
    statusBar
  },
  data(){
    return{
      files:[],
      spinner:false,
      toolkit: null,
      directoryPath: ''
    }
  },
  created(){
    const userToolkit = 'Team_Test/Default'
    this.toolkit=userToolkit
    this.directoryPath = userToolkit.concat('/')
    this.fileListing(userToolkit)
  },
  mixins:[statusPanel, downloadFile, fileListing]
}
</script>
