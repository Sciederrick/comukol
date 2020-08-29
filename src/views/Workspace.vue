<template>
  <div id="Workspace" class="w-full lg:w-3/4 lg:mx-auto h-auto overflow-hidden bg-gray-100">
    <div class="w-full flex flex-row justify-evenly p-4">
      <a href="#">
        <router-link to="#" class="underline hover:line-through">Default <span class="hidden md:inline-block">Templates</span></router-link>
      </a>
      <a href="#">
        <router-link to="#" class="underline hover:line-through">Custom <span class="hidden md:inline-block">Templates</span></router-link>
      </a>
      <a href="#">
        <router-link to="#" class="underline hover:line-through">Filled <span class="hidden md:inline-block">Forms</span></router-link>
      </a>
    </div>
    <router-view class="pt-8"></router-view>
  </div>
</template>

<script>
export default{

}
</script>

<style scoped>
#Workspace a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>
