const Mock=require('mockjs');
const result=Mock.mock({
    "datas|200-350":[{
        name:'@cname',
        birthday:'@date',
        'sex|1-2':true,
        mobile:'@natural(13000000000,19900000000)',
        address:'@county(true)',
        'ClassId|1-16':0
    }]
}).datas;
console.log(result)
const Student=require("../models/Student")
Student.bulkCreate(result);

