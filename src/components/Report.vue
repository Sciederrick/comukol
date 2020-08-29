<template>
  <div class="md:ml-8 font-sans" id="Report">
    <div class="flex flex-row py-2 text-left">
      <div class="font-mono text-xs text-blue-500">{{datetime}}<span class="px-2">></span></div>
      <div class="">
        <p class="inline-block">
          <input type="checkbox" value="true" v-model="dailyReport" class="px-1 self-center" id="DailyReport">
          <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">daily report</label>
        </p>
        <p class="inline-block">
          <input type="checkbox" value="true" v-model="situationalReport" class="px-1 self-center" id="SituationalReport">
          <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">situational report</label>
        </p>
      </div>
    </div>
    <ckeditor v-model="report"></ckeditor>
    <div class="flex flex row justify-start">
      <label class="self-center mr-2" for="BackDate">Modify Date:</label>
      <input type="date" class="input p-1 lg:w-1/3" id="BackDate">
    </div>
    <div class="w-full">
      <button @click.prevent="submitReport" class="float-right mt-4 lg:mt-6 btn p-1 rounded bg-blue-400 text-white hover:bg-blue-700">submit</button>
    </div>
  </div>
</template>

<script>
import statusBar from '../components/statusBar.vue'
import statusPanel from '../mixins/statusPanel'
export default{
  name:'Report',
  components:{
    statusBar
  },
  data(){
    return{
      dailyReport: false,
      situationalReport: false,
      datetime: null,
      report: 'write your report here...'
    }
  },
  methods:{
    setDatetime(){
      setInterval(()=>{
        this.datetime = new Date().toLocaleString()
      },10000)
    },
    getDatetime(){
      return this.datetime = new Date().toLocaleString()
    },
    async submitReport(){
      console.log(`dailyReport: ${this.dailyReport}, situationReport: ${this.situationalReport}, datetime: ${this.datetime}, report: ${this.report}, currentDatetime: ${this.getDatetime()}`)
      const user = localStorage.getItem('user')
      const email = user.email
      const type = this.dailyReport ? true : this.situationalReport ? true : null
      const body = this.report
      const created_at = this.datetime ? this.datetime : this.getDatetime()
      if(type !== null){
        const data = {
          email,
          type,
          body,
          created_at
        }
        const url = ''
        try{
          await this.$axios.post(url, data, {timeout: 20000})
          this.success('report sent successfully')
        }catch(err){
          this.fail(err.response.data.error)
          console.log(err)
        }
      }else{
        this.fail('specify type of report:daily?situational?')
        window.alert('specify type of report:daily?situational?')
      }
    }
  },
  beforeMount(){
    this.setDatetime()
  },
  mixins: [statusPanel]
}
</script>
