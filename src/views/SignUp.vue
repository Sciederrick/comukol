<template>
  <div id="signUp" class="pt-4">
    <div id="nav">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-full" src="@/assets/img/card-top2.jpg" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">ComuKOL for Teams</div>
        <form class="" action="index.html" method="post">
        <label class="flex flex-row">
          <fa-icon :icon="['fas', 'envelope']" size="1x" class="self-center"/>
          <input v-model="email" type="email" name="email" placeholder="johndoe@gmail.com" class="input mx-auto py-1 px-2" autocomplete="off">
        </label>
        <label class="flex flex-row">
          <fa-icon  :icon="['fas', 'key']" class="self-center" size="1x"/>
          <input v-model="password" type="password" name="password" class="input mx-auto py-1 px-2" autocomplete="off">
        </label>
        <input @click.submit.prevent="register()" class="btn float-right bg-green-500 text-white mr-8" type="submit" name="login" value="sign up">
        </form>
      </div>
      <div class="px-6 py-4 w-full mt-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#join us</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#invite</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-1">#lead team</span>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import router from "../router"

export default {
  name: 'SignUp',
  data(){
    return {
      email:'',
      password:''
    }
  },
  methods:{
    register(){
      let data={
        id:uuid.v1(),
        email:this.email,
        password:this.password
      }
      let response = this.$axios.post('http://localhost:5000/register', data)
      .then((response)=>{
        console.log('Registration attempt successful!')
        router.push('/create/join/team')
      })
      .catch((errors)=>{
        window.alert('Registration attempt failed!')
      })
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
