<template>
  <div id="Profile" class="p-4 lg:border lg:rounded-lg text-left md:w-3/4 md:pl-20 md:pt-8 lg:border-0 lg:rounded-none lg:pt-4 font-sans">
    <p class="cursor-pointer font-mono" @click="refresh">
      <fa-icon :icon="['fas', 'sync-alt']" size="1x" class="self-center mr-1"/><span class="text-sm self-center">refresh</span>
    </p>
    <p class="my-3 py-1 lg:w-full lg:bg-gray-200 lg:text-black rounded-md lg:pl-4"><fa-icon  :icon="['fas', 'users']" color="blue" class="self-center pr-2" size="1x"/>
       <span class="italic font-hairline text-sm  md:text-basep-1">Team(s):</span>
       <ul class="inline">
         <li v-for="team in user.teams" class="inline-block px-1 text-sm underline">{{team}}</li>
       </ul>
    </p>
    <p class="my-3 py-1 lg:w-5/6 lg:bg-gray-200 lg:text-black rounded-md lg:pl-4 text-sm md:text-base"><fa-icon  :icon="['fas', 'university']" color="green" class="self-center pr-2" size="1x"/>
       <span class="italic font-hairline p-1">Institution of Work:</span>{{user.workplace}}
    </p>
    <p class="my-3 py-1 lg:w-3/4 lg:bg-gray-200 lg:text-black rounded-md lg:pl-4 text-sm md:text-base"><fa-icon  :icon="['fas', 'id-card-alt']" color="green" class="self-center pr-2" size="1x"/>
      <span class="italic font-hairline p-1">Specialty:</span>{{user.specialty}}
    </p>
    <p class="my-3 py-1 lg:w-1/2 lg:bg-gray-200 lg:text-black rounded-md lg:pl-4 text-sm md:text-base"><fa-icon  :icon="['fas', 'phone-alt']" color="green" class="self-center pr-2" size="1x"/>
       {{user.contact}}
    </p>
    <p class="my-3 py-1 lg:w-1/3 lg:bg-gray-200 lg:text-black rounded-md lg:pl-4 text-sm md:text-base"><fa-icon  :icon="['fas', 'envelope']" class="self-center pr-2" size="1x"/>
      {{user.email}}
    </p>
    <form enctype="multipart/form-data">
      <span class="my-3 py-1 lg:w-1/4 lg:bg-gray-200 lg:text-black  rounded-md lg:pl-4 lg:pr-2"><fa-icon  :icon="['fas', 'upload']" class="self-center pr-2" size="1x"/></span>
        <input @change="selectFile" ref="file" type="file" class="ml-1 text-xs" placeholder="">
    </form>
    <statusBar/>
  </div>
</template>

<script>
import statusPanel from '../mixins/statusPanel'
import statusBar from './statusBar.vue'
export default {
  name: 'Profile',
  props:{
    user:{
      type:Object,
      required:true
    }
  },
  components:{
    statusBar
  },
  data(){
    return{
      contactVisible:false,
      workingInsititutionVisible:false,
      specialtyVisible:false,
      emailVisible:false,
      file:""
    }
  },
  methods:{
    refresh(){
      location.reload()
    },
    selectFile(){
      const file=this.$refs.file.files[0]
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
      const MAX_SIZE = 200000
      let tooLarge = file.size > MAX_SIZE

      if(allowedTypes.includes(file.type)){
        this.file=this.$refs.file.files[0]
        if(this.file) this.sendFile()
      }else{
        const message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb`:'Only images are allowed'
        this.fail(message)
      }
    },
    async sendFile(){
      const user=JSON.parse(localStorage.getItem('user'))
      const email=user.email
      const formData=new FormData()
      formData.append('file', this.file)
      formData.append('email', email)
      try{
        const response=await this.$axios.post('/api/profile/photo/upload', formData)
        this.success(`image uploaded successfully`)
      }catch(err){
        this.fail(err.response.data.error)
        console.log(err)
      }
    }
  },
  mixins:[statusPanel]
}
</script>
