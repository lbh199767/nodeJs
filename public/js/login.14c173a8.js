(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{a55b:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("p",[e._v(" 账号:"),t("input",{directives:[{name:"model",rawName:"v-model",value:e.loginId,expression:"loginId"}],attrs:{type:"text"},domProps:{value:e.loginId},on:{input:function(n){n.target.composing||(e.loginId=n.target.value)}}})]),t("p",[e._v(" 密码:"),t("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPwd,expression:"loginPwd"}],attrs:{type:"password"},domProps:{value:e.loginPwd},on:{input:function(n){n.target.composing||(e.loginPwd=n.target.value)}}})]),t("p",[t("button",{on:{click:e.handleClick}},[e._v("登录")])])])},i=[],r=(t("96cf"),t("1da1")),a={data:function(){return{loginId:"",loginPwd:""}},methods:{handleClick:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=e.$store.dispatch("loginUser/login",{loginId:e.loginId,loginPwd:e.loginPwd}),t?e.$router.push("/"):alert("账号密码错误");case 2:case"end":return n.stop()}}),n)})))()}}},l=a,d=t("2877"),u=Object(d["a"])(l,o,i,!1,null,null,null);n["default"]=u.exports}}]);
//# sourceMappingURL=login.14c173a8.js.map