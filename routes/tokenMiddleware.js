const {getErr}=require("./getSendResult");
const {pathToRegexp}=require("path-to-regexp")
const jwt=require('./jwt')


//配置需要验证token的请求
const needTokenApi=[
    {method:"POST",path:"/api/student"},
    {method:'PUT',path:"/api/student/:id"},
    {method:'GET',path:"/api/admin/whoami"}
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
    const result=jwt.verify(req)
    if(result){
        //认证通过
        req.userId=result.id;
        next()
    }else{
        handleNonToken(req,res,next)
    }
}
function handleNonToken(req,res,next){
    res.status(403).send(getErr("you do not have any token to access the api",403))
}