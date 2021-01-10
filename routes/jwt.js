const jwt = require("jsonwebtoken");
const secrect = 'yuanjin';//密钥
const cookieKey = "token";
//颁发jwt
exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge,
    });
    // 添加到cookie
    res.cookie(cookieKey, token, {
        maxAge: maxAge * 1000,
        path: '/'
    })
    //添加其他传输
    res.header("authorization", token)
}

//获取jwt
exports.verify = function (req) {
    let token = req.headers.authorization;//authorization需要手动添加到请求头，cookie会自动添加到消息头
    if (!token) {
        return null;
    }
    //验证token是不是autorization:bearer token这种形式
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1]
    try {
        const result = jwt.verify(token, secrect);
        return result;
    } catch (err) {
        return null;
    }
}