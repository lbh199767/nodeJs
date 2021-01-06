const Student=require("../models/Student")
const {Op}=require('sequelize');//Op提供模糊查询Api
const validate=require("validate.js");
const moment=require('moment')
const Class=require("../models/Class")



exports.addStudent=async function(studentObj){
    //自定义验证判断addStudent时所填班级是否存在
    validate.validators.classExits=async function(value){
        const c=await Class.findByPk(value)
        if(c){
            return;
        }
        return "is not exist"
    }
    const rule={
        //验证规则
        name:{
            presence:{
                allowEmpty:false,//是否允许为空
            },
            type:'string',//name必须为字符串格式
            length:{
                minimum:1,
                maximum:10
            }
        },
        birthday:{
            presence:{
                allowEmpty:false,
            },
            datetime:{
                dateOnly:true,//只含日期不含具体时刻
                earliest:moment.utc().subtract(100,'y'),//不早于当前年份减去100年
                latest:+moment.utc().subtract(5,'y'),//不晚于当前年份减去5年（年龄不能小于5岁）
            },
        },
        sex:{
            presence:true,
            type:'boolean',
        },
        mobile:{
            presence:{
                allowEmpty:false,
            },
            format:/1\d{10}/,
        },
        ClassId:{
            presence:true,//不为空
            // type:'integer',//必须为数字，数字字符串不行
            numericality:{
                onlyInteger:true,//数字字符串也行
                strict:false,//是否严格验证，数字字符串验证能不能通过
            },
            classExits:true
        }
    }
    // 1.同步验证
    // const result=validate.validate(studentObj,rule)
    // console.log(result)//验证提供返回undefined

    // 2.当使用自定验证时需要异步验证
    await validate.async(studentObj,rule);
 
    // // 判断studentObj的各种属性是否合理，以及账户是否存在
    const ins=await Student.create(studentObj);
    return ins.toJSON();
}

exports.deleteStudent=async function(studentId){
    //方式1
    // // 1.得到实例
    // const ins=await Student.findByPk(studentId)
    // // console.log(ins)
    // // 2.删除实例
    // if(ins){
    //     await ins.destroy();
    // }

    //方式2
    Student.destroy({
        where:{
            id:studentId,
        }
    })
}


exports.updateStudent=async function(id,studentObj){
    //方式1：
    // // 1.得到实例
    // const ins=await Student.findByPk(id);
    // ins.loginId=studentObj.loginId
    // //2.保存
    // ins.save()

    //方式2：（没有得到实例）
    return await Student.update(studentObj,{
        where:{
            id,
        }
    })
}


//查询多个数据
exports.getStudents=async function(page=1,limit=10,sex=-1,name){
    // const result=await Student.findAll({//分页查询
    //     offset:(page-1)*limit,
    //     limit:+limit,
    // });
    // const total=await Student.count()//数据总条数
    // const datas=JSON.parse(JSON.stringify(result));
    // return{
    //     total,
    //     datas,
    // } 
    const condition={};
    if(sex!==-1){
        condition.sex=!!sex
    }
    if(name){
        condition.name={
            [Op.like]:`%${name}%`
        }
    }
    const result=await Student.findAndCountAll({//findAndCountAll方法直接返回数据总数和分页数据信息
        attributes:['id','name','sex'],//查询到的信息只包含id,name ,sex
        where:condition,
        offset:(page-1)*limit,
        limit:+limit,
    });
    // return result
    return{
        total:result.count,
        datas:JSON.parse(JSON.stringify(result.rows))
    }
}
//查询查询单个数据
//按照主键查询单个数据
exports.getStudentById=async function(id){
    const result=await Student.findByPk(id);
    if(result){
        return result.toJSON()
    }
    return null
}