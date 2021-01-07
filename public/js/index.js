login.onclick = function () {
    fetch("http://localhost:5008/api/admin/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            loginId: 'abc',
            loginPwd: '123123',
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
}

upDataStu.onclick = function () {
    fetch("http://localhost:5008/api/student/1909", {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            name:"session测试"
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
}


