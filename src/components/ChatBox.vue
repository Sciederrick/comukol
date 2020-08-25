<template>
  <div>
    <div class="flex flex-col bg-gray-400 shadow-sm">
      <div class="overflow-y-auto flex-grow h-64" id="ChatBox" >
        <div class="flex border-b border-white p-4" v-for="message in messages" :key="message.index">
          <div class="w-32 text-sm">{{message.username}}</div>
          <div class="flex-grow">{{message.msg}}</div>
        </div>
      </div>
    </div>
    <form @submit="sendMessage" class="flex justify-between">
      <input type="text" v-model="msg" class="input rounded-tr-none rounded-br-none h-10 text-2xl w-full outline-none">
      <button @click="sendMessage" :disabled="!msg" class="h-10 self-center rounded rounded-tl-none rounded-bl-none py-1 px-3 bg-green-500 text-white hover:bg-green-300">Send</button>
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
