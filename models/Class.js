const sequelize=require('./db');
// const Student=require('./Student');
const { DataTypes }=require('sequelize');

const Class = sequelize.define("Class",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    openDate:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    createdAt:false,
    updatedAt:false,
    paranoid:true//从此以后，该表的数据不会真正的删除，而是怎加一列deletedAt,记录删除时间  
});

// Class.hasMany(Student);//表关联，班级与学生一对多

// (async function(){
//     await Admin.sync({
//         alter:true,//如果表已经存在，则将新创建的表与之对照更改
//     });
//     console.log('模型Admin同步完成');
// })()

module.exports=Class;