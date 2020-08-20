<template>
  <div class="mx-auto">
    <div class="font-bold text-md my-2 text-left dropdown" @click="toggler()">Invite Members <fa-icon  :icon="['fas', 'angle-down']" class="dropdown" size="1x"/></div>
      <label :class="{hide:!display}">
        <textarea v-model="invites" name="description" rows="1" cols="" class="border rounded py-1 px-2 w-full" placeholder="email addresses..."></textarea>
      </label>
  </div>
</template>

<script>
export default{
  data(){
    return{
      display:false
    }
  },
  methods:{
    toggler(){
      this.display=!this.display
    }
  }
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
