<template>
    <div>
        <div class="sp">标题</div>
        <div id='title'>{{title}}</div>
        <div class="sp">内容</div>
        <textarea cols="30" rows="19" v-model="content" readonly id='blog'></textarea>
        <div id='agree'>
            <span @click="Agree(props.id)" >👍{{agree}}</span>
            <router-link to='/'>==关闭==</router-link>
            <span @click="Disagree(props.id)">👎{{disagree}}</span>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
    props:['id'],
    setup(props) {
        const title=ref('')
        const content=ref('')
        const author=ref('')
        const time=ref('')
        const agree=ref('')
        const disagree=ref('')
        const getBlog=async(id:any)=>{
            try {
                const res=await axios.get('/getBlog',{params:{id}})
                title.value=res.data[0].title
                content.value=res.data[0].content  
                author.value=res.data[0].author
                time.value=res.data[0].time
                agree.value=res.data[0].agree
                disagree.value=res.data[0].disagree        
            } catch (error) {
                if(error)
                throw error
            }
        }
        const getAgree=async(id:any)=>{
            try {
                const res=await axios.get('/getBlog',{params:{id}})
                agree.value=res.data[0].agree
                disagree.value=res.data[0].disagree
            } catch (error) {
                if(error)
                throw error
            }
        }
        const Agree=async(id:any)=>{
            try {
                const res=await axios.post('/agree',{id})
                setTimeout(()=>{
                    getAgree(id)
                },50)
            } catch (error) {
                if(error)
                throw error
            }
        }
        const Disagree=async(id:any)=>{
            try {
                const res=await axios.post('/disagree',{id})
                setTimeout(()=>{
                    getAgree(id)
                },50)
            } catch (error) {
                if(error)
                throw error
            }
        }
        getBlog(props.id)
        return{
            props,
            title,
            content,
            author,
            time,
            agree,
            disagree,
            Agree,
            Disagree
        }
    },
})
</script>

<style scoped>
 #blog{
     background-color:rgb(235, 235, 235);
     padding: 8px;
     font-size: 17px;
     width: 782px;
 }
 #blog:focus{
     outline: none;
 }
 #title{
     border: 1px solid gray;
     background-color: rgb(235, 235, 235);
     padding: 8px;
     margin-bottom: 20px;
     height: 25px;
     font-size: 17px;
 }
 .sp{
     height: 20px;
     font-size: 20px;
     line-height: 20px;
     padding: 0 0 13px 0;
 }
 span{
     cursor: pointer;
     font-size: 25px;
 }
 #agree{
     padding: 20px 0;
 }
 #agree :first-child{
     margin-left: 180px;
 }
 #agree :nth-child(3){
     margin-left: 120px;
 }
 #agree a{
    text-decoration: none;
    font-size: 22px;
    color: gray;
    cursor:pointer;
    margin-left: 115px;
 }
 #agree a:hover{
     color: black;
 }
 
</style>
