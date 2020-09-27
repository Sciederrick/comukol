<template>
  <div id="signUp" class="pt-1 font-sans">
    <div id="nav">
      <router-link to="/register">Register</router-link> |
      <router-link to="/">Login</router-link>
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
          <span class="text-red-700 text-right self-center">*</span>
        </label>
        <div class="my-4">
          <label class="flex flex-row border-b border-indigo-400">
            <fa-icon  :icon="['fas', 'key']" class="self-center" size="1x" color="indigo"/>
            <input v-model="password" type="password" name="password" class="w-full pl-8 border-none mx-auto py-1 lg:py-2 px-2 focus:outline-none" autocomplete="off">
            <span class="text-red-700 text-righ self-centert">*</span>
          </label>
          <div :class="showPasswordsMatch" class="text-xs">
            <span v-if="passwordsMatch" class="text-green-600">passwords match <fa-icon :icon="['fas','check-circle']" size="1x" color="green"/></span>
            <span v-else class="text-red-600">passwords do not match <fa-icon :icon="['fas','exclamation-triangle']" size="1x" color="maroon"/></span>
          </div>
        </div>
        <div class="my-4">
          <label class="flex flex-row border-b border-indigo-400">
            <fa-icon  :icon="['fas', 'key']" class="self-center" size="1x" color="maroon"/>
            <input v-model="confirmPassword" type="password" name="password" class="w-full pl-8 border-none mx-auto py-1 lg:py-2 px-2 focus:outline-none" autocomplete="off">
            <span class="text-red-700 text-right self-center">*</span>
          </label>
          <div :class="showPasswordsMatch" class="text-xs">
            <span  v-if="passwordsMatch" class="text-green-600">passwords match <fa-icon :icon="['fas','check-circle']" size="1x" color="green"/></span>
            <span v-else class="text-red-600">passwords do not match <fa-icon :icon="['fas','exclamation-triangle']" size="1x" color="maroon"/></span>
          </div>
        </div>
        <input @click.submit.prevent="checkForm()" :class="cursor" class="w-full p-2 bg-green-500 text-white hover:bg-green-700 focus:outline-none" type="submit" name="login" value="sign up">
        </form>
      </div>
      <Modal :msg="res" v-if="showModal"/>
      <Spinner v-if="showSpinner"/>
    </div>
  </div>
</template>

<script>
import {uuid} from 'vue-uuid'
import {bus} from '@/main.js'

export default {
  name: 'SignUp',
  data(){
    return {
      errors:[],
      email:'',
      password:'',
      confirmPassword:'',
      res:{},
      showModal:false,
      passwordsMatch:false,
      showPasswordsMatch:'invisible',
      cursor:'cursor-not-allowed',
      showSpinner: false
    }
  },
  methods:{
    modal(message, state){
      this.showModal = true
      this.res.text = message
      this.res.status = state
    },
    register(){
      this.showSpinner = true
      let data={
        id:uuid.v1(),
        email:this.email,
        password:this.password
      }
      const url='/api/register'
      let response = this.$axios.post(url, data)
      .then((response)=>{
        this.showSpinner = false
        this.$router.push('/')
      })
      .catch((errors)=>{
        this.showSpinner = false
        this.modal('Registration attempt failed!, email already exists',false)
      })
    },
    comparePasswords(){
      if(this.password !== this.confirmPassword){
        this.passwordsMatch = false
        this.cursor = 'cursor-not-allowed'
        document.querySelector(`input[type="submit"]`).setAttribute('disabled', 'disabled')
      }
      else{
        this.passwordsMatch = true
        this.cursor = 'cursor-pointer'
        document.querySelector(`input[type="submit"]`).removeAttribute('disabled')
      }
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
        this.register()
      }
    },
    validEmail(email){
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
  created(){
    bus.$on('closeModal',(data)=>{
      this.showModal=data
    })
  },
  watch:{
    password(){
      this.comparePasswords()
    },
    confirmPassword(){
      this.showPasswordsMatch=true
      this.comparePasswords()
    }
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
