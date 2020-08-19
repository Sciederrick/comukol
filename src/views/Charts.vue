<template>
  <div id="charts">
    <div class="">
      <h2 class="text-sm">Total Confirmed Cases (Covid19)</h2>
      <geo-chart :data="countriesChartData"></geo-chart>
    </div>
    <div class="w-full lg:w-3/5 mx-auto">
      <bar-chart :data="globalChartData"></bar-chart>
    </div>
  </div>
</template>

<script>
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
      this.$axios.get('https://api.covid19api.com/summary', {timeout:10000})
      .then(response=>{
        // , data.NewConfirmed, data.NewDeaths, data.TotalDeaths, data.NewRecovered, data.TotalRecovered
        document.querySelector('#statusPanel>p').innerText='data loaded successfully'
        document.querySelector('#statusPanel>p').style.color='white'
        document.querySelector('#statusPanel>p').style.backgroundColor='green'
        this.globalChartData=response.data.Global
        response.data.Countries.map(data=>{
          this.countriesChartData.push([data.Country, data.TotalConfirmed])
        })
      })
      .catch(err=>{
        document.querySelector('#statusPanel>p').innerText='${err}, please refresh'
        document.querySelector('#statusPanel>p').style.color='white'
        document.querySelector('#statusPanel>p').style.backgroundColor='red'
      })
    }
  },
  created(){
    this.fetchApiData()
  }
}
</script>

<style>

</style>
