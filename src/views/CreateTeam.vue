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
          <InviteMembers></InviteMembers>
          <input @click.submit.prevent="createTeam" class="btn w-full py-2 bg-blue-600 text-white my-2" type="submit" name="createTeam" value="create">
        </form>
      </div>
      <div class="px-6 py-4 w-full mt-2">
        <img class="w-3/4 mx-auto" src="@/assets/img/team.png" alt="Sunset in the mountains">
      </div>
    </div>
  </div>
</template>

<script>
import InviteMembers from '@/components/InviteMembers.vue'
import router from "../router"
export default {
  name: 'CreateTeam',
  components:{
    InviteMembers
  },
  data(){
    return {
      teamName:'',
      description:'',
      invites:''
    }
  },
  methods:{
    createTeam(){
      // router.push('/home')
      console.log(`team name: ${this.teamName} \n description: ${this.description} \n invites: ${this.invites}`)
    }
  }
}
</script>
<style>

</style>
