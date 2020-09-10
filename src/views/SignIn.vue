<template>
  <div id="signIn" class="pt-4">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-full" src="@/assets/img/join.png" alt="Join">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">ComuKOL login</div>
        <form method="post">
          <div v-if="errors.length" class="text-xs">
            <b class="text-blue-700">Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" class="text-red-500">{{ error }}<fa-icon :icon="['fas', 'exclamation-circle']" size="1x" class="ml-1"/></li>
            </ul>
          </div>
        <label class="flex flex-row">
          <fa-icon :icon="['fas', 'envelope']" size="1x" class="self-center"/>
          <input v-model="email" type="email" name="email" placeholder="johndoe@gmail.com" class="input mx-auto py-1 px-2" autocomplete="on">
        </label>
        <label class="flex flex-row">
          <fa-icon  :icon="['fas', 'key']" class="self-center" size="1x"/>
          <input v-model="password" type="password" name="password" class="input mx-auto py-1 px-2" autocomplete="off">
        </label>
        <input @click.submit.prevent="checkForm()" class="btn p-1 float-right bg-green-500 text-white mr-8" type="submit" name="login" value="sign in">
        </form>
      </div>
      <div class="px-6 py-4 w-full mt-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#respond</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#coordinate</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-1">#eradicate</span>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router"

export default {
  name: 'SignIn',
  data(){
    return {
      errors: [],
      email:'',
      password:''
    }
  },
  methods:{
    async login(){
      let data={
        email:this.email,
        password:this.password
      }
      let response = await this.$axios.post('/api/login', data)
        .then((response)=>{
          console.log('Login attempt successful!')
          localStorage.clear()
          localStorage.setItem('token', JSON.stringify(response.data))
          router.push('/user/profile')
        })
        .catch((errors)=>{
          window.alert('Login attempt failed!')
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
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
