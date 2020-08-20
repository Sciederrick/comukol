import axios from 'axios'

const state={
  email:''
}

const getters={
    userEmail:state=>state.email
}

const actions={

}

const mutations={
  setEmail:(state, email)=>state.email=email
}

export default{
  state,
  getters,
  actions,
  mutations
}
