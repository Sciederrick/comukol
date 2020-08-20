export default{
  methods:{
    success(){
      document.querySelector('#statusPanel>p').innerText='operation success'
      document.querySelector('#statusPanel>p').style.color='white'
      document.querySelector('#statusPanel>p').style.backgroundColor='green'
    },
    fail(err){
      document.querySelector('#statusPanel>p').innerText=`${err}, retry`
      document.querySelector('#statusPanel>p').style.color='white'
      document.querySelector('#statusPanel>p').style.backgroundColor='red'
    }
  }
}
