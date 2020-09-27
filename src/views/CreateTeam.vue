<template>
  <div id="createTeam" class="w-full overflow-hidden font-sans">
    <h1 class="font-semibold text-left pl-8 text-xl mb-2 py-2 mb-2">Create Team</h1>
    <div class="flex flex-col justify-center w-full mx-auto  md:w-3/4 lg:w-5/6 lg:flex-row lg:justify-evenly">
      <div class="w-full md:max-w-sm rounded overflow-hidden mx-auto">
        <div class="px-6 py-4">
          <form>
            <label class="flex flex-row">
              <input v-model="teamName" type="text" name="teamName" placeholder="team name" class="input border-0 border-b-2 rounded-none border-black w-full py-1 px-2 focus:outline-none" autocomplete="off" required>
            </label>
            <label class="flex flex-row">
              <textarea v-model="description" name="description" rows="5" cols="80" class="border-0 border-l-2 rounded-none border-gray-500 py-1 px-2 focus:outline-none" placeholder="team description..." required></textarea>
            </label>
            <div class="mx-auto">
              <div class="text-md my-2 text-left dropdown" @click="toggler()">Invite Members:</div>
              <div>
                <label>
                  <textarea v-model="invites" name="description" rows="1" cols="" class="border rounded py-1 px-2 w-full" placeholder="paste email addresses here..."></textarea>
                </label>
              </div>
            </div>
            <div class="w-full text-left">
              <label for="toolkits" class="mr-2">Choose a Toolkit:</label>
              <select v-model="toolkit" class="input">
                <option>General</option>
                <option>Cholera</option>
                <option>RVF</option>
                <option>Yellow Fever</option>
                <option>Ebola</option>
                <option>Covid19</option>
              </select>
              <p class="text-xs font-mono text-orange-400 px-1">selected: {{ toolkit }}</p>
            </div>
            <input @click.submit.prevent="createTeam" class="btn w-full md:w-3/4 md:w-auto md:float-left md:mr-1 py-2 bg-green-500 text-white my-2 lg:text-sm md:rounded-md hover:bg-green-700 hover:text-white hover:border-2 hover:border-green-600 hover:font-semibold cursor-pointer" type="submit" name="createTeam" value="create">
          </form>
        </div>
      </div>
      <div class="px-6 hidden lg:block lg:w-1/2 lg:order-2 lg:overflow-hidden">
        <img class="object-bottom w-3/4 mx-auto overflow-hidden" src="@/assets/img/invited.jpg" alt="Sunset in the mountains">
      </div>
    </div>
    <Modal :msg="res" v-if="showModal"/>
    <Spinner v-if="showSpinner"/>
  </div>
</template>

<script>
import {bus} from '@/main.js'
import router from "../router"
export default {
  name: 'CreateTeam',
  data(){
    return {
      teamName:null,
      description:null,
      invites:null,
      toolkit:null,
      by:null,
      res:{},
      showModal:false,
      showSpinner:false
    }
  },
  methods:{
    createTeam(){
      const teamName = this.teamName
      const description = this.description
      const toolkit = this.toolkit
      const invites = this.invites
      if(teamName===null||description===null||toolkit===null){
        this.showModal=true
        this.res.status=false
        this.res.text='detected empty fields!'
      }else{
        if(invites===null||invites===' '){
          const user=JSON.parse(atob(JSON.parse(localStorage.token).accessToken.split('.')[1]))
          const email=user.email
          const confirm=window.confirm('Proceed without inviting members...!')
          const url = '/api/create/team'
          const data = {
            teamName,
            description,
            toolkit,
            email
          }
          if(confirm){
            this.$axios.post(url, data, {timeout:20000})
            .then(response=>{
              this.showModal=true
              this.res.status=true
              this.res.text=`team ${response.data.name} has been created successfully!`
              // setTimeout(()=>{
              //   router.push('/home')
              // }, 2000)
            })
            .catch(err=>{
              this.showModal=true
              this.res.status=false
              this.res.text=err.response.data.error
              console.log(err)
            })
          }
        }else{
          const user=JSON.parse(atob(JSON.parse(localStorage.token).accessToken.split('.')[1]))
          const email=user.email
          this.by = email
          const url = '/api/create/team'
          const url2 = '/api/invite/members'
          const data = {
            teamName,
            description,
            toolkit,
            email
          }
          const data2 = {
            invites
          }
          this.$axios.post(url, data, {timeout:20000})
          .then(response=>{
            this.showModal=true
            this.res.status=true
            this.res.text=`Team ${response.data.teams.pop()} has been created successfully!`
          })
          .then(response=>{
            this.inviteMembers() //send email to invited members on successful creation of the team
          })
          .catch(err=>{
            this.showModal=true
            this.res.status=false
            this.res.text=err.response.data.error
            console.log(err.response.data.error)
          })
        }
      }

    },
    inviteMembers(){
      let invitees=this.invites
      invitees=invitees.trim()
      invitees=invitees.split('.com')
      invitees=invitees.map((el)=>{
        return el.trim().concat('.com')
      })
      invitees.pop()
      invitees=invitees.toString()
      const by = this.by
      const url='/api/invite/members'
      const teamName = this.teamName
      const description = this.description
      this.$axios.post(url, {invitees, by, teamName, description})
        .then(response=>{
          let res = ''
          response.data.forEach((item, index)=>{
            res+=`${index} - ${item.email}`
          })
          this.showModal=true
          this.res.status=true
          this.res.text="invites sent successfully"
        })
        .catch(err=>{
          this.showModal=true
          this.res.status=false
          this.res.text=err.response.data.error
          console.log(err.response.data.error)
        })
    }
  },
  created(){
    bus.$on('closeModal',(data)=>{
      this.showModal=false
    })
  }
}
</script>
<style scoped>
.dropdown{
  cursor:pointer;
}
</style>
