<template>
  <div id="Expired">
    <div class="h-screen w-screen bg-red-600 flex justify-center content-center flex-wrap">
      <p class="font-sans text-white text-3xl md:text-6xl">Invite Invalid!</p>
      <div class="w-screen flex justify-center content-center flex-wrap">
        <p class="font-sans bg-red-500 text-white">This invite link might already be used, hence expired</p>
      </div>
    </div>
    <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
      <span class="opacity-50">Take me back to&nbsp;</span>
      <a class="border-b" href="https://comukol.herokuapp.com/about">About page</a>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Expired'
  }
</script>
