import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import elementui from "element-ui"
import "./element-variables.scss"

Vue.use(elementui)
Vue.config.productionTip = false

const bbt = "https://hemc.100steps.net/2017/wechat/Home/Index/index?state=";
const PREFIX = "/resource/post/" 
const baseUrl="http://111.230.183.100:5000";

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
