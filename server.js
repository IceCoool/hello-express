var express = require('express')
var bodyParser = require('body-parser')
var app = new express()
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});
//parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
//parser application/json
app.use(bodyParser.json())
//设置模板引擎
app.set('view engine', 'ejs')
//设置静态服务
app.use(express.static('static'))

var session = require('express-session')
app.use(session({
    secret: 'string key', //一个String类型的字符串，作为服务器端生成session的加密
    name: 'zker', //生成浏览器端cookie的名字 默认为connect.sid
    resave: false, //强制保存session 即使它并没有变化
    saveUninitialized: true, //强制将未初始化的session 存储
    cookie: {
        maxAge: 1000 * 60 * 30, //最大过期时间
    },
    rolling: true //在每次请求时强制设置cookie 重置过期时间
}))
// 引入数据库
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017' //数据库连接地址
app.use((req, res, next) => {
    if(req.url=='/login' || req.url=='/doLogin'){
        next()

    }else{
        if (req.session.userinfo && req.session.userinfo.username != ''){
            app.locals['userinfo'] = req.session.userinfo
            next()
        }else{
            res.redirect('/login')
        }
    }
})
// ejs 提供设置全局数据 所有路由均可使用
//app.locals['userinfo'] = 'ss'

app.get('/login', (req, res) => {
    res.render('login', {
        
    })
})
//获取登录提交的数据
app.post('/doLogin', (req, res) => {
    // req.body = 
    //连接数据库 db参数为数据库对象
    console.log(112)
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            console.log(err)
            return;
        }
        var db = client.db('product')
        // 另一种遍历数据的方法
        var result = db.collection("user").find(req.body)
        result.toArray((err, data) => {
            if (data.length > 0) {
                req.session.userinfo = data[0]
                res.redirect('/product')
            } else {
                res.send(`<script>
                alert('用户名密码错误');location.href='/login'
                </script>`)
            }
            client.close()
        })
    })
})


app.get('/product', (req, res) => {
    MongoClient.connect(dbUrl,(err,client)=>{
        if (err) {
            console.log(err)
            return;
        }
        var db = client.db('product');
        var result = db.collection('goods').find();
        result.toArray((err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.render('product', {
                    goods:data        
                })
            }
            client.close()
        })
    })
    
})
app.get('/add', (req, res) => {
    res.render('add', {

    })
})
app.get('/edit', (req, res) => {
    res.render('edit', {

    })
})
app.get('/delete', (req, res) => {

})
app.get('/loginOut', (req, res) => {
  req.session.destroy((err)=>{
    res.redirect('/login')
  })
})
app.listen(3005)