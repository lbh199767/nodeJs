//1.发生请求的时候，如果有token，需要附带到请求头
//2.响应的时候，如果有token，保存token到本地（cookie,localStorage）
//3.如果响应的消息码是403（没有token,token失效),在本地删除token
import axios from "axios";
export default function () {
    //1.发生请求的时候，如果有token，需要附带到请求
    const token = localStorage.getItem("token");
    let instance = axios;
    if (token) {
        instance = axios.create({
            headers: {
                authorization: "bearer " + token,//注意bearer与token中间要加空格
            }
        })
    }
    instance.interceptors.response.use(
        (resp) => {
            //2.响应的时候，如果有token，保存token到本地（cookie,localStorage）
            if (resp.headers.authorization) {
                localStorage.setItem("token", resp.headers.authorization);
            }
            return resp
        },
        (err) => {
            //3.如果响应的消息码是403（没有token,token失效),在本地删除token
            if(err.response.status===403){
                localStorage.removeItem("token");
            }
            return Promise.reject(err)
        }
    );
    return instance;
}