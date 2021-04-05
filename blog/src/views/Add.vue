<template>
    <div>
        <div id='addT'><input type='text' placeholder='标题' v-model='title'></div>
        <div><textarea cols='30' rows='23' placeholder='内容' v-model='content'></textarea></div>
        <div id='addC'><a @click='add(title,content)'>==发布==</a><router-link to='/user'>==关闭==</router-link></div>
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import axios from '../axios'
export default defineComponent({
  setup() {
    const title=ref('')
    const content=ref('')
    const add=async(Title:any,Content:any)=>{
      if(Title.trim()&&Content.trim())
        try {
             const res=await axios.post('/add',{
              Title,
              Content
          })
            res.data!='403'&&alert(res.data);
            title.value=""
            content.value=""
        } catch (error) {
            if(error)
            throw error
        }  
      else
      alert("标题和内容不可为空")     
      }
    return{
        title,
        content,
        add
    }
  }
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
    border: 1px solid gray;
  }
  #addT{
    margin-bottom: 30px;
  }
  #addC{
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
