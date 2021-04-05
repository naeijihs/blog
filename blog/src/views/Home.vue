<template>
  <div id="ctn">
    <div>
      <input type="text" v-model="search" placeholder="🔍搜索内容" id='search'>
    </div>
    <div id="blogs">
      <table>
        <tr>
          <th>标题</th>
          <th>作者</th>
          <th>时间</th>
          <th>👍</th>
          <th>👎</th>
        </tr>
        <tr v-for='(item,index) of vblogs' :key="index">
          <td><router-link :to='`/detail/${item.id}`'>{{item.title}}</router-link></td>
          <td>{{item.author}}</td>
          <td>{{item.time}} </td>
          <td>{{item.agree}}</td>
          <td>{{item.disagree}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup() {
    const store=useStore()
    const search=ref('')
    const vblogs=computed(()=>store.state.vblogs)
    const getBlogs=()=>{
      store.dispatch('getBlogs')
    }
    getBlogs()
    const match=()=>{
      setTimeout(()=>{
        store.commit('match',search.value)
      },50)
    }
    watch(search,()=>{
      match()
    },{immediate:true})
    return{
      vblogs,
      search
    }
  },
})
</script>

<style scoped>
#blogs{
  list-style: none;
  margin-top: 25px;
  font-size: 18px;
}
a{
  color: black;
  text-decoration: none;
}
#search{
  width: 800px;
  height: 45px;
  font-size: 18px;
  padding-left:8px;
  border: 1px solid silver;
}
#ctn{
  width: 800px;
}
pre{
  margin: 0;
  padding: 0;
}
table{
  width: 813px;
  text-align: left;
  border-bottom: 1px solid silver;
  border-collapse: collapse;
}
table a:hover{
  color: silver;
}
td,th{
 border-top:1px solid silver;
 padding: 15px 0 15px 12px;
}
</style>
