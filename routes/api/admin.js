const express=require('express');
const router=express.Router();
const adminServ=require('../../services/adminservice');
const { asyncHandler } = require("../getSendResult");
const cryptor=require("../../util/crypt");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result= await adminServ.login(req.body.loginId,req.body.loginPwd);
    if(result){
        // //登录成功
        // let value=result.id;
        // value=cryptor.encrypt(value.toString());//token加密
        // // cookie-parser设置cookie
        // res.cookie("token",value,{
        //   path:'/',
        //   domain:"localhost",
        //   maxAge:7*24*3600*1000,//设置毫秒数
        //   // httpOnly:true//只在服务器端可见
        // });
        // res.header("authorization",value);//针对移动端无法添动添加cookie；authorization:认证
        // // res.header("set-cookie",`token=${result.id};path=/;domain=localhost;max-age=3600`)
        req.session.loginUser=result;
    }
    return result;
  })
);

module.exports = router;




// session原理
//session自带加密算法，服务器重启时session id将失效，所有当需要发送请求时需要重新登录
// 1.先引入express-session,配置session   详见“route/init.js”
// 2.将登录数据保存到session              详见“route/api/admin.js”
// 3.验证session                         详见“route/tokenMiddleware.js”