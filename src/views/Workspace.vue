<template>
  <div id="Workspace" class="w-full lg:w-3/4 lg:mx-auto mt-4 h-auto overflow-hidden">
    <div class="w-full flex flex-row justify-evenly p-2">
      <router-link to="/workspace" class="underline hover:line-through">Default <span class="hidden md:inline-block">Templates</span></router-link>
      <router-link to="/custom/templates" class="underline hover:line-through">Custom <span class="hidden md:inline-block">Templates</span></router-link>
      <router-link to="/filled/forms" class="underline hover:line-through">Filled <span class="hidden md:inline-block">Forms</span></router-link>
    </div>
    <transition name="slide" mode="out-in">
      <router-view class="pt-8"></router-view>
    </transition>
  </div>
</template>

<style scoped>
#Workspace a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
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
