<template>
  <div>
    <div class="flex flex-col bg-gray-100 shadow-sm">
      <div class="overflow-y-auto flex-grow" id="ChatBox" style="height:400px;">
        <div class="flex flex-col md:flex-row border-b border-white p-4" v-for="message in messages" :key="message.index">
          <div class="w-full md:w-32 text-sm overflow-x-auto">
            <p class="text-left text-xs md:text-sm"><fa-icon :icon="['fas', 'user']" size="1x" class="mr-2"/>{{message.username}}</p>
            <p class="text-left text-xs">{{message.created_at}}</p>
          </div>
          <div class="flex-grow text-right"><span class="pr-3 text-green-600 bg-white rounded">{{message.msg}}</span><fa-icon :icon="['fas', 'quote-right']" size="1x" style="self-center"/></div>
        </div>
      </div>
    </div>
    <form @submit="sendMessage" class="flex justify-between">
      <input type="text" v-model="msg" class="input rounded-tr-none rounded-br-none h-10 text-2xl w-full outline-none pl-4" placeholder="Type a message">
      <button @click="sendMessage" :disabled="!msg" class="h-10 self-center rounded rounded-tl-none rounded-bl-none py-1 px-3 bg-green-500 text-white hover:bg-green-900">Send</button>
    </form>
  </div>
</template>

<script>
export default {
	name: 'ChatBox',
	props: ['messages'],
	data () {
		return {
			msg: ""
		}
	},
	methods: {
    sendMessage(){
      if(!this.msg){
        alert('Please enter a message')
        return;
      }
      this.$emit('sendMessage', this.msg)
      this.msg = ""
    }
	}
}
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
width: 8px;
height:3px;
}
/* Track */
::-webkit-scrollbar-track {
box-shadow: inset 0 0 5px grey;
border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
background: linear-gradient(
  90deg,
  #092E0D,
  #388F00,
  #AAE205,
  #AAE205,
  #AAE205,
  #90D209,
  #105201
  );

border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
background: linear-gradient(
  180deg,
  #fff,
  #fff,
  #f11
  );
}
</style>
