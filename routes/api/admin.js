const express=require('express');
const router=express.Router();
const adminServ=require('../../services/adminservice');
const { asyncHandler } = require("../getSendResult");
const jwt=require("../jwt")

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result= await adminServ.login(req.body.loginId,req.body.loginPwd);
    if(result){
      let value=result.id;
        // req.session.loginUser=result;
      jwt.publish(res,undefined,{id:value})
    }
    return result;
  })
);

//客户端获取自己的信息,只有当登录了才能获取自己的userId
router.get(
  "/whoami",
  asyncHandler(async (req, res) => {
    const result= await adminServ.getAdminById(req.userId)
    delete result.loginPwd;
    return result
  })
);
module.exports = router;
