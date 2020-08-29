<template>
  <div id="EditProfile" class="p-4 lg:border lg:rounded-lg text-left md:w-3/4 md:pl-12 md:pt-8 lg:border-0 lg:rounded-md lg:pt-6 lg:bg-gray-100">
    <form class="mx-auto lg:mr-4">
      <div class="flex flex-row items-center justify-between lg:justify-center">
        <label for="Name" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base">Name:</label>
        <input v-model="name" id="Name" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2 py-1" placeholder="jane doe" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Contact" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base">Contact:</label>
         <vue-tel-input v-model="contact" v-bind="bindProps" id="Contact" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2" value="0700123456"></vue-tel-input>
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Email" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base">Email</label>
        <input v-model="email" id="Email" type="email" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2 py-1" placeholder="" autocomplete="on" disabled>
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="InstitutionOfWork" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base">Institution of Work:</label>
        <input v-model="institutionOfWork" id="InstitutionOfWork" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2 py-1" placeholder="" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Specialty" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base">Specialty:</label>
        <input v-model="specialty" id="Specialty" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2 py-1" placeholder="e.g Doctor, Epidemiologist..." autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Specialty" class="w-16 text-left lg:w-48 md:text-right text-xs md:text-base"><fa-icon  :icon="['fas', 'map-marker-alt']" class="self-center" size="1x"/> Jurisdiction:</label>
        <input v-model="jurisdiction" id="Jurisdiction" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2 py-1" placeholder="area of jurisdiction" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-round">
        <label for="Specialty" class="w-16 text-left lg:w-48 md:text-right text-sm md:text-base"></label>
        <input @click.submit.prevent="updateProfile()" class="btn bg-blue-600 text-white py-1 ml-2 mt-1 hover:bg-blue-800 lg:py-1" type="submit" name="login" value="update">
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router"
import statusPanel from '../mixins/statusPanel'
export default {
  name: 'EditProfile',
  props:{
    user:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      name:this.user.name,
      email:this.user.email,
      contact:this.user.contact,
      institutionOfWork:this.user.workplace,
      specialty:this.user.specialty,
      jurisdiction:this.user.jurisdiction,
      phone: "0123456789",
      bindProps: {
      mode: "international",
      defaultCountry: "KE lg:py-1",
      disabledFetchingCountry: false,
      disabled: false,
      disabledFormatting: false,
      placeholder: "Enter a phone number",
      required: false,
      enabledCountryCode: false,
      enabledFlags: true,
      preferredCountries: ["US", "KE"],
      onlyCountries: [],
      ignoredCountries: [],
      autocomplete: "off",
      name: "telephone",
      maxLen: 25,
      wrapperClasses: "",
      inputClasses: "",
      dropdownOptions: {
        disabledDialCode: false
      },
      inputOptions: {
        showDialCode: false
      }
    }
    }
  },
  methods:{
    updateProfile(){
      const data={
        fullName:this.name,
        email:this.email,
        contact:this.contact,
        workplace:this.institutionOfWork,
        specialty:this.specialty,
        jurisdiction:this.jurisdiction
      }
      const url='/api/profile/update'
      this.$axios.post(url, data, {timeout:35000})
        .then(response=>{
          this.user=response.data
          this.success('profile modified successfully!')
          router.push('/user/profile')
        })
        .catch(err=>{
          console.log(err)
          this.fail(err.response.data.error)
        })
    }
  },
  mixins:[statusPanel],
  created(){
    if(localStorage.user){
      const user=JSON.parse(localStorage.getItem('user'))
      this.email=user.email
    }
  }
}
</script>
