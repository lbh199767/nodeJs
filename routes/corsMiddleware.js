const allowOrigins = ["http://127.0.0.1:5500", "null"];
module.exports = function (req, res, next) {
    //处理预检请求
    if (req.method === 'OPTIONS') {//当request.method==='OPTIONS'时可以判定为需要预检的请求
        // console.log('这是一个预检请求')
        res.header(
            `Access-Control-Allow-Methods`,
            req.headers["access-control-request-method"]
        );
        res.header(
            `Access-Control-Allow-Headers`,
            req.headers["access-control-request-headers"]
        );
    }
    //处理需要携带身份凭证时
    res.header("Access-Control-Allow-Credentials", true)
    //处理简单请求
    if ("origin" in req.headers && allowOrigins.includes(req.headers.origin)) {
        res.header("access-control-allow-origin", req.headers.origin);
    }
    next();
}

