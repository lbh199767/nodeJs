const {Sequelize}=require('sequelize');

//创建orm实例
const sequelize=new Sequelize('myschooldb','root','123123',{
    host:'localhost',
    dialect:"mysql",//选择‘mysql’|'mariadb'|'postgres'|'mssql'其一
    logging:null,//命令行不显示日志记录
});


module.exports=sequelize;