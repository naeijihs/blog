import axios from 'axios'
import store from './store'
import router from './router'
axios.defaults.baseURL='http://localhost:8000'
axios.defaults.withCredentials=true
axios.interceptors.response.use(
    res=>{
        if(res.data=='403')
        {
            alert('登录失效，请重新登录')
            store.commit('loginOut')
            router.push('/user')
        }
        return res
    },
    err=>{
        return Promise.reject(err)
    }
)
export default axios