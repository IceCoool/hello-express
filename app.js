var express = require('express')
var app = new express()

//配置模板引擎 默认位置在views下查找
app.set('view engine','ejs')
//若需要改变模板位置
//app.set('views',__dirname+'/static')

//配置静态资源路径
app.use(express.static('static'))

// app.get('/course/:id', (req, res) => {// 动态路由 course/22
//     console.log(req.params)//{id:22}
//   res.send('course')
// })
// app.get('/text', (req, res) => {//动态路由 text?id=22&tid=33
//     console.log(req.query)//{id:22,tid:33}
//   res.send('text')
// })

//应用级中间件 表示匹配任何路由
//因为匹配到路由后就不会向下匹配 所以需要在内部调用next()
app.use((req,res,next)=>{
  console.log('前置操作')
  next()
})

app.get('/',(req,res)=>{
  res.render('index',{

  })
})
app.get('/news',(req,res)=>{
  var arr = [1,2,3]
  res.render('news',{
    list:arr
  })
})

app.get('/course',(req,res)=>{
  res.render('course/index',{
    
  })
})

//错误处理中间件 放到路由最后
app.use((req,res)=>{
  res.status(404).send('404页面')
})

app.listen(4000)
