<template>
  <div>
    <div id='user'>
      <div id='name'>
        用户：{{user}}
      </div>
      <div id='add'>
        <router-link to='/add'>添加博文</router-link>
      </div>
      <div id='lgo'>
        <a @click="loginOut" id='loginOut'>
          退出登录
        </a>
      </div>
    </div>
    <div id='pbc'>
      <table>
        <tr>
          <th>标题</th>
          <th>时间</th>
          <th>👍</th>
          <th>👎</th>
          <th></th>
        </tr>
        <tr v-for='(item,index) of personalBlogs' :key='index'>
          <td><router-link :to='`/modify/${item.id}`'>{{item.title}}</router-link></td>
          <td>{{item.time}}</td>
          <td>{{item.agree}}</td>
          <td>{{item.disagree}}</td>
          <td><span @click='deleteBlog(item.id)' style="cursor:pointer;">❌</span></td>
        </tr>
      </table>   
    </div>
  </div>
</template>

<script lang='ts'>
import axios from 'axios'
import { computed, defineComponent } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup() {
    const store=useStore()
    const user=computed(()=>store.state.user)
    const personalBlogs=computed(()=>store.state.personalBlogs)
    const getPB=()=>{
          setTimeout(()=>{
          store.dispatch('getPersonalBlogs')
    },50)
    }
    const loginOut=()=>{
      store.dispatch('loginOut')
    }
    const deleteBlog=async(id:number)=>{
      try {
        const res=await axios.get('/delete',{params:{id}})
              res.data!='403'&&getPB()
      } catch (error) {
        if(error)
        throw error
      }
    }
    getPB()
    return{
      user,
      personalBlogs,
      deleteBlog,
      loginOut
    }
  },
})
</script>

<style scoped>
#user{
  height: 60px;
  display: flex;
  border: 1px dashed silver;
  line-height: 60px;
  font-size: 18px;
  border-radius: 6px;
  padding-left: 17px;
}
#name{
  width: 400px;
  text-align: left;
  align-content: center;
}
#add{
  margin-left: auto;
}
#user a{
  text-decoration: none;
  color: gray;
}
#user a:hover{
  cursor: pointer;
  color: black;
}
#lgo{
  margin-left: 60px;
  margin-right: 27px ;
}
#pbc{
  margin-top: 20px;
}
#pbc a{
  text-decoration: none;
  color: black;
}
#pbc a:hover{
  color: silver;
}
table{
  width: 800px;
  border-collapse: collapse;
  font-size: 18px;
}
th,td{
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  text-align: left;
  padding: 15px 0 15px 18px;
}
</style>
