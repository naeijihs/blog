<template>
  <div id='login'>
      <input type='text' placeholder='用户名' v-model='name'>
      <input type='password' placeholder='密码' v-model='password'>
      <div id='btn'>
        <button @click='login(name,password)'>登录</button>
        <button @click='regist(name,password)'>注册</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {useStore}from 'vuex'
import axios from '../axios'
const isLogin=(store:any)=>{
  const regist=async(name:string,password:string)=>{
    if(name.trim()&&password.trim())
    try {
         const res=await axios.post('/regist',{
          name,
          password
    })
        alert(res.data)
    } catch (error) {
      if(error)
      throw error
    }
    else
    alert('用户名和密码不能为空')
  }
  const login=async(name:string,password:string)=>{
        if(name.trim()&&password.trim())
        store.dispatch('login',{name,password})
        else
        alert('用户名和密码不能为空')
  }
  return{
    regist,
    login
  }
}
export default defineComponent({
  setup() {
    let name=ref('')
    let password=ref('')
    const store=useStore()
    const {regist,login}=isLogin(store)
    return{
      name,
      password,
      regist,
      login
    }
  },
})
</script>

<style scoped>
  #login{
    width: 400px;
    margin: 85px auto;
    border: 1px solid gray;
    padding: 0 10px;
    border-radius: 6px;
  }
  input{
    width: 300px;
    height: 30px;
    font-size: 17px;
    margin-left: 46px;
    margin-top: 50px;
    border: 1px solid silver;
    border-radius: 6px;
    padding-left: 7px;
  }
  input:focus{
    outline: none;
    border: 1px solid black;
  }
  button{
    width: 70px;
    height: 35px;
    font-size: 16.5px;
    cursor: pointer;
    border: 1px solid silver;
    color: gray;
    border-radius: 6px;
    background-color:white;
  }
  button:hover{
    background-color: rgb(79, 166, 236);
    border: 1px solid rgb(79, 166, 236);
    color:white;
  }
  button:focus{
    outline: none;
  }
  button:first-child{
    margin-left: 75px;
  }
  button:last-child{
    margin-left: 100px;
  }
  #btn{
    margin-top: 32px;
    margin-bottom: 28px;
  }
</style>
