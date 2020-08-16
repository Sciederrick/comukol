<template>
  <div id="charts">
    <geo-chart :data="countriesChartData"></geo-chart>
    <bar-chart :data="globalChartData"></bar-chart>
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
      this.$axios.get('https://api.covid19api.com/summary')
        .then(response=>{
          // , data.NewConfirmed, data.NewDeaths, data.TotalDeaths, data.NewRecovered, data.TotalRecovered
          this.globalChartData=response.data.Global
          response.data.Countries.map(data=>{
            this.countriesChartData.push([data.Country, data.TotalConfirmed])
          })
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  computed:{

  },
  created(){
    this.fetchApiData()
  }
}
</script>

<style>

</style>
