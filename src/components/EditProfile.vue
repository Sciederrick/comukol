<template>
  <div id="EditProfile" class="p-4 border rounded-lg text-left md:w-3/4 md:pl-12 md:pt-8 lg:border-0 lg:rounded-md lg:pt-6 lg:bg-gray-100">
    <form class="mx-auto lg:mr-4">
      <div class="flex flex-row items-center justify-between lg:justify-center">
        <label for="Name" class="w-16 lg:w-48 text-right">Name:</label>
        <input v-model="name" id="Name" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2" placeholder="" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Contact" class="w-16 lg:w-48 text-right">Contact:</label>
         <vue-tel-input v-model="contact" v-bind="bindProps" id="Contact" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2"></vue-tel-input>
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Email" class="w-16 lg:w-48 text-right">Email</label>
        <input v-model="email" id="Email" type="email" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2" placeholder="" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="InstitutionOfWork" class="w-16 lg:w-48 text-right">Institution of Work:</label>
        <input v-model="institutionOfWork" id="InstitutionOfWork" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2" placeholder="" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-between">
        <label for="Specialty" class="w-16 lg:w-48 text-right">Specialty:</label>
        <input v-model="specialty" id="Specialty" type="text" class="input w-3/4 lg:w-1/2 mx-auto px-2 lg:ml-2" placeholder="" autocomplete="on">
      </div>
      <div class="flex flex-row items-center justify-round">
        <label for="Specialty" class="w-16 lg:w-48 text-right"></label>
        <input @click.submit.prevent="updateProfile()" class="btn bg-blue-600 text-white py-1 ml-2 mt-1 hover:bg-blue-800" type="submit" name="login" value="update">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data(){
    return{
      name:'',
      email:'',
      contact:'',
      institutionOfWork:'',
      specialty:'',
      phone: "0123456789",
      bindProps: {
      mode: "international",
      defaultCountry: "KE",
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
      console.log(
        `name: ${this.name}, email: ${this.email}, contact: ${this.contact}, institutionOfWork: ${this.institutionOfWork}, specialty: ${this.specialty}`
      )
    }
  }
}
</script>

<style scoped>

</style>
