<template>
<div id="InvitedMembersSignIn" class="max-w-sm  mx-auto my-32 mx-1 rounded overflow-hidden">
  <form class="p-4 shadow-sm md:shadow-lg" action="" method="post">
    <label class="flex flex-row">
      <fa-icon :icon="['fas', 'envelope']" size="1x" class="self-center"/>
      <input v-model="email" type="email" name="email" placeholder="johndoe@gmail.com" class="input mx-auto ml-1 py-1 px-2" autocomplete="off">
      <input @click.submit.prevent="confirmInvited()" class="btn p-2 m-2 bg-gray-500 text-white text-sm" type="submit" name="login" value="confirm">
    </label>
    <label v-if="visible" class="flex flex-row">
      <fa-icon  :icon="['fas', 'key']" class="self-center" size="1x"/>
      <input v-model="password" type="password" name="password" class="input mx-auto ml-1 py-1 px-2" autocomplete="off">
      <input @click.submit.prevent="modifyPassword()" class="btn p-2 m-2 bg-green-500 text-white text-sm" type="submit" name="login" value="sign in">
    </label>
  </form>
  <statusBar/>
</div>
</template>

<script>
import statusBar from '../components/statusBar.vue'
import statusPanel from '../mixins/statusPanel'
import router from '../router'
export default{
  name: 'InvitedMemberSignIn',
  data(){
    return{
      visible:false,
      email:'',
      password:''
    }
  },
  methods:{
    async confirmInvited(){
      try{
        const email = this.email
        const url = '/api/invited/confirm'
        await this.$axios.post(url, {email}, {timeout:20000})
        this.visible = true
      }catch(err){
        window.alert('email address not found!')
        console.log(err.response.data.error)
      }
    },
    async modifyPassword(){
      try{
        const email = this.email
        const url = '/api/invited/modify/password'
        const user = await this.$axios.post(url, {email}, {timeout:20000})
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(user))
        router.push('user/profile')
      }catch(err){
        window.alert('update failed!')
        console.log(err.response.data.error)
        this.fail(err)
      }
    }
  },
  mixins:[statusPanel]
}
</script>
