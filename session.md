session 是在浏览器第一次访问服务器的时候，会在服务器生成一个session对象，服务器将对象的key值返回给浏览器保存在cookie中，当第二次浏览器访问服务器的时候，会将key值带到服务器，服务器根据key值将value值返回
```javascript
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
```

设置session
```
session.userinfo = data
```



当用户退出或者切换账号时 需要主动销毁session
```javascript
//可以主动销毁
req.session.destroy((err)=>{ 
    console.log(err)
})
//也可以将过期时间设置为0
req.session.cookie.maxAge = 0
```
session数据默认是以文件的形式保存在web服务器的磁盘上，一般都是用户登录成功的时候，保存session数据。
负载均衡-->需要多台服务器，根据网络环境，访问量等因素为客户选择服务器优化客户体验，因此客户访问的服务器可能在短时间内发生改变，由于服务器的改变导致客户的session数据丢失，影响登录等状态，所以如果需要做负载均衡，那么就需要借助手段保存session数据使服务器之间可以共享session数据，这种手段包括将session存储在数据库，或者利用redi或memcache



