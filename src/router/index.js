import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from "../views/componets/Menu";
import Header from "../views/componets/Header";
import LoginCard from "../views/login/LoginCard";
import LoginHeader from "../views/login/LoginHeader";
import Profile from "../views/profiles/Profile";
import MyInfo from "../views/profiles/components/MyInfo";
import Safety from "../views/profiles/components/Safety";
import Main from "../views/profiles/components/Main";


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
    {
        path: '/profile',
        name: '个人信息',
        components: {
            navigation: Menu,
            header: Header,
            default: Profile
        },
        children:[
            {
                path:'myinfo',
                component:MyInfo
            },
            {
                path: 'safety',
                component: Safety
            },
            {
                path:'main',
                component: Main

            }
        ]
    }
];

const whiteList = ['/login'];

let router = new VueRouter({
    routes: constRouter
});


//用于控制未登录跳转。
router.beforeEach((to, from, next) => {
    //避免递归调用
    if (whiteList.indexOf(to.path) !== -1) {
        next()
    }

    let token = localStorage.getItem("token");
    let expireTime = Number.parseInt(localStorage.getItem("expireTime"));

    //检查localstorage里有没有token
    //如果有token则判断是否已过期
    //过期就需要跳转到登陆页面
    if (token && new Date().getTime() < expireTime){
        next()
    }else{
        next("/login");
    }

})

export default router
