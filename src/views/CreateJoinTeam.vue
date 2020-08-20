<template>
  <div id="createJoinTeam" class="pt-4">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-3/4 mx-auto" src="@/assets/img/team.png" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">ComuKOL for Teams</div>
        <form class="" action="" method="post">
          <input @click.submit.prevent="createTeam" class="btn w-3/4 mx-auto py-2 bg-green-500 text-white my-2 mr-8" type="submit" name="createTeam" value="create team">
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
import router from "../router"

export default {
  name: 'CreateJoinTeam',
  data(){
    return {

    }
  },
  methods:{
    disableCreateTeamButton(){
      const createTeam=document.querySelector('input[name="createTeam"]')
      createTeam.setAttribute('disabled', true)
      createTeam.classList.add('bg-opacity-25')
    },
    createTeam(){
      router.push('/create/team')
    }
  },
  mounted(){
    if(localStorage.role==='false'){
      this.disableCreateTeamButton()
    }
  }
}
</script>
<style>

</style>
