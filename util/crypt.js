//使用堆成加密算法对token加密
//128bit的密钥
const secret = Buffer.from("5glz6rb5qlt17ra6");
const crypto = require('crypto');


//准备一个iv,随机向量
const iv = Buffer.from("n833t4ax6ri3x9je");
//加密
exports.encrypt = function (str) {
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    let result = cry.update(str, 'utf-8', 'hex');
    result += cry.final("hex");
    return result;
}

//解密
exports.decrypt = function (str) {
    const decry = crypto.createCipheriv("aes-128-cbc", secret, iv)
    let result = decry.update(str, 'hex', 'utf-8');
    result += decry.final("utf-8");
    return result;
}