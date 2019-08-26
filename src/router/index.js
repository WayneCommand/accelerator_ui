import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from "../views/componets/Menu";
import Header from "../views/componets/Header";
import LoginCard from "../views/login/LoginCard";
import LoginHeader from "../views/login/LoginHeader";


Vue.use(VueRouter);

let constRouter = [
    {
        path: '/',
        name: '主页',
        components: {
            navigation: Menu,
            header: Header,
        }
    },
    {
        path: '/login',
        name: '登录页',
        components: {
            header: LoginHeader,
            default: LoginCard
        }
    },
];

let router = new VueRouter({
    routes: constRouter
});

/*const whiteList = ['/login'];*/

export default router
