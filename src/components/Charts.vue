<template>
  <div id="charts">
    <h2>Total Confirmed Cases (Covid19)</h2>
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
          document.querySelector('#statusPanel>p').innerText='data loaded successfully'
          document.querySelector('#statusPanel>p').style.color='white'
          document.querySelector('#statusPanel>p').style.backgroundColor='green'
          this.globalChartData=response.data.Global
          response.data.Countries.map(data=>{
            this.countriesChartData.push([data.Country, data.TotalConfirmed])
          })
        })
        .catch(err=>{
          document.querySelector('#statusPanel>p').innerText=err
          document.querySelector('#statusPanel>p').style.color='white'
          document.querySelector('#statusPanel>p').style.backgroundColor='red'
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
