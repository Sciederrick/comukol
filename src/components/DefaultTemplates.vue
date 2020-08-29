<template id="">
  <div class="flex flex-col justify-center md:flex-row md:justify-evenly">
    <div class="max-w-sm">
      <p class="text-left"><fa-icon :icon="['fas', 'folder-open']" color="" class="self-center mr-1"/>Default Templates</p>
      <ul>
        <li v-for="file in files" class="text-left text-xs font-mono pl-4"><fa-icon :icon="['fas', 'file']" color="aqua" class="self-center mr-1"/>{{file}}</li>
      </ul>
    </div>
    <div class="">
      <FilesDropZone/>
    </div>
  </div>
</template>

<script>
import storage from './firebaseInit'
import statusPanel from '../mixins/statusPanel'
import FilesDropZone from '@/components/FilesDropZone.vue'
export default {
  name: 'DefaultTemplates',
  components:{
    FilesDropZone
  },
  data(){
    return{
      files:''
    }
  },
  methods:{
    fileListing(toolkit){
      //create a storage ref
      const storageRef=storage.ref(`labs`)
      // Create a reference under which you want to list
      // let listRef = storageRef.child('labs')
      console.log(storageRef.listAll())
      // // Find all the prefixes and items.
      // listRef.listAll().then(function(res) {
      //   res.prefixes.forEach(function(folderRef) {
      //     // All the prefixes under listRef.
      //     // You may call listAll() recursively on them.
      //     console.log(folderRef)
      //   })
      //   res.items.forEach(function(itemRef) {
      //     // All the items under listRef.
      //     console.log(itemRef)
        // })
      // }).catch(function(error) {
      //   // Uh-oh, an error occurred!
      //   console.log(error)
      // })
    }
  },
  created(){
    //hard coded value, ???
    const userToolkit = 'Cholera'
    this.fileListing(userToolkit)
  },
  // methods:{
  //   async fileListing(toolkit){
  //     const url = '/api/file/manager/get/files'
  //     try{
  //       const response = await this.$axios.post(url, {toolkit}, {timeout:20000})
  //       this.files = response.data
  //     }catch(err){
  //       console.log(err)
  //       this.fail(err.response.data.error)
  //     }
  //   }
  // },
  // created(){
  //   //hard coded value, ???
  //   const userToolkit = 'Cholera'
  //   this.fileListing(userToolkit)
  // },
  mixins:[statusPanel]
}
</script>
