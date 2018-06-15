### 使用模板引擎
首先安装
```
npm install ejs --save-dev
```

然后配置express模板引擎(express 里使用模板引擎 安装就可以 不需要require)
```
app.set('view engine','ejs')
```

使用ejs
```javascript
//第一个参数是模板 第二个参数是数据
res.render('new',{
 'news':['a','c','d']
})
```
注册html模板引擎（如果需要）
```
app.engine('html',ejs.__express)
app.set('view engine','html')
```

### 公共模块引入
看public/header.ejs
引入写法 在所需位置 <%- include public/header.ejs%>


### 静态web服务 解析引入的css js等文件
如果你的静态资源存在多个目录下面，你可以多次调用express.static中间件，
express.static('public')给public目录下的文件提供静态服务
```
app.use(express.static('public'))
```
现在，public目录下面的文件就可以访问了 
```
http://localhost:3000/images/plate.png
http://localhost:3000/css/plate.css
http://localhost:3000/js/plate.js
```
配置虚拟静态目录（如果需要）
```
app.use('/static',express.static('public'))
```

### 提供文件下载功能
可以将zip包放大静态目录下 提供下载

### 动态路由
```javascript
// 动态路由 course/22
app.get('/course/:id', (req, res) => {
    console.log(req.params)//{id:22}
})
//动态路由 text?id=22&tid=33
app.get('/text', (req, res) => {
    console.log(req.query)//{id:22,tid:33}
})
```

### 中间件
中间件其实就是匹配路由之前和匹配路由之后的一系列操作

应用级中间件--表示匹配任何路由
```javascript
//因为匹配到路由后就不会向下匹配 所以需要在内部调用next()
app.use((req,res,next)=>{
  console.log('前置操作')
  next()
})
```

路由中间件--匹配路由

```javascript
//因为匹配到路由后就不会向下匹配 所以需要在内部调用next()
app.get('/news',(req,res,next)=>{
  console.log('路由中间件 若某一路由需要权限鉴定')
  next()
})
```

错误处理中间件

```javascript
//错误处理中间件 放到路由最后 匹配不到路由时执行
app.use((req,res)=>{
  res.status(404).send()
})
```

内置中间件--托管静态资源

```javascript
app.use(express.static('public'))
```

第三方中间件 -- cookie session 获取post提交的数据等

```javascript
//安装
npm install body-parser --save
//引入
var bodyParser = require('body-parser')
//配置
//parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parser application/json
app.use(bodyParser.json())
//这样就可以在路由中通过req.body拿到post提交的数据
```
