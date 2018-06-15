var express = require('express')
var app = new express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('浏览过的城市'+req.cookies.citys)
})

// lvyou?city=上海
app.get('/lvyou',(req,res)=>{
    var city = req.query.city
    var citys = req.cookies.citys;
    console.log()
    if(citys){
        citys.push(city)
        citys = Array.from(new Set(citys)) 
    }else{
        citys = []
    } 
    res.cookie('citys',citys)
    res.send('浏览过的城市')
})

app.listen(4000)