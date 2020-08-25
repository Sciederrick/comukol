<template>
<div id="ChatRoom" class="flex flex-col h-3/4 w-3/4 lg:w-1/2 mx-auto mt-4 p-4 rounded-lg font-mono bg-gray-100">
  <div class="flex flex-row justify-evenly pb-4 text-sm">
    <h1>Chatroom</h1>
    <p class="username">Username: {{username}}</p>
    <p class="online">Online: {{users.length}}</p>
  </div>
  <ChatBox :messages="messages" @sendMessage="this.sendMessage"/>
</div>
</template>

<script>
import io from 'socket.io-client'
import ChatBox from '@/components/ChatBox'
export default{
  name: 'ChatRoom',
  components:{
    ChatBox
  },
  data(){
    return{
      username: "",
      socket: io("http://localhost:5000"),
      messages: [],
      users: []
    }
  },
  methods:{
    scrollToBottom(){
      let box = document.querySelector('#ChatBox')
      box.scrollTop = box.scrollHeight+20
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
        this.scrollToBottom()
      })
    },
    sendMessage(message){
      this.socket.emit('msg', message)
    }
  },
  mounted(){
    this.username = prompt('what is your username?', 'Anonymous')
    if(!this.username){
      this.username = "Anonymous"
    }
    this.joinServer()
  }
}
</script>
