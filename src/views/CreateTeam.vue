<template>
  <div id="createTeam" class="pt-4">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Create Team</div>
        <form class="" action="" method="post">
          <label class="flex flex-row">
            <input v-model="teamName" type="text" name="teamName" placeholder="team name" class="input w-full py-1 px-2" autocomplete="off">
          </label>
          <label class="flex flex-row">
            <textarea v-model="description" name="description" rows="5" cols="80" class="border rounded py-1 px-2" placeholder="team description"></textarea>
          </label>
          <input @click.submit.prevent="createTeam" class="btn w-full py-2 bg-blue-600 text-white my-2" type="submit" name="createTeam" value="create">
          <div class="mx-auto">
            <div class="font-bold text-md my-2 text-left dropdown" @click="toggler()">Invite Members <fa-icon  :icon="['fas', 'angle-down']" class="dropdown" size="1x"/></div>
            <div :class="{hide:!display}">
              <label>
                <textarea v-model="invites" name="description" rows="1" cols="" class="border rounded py-1 px-2 w-full" placeholder="email addresses..."></textarea>
              </label>
              <input @click.submit.prevent="inviteMembers" class="btn w-full py-2 bg-green-600 text-white my-2" type="submit" name="inviteMembers" value="invite">
            </div>
          </div>
        </form>
      </div>
      <div class="px-6 py-4 w-full mt-2">
        <img class="w-3/4 mx-auto" src="@/assets/img/team.png" alt="Sunset in the mountains">
      </div>
    </div>
    <statusBar/>
  </div>
</template>

<script>
import InviteMembers from '@/components/InviteMembers.vue'
import statusBar from '../components/statusBar.vue'
import statusPanel from '../mixins/statusPanel'
import router from "../router"
export default {
  name: 'CreateTeam',
  components:{
    statusBar
  },
  data(){
    return {
      teamName:'',
      description:'',
      invites:'',
      display:false
    }
  },
  methods:{
    createTeam(){
      router.push('/home')
      console.log(`team name: ${this.teamName} \n description: ${this.description}`)
    },
    inviteMembers(){
      const invitees=this.invites
      const url='http://localhost:5000/invite/members'
      this.$axios.post(url, {invitees})
        .then(response=>{
          console.log(response)
          this.success('email invite sent!')
        })
        .catch(err=>{
          this.fail(err)
          console.log(err)
        })
    },
    toggler(){
      this.display=!this.display
    }
  },
  mixins:[statusPanel]
}
</script>
<style scoped>
.hide{
  display:none;
}
.dropdown{
  cursor:pointer;
}
</style>
