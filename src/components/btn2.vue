<template>
    <div @click="gotoMatch" class="btn btn2">电影对对碰</div>
</template>

<script>
    import circle2 from "../assets/circle2.png"
    export default {
        name: 'btn2',
        data(){
            return{
                circle2:circle2,
            }
        },
        methods:{
            gotoMatch(){
                location.href="https://hemc.100steps.net/2019/carving-time/match/star.html";
            }
        },
    }
</script>

<style scoped>
    .btn{
        position:absolute;
        top:70%;
        height:20vw; width:20vw;
        text-align: center;
        background-size:100% 100%;
        line-height:20vw;
    }
    .btn2{
        left:40%;
        background-image:url("../assets/circle2.png");
        font-size:3.5vw;
        color: rgba(255,255,255,1);
    }
</style>
