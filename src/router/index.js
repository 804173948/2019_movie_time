import Vue from "vue"
import Router from "vue-router"
import index from "../pages/index"
import bottle from "../pages/bottle"
import vote from "../pages/vote"


Vue.use(Router)

export default new Router({
    routes:[
        {
            name:"",
            path:"",
            component:index
        },
        {
            name:"index",
            path:"/index",
            component:index
        },
        {
            name:"bottle",
            path:"/bottle",
            component:bottle
        },
        {
            name:"vote",
            path:"/vote",
            component:vote
        }
    ]
})
