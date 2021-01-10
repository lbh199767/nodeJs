import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as loginService from "./service/loginService"
// loginService.login("abc","123123").then((res)=>{
//   console.log(res)
// })
// loginService.whoamI().then((res)=>{
//   console.log(res) 
// }).catch((err)=>{
//   console.dir(err)
// })
store.dispatch('loginUser/whoamI');//在网站访问时，需要用token去换取用户身份

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
