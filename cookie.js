var express = require('express')
var app = new express()
// 引入cookie-parser
var cookieParser = require('cookie-parser')
// 注册cookie-parser
app.use(cookieParser())

app.get('/', (req, res) => {
})
app.get('/news', (req, res) => {
  console.log(req.cookies.username)
  res.send('获取cookie')
})
// domain 域名  可以设置来让多个二级域名共享cookie
// aa.com 域名
// news.aa.com 二级域名
// course.aa.com 二级域名
app.get('/set', (req, res) => {
  // 参数1 key
  // 参数2 value
  // 参数3 cookie设置信息 如过期时间等
  var user = {
    username: 'll',
    pwd: '123'
  }
  res.cookie('username', user, {maxAge: 60000,domain: '.aa.com'})
  res.send('设置cookie')
})

app.listen(4000, '127.0.0.1')
