import { ActionTree, createStore} from 'vuex'
import axios from '../axios'
import {State} from '../interface'
const state:State={
  isLogin:false,
  personalBlogs:[],
  user:'',
  blogs:[],
  vblogs:[]
}
const actions:ActionTree<any,any>={
  login:async({commit},{name,password})=>{
    try {
      const res=await axios.post('/login',{
        name,
        password
      })
      commit('login',res.data)
    } catch (error) {
      if(error)
      throw error
    }
  },
  getPersonalBlogs:async({commit})=>{
    try {
      const res=await axios.get('/showi')
      commit('getPersonalBlogs',res.data)
    } catch (error) {
      if(error)
      throw error
    }
  },
  getBlogs:async({commit})=>{
    try {
      const res=await axios.get('/showAll')
      commit('getBlogs',res.data)
    } catch (error) {
      if(error)
      throw error
    }
  },
  loginOut:async({commit})=>{
    try {
      const res=await axios.get('/loginOut')
      commit('loginOut')
    } catch (error) {
      if(error)
      throw error;
    }
  },
  hasSession:async({commit})=>{
    try {
      const res=await axios.get('/hasSession')
      commit('hasSession',res.data)
    } catch (error) {
      if(error)
      throw error;
    }
  }
}
const mutations={
  login(state:State,data:any){
    if(data.data=='登录成功')
    {
      state.isLogin=true
      state.user=data.name
    }
    else
    alert(data.data)
  },
  getPersonalBlogs(state:State,data:any){
    if(data&&data!='403')
    state.personalBlogs=data.reverse()
  },
  getBlogs(state:State,data:any){
    if(Array.isArray(data))
    state.blogs=data.reverse()
  },
  loginOut(state:State){
    state.isLogin=false
  },
  match(state:State,data:any){
    state.vblogs=state.blogs.filter((item)=>item.title.toLowerCase().includes(data.toLowerCase()))
  },
  hasSession(state:State,data:any){
    if(data)
    {
      state.isLogin=true
      state.user=data
    }
  }
}
export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {},
});
