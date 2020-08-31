<template>
  <div class="lg:flex lg:flex-row lg:justify-center" id="charts">
    <popover name="situationalReports">
      <p class="text-sm">Powered by input of the focal person(Disease Surveilllance Coordinator from his profile section<fa-icon :icon="['fas', 'user-tie']" size="1x" color="gold" class="ml-2"/></p>
    </popover>
    <popover name="quantitativeData">
      <p class="text-sm">Powered by Covid API, we are aiming at Integration with DHIS2 to relay relevant, targeted surveillance information<fa-icon :icon="['fas', 'chart-line']" size="1x" color="gold" class="ml-2"/></p>
    </popover>
    <div class="mx-auto lg:w-4/5">
      <div class="mt-4">
        <h2 class="text-xs lg:text-sm underline" v-popover.bottom="{name: 'quantitativeData', event: 'hover'}">Total Confirmed Cases (Covid19)</h2>
        <geo-chart :data="countriesChartData"></geo-chart>
      </div>
      <div class="w-full mx-auto lg:w-4/5">
        <bar-chart :data="globalChartData"></bar-chart>
      </div>
    </div>
    <div class="lg:w-1/5 bg-blue-100">
      <button class="text-2xl">...</button>
      <div class="flex flex-col flex-no-wrap justify-around">
        <div class="w-4/5 mx-auto text-center py-1 text-sm rounded px-2">
          <h2 class="font-semibold" v-popover.bottom="{name: 'situationalReports', event: 'hover'}">situational reports</h2>
        </div>
        <div class="w-4/5 mx-auto text-left py-4 text-xs shadow-lg rounded px-2">
          25th Aug 2020 - Surveillance at Mapuon village suggests the existence of cholera. There have been no admission cases so far. However, the community health workers are on the lookout for any suspected cases...
        </div>
        <div class="w-4/5 mx-auto text-left py-4 text-xs shadow-lg rounded px-2">
          27th Aug 2020- There has been 7 admission at Mapuon Subcounty hospital. The admitted patients live in the same slum in Lamunyas location. The Environmental health officers are currently on the ground in an aim to identify the cause of disease...
        </div>
        <div class="w-4/5 mx-auto text-left py-4 text-xs shadow-lg rounded px-2">
          30 Aug 2020 - The Sub County Surveillance Officer has advised that young people must take precautions to protect themselves and protect others as everyone else...
        </div>
        <div class="">

        </div>
        <div class="">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import statusPanel from '../mixins/statusPanel'
export default {
  name: 'Charts',
  data(){
    return{
      globalChartData:[

      ],
      countriesChartData:[

      ]
    }
  },
  methods:{
    fetchApiData(){
      const url='https://api.covid19api.com/summary'
      this.$axios.get(url, {timeout:20000})
      .then(response=>{
        // , data.NewConfirmed, data.NewDeaths, data.TotalDeaths, data.NewRecovered, data.TotalRecovered
        this.globalChartData=response.data.Global
        response.data.Countries.map(data=>{
          this.countriesChartData.push([data.Country, data.TotalConfirmed])
        })
        this.success()
      })
      .catch(err=>{
        this.fail(err)
      })
    }
  },
  created(){
    this.fetchApiData()
  },
  mixins:[statusPanel]
}
</script>
