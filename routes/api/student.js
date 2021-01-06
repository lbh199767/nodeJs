const express = require('express');
// const { nextTick } = require('process');
const router = express.Router();
const stuServ = require('../../services/studentservice');
// const sendMsg=require("../getSendResult")
// //获取学生
// router.get("/",async(req,res)=>{
//     const page=req.query.page||1;
//     const limit=req.query.limit||10;
//     const sex=req.query.sex||-1;
//     const name=req.query.name||"";
//     // const result=await stuServ.getStudents(1,10,false,'静');
//     const result=await stuServ.getStudents(page,limit,sex,name);
//     res.send(sendMsg.getResult(result))
// })

// //获取单个学生
// router.get("/:id",async(req,res)=>{
//     // res.send("获取单个学生")
//     const result=await stuServ.getStudentById(req.params.id)
//     res.send(sendMsg.getResult(result))
// })

// //添加学生
// router.post("/",async(req,res,next)=>{
//     try{
//         const result=await stuServ.addStudent(req.body)
//     res.send(sendMsg.getResult(result))
//     }catch(err){
//         console.log(err);
//         next(err)
//     }
// })

const { asyncHandler } = require("../getSendResult");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await stuServ.getStudents(page, limit, sex, name);
  })
);

//jsonp实现跨域
// router.get(
//   "/",
//   async (req, res) => {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const sex = req.query.sex || -1;
//     const name = req.query.name || "";
//     const result = await stuServ.getStudents(page, limit, sex, name);
//     const json = JSON.stringify(result)
//     const script = `callback(${json})`
//     res.header("content-type", "application/javascript").send(script);
//   });

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    return await stuServ.getStudentById(req.params.id);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.addStudent(req.body);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.deleteStudent(req.params.id);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.updateStudent(req.params.id, req.body);
  })
);

module.exports = router;