const sequelize=require('./db');
const { DataTypes }=require('sequelize');

module.exports = sequelize.define("Student",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    birthday:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    sex:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    mobile:{
        type:DataTypes.STRING(11),
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    createdAt:false,
    updatedAt:false,
    paranoid:true//从此以后，该表的数据不会真正的删除，而是怎加一列deletedAt,记录删除时间  
});

