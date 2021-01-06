// console.log('abcdefg');


//测试同源策略
//简单请求
// fetch("http://localhost:5008/api/student")
//     .then((res) => res.json())
//     .then((res) => {
//         console.log(res)
//     })

//预检请求
// fetch("http://localhost:5008/api/student", {
//     method: "POST",
//     headers: {
//         "content-type": "application/json",
//         a: 1,
//     }
// }).then((res) => res.json()).then((res) => { console.log(res) })


// 附带身份凭证的预检请求
fetch("http://localhost:5008/api/student", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        a: 1,
    },
    credentials: "include",
    //include始终携带身份凭证；omit:不带身份凭证；same-origin:没有跨域时携带
}).then((res) => res.json()).then((res) => { console.log(res) })

//利用jsonp实现跨域访问资源,只能作用于get请求
// function jsonp(url){
//     const script=document.createElement("script")
//     script.src=url;
//     document.body.appendChild(script);
//     script.onload=function(){//script元素加载完毕后移除
//         script.remove();
//     }
// }
// function callback(data){
//     console.log(data);
// }
// jsonp("http://localhost:5008/api/student")