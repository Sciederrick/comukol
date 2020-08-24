<template>
  <div id="charts">
    <div class="mt-4">
      <h2 class="text-sm">Total Confirmed Cases (Covid19)</h2>
      <geo-chart :data="countriesChartData"></geo-chart>
    </div>
    <div class="w-full lg:w-3/5 mx-auto">
      <bar-chart :data="globalChartData"></bar-chart>
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
