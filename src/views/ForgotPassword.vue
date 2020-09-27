<template id="ForgotPassword">
<div class="flex h-screen justify-center px-1">
  <form class="m-auto w-full md:w-2/3 lg:w-1/3">
    <div v-if="errors.length" class="text-xs pb-12">
      <b class="text-blue-700">Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" class="text-red-500">{{ error }}<fa-icon :icon="['fas', 'exclamation-circle']" size="1x" class="ml-1"/></li>
      </ul>
    </div>
    <div class="flex items-center border-b border-teal-500 py-2">
      <input v-model="email" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Enter your email address" aria-label="email address">
      <button @click="checkForm()" class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Send
      </button>
    </div>
  </form>
  <Spinner v-if="spinner"/>
</div>
</template>

<script>

export default{
  name: 'ForgotPassword',
  data(){
    return{
      email:'',
      errors:[],
      spinner: false
    }
  },
  methods:{
    async passwordResetLink(){
      let data={
        email:this.email
      }
      const url = '/api/passwordreset'
      let response = await this.$axios.post(url, data)
        .then((response)=>{
          this.spinner = false
          window.alert('password reset link sent to your inbox')
        })
        .catch((errors)=>{
          this.spinner = false
          window.alert('password reset failed!')
        })
    },
    checkForm(){
      this.errors = []
      if(!this.email){
        this.errors.push('email required')
      }else if(!this.validEmail(this.email)){
        this.errors.push('valid email required')
      }
      if(!this.errors.length){
        this.spinner = true
        this.passwordResetLink()
      }
    },
    validEmail(email){
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>
