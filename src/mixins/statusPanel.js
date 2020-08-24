export default{
  methods:{
    success(message='operation success'){
      document.querySelector('#statusPanel>p').innerText=message
      document.querySelector('#statusPanel>p').style.color='white'
      document.querySelector('#statusPanel>p').style.backgroundColor='green'
    },
    fail(err='error'){
      window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed')
        document.querySelector('#statusPanel>p').innerText=`${err}, retry`
        document.querySelector('#statusPanel>p').style.color='white'
        document.querySelector('#statusPanel>p').style.backgroundColor='red'
      })
    }
  }
}
