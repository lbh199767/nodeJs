require('./admin');
require('./Class');
require('./Book');
require('./Student');

const sequelize=require("./db")
sequelize.sync({alter:true}).then(()=>{
    console.log('所有模型同步完成')
})

