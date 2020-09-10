<template>
  <div id="createJoinTeam" class="pt-4">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-3/4 mx-auto" src="@/assets/img/team.png" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">ComuKol Teams</div>
        <p class="text-center text-sm underline py-2">Need a new team? Create one!</p>
        <form>
          <input @click.submit.prevent="createTeam" class="btn w-3/4 mx-auto py-2 bg-green-500 text-white my-2 mr-8 cursor-pointer hover:bg-green-700" type="submit" name="createTeam" value="create team">
        </form>
      </div>
      <p class="text-center text-sm underline py-2">Proceed to your active teams:</p>
      <!-- <div class="flex flex-row flex-wrap justify-center content-start mx-4 my-2" id="AvailableTeams">
        <div class="flex-grow m-1 py-3 text-xs text-blue-500 border border-dotted rounded border-blue-200 cursor-not-allowed hover:bg-blue-200 hover:text-white" title="pending">
          Team Covid
        </div>
        <div class="flex-grow m-1 py-3 text-xs text-blue-500 border border-dotted rounded border-blue-200 cursor-not-allowed hover:bg-blue-200 hover:text-white" title="pending">
          Team Rabbies
        </div>
        <div class="order-first flex-grow m-1 py-3 text-xs text-blue-500 border-dotted rounded border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
          <transition name="slide" mode="out-in">
            <router-link to="/workspace">Team Cholera</router-link>
          </transition>
        </div>
      </div> -->
      <div class="h-24 overflow-y-auto" id="AvailableTeams">
        <ul class="flex flex-row flex-wrap justify-center content-start mx-4 my-2">
          <li @click="selectTeam" v-for="team in teams" :key="team" class="m-1 py-3 flex-grow text-xs text-blue-500 border-dotted rounded border border-blue-400 cursor-pointer font-mono hover:bg-blue-400 hover:text-white">{{team}}</li>
        </ul>
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
import statusBar from "@/components/statusBar.vue"
import statusPanel from "@/mixins/statusPanel"
export default {
  name: 'CreateJoinTeam',
  data(){
    return {
      teams:[]
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
    },
    selectTeam(e){
      const selectedTeam = e.target.textContent
      if(selectedTeam){
        localStorage.setItem('team', selectedTeam)
        router.push('/workspace')
      }else{
        this.fail('error selecting team, retry')
      }
    }
  },
  created(){
    this.teams=JSON.parse(atob(JSON.parse(localStorage.token).accessToken.split('.')[1])).teams
  },
  mounted(){
    if(JSON.parse(atob(JSON.parse(localStorage.token).accessToken.split('.')[1])).role==='false'){
      this.disableCreateTeamButton()
    }
  },
  mixins:[statusPanel]
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-30%);
}
</style>
