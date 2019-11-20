<template>
<div class="main">
  <div class="logo">
    <img :src="title" class="title">
    <img :src="shadow" class="shadow">
     <img :src="cloud" class="cloud">
  </div>
  <btn1></btn1>
  <btn2></btn2>
  <btn3></btn3>
  <div @click="gotoBottle" class="corner">
    <img :src="star" class="star"/>
    <div class="font1">我的许愿瓶</div>
  </div>
</div>
</template>

<script>
import star from "../assets/star.png"
import title from "../assets/title.png"
import shadow from "../assets/shadow.png"
import cloud from "../assets/cloud.png"
import btn1 from "../components/btn1"
import btn2 from "../components/btn2"
import btn3 from "../components/btn3"
import {bbt, PREFIX, baseUrl,wxshare} from "../main"
export default {
  name: "index",
  data(){
    return{
      star:star,
      title:title,
      shadow:shadow,
      cloud:cloud,
    }
  },
  components:{
    btn1,
    btn2,
    btn3
  },
  methods:{
    gotoBottle(){
      var _this=this;
      _this.$router.push("bottle");
    },
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
*{
 font-family: STFangsong Regular;
}
.main{
  position:relative;
  width:100%;
  height:100%;
}
.logo{
  position:relative;
  top:10%;
  height:40%;
}
.title{
  position:absolute;
  left:20%; top:0;
  width:60%;
}
.shadow{
  position:absolute;
  left:17%; top:18%;
  width:66%;
}
.cloud{
  position:absolute;
  right:0;bottom:-30%;
  width:50%;
}
.corner{
  position:absolute;
  bottom:2%; right:2%;
  text-align:center;
}
.star{
  width:12vw;
}
.font1{
  font-size: 4vw;
  color: rgba(255,255,255,1);
}
</style>
