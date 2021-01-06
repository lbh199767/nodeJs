const {getErr}=require("./getSendResult");
const {pathToRegexp}=require("path-to-regexp")
const cryptor=require("./../util/crypt")


//配置需要验证token的请求
const needTokenApi=[
    {method:"POST",path:"/api/student"},
    {method:'PUT',path:"/api/student/:id"}
]
//用于解析验证token
module.exports=(req,res,next)=>{
    const apis=needTokenApi.filter(api=>{
        const reg=pathToRegexp(api.path);
        return api.method===req.method&&reg.test(req.path);
    });
    if(apis.length===0){
        next();
        return;
    }
    let token=req.cookies.token;
    if(!token){
        token=req.headers.authorization;
    }
    if(!token){
        handleNonToken(req,res,next);
        console.log("认证未通过");
        return;
    }
    //验证token
    const userId=cryptor.decrypt(token);//对token进行解密并赋值到req
    req.userId=userId;
    console.log("认证通过");
    next()
}
function handleNonToken(req,res,next){
    res.status(403).send(getErr("you do not have any token to access the api",403))
}