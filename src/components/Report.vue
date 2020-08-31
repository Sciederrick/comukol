<template>
  <div class="md:ml-8 font-sans" id="Report">
    <popover name="dailyReport">
      <p class="text-sm">Daily reports reflect on the chronological events section<fa-icon :icon="['fas', 'calendar-week']" size="1x" color="blue" class="ml-2"/></p>
    </popover>
    <popover name="situationalReport">
      <p class="text-sm">Situational reports reflect on the homepage<fa-icon :icon="['fas', 'home']" size="1x" color="green" class="ml-2"/></p>
    </popover>
    <popover name="backDate">
      <p class="text-sm">backDate this report in case you are late on the deadline, so that cumulative reports maintain order<fa-icon :icon="['fas', 'smile-wink']" size="1x" color="brown" class="ml-2"/></p>
    </popover>
    <div class="flex flex-row py-2 text-left">
      <div class="font-mono text-xs text-blue-500">{{datetime}}<span class="px-2">></span></div>
      <div class="">
        <p class="inline-block">
          <input type="radio" name="report" value="true" v-model="reportType" class="px-1 self-center" id="DailyReport" v-popover.bottom="{name:'dailyReport', event:'hover'}">
          <label for="DailyReport" class="pl-1 pr-2 self-center text-xs md:text-sm">daily report</label>
        </p>
        <p class="inline-block">
          <input type="radio" name="report" value="false" v-model="reportType" class="px-1 self-center" id="SituationalReport" v-popover.bottom="{name:'situationalReport', event:'hover'}">
          <label for="SituationalReport" class="pl-1 pr-2 self-center text-xs md:text-sm">situational report</label>
        </p>
      </div>
    </div>
    <ckeditor v-model="report"></ckeditor>
    <div class="flex flex row justify-start">
      <label class="self-center mr-2" for="BackDate">Modify Date:</label>
      <input type="date" class="input p-1 lg:w-1/3" id="BackDate" v-popover.bottom="{name:'backDate', event:'hover'}">
    </div>
    <div class="">
      <span class="text-xs text-orange-500 text-left px-2" v-model="reportType">daily report: {{reportType}}</span>
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
      reportType: '',
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
      const email = user.email||'test@gmail.com'
      const type = this.reportType
      const body = this.report
      const created_at = this.datetime ? this.datetime : this.getDatetime()
      if(type !== null){
        const data = {
          email,
          type,
          body,
          created_at
        }
        console.log(data)
        const url = '/api/reports'
        try{
          await this.$axios.post(url, data, {timeout: 20000})
          this.success('report sent successfully')
          window.alert('Report sent successfully')
        }catch(err){
          this.fail(err.response.data.error)
          window.alert('Report sending failed')
          console.log(err)
        }
      }else{
        this.fail('specify type of report:daily?situational?')
        window.alert('specify type of report:daily?situational?')
      }
    }
  },
  created(){
    this.setDatetime()
  },
  mixins: [statusPanel]
}
</script>
