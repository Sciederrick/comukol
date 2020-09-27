<template>
<div class="font-mono overflow-hidden">
		<!-- Container -->
		<div class="mx-auto" v-if="!link">
			<div class="flex justify-center px-0 md:px-6 my-12">
				<!-- Row -->
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					<!-- Col -->
					<div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <img src="@/assets/img/welcome.jpg" class="h-full object-cover">
          </div>
					<!-- Col -->
					<div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<div class="px-1 md:px-8 mb-4 text-center">
							<h3 class="pt-4 mb-2 text-2xl">&#128075, Welcome to Team {{$route.params.team||ComuKol}}!</h3>
							<p class="mb-4 text-sm text-gray-700">
								Taking Response Teams to the next level. Just create your password below and we'll create an account for you!
							</p>
						</div>
            <form class="px-1 md:px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<!-- Errors -->
							<div class="h-10">
								<div v-if="errors.length" class="flex items-center py-2 text-xs">
									<b class="text-blue-700 pr-2">Please correct the following error(s):</b>
									<ul>
										<li v-for="error in errors" class="text-red-500">{{ error }}<fa-icon :icon="['fas', 'exclamation-circle']" size="1x" class="ml-1"/></li>
									</ul>
								</div>
							</div>
              <div class="flex items-center border-b border-teal-500">
                <span class="text-xs font-mono w-20"><fa-icon  :icon="['fas', 'envelope']" class="self-center mr-2" size="1x" color="teal"/>Email:</span>
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 pl-6 leading-tight focus:outline-none" type="email" :value="emailAddress" aria-label="email address" autocomplete="off" disabled>
              </div>
              <div id="passwordBox" class="flex items-center border-b border-teal-500 py-2">
                <span class="text-xs font-mono w-20"><fa-icon  :icon="['fas', 'key']" class="self-center mr-2" size="1x" color="teal"/>Password:</span>
                <input v-model="password" id="password" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 pl-6 leading-tight focus:outline-none" type="password" aria-label="password" autocomplete="off">
              </div>
              <div id="passwordConfirmBox" class="flex items-center border-b border-teal-500 py-2">
                <span class="text-xs font-mono w-20 text-red-600"><fa-icon  :icon="['fas', 'key']" class="self-center mr-2" size="1x"/>Confirm:</span>
                <input v-model="confirmPassword" id="confirmPassword" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 pl-6 leading-tight focus:outline-none" type="password" aria-label="confirm password" autocomplete="off">
              </div>
							<div class="h-10">
								<div v-show="showPasswordsMatch">
									<div v-if="!passwordsMatch" class="flex items-center py-2 text-xs">
										<b class="text-red-700 pr-2">passwords do not match!<fa-icon :icon="['fas', 'exclamation-circle']" size="1x" class="ml-1"/></b>
									</div>
									<div v-else class="flex items-center py-2 text-xs">
										<b class="text-green-700 pr-2">passwords match<fa-icon :icon="['fas', 'check-circle']" size="1x" class="ml-1"/></b>
									</div>
								</div>
							</div>
              <input @click.prevent="checkForm()" type="submit" value="submit" :class="cursor" class="p-2 w-full mt-8 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-800 focus:outline-none">
            </form>
					</div>
				</div>
			</div>
		</div>
    <Expired v-if="link"/>
    <Modal :msg="res" v-if="showModal"/>
		<Spinner v-if="spinner"/>
	</div>
</template>

<script>
import {bus} from '@/main.js'
import Expired from '@/components/Expired.vue'
import statusBar from '@/components/statusBar.vue'
import statusPanel from '@/mixins/statusPanel'
import router from '../router'
import { uuid } from 'vue-uuid'
export default{
  name: 'InvitedMemberSignIn',
  components: {
    Expired
  },
  data(){
    return{
      link:false,  /*show this page if only the invite link is valid!*/
      errors:[],
      visible:false,
      emailAddress:'',
      team:'',
      password:'',
      confirmPassword:'',
			showPasswordsMatch:false,
			passwordsMatch:false,
			cursor:'',
			spinner:false,
			res:{},
			showModal:false
    }
  },
	watch:{
		confirmPassword(oldValue, newValue){
			this.showPasswordsMatch = true
			this.passwordsCheck()
		},
		password(oldValue, newValue){
			this.passwordsCheck()
		}
	},
  methods:{
		passwordsCheck(){
			const submit = document.querySelector(`input[type="submit"]`)
			if(this.password === this.confirmPassword){
				this.passwordsMatch = true
				this.cursor = ""
				submit.removeAttribute('disabled')
			}else{
				this.passwordsMatch = false
				this.cursor = "cursor-not-allowed"
				submit.setAttribute('disabled', 'disabled')
			}
		},
    async verifyEmailAndTeam(){
      const url = '/api/invited/verify'
      const data = {
        team : this.team,
        email: this.emailAddress
      }
      try{
        const response = await this.$axios.post(url, data, {timeout:20000})
      }catch(err){
        console.log(err)
        this.link = true /*show link expired page*/
      }
    },
		async registerMember(){
			this.spinner = true
			const url = '/api/register/member'
			const data = {
				id: uuid.v1(),
				email: this.emailAddress,
				team: this.team,
				password: this.password
			}
			try{
				const response = await this.$axios.post(url, data, {timeout:20000})
				this.spinner = false
				console.log(response.data)
				this.showModal = true
				this.res.text="Member registration successful"
				this.res.status=true
			}catch(err){
				this.spinner = false
				console.log(err.response.data.error)
				this.showModal = true
				this.res.text=err.response.data.error
				this.res.status=false
			}
		},
    checkForm(){
      this.errors = []
      if(!this.password||!this.confirmPassword){
        this.errors.push('password required')
      }
      if(!this.errors.length){
        this.registerMember()
      }
    }
  },
  created(){
    this.emailAddress = this.$route.params.email
    this.team = this.$route.params.team
    this.verifyEmailAndTeam()
		bus.$on('closeModal', (data)=>{
			this.showModal = data
		})
  },
  mixins:[statusPanel]
}
</script>
