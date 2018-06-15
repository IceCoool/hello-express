var express = require('express')
var app = new express()
// express-session
var session = require('express-session')
// 配置session中间件
app.use(session({
  secret: 'string key',//一个String类型的字符串，作为服务器端生成session的加密
  name:'zker',//生成浏览器端cookie的名字 默认为connect.sid
  resave: false,//强制保存session 即使它并没有变化
  saveUninitialized: true,//强制将未初始化的session 存储
  cookie: {
    secure: true,// https 这样的情况才可以访问cookie
    maxAge:'6000',//最大过期时间
  },
  rolling:true //在每次请求时强制设置cookie 重置过期时间
}))

app.get('/', (req, res) => {
    if(req.session.userinfo){
        res.send('已登录')
    }else{
        res.send('未登录')
    }
  res.send('first')
})
app.get('/login', (req, res) => {
  req.session.userinfo = 'zhangsan'//设置session
  res.send('登录成功')
})
app.get('/loginOut', (req, res) => {
    // 退出登录 销毁session可以将过期时间设置为0
    // 也可以主动销毁
    req.session.destroy((err)=>{ 
        console.log(err)
    })
    req.session.cookie.maxAge = 0
    res.send('退出成功')
  })

app.listen(4000, '127.0.0.1')
