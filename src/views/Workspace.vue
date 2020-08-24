<template>
  <div id="charts" class="w-full h-screen overflow-hidden">
   <h1>ToolKit</h1>
   <FilesDropZone/>
  </div>
</template>

<script>
import statusPanel from '../mixins/statusPanel'
import FilesDropZone from '@/components/FilesDropZone.vue'
export default {
  name: 'Workspace',
  components:{
    FilesDropZone
  },
  data(){
    return{

    }
  },
  methods:{

  },
  created(){
    
  },
  mixins:[statusPanel]
}
</script>
