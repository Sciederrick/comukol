export default{
  methods:{
    success(message='operation success'){
      document.querySelector('#statusPanel>p').innerText=message
      document.querySelector('#statusPanel>p').style.color='green'
      document.querySelector('#statusPanel>p').style.backgroundColor='lightGreen'
    },
    fail(err='error'){
      window.addEventListener('DOMContentLoaded', (event) => {
        document.querySelector('#statusPanel>p').innerText=`${err}, retry`
        document.querySelector('#statusPanel>p').style.color='white'
        document.querySelector('#statusPanel>p').style.backgroundColor='red'
      })
    }
  }
}
