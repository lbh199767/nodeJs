//处理错误的中间件
const getMsg=require("./getSendResult")

module.exports=(err,req,res,next)=>{
    if(err){
        // 发生错误
        const errObj=err instanceof Error?err.message:err;
        res.status(500).send(getMsg.getErr(errObj))
    }else{
        next()
    }
}