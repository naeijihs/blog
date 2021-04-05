<template>
  <div>
    <Login v-if='!isLogin' />
    <CRUD v-else />
  </div>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import {useStore} from 'vuex'
const Login=defineAsyncComponent(()=>import('./Login.vue'))
const CRUD=defineAsyncComponent(()=>import('./CRUD.vue'))
export default defineComponent({
  components:{
    Login,
    CRUD
  },
  setup() {
    const store=useStore()
    const isLogin=computed(()=>store.state.isLogin)
    const hasSession=()=>{
      store.dispatch('hasSession')
    }
    hasSession()
    return{
      isLogin
    }
  },
})
</script>
