import { resolve } from "path";
import request from "./request";

function delay(duration){//模拟远程请求时的网络延迟
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },duration)
    })
}
export async function login(loginId,loginPwd){
    await delay(2000);
    const resp=await request().post("/api/admin/login",{loginId,loginPwd});
    return resp.data;
}
//注销账号
export function loginOut(){
    localStorage.removeItem("token")
}


//查看自己的身份信息
export async function whoamI(){
    await delay(2000);
    const resp=await request().get("/api/admin/whoami");
    return resp.data;
}