const express=require('express')
const router=express.Router()
const query=require('./mysql')
const bodyParser = require('body-parser')
const session=require('express-session')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(session({
    secret:'123',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))
router.post('/regist',(req,res,next)=>{
    query('SELECT name FROM user WHERE name=?',req.body.name,(results)=>{
        if(results.length)
        res.json('用户名已存在')
        else
        next()
    })
},(req,res)=>{
    query('INSERT INTO user(name,password) VALUES (?,?)',[req.body.name,req.body.password],()=>{
        res.json('注册成功')
    })
})
router.post('/login',(req,res)=>{
    query('SELECT * FROM user WHERE name=?&&password=?',[req.body.name,req.body.password],(results)=>{
        if(results.length)
        {
            req.session.name=req.body.name
            req.session.password=req.body.password
            res.json({
                data:'登录成功',
                name:req.body.name
            })
        }
        else
            res.json({
                data:'用户名或密码错误'
        })
    })
})
router.post('/add',(req,res)=>{
    if(req.session.name)
    query('INSERT INTO blog (title,content,author) VALUES (?,?,?)',[req.body.Title,req.body.Content,req.session.name],()=>{
        res.json('发布成功')
    })
    else
    res.json('403')
})
router.get('/showi',(req,res)=>{
    if(req.session.name)
    query('SELECT * FROM blog WHERE author=?',req.session.name,(results)=>{
        res.json(results)
    })
    else
    res.json('403')
})
router.post('/modify',(req,res)=>{
    if(req.session.name)
    query('UPDATE blog SET title=?,content=? WHERE id=?',[req.body.title,req.body.content,req.body.id],()=>{
        res.json("修改成功")
    })
    else
    res.json('403')
})
router.get('/getBlog',(req,res)=>{    
    query('SELECT * FROM blog WHERE id=?',req.query.id,(results)=>{
        res.json(results)
    })
})
router.get('/showAll',(req,res)=>{
    query('SELECT * FROM blog',[],(results)=>{
        res.json(results)
    })
})
router.get('/delete',(req,res)=>{
    if(req.session.name)
    query('DELETE FROM blog WHERE id=?',req.query.id,()=>{
        res.json("")
    })
    else
    res.json('403')
})
router.post('/agree',(req,res)=>{
    query('UPDATE blog SET agree=agree+1 WHERE id=?',req.body.id,()=>{
        res.json('')
    })
})
router.post('/disagree',(req,res)=>{
    query('UPDATE blog SET disagree=disagree+1 WHERE id=?',req.body.id,()=>{
        res.json('')
    })
})
router.get('/loginOut',(req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.json('退出登录')
})
router.get('/hasSession',(req,res)=>{
    if(req.session.name)
    res.json(req.session.name)
    else
    res.json('')
})
module.exports=router