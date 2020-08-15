<template>
  <div id="createJoinTeam" class="pt-4">
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-full" src="@/assets/img/card-top.jpg" alt="Sunset in the mountains">
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
        <input @click.submit.prevent="login()" class="btn float-right bg-green-500 text-white mr-8" type="submit" name="login" value="sign in">
        </form>
      </div>
      <div class="px-6 py-4 w-full mt-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#respond</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#coordinate</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-1">#progress</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateJoinTeam',
  data(){
    return {

    }
  },
  methods:{
    
  }
}
</script>
<style>

</style>
