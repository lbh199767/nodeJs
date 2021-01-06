const moment=require('moment')
moment.locale("zh-cn")
//得到当前时间moment对象
console.log('本地时间：'+moment().toString());
console.log('utc时间：'+moment.utc().toString())


//得到当前时间戳
console.log('本地时间：'+moment().valueOf(),+moment());
console.log('utc时间：'+moment.utc().valueOf(),+moment.utc())



//根据指定的时间格式得到时间，时间格式：xxxx-xx-xx   xxxx/xx/xx  时间戳
console.log('本地时间：'+moment(0).toString(),+moment(0));
console.log('utc时间：'+moment.utc(0).toString(),+moment(0))


//使用日期令牌转换
//令牌是一个格式化的字符串，例如：“YYYY-MM-DD HH:mm:ss”
const format=["YYYY-MM-DD HH:mm:ss","YYYY-M-D H:m:s",'x'];

console.log(moment.utc("1970-01-01 00:00:00",format,true).toString());
console.log(moment.utc("1970-1-1 0:0:0",format,true).toString());
console.log(moment.utc(0,format,true).toString());
// console.log(moment.utc("1970-01-01 00:00:00",format,true).toString());

//显示（发生在客服端）
const m=moment.utc("2019-1-3 12:21:45",format,true)
console.log(m.local().format("YYYY年MM月DD日 HH点mm分ss秒"));
//m.local()utc时间转化成本地时间
//m.utc()本地时间转化成utc时间

console.log(m.local().fromNow());//2 years ago,当使用moment.locale("zh-cn")显示位 2年前

