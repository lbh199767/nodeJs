// const sequelize=require('./db');
// const { DataTypes }=require('sequelize');

// module.exports = sequelize.define("Student",{
//     name:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     birthday:{
//         type:DataTypes.DATE,
//         allowNull:false,
//     },
//     sex:{
//         type:DataTypes.BOOLEAN,
//         allowNull:false,
//     },
//     mobile:{
//         type:DataTypes.STRING(11),
//         allowNull:false,
//     },
//     address:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
// },
// {
//     createdAt:false,
//     updatedAt:false,
//     paranoid:true//从此以后，该表的数据不会真正的删除，而是怎加一列deletedAt,记录删除时间  
// });

const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const birth = this.getDataValue("birthday");
        if(birth){
          return birth.getTime();
        }
        return undefined;
      },
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = moment.utc();
        const birth = moment.utc(this.birthday);
        return now.diff(birth, "y"); //得到两个日期的年份的差异
      },
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);