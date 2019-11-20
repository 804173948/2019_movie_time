import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import elementui from "element-ui"
import "./element-variables.scss"


Vue.use(elementui)
Vue.config.productionTip = false

const bbt = "https://hemc.100steps.net/2017/wechat/Home/Index/index?state=";
const PREFIX = ""//"/resource/post/"
const baseUrl="https://hemc.100steps.net/2019/carving-time-backend/api"; //"http://111.230.183.100:5000";

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

export {bbt, PREFIX, baseUrl,wxshare}

function wxshare() {
  //分享到朋友圈
  $.ajax({
      url: "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi",
      type: "post",
      dataType: "json",
      data: {
          url: location.href
      },
      success: function (arr) {
          wx.config({
              debug: false,
              appId: arr.appId,
              timestamp: arr.timestamp,
              nonceStr: arr.nonceStr,
              signature: arr.signature,
              jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"]
          });
          wx.ready(function () {
              wx.updateTimelineShareData({
                  title: "百步梯·雕刻时光",
                  link: "https://hemc.100steps.net/2019/carving-time", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "./assets/logo.jpg",
                  success: function () {
                      console.log("success");
                      // 设置成功
                  }
              });
              wx.updateAppMessageShareData({
                  title: "百步梯·雕刻时光", // 分享标题
                  desc: "", // 分享描述
                  link: "https://hemc.100steps.net/2019/carving-time", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "./assets/logo.jpg", // 分享图标
                  success: function () {
                      console.log("success");
                      // 设置成功
                  }
              });
          });
      }
  });

}
