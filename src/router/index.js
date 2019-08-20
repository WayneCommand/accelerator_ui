import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginHeader from "../views/login/LoginHeader";
import LoginCard from "../views/login/LoginCard";

Vue.use(VueRouter);

let constRouter = [
    {
        path: '/',
        name: '登录页',
        components: {
            header: LoginHeader,
            default: LoginCard
        }
    }
];

let router = new VueRouter({
    routes: constRouter
});

/*const whiteList = ['/login'];*/

export default router
