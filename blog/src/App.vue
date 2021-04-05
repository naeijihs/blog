<template>
  <div id='container'>
    <div id='nav'>
      <li id="nav1">
        <router-link to='/'>首页</router-link> 
      </li>
      <li id="nav2">
        <router-link to='/user'>个人中心</router-link>
      </li>
    </div>
    <div id='content'>
          <router-view />
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent} from 'vue'

export default defineComponent({
  setup() {
    return{

    }
  },
})
</script>

<style scoped>
  #container{
    height: 100vh;
    width:800px;
    margin: 0 auto;
  }
  #nav{
    list-style: none;
    display: flex;
    padding: 22px 0 11px 0;
    font-size: 25px;
    height: 80px;
  }
  #nav1{
    margin-left: 340px;
  }
  #nav2{
    margin-left: 240px;
    margin-top: 13px;
  }
  #content{
    width: 800px;
    margin: 0 auto;
  }
  a{
    text-decoration: none;
    display: block;
    padding: 13px 26px;
    color:black;
  }
  #nav2 a{
    font-size: 17px;
    padding: 36px 0 0 0;
    color: gray;
  }
  a:hover{
    transform: translateY(2px);
    transition: 0.15s;
  }
</style>
