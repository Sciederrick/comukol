<template id="ForgotPassword">
<div class="flex h-screen justify-center">
  <!-- <form method="post" class="m-auto">
      <legend><fa-icon :icon="['fas', 'envelope']" size="1x"/></legend>
      <input type="email" placeholder="janedoe@gmail.com" class="p-2 pl-4 border border-r-0 border-blue-700 rounded-r-none rounded-l-md focus:outline-none" autofocus>
      <input type="submit" value="submit" class="btn p-2 border border-l-0 border-blue-500 rounded-l-none rounded-r-md bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-900">
  </form> -->
  <form class="m-auto">
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
      <button class="flex-shrink-0 border-transparent border-4 text-teal-700 hover:text-teal-900 text-sm py-1 px-2 rounded" type="button">
        <fa-icon :icon="['fas', 'envelope']" size="1x"/> Reset Link
      </button>
    </div>
  </form>
</div>
</template>

<script>
export default{
  data(){
    return{
      email:'',
      errors:[]
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
          window.alert('password reset link sent')
        })
        .catch((errors)=>{
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
