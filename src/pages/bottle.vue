<template>
<div class="main">
  <div class="title">
    <img :src="bottle1" class="star"/>
    <div class="font1">我的许愿瓶</div>
  </div>
  <div class="progressContainer">
     <div class="progress" :style="{width:score+'%'}"></div>
     <div class="font2" :style="{'padding-left':progress+'%'}">{{progress}}%</div>
  </div>
  <div class="font3">
    许愿瓶满后可以凭借此页面到相应地点换取精美礼品一份，礼物有限先到先得
  </div>
  <hr class="split">
  <btn1 style="top:82%;"></btn1>
  <btn2 style="top:82%;"></btn2>
  <btn3 style="top:82%;"></btn3>
</div>
</template>

<script>
import bottle1 from "../assets/bottle1.png"
import btn1 from "../components/btn1"
import btn2 from "../components/btn2"
import $ from "jquery"
import btn3 from "../components/btn3"
const baseUrl="https://hemc.100steps.net/2019/carving-time-backend/api/"; //"http://111.230.183.100:5000";
export default {
  name: "bottle",
  data(){
    return{
      bottle1:bottle1,
      progress:0,
      score:0,
    }
  },
  components:{
    btn1,
    btn2,
    btn3
  },
  methods:{
    init(){
      let timer=setInterval(()=>{
        this.score=this.score+1;
        if (this.score>=this.progress) {
          clearInterval(timer);
        }
      },3)
    }
  },
  mounted(){
    $.ajax({
      url:baseUrl+"/wish",
      type:"get",
      xhrFields:{withCredentials:true},
      success:res=>{
        this.progress=res.progress
      }
    })
    this.init();
  }
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  background-color: #273453;
}
.title{
  width:80%;
  position:relative;
  left:10%;
  text-align:center;
}
.star{
  width:80%;
}
.progressContainer{
  position:relative;
  display:inline-block;
  height: 20px;
  width: 70%;
  border-radius: 10px;
  background-color: #ddd;
  margin-left: 15%;
  margin-top:3%;
}
.progress{
  background-color: #1C8DE0;
  border-radius: 10px;
  height:20px;
  line-height: 20px;
}
.font2{
  position:relative;
  font-size: 4vw;
  font-family: Adobe Heiti Std R;
  color: rgba(255,255,255,1);
 }
.font1{
  font-size: 6vw;
  font-family: Adobe Heiti Std R;
  color: rgba(255,255,255,1);
}
.font3{
  position:relative;
  margin-top:5%;
  margin-bottom:4%;
  width:70%;
  left:15%;
  font-size: 4vw;
  font-family: Adobe Heiti Std R;
  color: rgba(255,255,255,1);
}
.split{
  color:#A59F59; 
  width:80%;
  position:relative;
  left:10%;
}
</style>
