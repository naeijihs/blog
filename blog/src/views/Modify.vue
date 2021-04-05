<template>
  <div>
      <div id='mt'><input type="text" v-model='title' placeholder='标题'></div>
      <div><textarea cols="30" rows="23" v-model='content' placeholder='内容'></textarea></div>
      <div id='mc'><a @click='modify(props.id,title,content)'>==修改==</a><router-link to='/user'>==关闭==</router-link></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import axios from '../axios'
export default defineComponent({
  props:['id'],
  setup(props) {
      const title=ref('')
      const content=ref('')
      const getBlog=async(id:number,title:any,content:any)=>{
          try {
              const res=await axios.get('/getBlog',{params:{id}})
              title.value=res.data[0].title
              content.value=res.data[0].content           
          } catch (error) {
              if(error)
              throw error
          }
      }
      getBlog(props.id,title,content)
      const modify=async(id:number,title:any,content:any)=>{
          if(title.trim()&&content.trim())
          try {
              const res=await axios.post('/modify',{
                  id,
                  title,
                  content
              })
              res.data!='403'&&alert(res.data);
          } catch (error) {
              if(error)
              throw error
          }
          else
          alert('标题和内容不可为空')
      }
    return{
        modify,
        title,
        props,
        content
    }
  },
})
</script>


<style scoped>
  input{
    width: 789px;
    height: 33px;
    font-size: 18px;
    padding-left: 5px;
  }
  textarea{
    width: 788px;
    font-size: 18px;
    padding: 5px 5px;
  }
  #mt{
    margin-bottom: 30px;
  }
  #mc{
    margin-top: 4px;
    padding: 8px 0;
  }
  a{
    text-decoration: none;
    font-size: 20px;
    color: gray;
    cursor:pointer;
  }
  a:first-child{
    margin-left: 160px;
  }
  a:last-child{
    margin-left: 275px;
  }
  a:hover{
    color: black;
  }
</style>
