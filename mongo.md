### 数据库
启动数据库服务
```
mongod --dbpath 路径
```
连接数据库 
```
mongo 地址
```
显示数据库有哪些
```
show dbs
```
显示数据库中的表
```
show collections
```
使用数据库
```
use zker
```
创建集合
```
db.user.insert({"userName":"ll","age":20})
```
查找数据
```
db.user.find() 查找全部
db.user.find({"age":20}) 条件查找
db.user.find({"age":{$gt:20}) 大于20
db.user.find({"age":{$gte:20}) 大于等于20
db.user.find({"age":{$lt:20}) 小于20
db.user.find({"age":{$lte:20}) 小于等于20
db.user.find({"title":/文章/}) 查询title中包含“文章”两个字的数据 用于模糊查询
db.user.find({$or:[{"age":22},{"age":25}]}) or 查询
db.user.find({"name":/^z/})
db.user.find().skip(2) 查询2条以后的数据
db.user.find().limit(2) 查询前2数据
db.user.find().skip(0).limit(2) 分页
db.user.find().skip(2).limit(2) 分页
db.user.find().count() 统计数量
```
删除表
```
db.user.drop()
```
删除当前所在的数据库
```
db.dropDatabase()
```
修改数据
```
db.user.update({"name":"zhangsan"},{$set:{"name":"lisi"}})
```
删除数据
```
db.user.remove({"name":"zhangsan","age":20})
```

### node.js中使用mongodb
下载
```
npm install mongodb --save
```
配置
```javascript
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017'//数据库服务地址
```
使用
```javascript
MongoClient.connect(dbUrl,(err,client)=>{
        if(err){
            console.log(err)
            return;
        }
        var db = client.db('product')//连接指定的数据库
        var result = db.collection("user").find(req.body)
        result.toArray((err,data)=>{
            if(data.length>0){
                console.log('ok')
            }else{
                console.log('fail')
                res.end('')
            }
            client.close()
        })
    })
```
关于配置和使用 还有另一种写法 区别不大 但是有的mongodb模块版本会报错
```javascript
//这种直接在url中指定数据库的写法  在有的版本会报错  所以建议使用上面的写法
var dbUrl = 'mongodb://127.0.0.1:27017/product'//数据库服务地址
MongoClient.connect(dbUrl,(err,db)=>{
        if(err){
            console.log(err)
            return;
        }
        var result = db.collection("user").find(req.body)
        result.toArray((err,data)=>{
            if(data.length>0){
                console.log('ok')
            }else{
                console.log('fail')
            }
            db.close()
        })
    })
```










