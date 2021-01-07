// const sequelize = require('./models/db');


//使用.authenticate()函数测试链接是否成功
// (async function(){
//     try{
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.')
//     }catch(error){
//         console.error('Unable to connect to the database:',error);
//     }
// })();


// require("./models/sync.js")//表同步到数据库


//管理原初始化
//——原生方法
// const Admin=require("./models/admin")
// // 方式1
// // const ins=Admin.build({
// //     loginId:'abc',
// //     loginPwd:'123',
// // });//同步方法，创建一个模型实例
// // ins.loginId='bcd';//可以更改
// // ins.save().then(()=>{
// //     console.log("创建管理员成功")
// // });

// // 方式2：
// Admin.create({
//     loginId:'admin',
//     loginPwd:'123456',
// }).then((ins)=>{
//     console.log(ins.id,ins.loginId,ins.loginPwd);
// })

//——封装方法
// const adminServ=require('./services/adminService');
// //添加
// adminServ.addAdmin({
//     loginId:"abc",
//     loginPwd:"123123",
// });
// //删除
// // adminServ.deleteAdmin(7);
// //修改
// adminServ.updateAdmin(8,{
//     loginId:'zai修改loginId'
// })




// require("./models/relation");
// require("./mock/mockStudent");//一次就行
// require("./spider/fetchBooks");//一次就行


//查询查询单个数据
// const adminServ=require("./services/adminservice")
// // adminServ.login('abc','123').then((r)=>{
// //     console.log(r)
// // })
// //按照主键查询单个数据
// adminServ.getAdminById(1).then((r)=>{
//     console.log(r)
// })


 
//查询多个数据
// const studServ=require("./services/studentservice")
// studServ.getStudents(1,10,false,'静').then((res)=>{//查询10条名字包含‘静’的女生
//     console.log(res)
// })


// require('./services/init')
// const { sequelize } = require('./models/Class')
// //validate验证
// const studServ=require('./services/studentservice')
// studServ.addStudent({
//     name:'黄辉宏',
//     birthday:'2006-8-8',
//     sex:true, 
//     mobile:'13558964752',
//     classId:2,
// })




// // 第四章 express

// // 创建express实例并且监听端口
// // 方式1
//     // const express=require('express')
//     // const http=require('http')
//     // const app=express();//用于创建一个express应用;app实际时一个函数，用于处理请求的函数
//     // const server=http.createServer(app);
//     // const port=9527;
//     // server.listen(port,()=>{
//     //     console.log(`server listen on ${port}`);
//     // })

// // 方式2
//     const express=require('express');
//     const app=express();//用于创建一个express应用;app实际时一个函数，用于处理请求的函数

//     //配置一个请求映射时，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
//     //app.请求方法（"请求路径"，处理函数）
//     app.get("/news/:id",(req,res)=>{//req和res是被express封装过后的对象
//        // 获取请求信息  localhost:9527/news/456?a=1&b=5
//         console.log('请求头',req.headers);//获取请求头对象
//         console.log('请求路径',req.path);//news    //获取请求路径
//         console.log('请求参数query',req.query);//获取请求query  {a:'1',b:'5'}
//         console.log("params",req.params);//动态获取 /:id   //{id:'456'}
//        // 响应
//         // res.send({
//         //     name:'zhuzhu',
//         //     age:23
//         // })
//         // res.setHeader("a",'123')//设置响应头

//         // res.status(302).header('location',"https://duyi.ke.qq.com").end();//重定向
//         // res.status(302).location("https://duyi.ke.qq.com").end();//重定向
//         res.redirect(302,"https://duyi.ke.qq.com")//默认302，不写就是301
//     })

//     //当请求地址不再是news时：
//     // app.get('*',(req,res)=>{
//     //     console.log('匹配任何get请求')
//     // })
//     const port=1527;
//     app.listen(port,()=>{
//         console.log(`server listen on ${port}`);
//     })



// //配置JWT
// const jwt=require("jsonwebtoken");
// const secrect='yuanjin';//密钥
// const token=jwt.sign(
//     {
//         id:1,
//         name:'成哥',
//     },
//     secrect,
//     {
//         expiresIn:3600*1000,//多少毫秒后过期
//     }
// )
// console.log(token)

// //解密
// try{
//     const decoded=jwt.verify(token,secrect);
//     console.log(decoded)
// }catch{
//     console.log('JWT无效')
// }


require("./init")

