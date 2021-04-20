const express=require('express')
const app=express()
const router=require('./router')
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.setHeader('Access-Control-Allow-Credentials',true)
    if(req.method=='OPTIONS')
    res.end('200')
    else
    next()
})
app.use('/',router)
app.use(express.static('dist'))
app.listen(8000,()=>{   
    console.log('服务器启动')
})