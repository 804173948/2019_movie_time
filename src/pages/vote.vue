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

        <el-tabs class="movies-header" type="border-card" stretch="true" v-model="keyword">
            <el-tab-pane label="动画" name="动画" ></el-tab-pane>
            <el-tab-pane label="国风" name="国风"></el-tab-pane>
            <el-tab-pane label="科幻" name="科幻" ></el-tab-pane>
            <el-tab-pane label="剧情" name="剧情"></el-tab-pane>
            <el-tab-pane label="惊悚" name="惊悚" ></el-tab-pane>
        </el-tabs>
        <div class="tips" v-show="showTip">
            <div class="tipbox" @click="hide">
                <div style="display:flex;flex-direction:column;align-items:center;">
                <div class="title">电投规则</div>
                <div class="text">
                    每个参与者12票,
                    每个分区最多投6票
                </div>
                </div>
                <div class="btn" @click="hide">X</div>
            </div>
        </div>
        <div class="movies-content">
            <div class="item" v-for="movie in movies" :key="movie.movie_id">
                <img class="pic" :src="movie.poster_url">
                <div class="intro">
                    <div class="m-title">{{movie.title}}</div>
                    <div class="score">{{movie.score}}</div>
                    <!--img @click="like(movie)" class="love" v-if="!movie.isClick" :src="love"-->
                    <img @click="like(movie)" class="love" :src="
                        movie.isClick ? loveActive : love">
                    <div class="abstract">{{movie.introduction}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import love from "../assets/thumb1.png"
    import loveActive from "../assets/thumb2.png"
    import {bbt, PREFIX, baseUrl,wxshare} from "../main"
    import $ from "jquery"

    export default {
        name: "vote",
        data(){
            return{
                keyword:'',
                //tot:0,
                movies: [],
                love:love,
                loveActive:loveActive,
                isLoad:false,
                showTip:true,
            }
        },
        watch:{
            keyword(){
                var self = this;
                console.log("keyword",this.keyword)
                this.isLoad=true;
                $.ajax({
                    url:baseUrl+"/movieList",
                    type:"post",
                    data:{
                        keyword:this.keyword
                    },
                    dataType:"JSON",
                    xhrFields:{withCredentials:true},
                    success:res=>{
                        this.movies = res.map( movie => ({
                            ...movie,
                            poster_url: PREFIX + movie.poster_url,
                            movie_id: movie.movie_id,
                            title: movie.title,
                            score: movie.score,
                            introduction: movie.introduction,
                            isClick: movie.isSelected // isClick
                        }))
                        self.isLoad=false;
                        console.log("movies = ",self.movies)
                    },
                    statusCode:{
                        400(){
                            self.isLoad=false;
                            console.log("电影类型错误")
                        },
                        401(){
                            self.isLoad=false;
                            location.href=bbt+encodeURIComponent(location.href);
                        },
                        410(){
                            self.isLoad=false;
                            alert("活动不在进行期间")
                        }
                    }
                })
            }
        },
        methods:{
            like(movie){
                var self = this;
                this.isLoad=true;
                $.ajax({
                    url:baseUrl+"/like",
                    type:"post",
                    data:{
                        movie_id:movie.movie_id,
                        isSlected:movie.isClick
                    },
                    dataType:"JSON",
                    xhrFields:{withCredentials:true},
                    success:res=>{
                        //this.tot=res.selectNum;
                        movie.isClick=true;//!movie.isClick
                        self.isLoad=false;
                        self.$forceUpdate()
                    },
                    statusCode:{
                        401(){
                            self.isLoad=false;
                            location.href=bbt+encodeURIComponent(location.href);
                        },
                        403(){
                            self.isLoad=false;
                            alert("投票不能再多了")
                        },
                        410(){
                            self.isLoad=false;
                            alert("活动不在进行期间")
                        }
                    }
                })
            },
            hide(){
                this.showTip = false;
            }
        },
        mounted(){
            this.keyword="动画"
        }
    }
</script>

<style>
    html,
    body,
    #app {
        height: 100%;
        background-color: #273453;
        overflow-x: hidden;
    }
    .tips {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 23;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .tipbox{
        position: absolute;
        width: 62%;
        height: 68.7vw;
        background-color: #d8d4c4;
        border-radius: 2vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4vw;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .title {
        color: #000000;
        font-size: 6vw;
    }
    .text {
        font-size: 4vw;
        color: #000000;
    }
    .btn {
        border-radius: 50%;
        width: 28px;
        height: 28px;
        border: #000000 solid 1px;
        padding: 0;
        margin: 0;
        line-height: 28px;
        text-align: center;
        font-weight: 400;
        color: #000000;
    }
    .main .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 3.5vw;
        font-weight: 500;
        color: white;
        position: relative;
        width:20%;
    }
    .main .el-tabs__item.is-active {
        color: white;
        font-size:4.5vw;
    }
    .main .el-tabs__content {
        display:none;
    }
    .item{
        position:relative;
        margin-top:6%;
        background: rgb(46,58,88);
        padding-bottom:2vw;
    }
    .pic{
        position:absolute;
        left:2%; /*top:-2vh;*/
        width:33%;
        top: 50%;transform: translateY(-50%);
        border:1px solid #A59F59;
    }
    .m-title{
        position:relative;
        width:58%;
        left:40%; margin-top:5vw;
        font-size: 6vw;
        font-family: Microsoft YaHei Regular;
        color: rgba(255,255,255,1);
        word-break: keep-all;
        white-space:nowrap;
        overflow-x: scroll;
    }
    .score{
        position: relative;
        width:58%;
        left:40%; margin-top:2vw;
        font-size: 4vh;
        font-family: Microsoft YaHei Regular;
        color: rgba(255,184,64,1);
    }
    .abstract{
        position:relative;
        width:58%;
        left:40%;margin-top:2vw;
        font-size:3vw;
        font-family: Microsoft YaHei Regular;
        color: rgba(255,255,255,1);
        margin-right:2%;
    }
    .love{
        top: 11.25vw; right: 8px;
        /*width:32px;*/
        height:28px;
        position:absolute;
    }

    /* Fixed content */
    .movies-header {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: 42px;
    }
    .movies-content{
        position: fixed;
        top: 42px;
        left: 0; right: 0;
        bottom: 0;
        overflow-y: scroll;
    }

    /* Add loading */
    .box{
        position:fixed;
        top:0; left:0;
        width:100%;
        height:100%;
        background: #e0dcdc;
        opacity:0.5;
        z-index:200;
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
