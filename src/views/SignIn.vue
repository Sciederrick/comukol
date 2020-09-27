<template>
  <div id="signIn" class="pt-1 font-sans">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <div class="max-w-sm lg:max-w-md rounded overflow-hidden mx-auto">
      <div class="px-6 py-4 lg:py-2">
        <form>
          <div v-if="errors.length" class="text-xs">
            <b class="text-blue-700">Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" class="text-red-500">{{ error }}<fa-icon :icon="['fas', 'exclamation-circle']" size="1x" class="ml-1"/></li>
            </ul>
          </div>
        <label class="flex flex-row border-b border-indigo-400 my-8">
          <fa-icon :icon="['fas', 'envelope']" size="1x" class="self-center" color="indigo"/>
          <input v-model="email" type="email" name="email" placeholder="johndoe@gmail.com" class="w-full pl-8 border-none mx-auto py-1 lg:py-2 px-2 focus:outline-none" autocomplete="on">
        </label>
        <label class="flex flex-row border-b border-indigo-400 my-8">
          <fa-icon  :icon="['fas', 'lock']" class="self-center" size="1x" color="indigo"/>
          <input v-model="password" type="password" name="password" class="w-full pl-8 border-none mx-auto py-1 lg:py-2 px-2 focus:outline-none" autocomplete="off">
        </label>
        <input @click.submit.prevent="checkForm()" class="w-full p-2 bg-green-500 text-white cursor-pointer hover:bg-green-700 focus:outline-none" type="submit" name="login" value="sign in">
        </form>
        <router-link to="/forgotpassword" class="w-full"><p class="text-center text-sm text-red-600 underline my-6 ytr8">forgot password?</p></router-link>
      </div>
      <Modal :msg="res" v-if="showModal"/>
      <Spinner v-if="showSpinner"/>
    </div>
  </div>
</template>

<script>
import {bus} from '@/main.js'

export default {
  name: 'SignIn',
  data(){
    return {
      errors: [],
      email:'',
      password:'',
      res:{},
      showModal:false,
      showSpinner:false
    }
  },
  methods:{
    modal(message, state){
      this.showModal = true
      this.res.text = message
      this.res.status = state
    },
    async login(){
      this.showSpinner = true
      let data={
        email:this.email,
        password:this.password
      }
      let response = await this.$axios.post('/api/login', data)
        .then((response)=>{
          this.showSpinner = false
          localStorage.clear()
          localStorage.setItem('token', JSON.stringify(response.data))
          this.$router.push('/user/profile')
        })
        .catch((errors)=>{
          this.showSpinner = false
          this.modal('Wrong email or password',false)
        })
    },
    checkForm(){
      this.errors = []
      if(!this.email){
        this.errors.push('email required')
      }else if(!this.validEmail(this.email)){
        this.errors.push('valid email required')
      }
      if(!this.password){
        this.errors.push('password required')
      }
      if(!this.errors.length){
        this.login()
      }
    },
    validEmail(email){
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
  created(){
    bus.$on('closeModal',(data)=>{
      this.showModal = data
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
