// 一个完整的系统，最重要的是验证，一定值服务器端

// 1.客服端（浏览器，app,pad,小程序)验证：为了用户体验
// 2.服务器端逻辑验证（业务逻辑层的验证）：为了业务逻辑的完整性，安全性
// 3.数据库验证：数据完整性


//管理员初始化
//判断数据库中是否存在管理员，如果没有自动添加一个默认管理员

const Book=require("../models/Book")

exports.addBook=async function(bookObj){
    //判断bookObj的各种属性是否合理，以及账户是否存在
    const ins=await Book.create(bookObj);
    return ins.toJSON();
}

exports.deleteBook=async function(bookId){
    //方式1
    // // 1.得到实例
    // const ins=await Book.findByPk(bookId)
    // // console.log(ins)
    // // 2.删除实例
    // if(ins){
    //     await ins.destroy();
    // }

    //方式2
    Book.destroy({
        where:{
            id:bookId,
        }
    })
}


exports.updateBook=async function(id,bookObj){
    //方式1：
    // // 1.得到实例
    // const ins=await Book.findByPk(id);
    // ins.loginId=bookObj.loginId
    // //2.保存
    // ins.save()

    //方式2：（没有得到实例）
    await Book.update(bookObj,{
        where:{
            id,
        }
    })
}