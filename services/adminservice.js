// 一个完整的系统，最重要的是验证，一定值服务器端

// 1.客服端（浏览器，app,pad,小程序)验证：为了用户体验
// 2.服务器端逻辑验证（业务逻辑层的验证）：为了业务逻辑的完整性，安全性
// 3.数据库验证：数据完整性


//管理员初始化
//判断数据库中是否存在管理员，如果没有自动添加一个默认管理员

const Admin=require("../models/admin")
const md5 = require("md5");

exports.addAdmin=async function(adminObj){
    adminObj.loginPwd = md5(adminObj.loginPwd);
    //判断adminObj的各种属性是否合理，以及账户是否存在
    const ins=await Admin.create(adminObj);
    return ins.toJSON();
}

exports.deleteAdmin=async function(adminId){
    //方式1
    // // 1.得到实例
    // const ins=await Admin.findByPk(adminId)
    // // console.log(ins)
    // // 2.删除实例
    // if(ins){
    //     await ins.destroy();
    // }

    //方式2
    const result=await Admin.destroy({
        where:{
            id:adminId,
        }
    });
    return result;
}


exports.updateAdmin=async function(id,adminObj){
    //方式1：
    // // 1.得到实例
    // const ins=await Admin.findByPk(id);
    // ins.loginId=adminObj.loginId
    // //2.保存
    // ins.save()

    //方式2：（没有得到实例）
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
      }
      const result = await Admin.update(adminObj, {
        where: {
          id,
        },
      });
      return result;
}


//登录
exports.login=async function(loginId,loginPwd){
    loginPwd=md5(loginPwd);
    const result=await Admin.findOne({
        where:{
            loginId,
            loginPwd,
        },
    });
    if(result && result.loginId===loginId){//严格区分大写写
        return result.toJSON();
    }
    return null
}

//按照主键查询单个数据
exports.getAdminById=async function(id){
    const result=await Admin.findByPk(id);
    if(result){
        return result.toJSON()
    }
    return null
}


exports.getAdmins = async function () {
    const result = await Admin.findAll();
    return JSON.parse(JSON.stringify(result));
  };