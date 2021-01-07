//第四章 express
// 创建express实例并且监听端口

// nodemon:nodemon是一个监听器，用于监控工程中的文件变化，如果发现文件有变化，可以执行一段脚本

// express中间件：
// 当匹配到请求后
// 1.交给第一个处理函数处理
// 2.函数需要手动交给后续中间件处理  next()
// 中间件处理细节
// 1.如果后续已经没有中间件：express发现如果响应没有结束(有没有调用res.end())，express会响应404,但是前面如果已经响应了消息码，则express响应前面的响应码———>后续中间件会继续允许，但无法res.send()
// 2.如果中间件发生了错误：不会停止服务器，相当于调用了next(错误对象)-->寻找后续处理错误的中间件，如果没有则响应500

// 常用中间件
// express.static();处理静态页面请求
// express.json()；处理格式为json的消息体
// express.urlencoded()；处理格式为x-www-form-urlencoded的消息体
const express = require('express');
const app = express();
const cors=require("cors");

const session=require("express-session");
app.use(
    session({
        secret:"hello",
        name:'sessionId'
    })
)

const path = require('path');
const staticRoot = path.resolve(__dirname, "../public");
/**
 * 以下代码的作用：
 * 当请求时，会根据（req,path）,从指定的目录中寻找是否存在该文件，如果存在直接响应文件内容，而不再交给后续处理
 * 如果文件不存在，则直接交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件，可以通过express.static()第二个参数进行配置
 */

//express.static()返回一个高阶函数，返回一个中间件
// app.use(express.static(staticRoot, { index: "index.html" }));
app.use(express.static(staticRoot));
// app.use("/static",(req,res)=>{
//     console.log(req.baseUrl,req.path)
// })

// cors处理跨域
// app.use(require("./corsMiddleware"))
const whiteList=["null","http://localhost:5008"]
app.use(cors({
    origin(origin,callback){
        if(whiteList.includes(origin)){
            callback(null,origin);
        }else{
            callback(new Error("not allowed"));
        }
    },
    credentials:true,
}));

//加入cookie-parser中间件
//加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
//加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser=require("cookie-parser");
app.use(cookieParser());
//应用token中间件
app.use(require("./tokenMiddleware"));

app.use(express.urlencoded({extended: true,}))
app.use(express.json());//当express.urlencoded()解析不了该消息体格式时执行express.json()
//app.use(require("./myUrlEncoded"));//模拟express.urlencoded()中间件

app.use("/api/student",require("./api/student"))
// app.use("/api/book",require("./api/book"))
// app.use("/api/class",require("./api/class"))
app.use("/api/admin",require("./api/admin"));


// app.get('/css/index.css', (req, res) => {
//     console.log('abc');
// })
app.use(require("./errorMiddleware"))

const port = 5008;
app.listen(port, () => {
    console.log(`server listen on ${port}`);
}) 