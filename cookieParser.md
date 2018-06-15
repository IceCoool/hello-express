### 如何配置cookie-parser
下载cookie-parser
```
npm install cookie-parser --save
```
引入cookie-parser
```javascript
var cookieParser = require('cookie-parser')
```
配置cookie-parser
```javascript
// 一定要注意使用写法！！！
app.use(cookieParser())
```
### cookie使用
```javascript
req.cookies
```
cookie 参数
```
domain 域名设置
path 路径设置
httpOnly 设为true 表示只能在服务端 nodejs来访问设置的cookie  在客户端使用js是无法访问设置的cookie的
signed 设为true 加密cookie 这时需要使用res.signedCookies而不是res.cookies来访问 被篡改的cookie会被服务器拒绝，并重置为原始值
```
domain 域名 可以设置来让多个二级域名共享cookie
```
aa.com 域名
news.aa.com 二级域名
course.aa.com 二级域名
 res.cookie('username',user,{maxAge:60000,domain:'.aa.com'})
```
可以通过修改hosts（C:\Windows\System32\drivers\etc） 来模拟二级域名的实现
![](/static/image/domain.png)

### 加密cookie
一般存储cookie是明文存储的，客户可以直接看到cookie信息，这样是很不安全的，所以需要对cookie进行加密处理，cookie-parser 内置一个加密参数 signed:true 如果需要使用这个参数 需要在注册时
```javascript
app.use(cookieParser('sign'))
// sign 表示要使用这个字符串对cookie进行加密  这个字符串可以是任意的
```
当需要获取cookie时  使用`res.signedCookies`这种方式访问