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
    <ckeditor value="Daily report..."></ckeditor>
    <div class="flex flex row justify-start">
      <label class="self-center mr-2" for="BackDate">Modify Date:</label>
      <input type="date" class="input p-1 lg:w-1/3" id="BackDate">
    </div>
    <div class="w-full">
      <button class="float-right mt-4 lg:mt-6 btn p-1 rounded bg-blue-400 text-white hover:bg-blue-700">submit</button>
    </div>
  </div>
</template>

<script>

export default{
  name:'Report',
  data(){
    return{
      dailyReport: false,
      situationalReport: false,
      datetime:''
    }
  },
  methods:{
    setDatetime(){
      setInterval(()=>{
        this.datetime = new Date().toLocaleString()
      },1000)
    }
  },
  beforeMount(){
    this.setDatetime()
  }
}
</script>
