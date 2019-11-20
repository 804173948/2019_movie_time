<template>
  <div class="main">

    <div v-if="isLoad" class="box">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

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
  import {bbt, baseUrl} from "../main"

  export default {
    name: "bottle",
    data(){
      return{
        bottle1:bottle1,
        progress:0,
        score:0,
        isLoad:false,
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
      var self = this;
      self.isLoad=true;
      $.ajax({
        url:baseUrl+"/wish",
        type:"get",
        xhrFields:{withCredentials:true},
        success:res=>{
          self.progress=res.process;
          self.init();
          self.isLoad=false;
        },
        statusCode:{
          401(){
            self.isLoad=false;
            location.href=bbt+encodeURIComponent(location.href);
          },
        }
      })
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



  /* Add loading */
  .box{
    position:fixed;
    top:0; left:0;
    width:100%;
    height:100%;
    background: #e0dcdc;
    opacity:0.5;
    z-index:2;
  }
  .loading{
    width:100%;
    height: 15px;
    margin: 0 auto;
    margin-top:60%;
    text-align:center;
  }
  .loading span{
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    border-radius: 50%;
    background: black;
    animation: load 1.04s ease infinite;
  }
  .loading span:last-child{
    margin-right: 0px;
  }
  @keyframes load{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  .loading span:nth-child(1){
    animation-delay:0.13s;
  }
  .loading span:nth-child(2){
    animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    animation-delay:0.65s;
  }
</style>
