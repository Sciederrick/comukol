<template>
  <div id="ChatRoom" class="h-screen w-screen overflow-hidden bg-gray-300">
    <div class="flex flex-col w-full h-full md:h-3/4 md:w-3/4 lg:w-1/2 mx-auto p-4 rounded-lg font-mono bg-transparent">
      <div class="flex justify-start mb-6">
        <button @click="$router.push('/home')" class="outline-none font-mono bg-blue-400 py-2 px-4 rounded text-white hover:bg-blue-600"><fa-icon :icon="['fas', 'long-arrow-alt-left']" size="1x" class="text-white"/><span class="pl-2">back</span></button>
      </div>
      <div class="flex flex-row flex-wrap justify-between px-2 pb-4 text-sm">
        <p class="text-gray-100">{{username}}</p>
        <p class="text-gray-100">Online: {{users.length}}</p>
      </div>
      <ChatBox :messages="messages" @sendMessage="this.sendMessage"/>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatBox from '@/components/ChatBox'
import goBack from '@/mixins/goBack'
export default{
  name: 'ChatRoom',
  components:{
    ChatBox
  },
  data(){
    return{
      username: "",
      socket: io(),
      messages: [],
      users: []
    }
  },
  methods:{
    scrollToBottom(){
      let box = document.querySelector('#ChatBox')
      box.scrollTop = box.scrollHeight
    },
    joinServer(){
      this.socket.on('loggedIn', data=>{
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newUser', this.username)
      })
      this.listen()
    },
    listen(){
      this.socket.on('userOnline', user=>{
        this.users.push(user)
      })
      this.socket.on('userLeft', user=>{
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', message=>{
        this.messages.push(message)
      })
    },
    sendMessage(message){
      this.socket.emit('msg', message)
    }
  },
  mounted(){
    // const user=JSON.parse(localStorage.getItem('user'))
    // const email=user.email
    // this.username = email
    // if(!this.username){
      this.username = "Anonymous"
    // }
    this.joinServer()
  },
  updated(){
    this.scrollToBottom()
  },
  mixins:[goBack]
}
</script>

<style scoped>
#ChatRoom{
  background-image:url("./../assets/img/chatroom.png");
}
</style>
